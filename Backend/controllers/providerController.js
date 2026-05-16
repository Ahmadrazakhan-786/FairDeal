const Provider = require("../models/Provider");
const Review = require("../models/Review");
const cloudinary = require("../config/cloudinary");

// CREATE PROVIDER PROFILE
exports.createProvider = async (req, res) => {
  try {
    const existingProvider = await Provider.findOne({
      name: req.body.name,
      serviceType: req.body.serviceType,
    });

    if (existingProvider) {
      return res.status(400).json({
        message: "Provider already exists",
      });
    }

    let resumeUrl = "";

    if (req.file) {
      console.log(req.file);
      resumeUrl = req.file.path;
    }

    const provider = await Provider.create({
      ...req.body,
      resume: resumeUrl,
    });

    res.status(201).json(provider);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL PROVIDERS
exports.getProviders = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.serviceType = category;
    }

    const providers = await Provider.find(filter);

    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROVIDER
exports.getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    const reviews = await Review.find({
      providerId: req.params.id,
    });

    res.json({
      ...provider.toObject(),
      reviews,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};