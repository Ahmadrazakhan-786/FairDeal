import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Services() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [hoveredService, setHoveredService] = useState(null);

  // Scroll to top jab page load ho
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const services = [
    { id: "electrician", icon: "⚡", title: "Electrician", description: "Electrical repairs & installations", providers: "200+ verified", avgRating: 4.9 },
    { id: "tutor", icon: "📚", title: "Home Tutor", description: "Quality education at your home", providers: "350+ verified", avgRating: 4.8 },
    { id: "plumber", icon: "🔧", title: "Plumber", description: "All plumbing needs covered", providers: "150+ verified", avgRating: 4.9 },
    { id: "tailor", icon: "✂️", title: "Tailor", description: "Custom tailoring & alterations", providers: "120+ verified", avgRating: 4.7 },
    { id: "cook", icon: "👨‍🍳", title: "Cook", description: "Professional cooking services", providers: "100+ verified", avgRating: 4.8 },
    { id: "painter", icon: "🎨", title: "Painter", description: "Interior & exterior painting", providers: "180+ verified", avgRating: 4.6 },
    { id: "cleaner", icon: "🧹", title: "Cleaner", description: "Professional cleaning services", providers: "280+ verified", avgRating: 4.9 },
    { id: "carpenter", icon: "🪵", title: "Carpenter", description: "Woodwork & furniture repair", providers: "110+ verified", avgRating: 4.8 },
  ];

  const features = [
    { icon: "✓", title: "Verified Professionals", desc: "All providers thoroughly background checked and verified." },
    { icon: "⚡", title: "Lightning Fast", desc: "Book within minutes, service starts immediately." },
    { icon: "🔒", title: "Secure & Safe", desc: "Payment protection and dispute resolution guaranteed." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap');

        .sv-root {
          font-family: 'Geist', 'Segoe UI', sans-serif;
          background: #fafafa;
          color: #111;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .sv-gridbg {
          background-color: #ffffff;
          background-image:
            linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* ── HERO HEADER ── */
        .sv-hero {
          padding: 110px 24px 80px;
          text-align: center;
          position: relative;
        }

        .sv-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 100px;
          background: linear-gradient(to bottom, transparent, #fafafa);
          pointer-events: none;
        }

        .sv-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid #e5e5e5;
          background: #fff;
          font-size: 11px;
          font-weight: 700;
          color: #555;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          margin-bottom: 32px;
        }

        .sv-pulse {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #111;
          animation: svpulse 2.2s infinite;
        }

        @keyframes svpulse {
          0%   { box-shadow: 0 0 0 0 rgba(17,17,17,0.35); }
          70%  { box-shadow: 0 0 0 8px rgba(17,17,17,0); }
          100% { box-shadow: 0 0 0 0 rgba(17,17,17,0); }
        }

        .sv-headline {
          font-size: clamp(48px, 8vw, 100px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #111;
          margin: 0 0 24px;
        }

        .sv-headline .accent {
          display: block;
          color: transparent;
          -webkit-text-stroke: 2.5px #111;
        }

        .sv-sub {
          font-size: 16px;
          color: #666;
          max-width: 500px;
          margin: 0 auto 36px;
          line-height: 1.7;
          font-weight: 400;
        }

        .sv-trust {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid #ebebeb;
          background: #fff;
          font-size: 12px;
          font-weight: 500;
          color: #666;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        /* ── SECTION WRAPPER ── */
        .sv-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .sv-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 18px;
        }

        .sv-eyebrow-line {
          flex: 0 0 36px;
          height: 1px;
          background: #e5e5e5;
          display: block;
        }

        .sv-divider {
          height: 1px;
          background: #ebebeb;
        }

        /* ── SERVICE CARDS GRID ── */
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          padding: 72px 0 80px;
        }

        .sv-card {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          padding: 24px 20px;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .sv-card:hover {
          background: #111;
          border-color: #111;
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.14);
        }

        .sv-card-icon {
          font-size: 44px;
          line-height: 1;
          margin-bottom: 14px;
          display: block;
          transition: transform 0.3s;
        }

        .sv-card:hover .sv-card-icon {
          transform: scale(1.12) translateY(-2px);
        }

        .sv-card-rating {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          color: #d97706;
          background: #fef9c3;
          padding: 2px 8px;
          border-radius: 5px;
          margin-bottom: 10px;
          transition: all 0.2s;
        }

        .sv-card:hover .sv-card-rating {
          background: rgba(255,255,255,0.1);
          color: #fcd34d;
        }

        .sv-card-title {
          font-size: 18px;
          font-weight: 800;
          color: #111;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
          transition: color 0.2s;
        }

        .sv-card:hover .sv-card-title { color: #fff; }

        .sv-card-desc {
          font-size: 12px;
          color: #888;
          margin-bottom: 10px;
          line-height: 1.5;
          transition: color 0.2s;
        }

        .sv-card:hover .sv-card-desc { color: rgba(255,255,255,0.55); }

        .sv-card-providers {
          font-size: 11px;
          color: #aaa;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s;
        }

        .sv-card:hover .sv-card-providers { color: rgba(255,255,255,0.45); }

        /* CARD BUTTONS */
        .sv-card-divider {
          height: 1px;
          background: #f0f0f0;
          margin-bottom: 14px;
          transition: background 0.2s;
        }

        .sv-card:hover .sv-card-divider { background: rgba(255,255,255,0.1); }

        .sv-btn-primary {
          width: 100%;
          padding: 9px;
          border-radius: 8px;
          border: 1px solid #e8e8e8;
          background: #f8f8f8;
          color: #444;
          font-family: 'Geist', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
          margin-bottom: 8px;
        }

        .sv-btn-primary:hover {
          background: #333;
          border-color: #333;
          color: #fff;
        }

        .sv-card:hover .sv-btn-primary {
          background: #fff;
          border-color: #fff;
          color: #111;
        }

        .sv-card:hover .sv-btn-primary:hover {
          background: #e8e8e8;
        }

        .sv-btn-secondary {
          width: 100%;
          padding: 9px;
          border-radius: 8px;
          border: 1px solid #e8e8e8;
          background: transparent;
          color: #888;
          font-family: 'Geist', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
        }

        .sv-btn-secondary:hover {
          border-color: #ccc;
          color: #444;
        }

        .sv-card:hover .sv-btn-secondary {
          border-color: rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.6);
        }

        .sv-card:hover .sv-btn-secondary:hover {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }

        /* ── CTA BLOCK ── */
        .sv-cta {
          border-radius: 20px;
          border: 1px solid #e8e8e8;
          background: #111;
          padding: 72px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin: 0 0 80px;
        }

        .sv-cta::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 240px; height: 240px;
          background: rgba(255,255,255,0.03);
          border-radius: 50%;
        }

        .sv-cta-btn-white {
          padding: 14px 32px;
          border-radius: 10px;
          border: none;
          background: #fff;
          color: #111;
          font-family: 'Geist', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sv-cta-btn-white:hover {
          background: #e8e8e8;
          transform: translateY(-2px);
        }

        .sv-cta-btn-outline {
          padding: 13px 32px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: #888;
          font-family: 'Geist', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sv-cta-btn-outline:hover {
          border-color: rgba(255,255,255,0.4);
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── FEATURES GRID ── */
        .sv-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          padding: 0 0 80px;
        }

        .sv-feat {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          padding: 28px 24px;
          transition: all 0.25s;
        }

        .sv-feat:hover {
          border-color: #ccc;
          transform: translateY(-4px);
          box-shadow: 0 10px 36px rgba(0,0,0,0.07);
        }

        .sv-feat-icon {
          font-size: 36px;
          display: block;
          margin-bottom: 14px;
          line-height: 1;
        }

        .sv-feat-title {
          font-size: 17px;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .sv-feat-desc {
          font-size: 13px;
          color: #888;
          line-height: 1.65;
        }

        /* ══════════════════════════
           RESPONSIVE
        ══════════════════════════ */
        @media (max-width: 1024px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); }
          .sv-feat-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .sv-hero { padding: 90px 24px 60px; }
          .sv-cta { padding: 48px 24px; }
          .sv-feat-grid { grid-template-columns: 1fr; }
          .sv-grid { padding: 48px 0 56px; gap: 12px; }
        }

        @media (max-width: 640px) {
          .sv-headline { font-size: clamp(40px, 13vw, 64px); }
          .sv-grid { grid-template-columns: 1fr; }
          .sv-feat-grid { grid-template-columns: 1fr; }
          .sv-cta { padding: 40px 20px; }
        }
      `}</style>

      <div className="sv-root">

        {/* ── HERO HEADER ── */}
        <div className="sv-gridbg sv-hero">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="sv-badge">
                <span className="sv-pulse" />
                India's Top-Rated Services
              </span>
            </motion.div>

            <motion.h1
              className="sv-headline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              Choose Your
              <span className="accent">Perfect</span>
              Service
            </motion.h1>

            <motion.p
              className="sv-sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              Browse <strong style={{ color: "#333" }}>8+ service categories</strong> with{" "}
              <strong style={{ color: "#333" }}>1000+ verified professionals</strong>. Book instantly or join and start earning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}
            >
              {["✅ 1000+ Professionals", "⭐ 4.8 Avg Rating", "🔒 100% Verified"].map(t => (
                <span key={t} className="sv-trust">{t}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="sv-section">

          {/* ── SERVICES GRID ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <div className="sv-eyebrow" style={{ paddingTop: 48 }}>
              <span className="sv-eyebrow-line" /> 🌟 Our Services <span className="sv-eyebrow-line" />
            </div>
            <h2 style={{ textAlign: "center", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#111", letterSpacing: "-0.03em", marginBottom: 8 }}>
              Every Service You Need
            </h2>
            <p style={{ textAlign: "center", color: "#888", fontSize: 14, maxWidth: 440, margin: "0 auto 40px" }}>
              Click a card to explore professionals in that category.
            </p>
          </motion.div>

          <div className="sv-grid">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                className="sv-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                viewport={{ once: true, amount: 0.1 }}
                onMouseEnter={() => setHoveredService(svc.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <span className="sv-card-icon">{svc.icon}</span>
                <div className="sv-card-rating">★ {svc.avgRating}</div>
                <div className="sv-card-title">{svc.title}</div>
                <div className="sv-card-desc">{svc.description}</div>
                <div className="sv-card-providers">👤 {svc.providers}</div>
                <div className="sv-card-divider" />
                <button
                  className="sv-btn-primary"
                  onClick={() => {
                    if (!token) navigate("/auth");
                    else navigate(`/services/${svc.id}`);
                  }}
                >
                  🔍 Browse Professionals →
                </button>
                <button
                  className="sv-btn-secondary"
                  onClick={() => {
                    if (!token) navigate("/auth");
                    else navigate("/provider/register");
                  }}
                >
                  💼 Offer This Service
                </button>
              </motion.div>
            ))}
          </div>

          <div className="sv-divider" />

          {/* ── CTA BLOCK ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="sv-cta"
            style={{ marginTop: 80 }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="sv-eyebrow" style={{ color: "#555" }}>
                <span style={{ flex: "0 0 36px", height: 1, background: "rgba(255,255,255,0.08)", display: "block" }} />
                Ready to earn?
                <span style={{ flex: "0 0 36px", height: 1, background: "rgba(255,255,255,0.08)", display: "block" }} />
              </div>
              <h2 style={{ fontFamily: "Geist,sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 14 }}>
                ⚡ Transform Your Business
              </h2>
              <p style={{ color: "#666", fontSize: 15, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.65 }}>
                Join <span style={{ color: "#999" }}>thousands of professionals</span> earning{" "}
                <span style={{ color: "#999" }}>₹50,000–2,00,000+/month</span> on FairDeal. Set your own rates, work on your schedule.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <button
                  className="sv-cta-btn-white"
                  onClick={() => {
                    if (!token) navigate("/auth");
                    else navigate("/provider/register");
                  }}
                >
                  💰 Start Earning Now
                </button>
                <button
                  className="sv-cta-btn-outline"
                  onClick={() => navigate("/contact")}
                >
                  📞 Contact Us
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── WHY FAIRDEAL ── */}
          <div>
            <div className="sv-eyebrow" style={{ paddingTop: 8 }}>
              <span className="sv-eyebrow-line" /> ✨ Why FairDeal <span className="sv-eyebrow-line" />
            </div>
            <h2 style={{ textAlign: "center", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#111", letterSpacing: "-0.03em", marginBottom: 8 }}>
              Built Different.
            </h2>
            <p style={{ textAlign: "center", color: "#888", fontSize: 14, maxWidth: 400, margin: "0 auto 40px" }}>
              The safest, fastest platform for local services in India.
            </p>
            <div className="sv-feat-grid">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  className="sv-feat"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <span className="sv-feat-icon">{feat.icon}</span>
                  <div className="sv-feat-title">{feat.title}</div>
                  <div className="sv-feat-desc">{feat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Services;