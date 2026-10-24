jest.mock("../models/Trip", () => {
  const Trip = jest.fn();

  Trip.find = jest.fn();
  Trip.findOne = jest.fn();
  Trip.deleteOne = jest.fn();
  Trip.exists = jest.fn();

  return Trip;
});

jest.mock("../middleware/authMiddleware", () => (req, res, next) => {
  req.user = { userId: "507f1f77bcf86cd799439011" };
  next();
});

jest.mock("../middleware/upload", () => ({
  single: () => (req, res, next) => {
    // Simulate an uploaded image when the test requests one.
    if (req.headers["x-test-upload"] === "true") {
      req.file = {
        path: "https://res.cloudinary.com/test/image/upload/goa.jpg",
      };
    }

    next();
  },
}));

// Mock Cloudinary so tests never delete real images.
jest.mock("../config/cloudinary", () => ({
  uploader: {
    destroy: jest.fn().mockResolvedValue({ result: "ok" }),
  },
}));

const request = require("supertest");
const app = require("../index");
const Trip = require("../models/Trip");
const cloudinary = require("../config/cloudinary");

const tripId = "507f1f77bcf86cd799439012";
const ownerId = "507f1f77bcf86cd799439011";

describe("TripVault trip API", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default: no other trip uses the Cloudinary image.
    Trip.exists.mockResolvedValue(null);

    // Keep Cloudinary mocked and safe for every test.
    cloudinary.uploader.destroy.mockResolvedValue({ result: "ok" });
  });

  test("creates a trip for the authenticated user", async () => {
    const savedTrip = {
      _id: tripId,
      title: "Goa Adventure",
      destination: "Goa",
      user: ownerId,
    };

    Trip.mockImplementation(function (data) {
      Object.assign(this, data);

      this.save = jest.fn().mockResolvedValue(savedTrip);
    });

    const response = await request(app)
      .post("/api/trips")
      .send({
        title: "Goa Adventure",
        destination: "Goa",
      });

    expect(response.status).toBe(201);
    expect(response.body.trip.title).toBe("Goa Adventure");

    expect(Trip).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Goa Adventure",
        destination: "Goa",
        user: ownerId,
      })
    );
  });

  test("rejects trip creation when title is missing", async () => {
    const response = await request(app)
      .post("/api/trips")
      .send({
        destination: "Goa",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Title and destination are required"
    );
  });

  test("returns only the authenticated user's trips", async () => {
    const ownedTrips = [
      {
        _id: tripId,
        title: "My Goa Trip",
        user: ownerId,
      },
    ];

    Trip.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(ownedTrips),
    });

    const response = await request(app).get("/api/trips");

    expect(response.status).toBe(200);
    expect(response.body.trips).toHaveLength(1);

    expect(Trip.find).toHaveBeenCalledWith({
      user: ownerId,
    });
  });

  test("rejects an invalid trip ID", async () => {
    const response = await request(app)
      .get("/api/trips/not-a-valid-id");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid trip ID");
    expect(Trip.findOne).not.toHaveBeenCalled();
  });

  test("does not return a trip that the user does not own", async () => {
    Trip.findOne.mockResolvedValue(null);

    const response = await request(app)
      .get(`/api/trips/${tripId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Trip not found");

    expect(Trip.findOne).toHaveBeenCalledWith({
      _id: tripId,
      user: ownerId,
    });
  });

  test("does not update a trip that the user does not own", async () => {
    Trip.findOne.mockResolvedValue(null);

    const response = await request(app)
      .put(`/api/trips/${tripId}`)
      .send({
        title: "Unauthorized Update",
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Trip not found or you are not the owner"
    );
  });

  test("does not delete a trip that the user does not own", async () => {
    Trip.findOne.mockResolvedValue(null);

    const response = await request(app)
      .delete(`/api/trips/${tripId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Trip not found or you are not the owner"
    );

    expect(Trip.deleteOne).not.toHaveBeenCalled();
    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
  });

  test("updates a trip owned by the authenticated user", async () => {
    const existingTrip = {
      _id: tripId,
      title: "Old Title",
      destination: "Goa",
      user: ownerId,
      save: jest.fn().mockImplementation(async function () {
        return this;
      }),
    };

    Trip.findOne.mockResolvedValue(existingTrip);

    const response = await request(app)
      .put(`/api/trips/${tripId}`)
      .send({
        title: "Updated Goa Adventure",
        rating: 4,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Trip updated successfully");
    expect(response.body.trip.title).toBe("Updated Goa Adventure");
    expect(response.body.trip.rating).toBe(4);
    expect(existingTrip.save).toHaveBeenCalled();
  });

  test("deletes a trip owned by the authenticated user", async () => {
    Trip.findOne.mockResolvedValue({
      _id: tripId,
      title: "My Goa Trip",
      user: ownerId,
      coverImage: "",
      photos: [],
    });

    Trip.deleteOne.mockResolvedValue({
      deletedCount: 1,
    });

    const response = await request(app)
      .delete(`/api/trips/${tripId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Trip deleted successfully");

    expect(Trip.deleteOne).toHaveBeenCalledWith({
      _id: tripId,
      user: ownerId,
    });

    // Empty image fields should not trigger Cloudinary deletion.
    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
  });

  test("deletes an unused Cloudinary image when its trip is deleted", async () => {
    const imageUrl =
      "https://res.cloudinary.com/test/image/upload/v1234567890/tripvault/goa.jpg";

    Trip.findOne.mockResolvedValue({
      _id: tripId,
      title: "My Goa Trip",
      user: ownerId,
      coverImage: imageUrl,
      photos: [imageUrl],
    });

    Trip.deleteOne.mockResolvedValue({
      deletedCount: 1,
    });

    // No other trip references this image.
    Trip.exists.mockResolvedValue(null);

    const response = await request(app)
      .delete(`/api/trips/${tripId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Trip deleted successfully");

expect(Trip.exists).toHaveBeenCalledWith({
  $or: [
    { coverImage: imageUrl },
    { photos: imageUrl },
  ],
});

    // The version number and extension are removed from the public ID.
    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith(
      "tripvault/goa"
    );
  });

  test("does not delete a Cloudinary image used by another trip", async () => {
    const imageUrl =
      "https://res.cloudinary.com/test/image/upload/v1234567890/tripvault/goa.jpg";

    Trip.findOne.mockResolvedValue({
      _id: tripId,
      title: "My Goa Trip",
      user: ownerId,
      coverImage: imageUrl,
      photos: [imageUrl],
    });

    Trip.deleteOne.mockResolvedValue({
      deletedCount: 1,
    });

    // Another trip still references this image.
    Trip.exists.mockResolvedValue({ _id: "another-trip-id" });

    const response = await request(app)
      .delete(`/api/trips/${tripId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Trip deleted successfully");

    expect(Trip.exists).toHaveBeenCalled();

    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
  });

  // PHOTO UPLOAD TESTS

  test("rejects photo upload when trip ID is invalid", async () => {
    const response = await request(app)
      .post("/api/trips/not-a-valid-id/upload");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid trip ID");
    expect(Trip.findOne).not.toHaveBeenCalled();
  });

  test("rejects photo upload when no image is provided", async () => {
    const response = await request(app)
      .post(`/api/trips/${tripId}/upload`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please select a valid image to upload.");
    expect(Trip.findOne).toHaveBeenCalledWith({
      _id: tripId,
      user: ownerId,
    });
  });

  test("rejects photo upload when the user does not own the trip", async () => {
    Trip.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post(`/api/trips/${tripId}/upload`)
      .set("x-test-upload", "true");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Trip not found or you are not the owner"
    );

    expect(Trip.findOne).toHaveBeenCalledWith({
      _id: tripId,
      user: ownerId,
    });
  });

  test("saves uploaded photo URL as cover image and in photos", async () => {
    const imageUrl =
      "https://res.cloudinary.com/test/image/upload/goa.jpg";

    const existingTrip = {
      _id: tripId,
      user: ownerId,
      coverImage: "",
      photos: [],
      save: jest.fn().mockImplementation(async function () {
        return this;
      }),
    };

    Trip.findOne.mockResolvedValue(existingTrip);

    const response = await request(app)
      .post(`/api/trips/${tripId}/upload`)
      .set("x-test-upload", "true");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Trip cover image uploaded successfully.");
    expect(response.body.trip.coverImage).toBe(imageUrl);
    expect(response.body.trip.photos).toContain(imageUrl);
    expect(existingTrip.save).toHaveBeenCalled();
  });
});
