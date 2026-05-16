import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", email: "", phone: "", message: "", date: "" });
  const [provider, setProvider] = useState(null);
 const [loading, setLoading] = useState(true);
 const [canRate, setCanRate] = useState(false);
const [rating, setRating] = useState("");
const [comment, setComment] = useState("");
const [userEmail, setUserEmail] = useState("");
const [reviews, setReviews] = useState([]);

  useEffect(() => {
  fetchProvider();
}, [id]);

useEffect(() => {
  const email = localStorage.getItem("userEmail");

  if (email) {
    checkCanRate(email);
  }
}, [id]);

const serviceAvatars = {
  electrician: "👨‍🔧",
  tutor: "👨‍🏫",
  plumber: "🔧",
  tailor: "🪡",
  cook: "👨‍🍳",
  painter: "👨‍🎨",
  cleaner: "🧹",
  carpenter: "🪚",
};

const fetchProvider = async () => {
  try {
    const res = await axios.get(
      `https://fairdeal-backend-rbz9.onrender.com/api/providers/${id}`
    );

    const p = res.data;

   setProvider({
  id: p._id,
  name: p.name,
  rating: p.rating,
  reviews: 100,
  experience: `${p.experience} years`,
  price: `₹${p.price}/hr`,
  city: p.city,
  avatar: serviceAvatars[p.serviceType?.toLowerCase()] || "👨‍🔧",
  badge: "Top Rated",
  verified: true,
  responseTime: "5 mins",
  completedJobs: 200,
  desc: p.about,
  workingHours: p.workingHours,
  availability: "Available today",
  languages: p.languages,
  service: p.serviceType,
  certifications: ["Verified Professional"],
  resume: p.resume,
});

setReviews(p.reviews || []);

} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}
};


const checkCanRate = async (email) => {
  try {
    const res = await axios.get(
      `https://fairdeal-backend-rbz9.onrender.com/api/bookings/can-rate/${id}/${email}`
    );

    setCanRate(res.data.canRate);
  } catch (error) {
    console.log(error);
  }
};

  

  const handleBooking = async () => {
  if (
    bookingData.name &&
    bookingData.email &&
    bookingData.phone &&
    bookingData.date
  ) {
    try {
      await axios.post(
        "https://fairdeal-backend-rbz9.onrender.com/api/bookings",
        {
          providerId: provider.id,
          ...bookingData,
        }
      );

      setUserEmail(bookingData.email);
localStorage.setItem("userEmail", bookingData.email);
localStorage.setItem("userName", bookingData.name);
      setShowBookingModal(false);

      setBookingData({
        name: "",
        email: "",
        phone: "",
        message: "",
        date: "",
      });
      checkCanRate(bookingData.email);
      navigate("/booking-success");
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }
  }
};

