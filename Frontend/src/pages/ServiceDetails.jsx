import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ServiceDetail() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [ratingProvider, setRatingProvider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", email: "", phone: "", message: "", date: "" });

  const [sortBy, setSortBy] = useState("rating");
  const [filterRating, setFilterRating] = useState("all");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const serviceData = {
    electrician: { 
      icon: "⚡", 
      title: "Electricians",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50"
    },
    tutor: { 
      icon: "📚", 
      title: "Home Tutors",
      color: "from-blue-400 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-100"
    },
    plumber: { 
      icon: "🔧", 
      title: "Plumbers",
      color: "from-cyan-400 to-blue-500",
      bgColor: "from-cyan-50 to-blue-100"
    },
    tailor: { 
      icon: "✂️", 
      title: "Tailors",
      color: "from-pink-400 to-rose-500",
      bgColor: "from-pink-50 to-rose-100"
    },
    cook: { 
      icon: "👨‍🍳", 
      title: "Cooks",
      color: "from-red-400 to-orange-500",
      bgColor: "from-red-50 to-orange-100"
    },
    painter: { 
      icon: "🎨", 
      title: "Painters",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-100"
    },
    cleaner: { 
      icon: "🧹", 
      title: "Cleaners",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-100"
    },
    carpenter: { 
      icon: "🪵", 
      title: "Carpenters",
      color: "from-amber-600 to-yellow-600",
      bgColor: "from-amber-50 to-yellow-100"
    },
  };

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

  const service = serviceData[category];
  useEffect(() => {
  fetchProviders();
}, [category]);

const fetchProviders = async () => {
  try {
    const res = await axios.get(
      `https://fairdeal-backend-rbz9.onrender.com/api/providers?category=${category}`
    );

    const formatted = res.data.map((p) => ({
  id: p._id,
  name: p.name,
  rating: p.rating,
  reviews: 100,
  experience: `${p.experience} years`,
  price: `₹${p.price}/hr`,
  city: p.city,
  avatar: serviceAvatars[category],
  badge: "Verified",
  verified: true,
  responseTime: "5 mins",
  workingHours: p.workingHours,
  availability: "Available today",
  desc: p.about,
}));

setProviders(formatted);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  const allProviders = providers;

let filteredProviders = [...allProviders];

  if (filterRating !== "all") {
    filteredProviders = filteredProviders.filter(p => p.rating >= parseFloat(filterRating));
  }

  if (sortBy === "price") {
    filteredProviders.sort((a, b) => {
      const priceA = parseInt(a.price.match(/\d+/)[0]);
      const priceB = parseInt(b.price.match(/\d+/)[0]);
      return priceA - priceB;
    });
  } else if (sortBy === "experience") {
    filteredProviders.sort((a, b) => {
      const expA = parseInt(a.experience.match(/\d+/)[0]);
      const expB = parseInt(b.experience.match(/\d+/)[0]);
      return expB - expA;
    });
  } else {
    filteredProviders.sort((a, b) => b.rating - a.rating);
  }

 const handleConnect = async () => {
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
          providerId: selectedProvider.id,
          ...bookingData,
        }
      );

      setShowModal(false);

      setBookingData({
        name: "",
        email: "",
        phone: "",
        message: "",
        date: "",
      });

      setSelectedProvider(null);

      navigate("/booking-success");
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }
  }
};

const handleRatingSubmit = async (providerId) => {
  try {
    await axios.post(
      "https://fairdeal-backend-rbz9.onrender.com/api/reviews",
      {
        providerId: providerId,
        customerEmail: bookingData.email,
        rating: rating,
        comment: comment
      }
    );

    alert("Review submitted");

    setRating(0);
setComment("");
setRatingProvider(null);

    fetchProviders();

  } catch (error) {
    console.log(error);
    alert("Review failed");
  }
};

  if (!service) return <h1>Service not found</h1>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-20 pb-20">
      
      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br ${service.color} opacity-20 rounded-full blur-3xl`}></div>
        <div className={`absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-3xl`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* COMPACT HEADER - SMALLER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${service.color} p-8 md:p-10 text-white mb-12 shadow-xl`}
        >
          <div className="absolute inset-0 opacity-10 bg-black"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl flex-shrink-0"
              >
                {service.icon}
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-2">
                  Best {service.title} Near You
                </h1>
                <p className="text-sm md:text-base text-white/90">
                  Choose trusted professionals and connect instantly
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FILTERS & SORT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* RATING FILTER */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Min Rating</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.7">4.7+ Stars</option>
                <option value="4.9">4.9+ Stars</option>
              </select>
            </div>

            {/* SORT */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
              >
                <option value="rating">Highest Rating</option>
                <option value="price">Lowest Price</option>
                <option value="experience">Most Experience</option>
              </select>
            </div>

            {/* RESULTS COUNT */}
            <div className="flex items-end justify-end">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-black text-indigo-600">{filteredProviders.length}</div>
                <div className="text-xs font-bold text-indigo-600">Professionals</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROVIDERS GRID */}
        {filteredProviders.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-20"
          >
            {filteredProviders.map((provider) => (
              <motion.div
                key={provider.id}
  variants={itemVariants}
  onClick={() => navigate(`/profile/${provider.id}`)}
                whileHover={{ y: -8 }}
                className="group cursor-pointer relative overflow-hidden rounded-2xl md:rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 p-6 md:p-8"
              >
                {/* BADGE */}
                <div
  className={`absolute top-4 right-4 min-w-[90px] h-7 px-3 flex items-center justify-center rounded-full text-xs font-black bg-gradient-to-r ${service.color} text-white shadow-md`}
>
                  {provider.badge}
                </div>

                {/* AVATAR - FIXED SIZE & CENTERING */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl md:text-6xl bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl">
                    {provider.avatar}
                  </div>
                </div>

                {/* NAME & LOCATION */}
                <h3 className="text-2xl md:text-3xl font-black text-slate-950 text-center mb-2">
                  {provider.name}
                </h3>
                <p className="text-sm text-slate-500 text-center mb-4">📍 {provider.city}</p>

                {/* VERIFIED BADGE */}
                {provider.verified && (
                  <div className="flex justify-center mb-4">
                    <div className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      <span className="text-xs font-bold text-emerald-700">✓ Verified</span>
                    </div>
                  </div>
                )}

                {/* RATING BOX */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-black text-amber-500">★</span>
                      <span className="text-2xl font-black text-slate-950">{provider.rating}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-600">({provider.reviews})</span>
                  </div>
                </div>

                {/* STATS */}
                <div className="space-y-2.5 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💼</span>
                    <div>
                      <span className="text-xs text-slate-500">Experience</span>
                      <p className="font-bold text-slate-950 text-sm">{provider.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    <div>
                      <span className="text-xs text-slate-500">Price</span>
                      <p className="font-bold text-slate-950 text-sm">{provider.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <div>
                      <span className="text-xs text-slate-500">Response</span>
                      <p className="font-bold text-slate-950 text-sm">{provider.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🕐</span>
                    <div>
                      <span className="text-xs text-slate-500">Working Hours</span>
                      <p className="font-bold text-slate-950 text-sm">{provider.workingHours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <div>
                      <span className="text-xs text-slate-500">Availability</span>
                      <p className="font-bold text-slate-950 text-sm">{provider.availability}</p>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-xs md:text-sm text-slate-600 mb-6 font-medium italic line-clamp-2">
                  "{provider.desc}"
                </p>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProvider(provider);
                    setShowModal(true);
                  }}
                  className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black text-sm md:text-base hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>📱</span>
                  Connect Now
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-3xl font-black text-slate-950 mb-4">No Professionals Found</h2>
            <p className="text-slate-600 text-lg mb-8">Try adjusting your filters</p>
            <button
              onClick={() => {
                setFilterRating("all");
                setSortBy("rating");
              }}
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* MODAL */}
      {showModal && selectedProvider && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl"
          >
            {/* HEADER */}
            <div className="text-center mb-8">
              {/* AVATAR PROPER */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center text-5xl bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
                  {selectedProvider.avatar}
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-950 mb-2">
                {selectedProvider.name}
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-lg">⭐ {selectedProvider.rating}</span>
                <span className="text-sm text-slate-600">({selectedProvider.reviews} reviews)</span>
              </div>
              <p className="text-slate-600 text-sm mb-2">📍 {selectedProvider.city} • {selectedProvider.experience}</p>
              <p className="text-slate-600 text-sm">Fill in your details to send a service request</p>
            </div>

            {/* FORM */}
            <div className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Your Full Name"
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
              />
              
              <input
                type="email"
                placeholder="Your Email"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
              />

              <input
                type="tel"
                placeholder="Your Phone Number"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
              />

              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
              />

              <textarea
                placeholder="Additional message or requirements..."
                value={bookingData.message}
                onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors h-20 resize-none"
              />
            </div>

            {/* BUTTONS */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConnect}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black text-base hover:shadow-lg transition-all"
              >
                ✓ Send Request
              </motion.button>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>

            {/* TRUST INFO */}
            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500">
                ✓ Your information is secure and will only be shared with the selected professional
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default ServiceDetail;