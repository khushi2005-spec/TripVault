const express = require("express");
const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// ========================================
// CLOUDINARY IMAGE HELPERS
// ========================================

// Extract the Cloudinary public ID from an image URL.
const getCloudinaryPublicId = (imageUrl) => {
  if (typeof imageUrl !== "string" || !imageUrl) {
    return null;
  }

  try {
    const url = new URL(imageUrl);

    if (url.hostname !== "res.cloudinary.com") {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex === -1) {
      return null;
    }

    let assetParts = parts.slice(uploadIndex + 1);

    // Remove an optional Cloudinary version, such as v1234567890.
    if (assetParts[0] && /^v\d+$/.test(assetParts[0])) {
      assetParts = assetParts.slice(1);
    }

    if (assetParts.length === 0) {
      return null;
    }

    const filename = assetParts.pop();
    const nameWithoutExtension = filename.replace(/\.[^.]+$/, "");

    if (!nameWithoutExtension) {
      return null;
    }

    return [...assetParts, nameWithoutExtension].join("/");
  } catch {
    return null;
  }
};

// Delete Cloudinary images only when no other trip references them.
const cleanupUnusedCloudinaryImages = async (
  imageUrls,
  excludedTripId
) => {
  const uniqueUrls = [...new Set(imageUrls.filter(Boolean))];

  for (const imageUrl of uniqueUrls) {
    const publicId = getCloudinaryPublicId(imageUrl);

    if (!publicId) {
      continue;
    }

    // Do not delete an image that is still used by any trip.
const stillUsed = await Trip.exists({
  $or: [
    { coverImage: imageUrl },
    { photos: imageUrl },
  ],
});

    if (stillUsed) {
      continue;
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result !== "ok" && result.result !== "not found") {
        console.error(
          `Cloudinary cleanup skipped for ${publicId}:`,
          result.result
        );
      }
    } catch (error) {
      // A cleanup failure must not undo the trip deletion.
      console.error(
        `Cloudinary cleanup failed for ${publicId}:`,
        error.message
      );
    }
  }
};

// ========================================
// VALIDATION HELPERS
// ========================================

const MAX_TITLE_LENGTH = 100;
const MAX_DESTINATION_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 2000;

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

function validateTripData(body, isUpdate = false, existingTrip = null) {
  const errors = [];
  const data = {};

  body =
    body && typeof body === "object" && !Array.isArray(body)
      ? body
      : {};

  // Validate title.
  if (!isUpdate || body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      errors.push("Title is required");
    } else if (body.title.trim().length > MAX_TITLE_LENGTH) {
      errors.push(`Title must not exceed ${MAX_TITLE_LENGTH} characters`);
    } else {
      data.title = body.title.trim();
    }
  }

  // Validate destination.
  if (!isUpdate || body.destination !== undefined) {
    if (
      typeof body.destination !== "string" ||
      !body.destination.trim()
    ) {
      errors.push("Destination is required");
    } else if (
      body.destination.trim().length > MAX_DESTINATION_LENGTH
    ) {
      errors.push(
        `Destination must not exceed ${MAX_DESTINATION_LENGTH} characters`
      );
    } else {
      data.destination = body.destination.trim();
    }
  }

  // Validate description.
  if (body.description !== undefined) {
    if (typeof body.description !== "string") {
      errors.push("Description must be a string");
    } else if (body.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(
        `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters`
      );
    } else {
      data.description = body.description.trim();
    }
  }

  // Validate rating.
  if (body.rating !== undefined) {
    const rating =
      typeof body.rating === "number" ||
      (typeof body.rating === "string" && body.rating.trim() !== "")
        ? Number(body.rating)
        : NaN;

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      errors.push("Rating must be an integer between 1 and 5");
    } else {
      data.rating = rating;
    }
  }

  // Validate dates.
  for (const field of ["startDate", "endDate"]) {
    if (body[field] === undefined) {
      continue;
    }

    if (body[field] === null || body[field] === "") {
      data[field] = null;
      continue;
    }

    const date = new Date(body[field]);

    if (
      typeof body[field] !== "string" ||
      Number.isNaN(date.getTime())
    ) {
      errors.push(`${field} must be a valid date`);
    } else {
      data[field] = date;
    }
  }

  // Validate the effective date range, including unchanged dates.
  const startDate =
    data.startDate !== undefined
      ? data.startDate
      : existingTrip?.startDate;

  const endDate =
    data.endDate !== undefined
      ? data.endDate
      : existingTrip?.endDate;

  if (
    startDate &&
    endDate &&
    new Date(startDate).getTime() > new Date(endDate).getTime()
  ) {
    errors.push("Start date must be on or before the end date");
  }

  return { errors, data };
}

// ========================================
// ERROR HANDLING
// ========================================

