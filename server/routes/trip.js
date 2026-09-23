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


const express = require("express");
const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// CREATE TRIP
// POST /api/trips
// ===============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
    } = req.body;

    if (!title || !destination) {
      return res.status(400).json({
        message: "Title and destination are required",
      });
    }

    const trip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
      user: req.user.userId,
    });

    const savedTrip = await trip.save();

    res.status(201).json({
      message: "Trip created successfully",
      trip: savedTrip,
    });
  } catch (error) {
    console.error("Create Trip Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===============================
// GET ALL USER TRIPS
// GET /api/trips
// ===============================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      trips,
    });
  } catch (error) {
    console.error("Get Trips Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===============================
// GET SINGLE TRIP
// GET /api/trips/:id
// ===============================
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
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

    res.status(200).json({
      trip,
    });
  } catch (error) {
    console.error("Get Single Trip Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ===============================
// UPDATE TRIP
// PUT /api/trips/:id
// ===============================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Updating trip:", id);
    console.log("User:", req.user);
    console.log("Body:", req.body);

    // Check ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    const {
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
    } = req.body;

    // Find trip AND verify ownership
    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    // Update fields
    if (title !== undefined) {
      trip.title = title;
    }

    if (destination !== undefined) {
      trip.destination = destination;
    }

    if (startDate !== undefined) {
      trip.startDate = startDate;
    }

    if (endDate !== undefined) {
      trip.endDate = endDate;
    }

    if (description !== undefined) {
      trip.description = description;
    }

    if (rating !== undefined) {
      trip.rating = Number(rating);
    }

    // Save updated trip
    const updatedTrip = await trip.save();

    console.log("Updated trip successfully:", updatedTrip);

    res.status(200).json({
      message: "Trip updated successfully",
      trip: updatedTrip,
    });

  } catch (error) {
    console.error("Update Trip Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ===============================
// DELETE TRIP
// DELETE /api/trips/:id
// ===============================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid trip ID",
      });
    }

    // Find trip and verify ownership
    const trip = await Trip.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found or you are not the owner",
      });
    }

    // Delete only user's trip
    await Trip.deleteOne({
      _id: id,
      user: req.user.userId,
    });

    res.status(200).json({
      message: "Trip deleted successfully",
    });

  } catch (error) {
    console.error("Delete Trip Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;