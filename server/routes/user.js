// const express = require("express");
// const User = require("../models/User");
// const Trip = require("../models/Trip");

// const router = express.Router();

// // Public Profile
// // GET /api/users/:username/profile
// router.get("/:username/profile", async (req, res) => {
//   try {
//     const { username } = req.params;

//     // Find user by username
//     const user = await User.findOne({
//       username: username.toLowerCase(),
//     }).select("name username bio");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // Find user's trips
//     const trips = await Trip.find({
//       user: user._id,
//     })
//       .select(
//         "title destination startDate endDate rating coverImage"
//       )
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       profile: {
//         name: user.name,
//         username: user.username,
//         bio: user.bio,
//         trips,
//       },
//     });
//   } catch (error) {
//     console.error("Public Profile Error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const User = require("../models/User");
const Trip = require("../models/Trip");
// const authMiddleware = require("../middleware/auth");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// PUBLIC PROFILE
// GET /api/users/:username/profile
// =====================================================

router.get("/:username/profile", async (req, res) => {
  try {
    const { username } = req.params;

    // Find user using username
    // Only return safe public fields
    const user = await User.findOne({
      username: username.toLowerCase(),
    }).select("name username bio");

    // User not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get trips belonging to this user
    // Only return fields required for public profile
    const trips = await Trip.find({
      user: user._id,
    })
      .select(
        "title destination startDate endDate rating coverImage"
      )
      .sort({
        createdAt: -1,
      });

    // Send public profile
    res.status(200).json({
      profile: {
        name: user.name,
        username: user.username,
        bio: user.bio,
        trips: trips,
      },
    });

  } catch (error) {
    console.error("Public Profile Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// UPDATE PROFILE
// PUT /api/users/profile
// =====================================================

router.put(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const { username, bio } = req.body;

      // Check username
      if (!username || !username.trim()) {
        return res.status(400).json({
          message: "Username is required",
        });
      }

      // Clean username
      const cleanUsername = username
        .trim()
        .toLowerCase();

      // Check if another user already has this username
      const existingUser = await User.findOne({
        username: cleanUsername,
        _id: {
          $ne: req.user.userId,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Username is already taken",
        });
      }

      // Find logged-in user
      const user = await User.findById(
        req.user.userId
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Update username
      user.username = cleanUsername;

      // Update bio
      user.bio = bio
        ? bio.trim()
        : "";

      // Save changes
      await user.save();

      // Return only safe information
      res.status(200).json({
        message: "Profile updated successfully",

        user: {
          name: user.name,
          username: user.username,
          bio: user.bio,
        },
      });

    } catch (error) {
      console.error(
        "Update Profile Error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


module.exports = router;