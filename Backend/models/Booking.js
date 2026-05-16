const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    customerName: String,

    customerEmail: {
      type: String,
      required: true,
    },

    phone: String,
    message: String,
    date: String,

    status: {
      type: String,
      default: "completed",
    },

    isRated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);