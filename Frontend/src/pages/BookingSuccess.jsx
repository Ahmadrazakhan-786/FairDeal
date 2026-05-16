import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full"
      >
        <div className="text-7xl mb-6">✅</div>

        <h1 className="text-4xl font-black text-slate-950 mb-4">
          Request Sent Successfully
        </h1>

        <p className="text-slate-600 mb-8">
          Provider will contact you shortly on your email/phone.
        </p>

        <button
          onClick={() => navigate("/services")}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700"
        >
          Back to Services
        </button>
      </motion.div>
    </div>
  );
}

export default BookingSuccess;