
jest.mock("cloudinary", () => ({
  v2: {
    config: jest.fn(),
  },
}));

jest.mock("multer-storage-cloudinary", () => ({
  CloudinaryStorage: jest.fn().mockImplementation(() => ({})),
}));

jest.mock("multer", () => {
  const multer = jest.fn(() => ({
    single: jest.fn(),
  }));

  multer.memoryStorage = jest.fn();
  return multer;
});

const multer = require("multer");
require("../middleware/upload");

describe("TripVault upload middleware configuration", () => {
  test("limits uploaded images to 5 MB and one file", () => {
    expect(multer).toHaveBeenCalledWith(
      expect.objectContaining({
        limits: {
          fileSize: 5 * 1024 * 1024,
          files: 1,
        },
      })
    );
  });

  test("rejects unsupported image types", () => {
    const options = multer.mock.calls[0][0];
    const callback = jest.fn();

    options.fileFilter(
      {},
      {
        originalname: "document.pdf",
        mimetype: "application/pdf",
      },
      callback
    );

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        code: "INVALID_IMAGE_TYPE",
      })
    );
  });

  test("accepts a valid JPEG image", () => {
    const options = multer.mock.calls[0][0];
    const callback = jest.fn();

    options.fileFilter(
      {},
      {
        originalname: "holiday.jpg",
        mimetype: "image/jpeg",
      },
      callback
    );

    expect(callback).toHaveBeenCalledWith(null, true);
  });
});
