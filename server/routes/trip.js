// const express = require("express");
// const Trip = require("../models/trip");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // Create a new trip
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const {
//       title,
//       destination,
//       startDate,
//       endDate,
//       description,
//       coverImage,
//     } = req.body;

//     if (!title || !destination || !startDate || !endDate) {
//       return res.status(400).json({
//         message: "Title, destination, start date and end date are required",
//       });
//     }

//     const trip = await Trip.create({
//       user: req.user.userId,
//       title,
//       destination,
//       startDate,
//       endDate,
//       description,
//       coverImage,
//     });

//     res.status(201).json({
//       message: "Trip created successfully",
//       trip,
//     });
//   } catch (error) {
//     console.error("Create trip error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// // Get all trips of logged-in user
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const trips = await Trip.find({
//       user: req.user.userId,
//     }).sort({ createdAt: -1 });

//     res.json({
//       trips,
//     });
//   } catch (error) {
//     console.error("Get trips error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });
//   } catch (error) {
//     console.error("Get trips error:", error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// module.exports = router;
//   } catch (error) {
//     console.error("Get trips error:", error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// // Delete a trip
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const trip = await Trip.findOne({
//       _id: req.params.id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found",
//       });
//     }

//     await Trip.findByIdAndDelete(req.params.id);

//     res.json({
//       message: "Trip deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete trip error:", error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// module.exports = router;

// const express = require("express");
// const mongoose = require("mongoose");

// const Trip = require("../models/Trip");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();


// // ==========================================
// // CREATE TRIP
// // POST /api/trips
// // ==========================================

// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const {
//       title,
//       destination,
//       startDate,
//       endDate,
//       description,
//       rating,
//     } = req.body;

//     // Check required fields
//     if (!title || !destination) {
//       return res.status(400).json({
//         message: "Title and destination are required",
//       });
//     }

//     // Create trip
//     const trip = new Trip({
//       title,
//       destination,
//       startDate,
//       endDate,
//       description,
//       rating,

//       // Connect trip with logged-in user
//       user: req.user.userId,
//     });

//     const savedTrip = await trip.save();

//     res.status(201).json({
//       message: "Trip created successfully",
//       trip: savedTrip,
//     });

//   } catch (error) {
//     console.error("Create Trip Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });


// // ==========================================
// // GET ALL USER TRIPS
// // GET /api/trips
// // ==========================================

// router.get("/", authMiddleware, async (req, res) => {
//   try {

//     const trips = await Trip.find({
//       user: req.user.userId,
//     }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json({
//       trips,
//     });

//   } catch (error) {
//     console.error("Get Trips Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });


// // ==========================================
// // GET SINGLE TRIP
// // GET /api/trips/:id
// // ==========================================

// router.get("/:id", authMiddleware, async (req, res) => {
//   try {

//     const { id } = req.params;

//     // Check MongoDB ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     // Find trip belonging to logged-in user
//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found",
//       });
//     }

//     res.status(200).json({
//       trip,
//     });

//   } catch (error) {
//     console.error("Get Single Trip Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });


// // ==========================================
// // UPDATE TRIP
// // PUT /api/trips/:id
// // ==========================================

// router.put("/:id", authMiddleware, async (req, res) => {
//   try {

//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     const {
//       title,
//       destination,
//       startDate,
//       endDate,
//       description,
//       rating,
//     } = req.body;

//     // Find only if trip belongs to logged-in user
//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found or you are not the owner",
//       });
//     }

//     // Update fields
//     if (title !== undefined) {
//       trip.title = title;
//     }

//     if (destination !== undefined) {
//       trip.destination = destination;
//     }

//     if (startDate !== undefined) {
//       trip.startDate = startDate;
//     }

//     if (endDate !== undefined) {
//       trip.endDate = endDate;
//     }

//     if (description !== undefined) {
//       trip.description = description;
//     }

//     if (rating !== undefined) {
//       trip.rating = rating;
//     }

//     const updatedTrip = await trip.save();

//     res.status(200).json({
//       message: "Trip updated successfully",
//       trip: updatedTrip,
//     });

//   } catch (error) {
//     console.error("Update Trip Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });


// // ==========================================
// // DELETE TRIP
// // DELETE /api/trips/:id
// // ==========================================

// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {

//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     // Find only user's own trip
//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found or you are not the owner",
//       });
//     }

//     await Trip.deleteOne({
//       _id: id,
//        user: req.user.userId,
//     });

//     res.status(200).json({
//       message: "Trip deleted successfully",
//     });

//   } catch (error) {
//     console.error("Delete Trip Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });


// module.exports = router;


// const express = require("express");
// const mongoose = require("mongoose");
// const Trip = require("../models/Trip");
// const authMiddleware = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");

// const router = express.Router();


// // ===============================
// // CREATE TRIP
// // POST /api/trips
// // ===============================
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const {
//       title,
//       destination,
//       startDate,
//       endDate,
//       description,
//       rating,
//     } = req.body;

//     if (!title || !destination) {
//       return res.status(400).json({
//         message: "Title and destination are required",
//       });
//     }

//     const trip = new Trip({
//       title,
//       destination,
//       startDate,
//       endDate,
//       description,
//       rating,
//       user: req.user.userId,
//     });

//     const savedTrip = await trip.save();

//     res.status(201).json({
//       message: "Trip created successfully",
//       trip: savedTrip,
//     });
//   } catch (error) {
//     console.error("Create Trip Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });


// // ===============================
// // GET ALL USER TRIPS
// // GET /api/trips
// // ===============================
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const trips = await Trip.find({
//       user: req.user.userId,
//     }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json({
//       trips,
//     });
//   } catch (error) {
//     console.error("Get Trips Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });


// // ===============================
// // GET SINGLE TRIP
// // GET /api/trips/:id
// // ===============================
// router.get("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found",
//       });
//     }

//     res.status(200).json({
//       trip,
//     });
//   } catch (error) {
//     console.error("Get Single Trip Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });


// // ===============================
// // UPDATE TRIP
// // PUT /api/trips/:id
// // ===============================
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log("Updating trip:", id);
//     console.log("User:", req.user);
//     console.log("Body:", req.body);

//     // Check ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     const {
//       title,
//       destination,
//       startDate,
//       endDate,
//       description,
//       rating,
//     } = req.body;

//     // Find trip AND verify ownership
//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found or you are not the owner",
//       });
//     }

//     // Update fields
//     if (title !== undefined) {
//       trip.title = title;
//     }

//     if (destination !== undefined) {
//       trip.destination = destination;
//     }

//     if (startDate !== undefined) {
//       trip.startDate = startDate;
//     }

//     if (endDate !== undefined) {
//       trip.endDate = endDate;
//     }

//     if (description !== undefined) {
//       trip.description = description;
//     }

//     if (rating !== undefined) {
//       trip.rating = Number(rating);
//     }

//     // Save updated trip
//     const updatedTrip = await trip.save();

//     console.log("Updated trip successfully:", updatedTrip);

//     res.status(200).json({
//       message: "Trip updated successfully",
//       trip: updatedTrip,
//     });

//   } catch (error) {
//     console.error("Update Trip Error:", error);

//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });


// // ===============================
// // DELETE TRIP
// // DELETE /api/trips/:id
// // ===============================
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     // Find trip and verify ownership
//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found or you are not the owner",
//       });
//     }

//     // Delete only user's trip
//     await Trip.deleteOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     res.status(200).json({
//       message: "Trip deleted successfully",
//     });

//   } catch (error) {
//     console.error("Delete Trip Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// router.post(
//   "/:id/upload",
//   authMiddleware,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { id } = req.params;

//       // Check whether trip ID is valid
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({
//           message: "Invalid trip ID",
//         });
//       }

//       // Check whether an image was uploaded
//       if (!req.file) {
//         return res.status(400).json({
//           message: "No image uploaded",
//         });
//       }

//       // Find trip and verify ownership
//       const trip = await Trip.findOne({
//         _id: id,
//         user: req.user.userId,
//       });

//       if (!trip) {
//         return res.status(404).json({
//           message: "Trip not found or you are not the owner",
//         });
//       }

//       // Cloudinary URL
//       const imageUrl = req.file.path;

//       // First uploaded image becomes cover image
//       if (!trip.coverImage) {
//         trip.coverImage = imageUrl;
//       }

//       // Add image to photos array
//       trip.photos.push(imageUrl);

//       await trip.save();

//       res.status(200).json({
//         message: "Photo uploaded successfully",
//         trip,
//       });
//     } catch (error) {
//       console.error("Upload Photo Error:", error);

//       res.status(500).json({
//         message: "Server error",
//         error: error.message,
//       });
//     }
//   }
// );

// module.exports = router;

// const express = require("express");
// const mongoose = require("mongoose");
// const Trip = require("../models/Trip");
// const authMiddleware = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");
// const cloudinary = require("../config/cloudinary");


// const router = express.Router();

// const getCloudinaryPublicId = (imageUrl) => {
  
// const cleanupUnusedCloudinaryImages = async (imageUrls, excludedTripId) => {
//   const uniqueUrls = [...new Set(imageUrls.filter(Boolean))];

//   for (const imageUrl of uniqueUrls) {
//     const publicId = getCloudinaryPublicId(imageUrl);

//     if (!publicId) {
//       continue;
//     }

//     // Check whether another trip still references this image.
//     const stillUsed = await Trip.exists({
//       _id: { $ne: excludedTripId },
//       $or: [
//         { coverImage: imageUrl },
//         { photos: imageUrl },
//       ],
//     });

//     if (stillUsed) {
//       continue;
//     }

//     try {
//       const result = await cloudinary.uploader.destroy(publicId);

//       if (result.result !== "ok" && result.result !== "not found") {
//         console.error(
//           `Cloudinary cleanup skipped for ${publicId}:`,
//           result.result
//         );
//       }
//     } catch (error) {
//       // A cleanup failure should not undo the trip deletion.
//       console.error(
//         `Cloudinary cleanup failed for ${publicId}:`,
//         error.message
//       );
//     }
//   }
// };

//   if (typeof imageUrl !== "string" || !imageUrl) {
//     return null;
//   }

//   try {
//     const url = new URL(imageUrl);

//     if (url.hostname !== "res.cloudinary.com") {
//       return null;
//     }

//     const parts = url.pathname.split("/").filter(Boolean);
//     const uploadIndex = parts.indexOf("upload");

//     if (uploadIndex === -1) {
//       return null;
//     }

//     let assetParts = parts.slice(uploadIndex + 1);

//     // Remove an optional version segment, such as v1234567890.
//     if (assetParts[0] && /^v\d+$/.test(assetParts[0])) {
//       assetParts = assetParts.slice(1);
//     }

//     if (assetParts.length === 0) {
//       return null;
//     }

//     const filename = assetParts.pop();
//     const nameWithoutExtension = filename.replace(/\.[^.]+$/, "");

//     if (!nameWithoutExtension) {
//       return null;
//     }

//     return [...assetParts, nameWithoutExtension].join("/");
//   } catch {
//     return null;
//   }
// };


// const MAX_TITLE_LENGTH = 100;
// const MAX_DESTINATION_LENGTH = 120;
// const MAX_DESCRIPTION_LENGTH = 2000;

// const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// function validateTripData(body, isUpdate = false, existingTrip = null) {
//   const errors = [];
//   const data = {};

//   body = body && typeof body === "object" && !Array.isArray(body)
//     ? body
//     : {};

//   // Validate title
//   if (!isUpdate || body.title !== undefined) {
//     if (typeof body.title !== "string" || !body.title.trim()) {
//       errors.push("Title is required");
//     } else if (body.title.trim().length > MAX_TITLE_LENGTH) {
//       errors.push(`Title must not exceed ${MAX_TITLE_LENGTH} characters`);
//     } else {
//       data.title = body.title.trim();
//     }
//   }

//   // Validate destination
//   if (!isUpdate || body.destination !== undefined) {
//     if (
//       typeof body.destination !== "string" ||
//       !body.destination.trim()
//     ) {
//       errors.push("Destination is required");
//     } else if (
//       body.destination.trim().length > MAX_DESTINATION_LENGTH
//     ) {
//       errors.push(
//         `Destination must not exceed ${MAX_DESTINATION_LENGTH} characters`
//       );
//     } else {
//       data.destination = body.destination.trim();
//     }
//   }

//   // Validate description
//   if (body.description !== undefined) {
//     if (typeof body.description !== "string") {
//       errors.push("Description must be a string");
//     } else if (body.description.length > MAX_DESCRIPTION_LENGTH) {
//       errors.push(
//         `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters`
//       );
//     } else {
//       data.description = body.description.trim();
//     }
//   }

//   // Validate rating
//   if (body.rating !== undefined) {
//     const rating =
//       typeof body.rating === "number" ||
//       (typeof body.rating === "string" && body.rating.trim() !== "")
//         ? Number(body.rating)
//         : NaN;

//     if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
//       errors.push("Rating must be an integer between 1 and 5");
//     } else {
//       data.rating = rating;
//     }
//   }

//   // Validate dates
//   for (const field of ["startDate", "endDate"]) {
//     if (body[field] === undefined) {
//       continue;
//     }

//     if (body[field] === null || body[field] === "") {
//       data[field] = null;
//       continue;
//     }

//     const date = new Date(body[field]);

//     if (
//       typeof body[field] !== "string" ||
//       Number.isNaN(date.getTime())
//     ) {
//       errors.push(`${field} must be a valid date`);
//     } else {
//       data[field] = date;
//     }
//   }

//   // Check the effective date range, including unchanged dates on updates.
//   const startDate =
//     data.startDate !== undefined
//       ? data.startDate
//       : existingTrip?.startDate;

//   const endDate =
//     data.endDate !== undefined
//       ? data.endDate
//       : existingTrip?.endDate;

//   if (
//     startDate &&
//     endDate &&
//     new Date(startDate).getTime() > new Date(endDate).getTime()
//   ) {
//     errors.push("Start date must be on or before the end date");
//   }

//   return { errors, data };
// }

// function handleRouteError(res, error, context) {
//   console.error(`${context}:`, error);

//   if (
//     error.name === "ValidationError" ||
//     error.name === "CastError"
//   ) {
//     return res.status(400).json({
//       message: "Invalid trip data. Please check your input.",
//     });
//   }

//   return res.status(500).json({
//     message: "An unexpected server error occurred. Please try again.",
//   });
// }

// // CREATE TRIP
// // POST /api/trips
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { errors, data } = validateTripData(req.body);

//     // if (errors.length > 0) {
//     //   return res.status(400).json({
//     //     message: "Trip validation failed",
//     //     errors,
//     //   });
//     // }
//     if (errors.length > 0) {
//   return res.status(400).json({
//     message:
//       !req.body?.title?.trim() || !req.body?.destination?.trim()
//         ? "Title and destination are required"
//         : "Trip validation failed",
//     errors,
//   });
// }

//     const trip = new Trip({
//       ...data,
//       user: req.user.userId,
//     });

//     const savedTrip = await trip.save();

//     return res.status(201).json({
//       message: "Trip created successfully",
//       trip: savedTrip,
//     });
//   } catch (error) {
//     return handleRouteError(res, error, "Create Trip Error");
//   }
// });

// // GET ALL USER TRIPS
// // GET /api/trips
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const trips = await Trip.find({
//       user: req.user.userId,
//     }).sort({ createdAt: -1 });

//     return res.status(200).json({ trips });
//   } catch (error) {
//     return handleRouteError(res, error, "Get Trips Error");
//   }
// });

// // GET SINGLE TRIP
// // GET /api/trips/:id
// router.get("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!isValidId(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found",
//       });
//     }

//     return res.status(200).json({ trip });
//   } catch (error) {
//     return handleRouteError(res, error, "Get Single Trip Error");
//   }
// });

// // UPDATE TRIP
// // PUT /api/trips/:id
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!isValidId(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     // Find the trip and verify ownership.
//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found or you are not the owner",
//       });
//     }

//     const { errors, data } = validateTripData(req.body, true, trip);

//     if (errors.length > 0) {
//       return res.status(400).json({
//         message: "Trip validation failed",
//         errors,
//       });
//     }

//     // Only approved trip fields are updated.
//     Object.assign(trip, data);

//     const updatedTrip = await trip.save();

//     return res.status(200).json({
//       message: "Trip updated successfully",
//       trip: updatedTrip,
//     });
//   } catch (error) {
//     return handleRouteError(res, error, "Update Trip Error");
//   }
// });

// // DELETE TRIP
// // DELETE /api/trips/:id
// // router.delete("/:id", authMiddleware, async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     if (!isValidId(id)) {
// //       return res.status(400).json({
// //         message: "Invalid trip ID",
// //       });
// //     }

// //     const result = await Trip.deleteOne({
// //       _id: id,
// //       user: req.user.userId,
// //     });

// //     if (result.deletedCount === 0) {
// //       return res.status(404).json({
// //         message: "Trip not found or you are not the owner",
// //       });
// //     }

// //     return res.status(200).json({
// //       message: "Trip deleted successfully",
// //     });
// //   } catch (error) {
// //     return handleRouteError(res, error, "Delete Trip Error");
// //   }
// // });

// // router.delete("/:id", authMiddleware, async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     if (!isValidId(id)) {
// //       return res.status(400).json({
// //         message: "Invalid trip ID",
// //       });
// //     }

// //     const trip = await Trip.findOne({
// //       _id: id,
// //       user: req.user.userId,
// //     });

// //     if (!trip) {
// //       return res.status(404).json({
// //         message: "Trip not found or you are not the owner",
// //       });
// //     }

// //     await Trip.deleteOne({
// //       _id: id,
// //       user: req.user.userId,
// //     });

// //     return res.status(200).json({
// //       message: "Trip deleted successfully",
// //     });
// //   } catch (error) {
// //     return handleRouteError(res, error, "Delete Trip Error");
// //   }
// // });


// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!isValidId(id)) {
//       return res.status(400).json({
//         message: "Invalid trip ID",
//       });
//     }

//     const trip = await Trip.findOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found or you are not the owner",
//       });
//     }

//     // Collect image URLs before deleting the trip document.
//     const imageUrls = [
//       trip.coverImage,
//       ...(Array.isArray(trip.photos) ? trip.photos : []),
//     ].filter(Boolean);

//     await Trip.deleteOne({
//       _id: id,
//       user: req.user.userId,
//     });

//     // Clean up Cloudinary assets that no other trip references.
//     await cleanupUnusedCloudinaryImages(imageUrls, id);

//     return res.status(200).json({
//       message: "Trip deleted successfully",
//     });
//   } catch (error) {
//     return handleRouteError(res, error, "Delete Trip Error");
//   }
// });



// // Wrap Multer so upload errors are converted into JSON responses.
// function handleImageUpload(req, res, next) {
//   upload.single("image")(req, res, (error) => {
//     if (!error) {
//       return next();
//     }

//     if (typeof upload.handleError === "function") {
//       return upload.handleError(error, req, res, next);
//     }

//     console.error("Image Upload Error:", error);

//     if (error.code === "LIMIT_FILE_SIZE") {
//       return res.status(413).json({
//         message: "Image size must not exceed 5 MB.",
//       });
//     }

//     if (
//       error.code === "LIMIT_FILE_COUNT" ||
//       error.code === "LIMIT_UNEXPECTED_FILE"
//     ) {
//       return res.status(400).json({
//         message: "Only one image can be uploaded using the image field.",
//       });
//     }

//     if (error.code === "INVALID_IMAGE_TYPE") {
//       return res.status(400).json({
//         message: error.message,
//       });
//     }

//     return res.status(500).json({
//       message: "Image upload failed. Please try again.",
//     });
//   });
// }

// // UPLOAD TRIP PHOTO
// // POST /api/trips/:id/upload
// router.post(
//   "/:id/upload",
//   authMiddleware,
//   handleImageUpload,
//   async (req, res) => {
//     try {
//       const { id } = req.params;

//       if (!isValidId(id)) {
//         return res.status(400).json({
//           message: "Invalid trip ID",
//         });
//       }

//       // if (!req.file || !req.file.path) {
//       //   return res.status(400).json({
//       //     message: "No valid image uploaded",
//       //   });
//       // }
//       if (!req.file) {
//   return res.status(400).json({
//     message: "No image uploaded",
//   });
// }

// if (!req.file.path) {
//   return res.status(400).json({
//     message: "Uploaded image is invalid",
//   });
// }

//       // Verify ownership before associating the image with a trip.
//       const trip = await Trip.findOne({
//         _id: id,
//         user: req.user.userId,
//       });

//       if (!trip) {
//         return res.status(404).json({
//           message: "Trip not found or you are not the owner",
//         });
//       }

//       const imageUrl = req.file.path;

//       if (!trip.coverImage) {
//         trip.coverImage = imageUrl;
//       }

//       if (!Array.isArray(trip.photos)) {
//         trip.photos = [];
//       }

//       trip.photos.push(imageUrl);

//       const updatedTrip = await trip.save();

//       return res.status(200).json({
//         message: "Photo uploaded successfully",
//         trip: updatedTrip,
//       });
//     } catch (error) {
//       return handleRouteError(res, error, "Upload Photo Error");
//     }
//   }
// );

// module.exports = router;



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

    // Do not delete an image still used by another trip.
    const stillUsed = await Trip.exists({
      _id: { $ne: excludedTripId },
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
// UPLOAD TRIP PHOTO
// POST /api/trips/:id/upload
// ========================================

// router.post(
//   "/:id/upload",
//   authMiddleware,
//   handleImageUpload,
//   async (req, res) => {
//     try {
//       const { id } = req.params;

//       if (!isValidId(id)) {
//         return res.status(400).json({
//           message: "Invalid trip ID",
//         });
//       }

//       if (!req.file) {
//         return res.status(400).json({
//           message: "No image uploaded",
//         });
//       }

//       if (!req.file.path) {
//         return res.status(400).json({
//           message: "Uploaded image is invalid",
//         });
//       }

//       // Verify ownership before associating the image with a trip.
//       const trip = await Trip.findOne({
//         _id: id,
//         user: req.user.userId,
//       });

//       if (!trip) {
//         return res.status(404).json({
//           message: "Trip not found or you are not the owner",
//         });
//       }

//       const imageUrl = req.file.path;

//       if (!trip.coverImage) {
//         trip.coverImage = imageUrl;
//       }

//       if (!Array.isArray(trip.photos)) {
//         trip.photos = [];
//       }

//       trip.photos.push(imageUrl);

//       const updatedTrip = await trip.save();

//       return res.status(200).json({
//         message: "Photo uploaded successfully",
//         trip: updatedTrip,
//       });
//     } catch (error) {
//       return handleRouteError(res, error, "Upload Photo Error");
//     }
//   }
// );

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


module.exports = router;
