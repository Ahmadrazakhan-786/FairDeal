const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");


dotenv.config();
console.log("Google ID:", process.env.GOOGLE_CLIENT_ID);
require("./config/passport");

const connectDB = require("./config/db");
connectDB();

const app = express();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-url.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "fairdealgoogleauth",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// routes
const authRoutes = require("./routes/authRoutes");
const providerRoutes = require("./routes/providerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/bookings", bookingRoutes);

const reviewRoutes =
require("./routes/reviewRoutes");

app.use("/api/reviews", reviewRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});