const handleReviewSubmit = async () => {
  try {
    console.log(localStorage.getItem("userEmail"));
console.log(provider.id);
console.log(localStorage.getItem("userName"));
    await axios.post(
      "https://fairdeal-backend-rbz9.onrender.com/api/reviews",
      {
        providerId: provider.id,
        customerEmail: localStorage.getItem("userEmail"),
        customerName: localStorage.getItem("userName"),
        rating: Number(rating),
        comment,
      }
    );

    alert("Review submitted");
    setCanRate(false);
    localStorage.removeItem("userEmail");
localStorage.removeItem("userName");
    setRating("");
    setComment("");
    fetchProvider();

  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

if (loading) return <h1>Loading...</h1>;
  if (!provider) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-black text-slate-950 mb-2">Provider Not Found</h1>
          <p className="text-slate-600 mb-6">The profile you're looking for doesn't exist</p>
          <button
            onClick={() => navigate("/services")}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
          >
            Browse Services
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-24 pb-20">
      
      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-br from-emerald-100 to-teal-100 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* MAIN PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl md:rounded-4xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          
          {/* TOP HEADER CARD - BEAUTIFUL DESIGN */}
          <div className="px-6 md:px-12 pt-12 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
            >
              {/* DECORATIVE CORNERS */}
              <div className="absolute top-0 right-0 text-6xl opacity-10">⭐</div>
              <div className="absolute bottom-0 left-0 text-5xl opacity-10">✨</div>

              {/* AVATAR - PERFECT SIZE */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 flex items-center justify-center text-7xl shadow-xl border-3 border-white"
                >
                  {provider.avatar}
                </motion.div>
              </div>

              {/* NAME */}
              <h1 className="text-4xl md:text-5xl font-black text-slate-950 mb-3">
                {provider.name}
              </h1>

              {/* SUBTITLE */}
              <p className="text-lg text-slate-600 mb-4">
                📍 {provider.city} • {provider.service}
              </p>

              {/* RATING */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-4xl font-black text-amber-500">★</span>
                <span className="text-3xl font-black text-slate-950">{provider.rating}</span>
                <span className="text-slate-600 font-bold">({provider.reviews} reviews)</span>
              </div>

              {/* BADGES */}
              <div className="flex flex-wrap justify-center gap-3">
                {provider.verified && (
                  <span className="bg-emerald-100 border border-emerald-300 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm">
                    ✓ Verified
                  </span>
                )}
                <span className="bg-amber-100 border border-amber-300 text-amber-700 px-4 py-2 rounded-full font-bold text-sm">
                  {provider.badge}
                </span>
              </div>
            </motion.div>
          </div>

          {/* CONTENT SECTION */}
          <div className="relative px-6 md:px-12 py-12">
            
            {/* GRID STATS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {[
                { icon: "💼", label: "Experience", value: provider.experience },
                { icon: "💰", label: "Hourly Rate", value: provider.price },
                { icon: "⚡", label: "Response Time", value: provider.responseTime },
                { icon: "✓", label: "Jobs Completed", value: provider.completedJobs },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-4 text-center hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-xs text-slate-600 font-bold mb-1">{stat.label}</p>
                  <p className="text-lg font-black text-slate-950">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* DIVIDER */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-12"></div>

            {/* ABOUT & LANGUAGES SECTION */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* ABOUT */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-black text-slate-950 mb-4 flex items-center gap-2">
                  <span>📝</span> About Me
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                  {provider.desc}
                </p>

                {/* WORKING HOURS & AVAILABILITY */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <p className="text-xs text-slate-600 font-bold">Working Hours</p>
                      <p className="font-black text-slate-950">{provider.workingHours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-xs text-slate-600 font-bold">Availability</p>
                      <p className="font-black text-slate-950">{provider.availability}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LANGUAGES & CERTIFICATIONS */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-black text-slate-950 mb-4 flex items-center gap-2">
                  <span>🌐</span> Languages
                </h2>
                <div className="flex flex-wrap gap-3 mb-8">
                  {(provider.languages || ["Hindi", "English"]).map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-300 text-indigo-700 rounded-full font-bold text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-black text-slate-950 mb-4 flex items-center gap-2">
                  <span>🏆</span> Certifications
                </h2>
            {provider.resume && (
  <a
    href={provider.resume}
    target="_blank"
    rel="noreferrer"
    className="inline-block mb-6 px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
  >
    📄 View Resume
  </a>
)}
                <div className="space-y-2">
                  {(provider.certifications || ["Certified Professional"]).map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700">
                      <span className="text-emerald-600 font-black">✓</span>
                      <span className="font-bold">{cert}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* REVIEWS SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-black text-slate-950 mb-6 flex items-center gap-2">
                <span>⭐</span> Customer Reviews
              </h2>

              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-black text-slate-950">{review.customerName}</h4>
                        <p className="text-xs text-slate-600">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.round(review.rating) ? "text-amber-400" : "text-slate-300"}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {canRate && (
  <div className="mb-10 bg-indigo-50 p-6 rounded-2xl">
    <h2 className="text-2xl font-black mb-4">
      Give Your Review
    </h2>

    <input
      type="number"
      min="1"
      max="5"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      placeholder="Rating 1-5"
      className="w-full border p-3 rounded mb-4"
    />

    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write review"
      className="w-full border p-3 rounded mb-4"
    />

    <button
      onClick={handleReviewSubmit}
      className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
    >
      Submit Review
    </button>
  </div>
)}

            {/* CTA BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowBookingModal(true)}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-black text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>📱</span> Book Now
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* TRUST SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="text-center bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-slate-950 mb-2">Secure Payments</h3>
            <p className="text-sm text-slate-600">Your payment is safe and protected</p>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-bold text-slate-950 mb-2">Quality Guaranteed</h3>
            <p className="text-sm text-slate-600">Money-back guarantee if not satisfied</p>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all">
            <div className="text-4xl mb-3">📞</div>
            <h3 className="font-bold text-slate-950 mb-2">24/7 Support</h3>
            <p className="text-sm text-slate-600">We're here to help anytime</p>
          </div>
        </motion.div>
      </div>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowBookingModal(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl max-h-screen overflow-y-auto"
          >
            <div className="text-center mb-8">
              {/* AVATAR - PERFECT SIZE AND CENTERED */}
              <div className="flex justify-center mb-6">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 flex items-center justify-center text-6xl shadow-lg border-3 border-indigo-100">
                  {provider.avatar}
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-950 mb-2">
                Book {provider.name}
              </h2>
              <p className="text-slate-600">
                ⭐ {provider.rating} • {provider.price}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Your Full Name"
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
              />
              <input
                type="tel"
                placeholder="Your Phone Number"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
              />
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
              />
              <textarea
                placeholder="Describe your service needs..."
                value={bookingData.message}
                onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors h-24 resize-none text-slate-950"
              />
            </div>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-black hover:shadow-lg transition-all"
              >
                ✓ Confirm Booking
              </motion.button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="w-full py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              ✓ Your payment is protected. The provider will confirm within 2 minutes.
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default Profile;