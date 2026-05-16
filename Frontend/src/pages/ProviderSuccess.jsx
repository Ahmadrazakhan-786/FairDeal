import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProviderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-xl w-full"
      >
        <div className="text-7xl mb-6">🎉</div>

        <h1 className="text-4xl font-black text-slate-950 mb-4">
          Registration Successful
        </h1>

        <p className="text-slate-600 text-lg mb-8">
          Your provider profile has been created successfully.
          <br />
          Our team will verify your details soon.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/services")}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
          >
            Browse Services
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-4 border-2 border-slate-300 rounded-xl font-bold hover:bg-slate-50"
          >
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ProviderSuccess;