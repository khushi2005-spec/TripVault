// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "tripvault",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });

// module.exports = upload;

// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// const path = require("path");

const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");


// Configure Cloudinary using environment variables.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Allowed image MIME types.
const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

// Allowed file extensions.
const allowedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

// Configure Cloudinary storage.
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tripvault",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Validate uploaded images and apply upload limits.
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum 5 MB
    files: 1,                  // One image per request
  },
  fileFilter: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (
      !allowedMimeTypes.has(file.mimetype) ||
      !allowedExtensions.has(extension)
    ) {
      const error = new Error(
        "Invalid image type. Only JPG, JPEG, PNG, and WEBP images are allowed."
      );

      error.code = "INVALID_IMAGE_TYPE";
      return callback(error);
    }

    callback(null, true);
  },
});

// Handle errors raised by Multer before the route handler runs.
upload.handleError = (error, req, res, next) => {
  if (!error) {
    return next();
  }

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

  console.error("Image Upload Error:", error.message);

  return res.status(500).json({
    message: "Image upload failed. Please try again.",
  });
};

module.exports = upload;
