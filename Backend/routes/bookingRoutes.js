const express = require("express");
const router = express.Router();

const {
  createBooking,
  checkCanRate
} = require("../controllers/bookingController");

router.post("/", createBooking);

router.get(
  "/can-rate/:providerId/:email",
  checkCanRate
);

module.exports = router;