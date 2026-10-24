const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const csrfMiddleware = require("./middleware/csrfMiddleware");

dotenv.config();

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trip");
const userRoutes = require("./routes/user");

const app = express();

// Configure the trusted proxy for Render.
// Use this for a deployment with one trusted proxy hop.
app.set("trust proxy", 1);

// Security headers
app.use(helmet());

// Hide the Express technology header
app.disable("x-powered-by");

// Allow only approved frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://trip-vault-seven.vercel.app",
  "https://tripvault-backend-xd5x.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header,
      // such as server-to-server tools.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(cookieParser());

// Limit JSON request bodies to 100 KB
app.use(express.json({ limit: "100kb" }));

app.use(csrfMiddleware);

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

// Deployment health check
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

// Start the server only when this file is run directly
if (require.main === module) {
  startServer().catch((error) => {
    console.error(
      "Failed to start TripVault backend:",
      error.message
    );
    process.exitCode = 1;
  });
}

// Export the app for automated tests
module.exports = app;
