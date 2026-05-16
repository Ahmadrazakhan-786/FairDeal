const express = require("express");

const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  createProvider,
  getProviders,
  getProviderById,
} = require("../controllers/providerController");

// protected route
router.post(
  "/",
  upload.single("document"),
  createProvider
);

// public routes
router.get("/", getProviders);

router.get("/:id", getProviderById);

module.exports = router;