function handleRouteError(res, error, context) {
  console.error(`${context}:`, error);

  if (
    error.name === "ValidationError" ||
    error.name === "CastError"
  ) {
    return res.status(400).json({
      message: "Invalid trip data. Please check your input.",
    });
  }

  return res.status(500).json({
    message: "An unexpected server error occurred. Please try again.",
  });
}

// ========================================
// CREATE TRIP
// POST /api/trips
// ========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { errors, data } = validateTripData(req.body);

    if (errors.length > 0) {
      const body = req.body || {};

      const missingRequiredField =
        typeof body.title !== "string" ||
        !body.title.trim() ||
        typeof body.destination !== "string" ||
        !body.destination.trim();

      return res.status(400).json({
        message: missingRequiredField
          ? "Title and destination are required"
          : "Trip validation failed",
        errors,
      });
    }

    const trip = new Trip({
      ...data,
      user: req.user.userId,
    });

    const savedTrip = await trip.save();

    return res.status(201).json({
      message: "Trip created successfully",
      trip: savedTrip,
    });
  } catch (error) {
    return handleRouteError(res, error, "Create Trip Error");
  }
});

// ========================================
// GET ALL USER TRIPS
// GET /api/trips
// ========================================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({ trips });
  } catch (error) {
    return handleRouteError(res, error, "Get Trips Error");
  }
});

// ========================================
// GET SINGLE TRIP
// GET /api/trips/:id
// ========================================

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.status(200).json({ trip });
  } catch (error) {
    return handleRouteError(res, error, "Get Single Trip Error");
  }
});

// ========================================
// UPDATE TRIP
// PUT /api/trips/:id
// ========================================

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    // Verify that the authenticated user owns the trip.
    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    const { errors, data } = validateTripData(req.body, true, trip);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Trip validation failed",
        errors,
      });
    }

    // Update only validated fields.
    Object.assign(trip, data);

    const updatedTrip = await trip.save();

    return res.status(200).json({
      message: "Trip updated successfully",
      trip: updatedTrip,
    });
  } catch (error) {
    return handleRouteError(res, error, "Update Trip Error");
  }
});

// ========================================
// DELETE TRIP
// DELETE /api/trips/:id
// ========================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    // Find the trip and verify ownership before deleting anything.
    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    // Save image URLs before removing the trip document.
    const imageUrls = [
      trip.coverImage,
      ...(Array.isArray(trip.photos) ? trip.photos : []),
    ].filter(Boolean);

    const deleteResult = await Trip.deleteOne({
      _id: id,
      user: req.user.userId,
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    // Cleanup errors must not turn a successful database deletion
    // into a failed response.
    try {
      await cleanupUnusedCloudinaryImages(imageUrls, id);
    } catch (error) {
      console.error("Cloudinary cleanup error:", error.message);
    }

    return res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    return handleRouteError(res, error, "Delete Trip Error");
  }
});

// ========================================
// HANDLE IMAGE UPLOAD ERRORS
// ========================================

function handleImageUpload(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (typeof upload.handleError === "function") {
      return upload.handleError(error, req, res, next);
    }

    console.error("Image Upload Error:", error);

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        message: "Image size must not exceed 5 MB.",
      });
    }

    if (
      error.code === "LIMIT_FILE_COUNT" ||
      error.code === "LIMIT_UNEXPECTED_FILE"
    ) {
      return res.status(400).json({
        message: "Only one image can be uploaded using the image field.",
      });
    }

    if (error.code === "INVALID_IMAGE_TYPE") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Image upload failed. Please try again.",
    });
  });
}

// ========================================
// VERIFY TRIP OWNERSHIP BEFORE UPLOADING
// ========================================

async function verifyTripOwnership(req, res, next) {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    req.trip = trip;
    next();
  } catch (error) {
    return handleRouteError(
      res,
      error,
      "Verify Trip Ownership Error"
    );
  }
}

function verifyPhotoExists(req, res, next) {
  const { imageUrl } = req.body || {};
  const trip = req.trip;

  if (typeof imageUrl !== "string" || !imageUrl.trim()) {
    return res.status(400).json({
      message: "The existing photo URL is required",
    });
  }

  if (!Array.isArray(trip.photos) || !trip.photos.includes(imageUrl)) {
    return res.status(404).json({
      message: "Photo not found in this trip's gallery",
    });
  }

  next();
}

// ========================================
// UPLOAD TRIP PHOTO
// POST /api/trips/:id/upload
// ========================================

router.post(
  "/:id/upload",
  authMiddleware,
  verifyTripOwnership,
  handleImageUpload,
  async (req, res) => {
    try {
      if (!req.file || !req.file.path) {
        return res.status(400).json({
          message: "Please select a valid image to upload.",
        });
      }

      // Get the trip verified by the ownership middleware.
      const trip = req.trip;

      // CloudinaryStorage provides the uploaded image URL in req.file.path.
      const imageUrl = req.file.path;

      // Save the latest uploaded image as the cover image.
      trip.coverImage = imageUrl;

      // Keep the uploaded image in the trip's photo gallery.
      if (!Array.isArray(trip.photos)) {
        trip.photos = [];
      }

      if (!trip.photos.includes(imageUrl)) {
        trip.photos.push(imageUrl);
      }

      const updatedTrip = await trip.save();

      return res.status(200).json({
        message: "Trip cover image uploaded successfully.",
        coverImage: updatedTrip.coverImage,
        trip: updatedTrip,
      });
    } catch (error) {
      return handleRouteError(
        res,
        error,
        "Upload Trip Photo Error"
      );
    }
  }
);

