const Provider = require("../models/Provider");
const transporter = require("../config/email");
const Booking = require("../models/Booking");

exports.checkCanRate = async (req, res) => {
  try {
    const { providerId, email } = req.params;

    const booking = await Booking.findOne({
      providerId,
      customerEmail: email,
      isRated: false,
    });

    res.json({
      canRate: !!booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// exports.createBooking = async (req, res) => {
//   try {
//     const {
//       providerId,
//       name,
//       email,
//       phone,
//       message,
//       date,
//     } = req.body;

//     const provider = await Provider.findById(providerId);

//     if (!provider) {
//       return res.status(404).json({
//         message: "Provider not found",
//       });
//     }

//     await Booking.create({
//   providerId,
//   customerName: name,
//   customerEmail: email,
//   phone,
//   message,
//   date,
// });

//     // mail to provider
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: provider.email,
//       subject: "New Booking Received",
//       html: `
//         <h2>New Booking</h2>
//         <p>Name: ${name}</p>
//         <p>Email: ${email}</p>
//         <p>Phone: ${phone}</p>
//         <p>Date: ${date}</p>
//         <p>Message: ${message}</p>
//       `,
//     });

//     // mail to customer
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Booking Confirmed",
//       html: `
//         <h2>Booking Confirmed</h2>
//         <p>Your booking with ${provider.name} is confirmed.</p>
//         <p>Date: ${date}</p>
//       `,
//     });

//     res.json({
//       message: "Booking successful",
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

exports.createBooking = async (req, res) => {
  try {
    const {
      providerId,
      name,
      email,
      phone,
      message,
      date,
    } = req.body;

    const provider = await Provider.findById(providerId);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    await Booking.create({
      providerId,
      customerName: name,
      customerEmail: email,
      phone,
      message,
      date,
    });

    // instant response to frontend
    res.json({
      message: "Booking successful",
    });

    // send emails in background (no waiting)
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: provider.email,
      subject: "New Booking Received",
      html: `
        <h2>New Booking</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Date: ${date}</p>
        <p>Message: ${message}</p>
      `,
    }).catch(console.log);

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Confirmed",
      html: `
        <h2>Booking Confirmed</h2>
        <p>Your booking with ${provider.name} is confirmed.</p>
        <p>Date: ${date}</p>
      `,
    }).catch(console.log);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

