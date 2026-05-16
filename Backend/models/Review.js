const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

    customerName: {
  type: String,
  required: true,
},

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);