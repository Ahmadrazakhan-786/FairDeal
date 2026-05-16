const Booking = require("../models/Booking");
const Review = require("../models/Review");
const Provider = require("../models/Provider");

exports.addReview = async (req, res) => {
  try {
    const {
  providerId,
  customerEmail,
  customerName,
  rating,
  comment,
} = req.body;

    const booking = await Booking.findOne({
      providerId,
      customerEmail,
      isRated: false,
    });

    if (!booking) {
      return res.status(400).json({
        message:
          "Only booked users can rate once",
      });
    }

   await Review.create({
  providerId,
  customerEmail,
  customerName: booking.customerName,
  rating,
  comment,
});

    booking.isRated = true;
    await booking.save();

    const reviews =
      await Review.find({ providerId });

    const avg =
      reviews.reduce(
        (a, b) => a + b.rating,
        0
      ) / reviews.length;

    await Provider.findByIdAndUpdate(
      providerId,
      {
        rating: avg.toFixed(1),
      }
    );

    res.json({
      message: "Review added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};