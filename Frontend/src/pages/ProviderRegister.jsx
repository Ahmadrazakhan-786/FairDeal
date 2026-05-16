import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProviderRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    service: "",
    experience: "",
    price: "",
    description: "",
    aadhaar: "",
    document: null,
    workingHours: "",
    languages: [],
    agree: false,
  });

  const services = [
    { id: "electrician", icon: "⚡", name: "Electrician" },
    { id: "tutor", icon: "📚", name: "Home Tutor" },
    { id: "plumber", icon: "🔧", name: "Plumber" },
    { id: "tailor", icon: "✂️", name: "Tailor" },
    { id: "cook", icon: "👨‍🍳", name: "Cook" },
    { id: "painter", icon: "🎨", name: "Painter" },
    { id: "cleaner", icon: "🧹", name: "Cleaner" },
    { id: "carpenter", icon: "🪵", name: "Carpenter" },
  ];

  const languages = ["Hindi", "English", "Punjabi", "Marathi", "Tamil", "Telugu"];

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleLanguage = (lang) => {
    setFormData({
      ...formData,
      languages: formData.languages.includes(lang)
        ? formData.languages.filter(l => l !== lang)
        : [...formData.languages, lang]
    });
  };

  const nextStep = () => {
  if (step === 1) {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.city
    ) {
      alert("Please fill all basic information");
      return;
    }
  }

  if (step === 2) {
    if (
      !formData.service ||
      !formData.experience ||
      !formData.price ||
      !formData.workingHours ||
      !formData.description
    ) {
      alert("Please fill all professional details");
      return;
    }
  }

  if (step < 4) {
    setStep(step + 1);
  }
};