// ========================================
//  REMOVE A SINGLE GALLERY PHOTO
//  DELETE /api/trips/:id/photos
// ======================================== 

router.delete("/:id/photos", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body || {};

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    if (typeof imageUrl !== "string" || !imageUrl.trim()) {
      return res.status(400).json({
        message: "Image URL is required",
      });
    }

    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    const photoIndex = trip.photos.indexOf(imageUrl);

    if (photoIndex === -1) {
      return res.status(404).json({
        message: "Photo not found in this trip's gallery",
      });
    }

    // Remove only the selected gallery entry.
    trip.photos.splice(photoIndex, 1);

    // Save first so cleanup can check the updated references.
    await trip.save();

    // Do not delete the image if it is still the cover
    // or is referenced by another trip.
    if (trip.coverImage !== imageUrl) {
      await cleanupUnusedCloudinaryImages([imageUrl], trip._id);
    }

    return res.status(200).json({
      message: "Photo removed from gallery successfully",
      trip,
    });
  } catch (error) {
    return handleRouteError(
      res,
      error,
      "Remove Trip Photo Error"
    );
  }
});

// ========================================
//  SELECT A GALLERY PHOTO AS COVER
//   PATCH /api/trips/:id/cover
// ======================================== 

router.patch("/:id/cover", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body || {};

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    if (typeof imageUrl !== "string" || !imageUrl.trim()) {
      return res.status(400).json({
        message: "Image URL is required",
      });
    }

    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    if (!trip.photos.includes(imageUrl)) {
      return res.status(400).json({
        message: "Select a photo from this trip's gallery",
      });
    }

    trip.coverImage = imageUrl;

    const updatedTrip = await trip.save();

    return res.status(200).json({
      message: "Trip cover image updated successfully",
      coverImage: updatedTrip.coverImage,
      trip: updatedTrip,
    });
  } catch (error) {
    return handleRouteError(
      res,
      error,
      "Set Trip Cover Error"
    );
  }
});

// ========================================
//   REMOVE COVER IMAGE ONLY
//   DELETE /api/trips/:id/cover
// ======================================== 

router.delete("/:id/cover", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    if (!trip.coverImage) {
      return res.status(400).json({
        message: "This trip does not have a cover image",
      });
    }

    const previousCover = trip.coverImage;

    // Clear only the cover; keep the gallery unchanged.
    trip.coverImage = "";

    const updatedTrip = await trip.save();

    // Cleanup checks whether the image remains in this trip's
    // gallery or is referenced by another trip.
    await cleanupUnusedCloudinaryImages([previousCover], trip._id);

    return res.status(200).json({
      message: "Cover image removed successfully",
      trip: updatedTrip,
    });
  } catch (error) {
    return handleRouteError(
      res,
      error,
      "Remove Trip Cover Error"
    );
  }
});

// ========================================
//   REPLACE A GALLERY PHOTO
//   PUT /api/trips/:id/photos
// ======================================== 

router.put(
  "/:id/photos",
  authMiddleware,
  verifyTripOwnership,
  handleImageUpload,
  verifyPhotoExists,
  async (req, res) => {
    let newImageUrl = null;

    try {
      const { imageUrl: oldImageUrl } = req.body;
      const trip = req.trip;

      if (!req.file || !req.file.path) {
        return res.status(400).json({
          message: "Please select a replacement image",
        });
      }

      newImageUrl = req.file.path;

      const photoIndex = trip.photos.indexOf(oldImageUrl);

      // Recheck before changing the trip document.
      if (photoIndex === -1) {
        await cleanupUnusedCloudinaryImages(
          [newImageUrl],
          trip._id
        );
        return res.status(404).json({
          message: "Photo no longer exists in this trip's gallery",
        });
      }

      trip.photos[photoIndex] = newImageUrl;

      if (trip.coverImage === oldImageUrl) {
        trip.coverImage = newImageUrl;
      }

      await trip.save();

      if (oldImageUrl !== newImageUrl) {
        await cleanupUnusedCloudinaryImages(
          [oldImageUrl],
          trip._id
        );
      }

      return res.status(200).json({
        message: "Photo replaced successfully",
        trip,
      });
    } catch (error) {
      if (newImageUrl) {
        await cleanupUnusedCloudinaryImages(
          [newImageUrl],
          req.trip?._id
        );
      }

      return handleRouteError(
        res,
        error,
        "Replace Trip Photo Error"
      );
    }
  }
);

module.exports = router;
