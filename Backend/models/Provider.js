const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: String,
    
    email: {
  type: String,
  required: true,
},

    serviceType: {
      type: String,
      required: true,
    },

    experience: Number,
    price: Number,

    rating: {
      type: Number,
      default: 0,
    },

    about: String,
    resume: String,

    // add these
    city: {
      type: String,
      required: true,
    },

    workingHours: {
      type: String,
      required: true,
    },

    languages: {
      type: [String],
      default: [],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Provider", providerSchema);