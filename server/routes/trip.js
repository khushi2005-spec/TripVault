const express = require("express");
const Trip = require("../models/trip");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new trip
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      destination,
      startDate,
      endDate,
      description,
      coverImage,
    } = req.body;

    if (!title || !destination || !startDate || !endDate) {
      return res.status(400).json({
        message: "Title, destination, start date and end date are required",
      });
    }

    const trip = await Trip.create({
      user: req.user.userId,
      title,
      destination,
      startDate,
      endDate,
      description,
      coverImage,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    console.error("Create trip error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get all trips of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({
      trips,
    });
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
  } catch (error) {
    console.error("Get trips error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete a trip
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    console.error("Delete trip error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;