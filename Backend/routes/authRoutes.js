const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    res.json(req.user);
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(
  process.env.NODE_ENV === "production"
    ? `https://fair-deal-psi.vercel.app/google-success?token=${token}`
    : `http://localhost:5173/google-success?token=${token}`
);
  }
);

module.exports = router;