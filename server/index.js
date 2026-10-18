// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const authRoutes = require("./routes/auth");
// const tripRoutes = require("./routes/trip");

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/trips", tripRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "TripVault backend is running",
//   });
// });

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected successfully");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("MongoDB connection failed:", error);
//   });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const authRoutes = require("./routes/auth");
// const tripRoutes = require("./routes/trip");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/trips", tripRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "TripVault backend is running",
//   });
// });

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected successfully");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("MongoDB connection failed:", error);
//   });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const authRoutes = require("./routes/auth");
// const tripRoutes = require("./routes/trip");
// const userRoutes = require("./routes/user");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/trips", tripRoutes);
// app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "TripVault backend is running",
//   });
// });

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected successfully");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("MongoDB connection failed:", error);
//   });


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const authRoutes = require("./routes/auth");
// const tripRoutes = require("./routes/trip");
// const userRoutes = require("./routes/user");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/trips", tripRoutes);
// app.use("/api/users", userRoutes);

// // Backend health check
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "TripVault backend is running",
//   });
// });

// // Health check for deployment platforms
// app.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "TripVault server is healthy",
//   });
// });

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//   console.error("MONGO_URI is missing from environment variables.");
//   process.exit(1);
// }

// async function startServer() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("MongoDB connected successfully");

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`TripVault server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start TripVault backend:", error.message);
//     process.exit(1);
//   }
// }

// startServer();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trip");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
// app.use(cors());
// app.use(express.json());

 // Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://trip-vault-seven.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as Thunder Client.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());


// API routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/users", userRoutes);

// Backend health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TripVault backend is running",
  });
});

// Health check for deployment platforms
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TripVault server is healthy",
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is missing from environment variables.");
  }

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected successfully");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TripVault server running on port ${PORT}`);
  });
}

// Start the server only when this file is run directly.
if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start TripVault backend:", error.message);
    process.exitCode = 1;
  });
}

// Export the app for automated tests.
module.exports = app;