const prevStep = () => {
  if (step > 1) {
    setStep(step - 1);
  }
};

 const handleSubmit = async () => {
  try {
    console.log("Selected file:", formData.document);
    const form = new FormData();

    form.append("name", formData.name);
    form.append("email", formData.email);

    form.append(
      "serviceType",
      formData.service === "Home Tutor"
        ? "tutor"
        : formData.service.toLowerCase()
    );

    form.append(
      "experience",
      parseInt(formData.experience)
    );

    form.append(
      "price",
      parseInt(formData.price)
    );

    form.append(
      "about",
      formData.description
    );

    form.append("city", formData.city);

form.append("workingHours", formData.workingHours);

formData.languages.forEach((lang) => {
  form.append("languages", lang);
});

    form.append(
      "document",
      formData.document
    );

    await axios.post(
      "http://localhost:5000/api/providers",
      form,
      
    );

    navigate("/provider-success");
  } catch (error) {
    console.log(error);
    alert("Registration failed");
  }
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-24 pb-20">
      
      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 mb-6"
          >
            <span className="flex items-center justify-center w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse"></span>
            <span className="text-sm font-black text-indigo-700 tracking-wider">💼 START EARNING TODAY</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black text-slate-950 mb-4">
            Join FairDeal as Provider
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Create your professional profile in just 4 steps and start connecting with customers. 
            <strong> Earn ₹50,000+ per month!</strong>
          </p>
        </motion.div>

        {/* PROGRESS BAR - ENHANCED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                ></motion.div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <span className="text-2xl font-black text-indigo-600">{step}</span>
              <span className="text-slate-600 text-sm">/4</span>
            </div>
          </div>

          {/* STEP INDICATORS */}
          <div className="flex justify-between">
            {["Basic Info", "Professional", "Verification", "Review"].map((label, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <motion.div
                  animate={{
                    backgroundColor: step > idx ? "#4f46e5" : step === idx + 1 ? "#e0e7ff" : "#f1f5f9",
                    borderColor: step > idx ? "#4f46e5" : step === idx + 1 ? "#4f46e5" : "#cbd5e1"
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold mb-2"
                >
                  <span style={{ color: step > idx ? "white" : step === idx + 1 ? "#4f46e5" : "#64748b" }}>
                    {step > idx ? "✓" : idx + 1}
                  </span>
                </motion.div>
                <span className={`text-xs font-bold text-center ${step === idx + 1 ? "text-indigo-600" : "text-slate-600"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FORM CONTAINER */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200"
        >

          {/* STEP 1 - BASIC INFO */}
          {step === 1 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <h2 className="text-4xl font-black text-slate-950 mb-2">Basic Information</h2>
              <p className="text-slate-600 mb-8">Let's start with your personal details</p>

              <div className="space-y-5">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
                  />
                </motion.div>
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  disabled
                  className="w-full py-3 border-2 border-slate-200 text-slate-400 rounded-xl font-bold cursor-not-allowed"
                >
                  ← Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Continue <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 - PROFESSIONAL INFO */}
          {step === 2 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <h2 className="text-4xl font-black text-slate-950 mb-2">Professional Information</h2>
              <p className="text-slate-600 mb-8">Tell us about your expertise and services</p>

              <div className="space-y-6">
                {/* SERVICE SELECTION */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-4">Select Your Service</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {services.map((svc) => (
                      <motion.button
                        key={svc.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => updateField("service", svc.name)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.service === svc.name
                            ? "bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-600 text-white"
                            : "bg-white border-slate-200 text-slate-950 hover:border-slate-300"
                        }`}
                      >
                        <div className="text-3xl mb-2">{svc.icon}</div>
                        <p className="text-xs font-bold">{svc.name}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* EXPERIENCE */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Years of Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => updateField("experience", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
                  >
                    <option value="">Select experience</option>
                    <option value="1">0-1 years</option>
                    <option value="3">1-3 years</option>
                    <option value="5">3-5 years</option>
                    <option value="10">5-10 years</option>
                    <option value="15">10+ years</option>
                  </select>
                </motion.div>

                {/* PRICING */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
                  />
                </motion.div>

                {/* WORKING HOURS */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Working Hours</label>
                  <input
                    type="text"
                    placeholder="e.g., 6 AM - 10 PM"
                    value={formData.workingHours}
                    onChange={(e) => updateField("workingHours", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors text-slate-950"
                  />
                </motion.div>

                {/* LANGUAGES */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Languages You Speak</label>
                  <div className="flex flex-wrap gap-3">
                    {languages.map((lang) => (
                      <motion.button
                        key={lang}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => toggleLanguage(lang)}
                        className={`px-4 py-2 rounded-full border-2 font-bold text-sm transition-all ${
                          formData.languages.includes(lang)
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600 text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {lang}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* DESCRIPTION */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">About Yourself</label>
                  <textarea
                    placeholder="Tell customers about your expertise, specialties, and what makes you unique..."
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors h-32 resize-none text-slate-950"
                  />
                </motion.div>
              </div>

              <div className="flex gap-4 mt-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="w-full py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Continue <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 - VERIFICATION */}
          {step === 3 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <h2 className="text-4xl font-black text-slate-950 mb-2">Verification & Documents</h2>
              <p className="text-slate-600 mb-8">Help us verify your identity and credentials</p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-900">
                  <strong>ℹ️ Why we need this:</strong> Your information helps us ensure quality and safety for our customers
                </p>
              </div>

              <div className="space-y-6">
                <motion.div variants={itemVariants}>
  <label className="block text-sm font-bold text-slate-700 mb-3">
    Upload ID Proof
  </label>

  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-600 transition-colors">
    <input
      type="file"
      id="doc-upload"
      required
      className="hidden"
      onChange={(e) =>
        updateField("document", e.target.files[0])
      }
    />

    <label htmlFor="doc-upload" className="cursor-pointer">
      <div className="text-4xl mb-2">
        {formData.document ? "✅" : "📄"}
      </div>

      {formData.document ? (
        <>
          <p className="text-green-600 font-bold">
            File Uploaded Successfully
          </p>
          <p className="text-sm text-slate-600 mt-1">
            {formData.document.name}
          </p>
        </>
      ) : (
        <>
          <p className="text-slate-700 font-bold mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate-500">
            Aadhar, Passport, or Driving License
          </p>
        </>
      )}
    </label>
  </div>
</motion.div>

                {/* AADHAAR NUMBER */}
                <motion.div variants={itemVariants}>
  <label className="block text-sm font-bold text-slate-700 mb-2">
    Emergency Phone Number
  </label>

  <input
    type="tel"
    placeholder="+91 9876543210"
    value={formData.phone}
    onChange={(e) => updateField("phone", e.target.value)}
    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none"
  />

  <p className="text-xs text-slate-500 mt-1">
    Used only for verification purposes
  </p>
</motion.div>

                {/* TERMS & CONDITIONS */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agree}
                      onChange={(e) => updateField("agree", e.target.checked)}
                      className="w-5 h-5 border-2 border-slate-300 rounded mt-1"
                    />
                    <span className="text-sm text-slate-700">
                      I agree to FairDeal's <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>. 
                      I also confirm that all information provided is accurate and complete.
                    </span>
                  </label>
                </motion.div>

                {/* BENEFITS BOX */}
                <motion.div variants={itemVariants} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                  <p className="text-sm font-bold text-slate-950 mb-3">✨ Benefits After Registration:</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>✓ Access to 10,000+ customers monthly</li>
                    <li>✓ Instant booking notifications</li>
                    <li>✓ Flexible pricing & scheduling</li>
                    <li>✓ Secure payments & insurance coverage</li>
                  </ul>
                </motion.div>
              </div>

              <div className="flex gap-4 mt-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="w-full py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  disabled={!formData.agree || !formData.document}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.agree
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-lg"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Review Profile <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 - REVIEW */}
          {step === 4 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <h2 className="text-4xl font-black text-slate-950 mb-8">Review Your Profile</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {/* PERSONAL INFO */}
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <span>👤</span> Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-600">Name:</span> <strong className="text-slate-950">{formData.name || "—"}</strong></p>
                    <p><span className="text-slate-600">Email:</span> <strong className="text-slate-950">{formData.email || "—"}</strong></p>
                    <p><span className="text-slate-600">Phone:</span> <strong className="text-slate-950">{formData.phone || "—"}</strong></p>
                    <p><span className="text-slate-600">City:</span> <strong className="text-slate-950">{formData.city || "—"}</strong></p>
                  </div>
                </motion.div>

                {/* PROFESSIONAL INFO */}
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <span>💼</span> Professional Profile
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-600">Service:</span> <strong className="text-slate-950">{formData.service || "—"}</strong></p>
                    <p><span className="text-slate-600">Experience:</span> <strong className="text-slate-950">{formData.experience || "—"}</strong></p>
                    <p><span className="text-slate-600">Hourly Rate:</span> <strong className="text-slate-950">₹{formData.price || "—"}</strong></p>
                    <p><span className="text-slate-600">Working Hours:</span> <strong className="text-slate-950">{formData.workingHours || "—"}</strong></p>
                  </div>
                </motion.div>

                {/* LANGUAGES */}
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <span>🌐</span> Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.languages.length > 0 ? (
                      formData.languages.map((lang) => (
                        <span key={lang} className="bg-white border border-green-300 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          {lang}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-600 text-sm">No languages selected</span>
                    )}
                  </div>
                </motion.div>

                {/* ABOUT */}
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <h3 className="font-bold text-slate-950 mb-4 flex items-center gap-2">
                    <span>✍️</span> About You
                  </h3>
                  <p className="text-sm text-slate-700 italic">
                    "{formData.description || "No description provided"}"
                  </p>
                </motion.div>
              </div>

              {/* SUBMIT INFO */}
              <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-10">
                <p className="text-sm text-slate-700">
                  <strong>✓ All set!</strong> Your profile is complete and ready to submit. Our team will review and verify your details within 24-48 hours. You'll receive an email confirmation once your profile is approved.
                </p>
              </motion.div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="w-full py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  ← Back to Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-black text-base hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>✓</span> Submit Registration
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* TRUST SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-slate-950 mb-2">Secure & Private</h3>
            <p className="text-sm text-slate-600">Your data is encrypted and never shared without permission</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-slate-950 mb-2">Quick Approval</h3>
            <p className="text-sm text-slate-600">Get verified and start earning within 24-48 hours</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold text-slate-950 mb-2">Earn More</h3>
            <p className="text-sm text-slate-600">Professionals earn ₹50,000 - ₹200,000+ per month</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProviderRegister;