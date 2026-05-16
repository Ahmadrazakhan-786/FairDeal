const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "fairdeal-documents",
    resource_type: "raw",
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

module.exports = multer({ storage });