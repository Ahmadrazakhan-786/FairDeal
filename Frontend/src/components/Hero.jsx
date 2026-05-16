import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState("electrician");
  const navigate = useNavigate();
  const [hoveredStat, setHoveredStat] = useState(null);

  const services = [
    { id: "electrician", icon: "⚡", title: "Electrician", desc: "Electrical repairs & installations", rating: 4.9, reviews: 2847, avgTime: "30 mins" },
    { id: "tutor", icon: "📚", title: "Home Tutor", desc: "Quality education at your home", rating: 4.8, reviews: 3421, avgTime: "1 hour" },
    { id: "plumber", icon: "🔧", title: "Plumber", desc: "All plumbing needs covered", rating: 4.9, reviews: 2156, avgTime: "45 mins" },
    { id: "tailor", icon: "✂️", title: "Tailor", desc: "Custom tailoring & alterations", rating: 4.7, reviews: 1893, avgTime: "2 days" },
    { id: "cook", icon: "👨‍🍳", title: "Cook", desc: "Professional cooking services", rating: 4.8, reviews: 1654, avgTime: "Flexible" },
    { id: "painter", icon: "🎨", title: "Painter", desc: "Interior & exterior painting", rating: 4.6, reviews: 2234, avgTime: "1-3 days" },
    { id: "cleaner", icon: "🧹", title: "Cleaner", desc: "Professional cleaning services", rating: 4.9, reviews: 3567, avgTime: "2 hours" },
    { id: "carpenter", icon: "🪵", title: "Carpenter", desc: "Woodwork & furniture repair", rating: 4.8, reviews: 1456, avgTime: "Variable" },
  ];

  const stats = [
    { number: "12K+", label: "Happy Customers", detail: "Satisfied & verified users", icon: "👥" },
    { number: "5.8K+", label: "Verified Providers", detail: "Background checked professionals", icon: "⭐" },
    { number: "85+", label: "Service Categories", detail: "All services you need covered", icon: "🎯" },
  ];

  const features = [
    { icon: "✓", title: "Verified Professionals", desc: "All providers are thoroughly verified, background checked, and reviewed by real customers", highlight: "100% Verified", badge: "PRIORITY" },
    { icon: "⚡", title: "Quick & Easy Booking", desc: "Book services in minutes with real-time availability, instant confirmations, and live tracking", highlight: "5-Min Booking", badge: "FAST" },
    { icon: "💳", title: "Safe Payments", desc: "Secure payment system with buyer protection, dispute resolution, and refund guarantee", highlight: "100% Protected", badge: "SECURE" },
    { icon: "⭐", title: "Quality Guaranteed", desc: "Pay after service completion with satisfaction guarantee or get your money back", highlight: "Money-Back Guarantee", badge: "QUALITY" },
    { icon: "🔒", title: "Privacy Protection", desc: "Your personal data is encrypted with bank-level security and never shared without permission", highlight: "Bank-Level Security", badge: "SECURE" },
    { icon: "📞", title: "24/7 Support", desc: "Our dedicated customer support team is always here to help via call, chat, or email", highlight: "Always Available", badge: "SUPPORT" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap');

        .h-root {
          font-family: 'Geist', 'Segoe UI', sans-serif;
          background: #fafafa;
          color: #111;
          overflow-x: hidden;
        }

        .h-gridbg {
          background-color: #ffffff;
          background-image:
            linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .h-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 100px;
          position: relative;
        }

        .h-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 140px;
          background: linear-gradient(to bottom, transparent, #fafafa);
          pointer-events: none;
        }

        .h-badge {
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
          margin-bottom: 36px;
        }

        .h-pulse {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #111;
          box-shadow: 0 0 0 0 rgba(17,17,17,0.4);
          animation: hpulse 2.2s infinite;
        }

        @keyframes hpulse {
          0%   { box-shadow: 0 0 0 0 rgba(17,17,17,0.35); }
          70%  { box-shadow: 0 0 0 8px rgba(17,17,17,0); }
          100% { box-shadow: 0 0 0 0 rgba(17,17,17,0); }
        }

        .h-headline {
          font-size: clamp(52px, 8.5vw, 112px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #111;
          margin: 0 0 28px;
        }

        .h-headline .accent {
          display: block;
          color: transparent;
          -webkit-text-stroke: 2.5px #111;
        }

        .h-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          background: #111;
          color: #fff;
          font-family: 'Geist', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        }

        .h-cta-primary:hover {
          background: #222;
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.22);
        }

        .h-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          border-radius: 10px;
          border: 1px solid #e5e5e5;
          background: #fff;
          color: #333;
          font-family: 'Geist', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }

        .h-cta-secondary:hover {
          border-color: #ccc;
          background: #f5f5f5;
          transform: translateY(-2px);
        }

        .h-trust {
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

        .h-marquee-wrap {
          border-top: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
          background: #f8f8f8;
          padding: 12px 0;
          overflow: hidden;
        }

        .h-marquee-track {
          display: flex;
          gap: 40px;
          animation: hmarquee 20s linear infinite;
          width: max-content;
        }

        @keyframes hmarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .h-marquee-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #888;
          white-space: nowrap;
          letter-spacing: 0.04em;
        }

        .h-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .h-eyebrow {
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

        .h-eyebrow-line {
          flex: 0 0 36px;
          height: 1px;
          background: #e5e5e5;
          display: block;
        }

        /* ── STATS GRID — FULLY RESPONSIVE ── */
        .h-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 72px 0 80px;
        }

        .h-stat {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          padding: 28px 24px;
          transition: all 0.22s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .h-stat:hover {
          border-color: #d0d0d0;
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
        }

        .h-stat-num {
          font-size: 48px;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #111;
          line-height: 1;
          margin-bottom: 6px;
        }

        /* SERVICE CARDS */
        .h-svc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .h-svc {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          padding: 24px 20px;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .h-svc:hover {
          border-color: #ccc;
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }

        .h-svc.active {
          background: #111;
          border-color: #111;
        }

        .h-svc-icon {
          font-size: 44px;
          line-height: 1;
          margin-bottom: 14px;
          display: block;
          transition: transform 0.3s;
        }

        .h-svc:hover .h-svc-icon {
          transform: scale(1.12) translateY(-2px);
        }

        .h-rating {
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
        }

        .h-svc.active .h-rating {
          background: rgba(255,255,255,0.1);
          color: #fcd34d;
        }

        .h-svc-title {
          font-size: 18px;
          font-weight: 800;
          color: #111;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .h-svc.active .h-svc-title { color: #fff; }

        .h-svc-desc {
          font-size: 12px;
          color: #888;
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .h-svc.active .h-svc-desc { color: rgba(255,255,255,0.55); }

        .h-svc-time {
          font-size: 11px;
          color: #aaa;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 14px;
        }

        .h-svc.active .h-svc-time { color: rgba(255,255,255,0.45); }

        .h-svc-btn {
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
        }

        .h-svc-btn:hover {
          background: #111;
          border-color: #111;
          color: #fff;
        }

        .h-svc.active .h-svc-btn {
          background: #fff;
          border-color: #fff;
          color: #111;
        }

        /* FEATURE CARDS */
        .h-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .h-feat {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 16px;
          padding: 28px 24px;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }

        .h-feat:hover {
          border-color: #ccc;
          transform: translateY(-4px);
          box-shadow: 0 10px 36px rgba(0,0,0,0.07);
        }

        .h-feat-badge {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 5px;
          background: #f0f0f0;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #666;
          margin-bottom: 16px;
        }

        .h-feat-icon {
          font-size: 38px;
          display: block;
          margin-bottom: 14px;
          line-height: 1;
          transition: transform 0.28s;
        }

        .h-feat:hover .h-feat-icon { transform: scale(1.15); }

        .h-feat-title {
          font-size: 18px;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .h-feat-desc {
          font-size: 13px;
          color: #888;
          line-height: 1.65;
          margin-bottom: 14px;
        }

        .h-feat-hl {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 700;
          color: #333;
          padding: 4px 10px;
          border-radius: 6px;
          background: #f5f5f5;
          border: 1px solid #e8e8e8;
        }

        /* CTA BLOCK */
        .h-cta-block {
          border-radius: 20px;
          border: 1px solid #e8e8e8;
          background: #111;
          padding: 72px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .h-divider {
          height: 1px;
          background: #ebebeb;
        }

        /* ══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ══════════════════════════════ */

        /* Tablet — 1024px */
        @media (max-width: 1024px) {
          .h-svc-grid { grid-template-columns: repeat(2, 1fr); }
          .h-feat-grid { grid-template-columns: repeat(2, 1fr); }
          .h-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile — 768px */
        @media (max-width: 768px) {
          .h-stats-grid {
            grid-template-columns: 1fr;
            padding: 48px 0 56px;
          }
          .h-stat {
            padding: 24px 20px;
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .h-stat-num { font-size: 40px; }
          .h-cta-block { padding: 48px 24px; }
          .h-feat-grid { grid-template-columns: 1fr; }
        }

        /* Small phones — 640px */
        @media (max-width: 640px) {
          .h-headline { font-size: clamp(44px, 14vw, 72px); }
          .h-svc-grid { grid-template-columns: 1fr; }
          .h-stats-grid { grid-template-columns: 1fr; }
          .h-feat-grid { grid-template-columns: 1fr; }
          .h-cta-block { padding: 40px 20px; }
          .h-stat { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>

      <div className="h-root">

        {/* ── HERO ── */}
        <div className="h-gridbg h-hero">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="h-badge">
                <span className="h-pulse" />
                India's #1 Trusted Services Platform
              </span>
            </motion.div>

            <motion.h1
              className="h-headline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              Find & Book
              <span className="accent">Trusted</span>
              Professionals
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{ fontSize: 17, color: "#666", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 400 }}
            >
              Connect with <strong style={{ color: "#333" }}>verified electricians, tutors, plumbers, cooks</strong> and 80+ skilled professionals near you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 36 }}
            >
              <button className="h-cta-primary" onClick={() => navigate("/services")}>⚡ Book Your Service Now</button>
              <button className="h-cta-secondary" onClick={() => navigate("/services")}>💼 Earn as Provider</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}
            >
              {["✅ 1M+ Services", "⭐ 4.8 Rating", "🔒 100% Safe"].map(t => (
                <span key={t} className="h-trust">{t}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── MARQUEE ── */}
        <div className="h-marquee-wrap">
          <div className="h-marquee-track">
            {[...Array(2)].flatMap(() =>
              ["⚡ Electricians", "📚 Tutors", "🔧 Plumbers", "✂️ Tailors", "👨‍🍳 Cooks", "🎨 Painters", "🧹 Cleaners", "🪵 Carpenters"].map(item => (
                <span key={item + Math.random()} className="h-marquee-item">
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#ccc", display: "inline-block" }} />
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="h-section">

          {/* ── STATS — responsive h-stats-grid class ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="h-stats-grid"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="h-stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div style={{ fontSize: 36, marginBottom: 12, flexShrink: 0 }}>{stat.icon}</div>
                <div>
                  <div className="h-stat-num">{stat.number}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 13, color: "#aaa" }}>{stat.detail}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="h-divider" />

          {/* ── SERVICES ── */}
          <div style={{ padding: "80px 0" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: 52 }}
            >
              <div className="h-eyebrow">
                <span className="h-eyebrow-line" /> 🌟 Our Services <span className="h-eyebrow-line" />
              </div>
              <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#111", letterSpacing: "-0.03em", marginBottom: 12 }}>
                Every Service You Need
              </h2>
              <p style={{ color: "#888", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
                From electrical repairs to tutoring — connect with the best professionals in your area.
              </p>
            </motion.div>

            <div className="h-svc-grid">
              {services.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  className={`h-svc${selectedCategory === svc.id ? " active" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  viewport={{ once: true, amount: 0.1 }}
                  onClick={() => setSelectedCategory(svc.id)}
                >
                  <span className="h-svc-icon">{svc.icon}</span>
                  <div className="h-rating">★ {svc.rating} <span style={{ fontWeight: 400, opacity: 0.7 }}>({svc.reviews.toLocaleString()})</span></div>
                  <div className="h-svc-title">{svc.title}</div>
                  <div className="h-svc-desc">{svc.desc}</div>
                  <div className="h-svc-time">⏱ ~{svc.avgTime}</div>
                  <button className="h-svc-btn" onClick={e => { e.stopPropagation(); navigate("/services"); }}>
                    View Services →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="h-divider" />

          {/* ── CTA BLOCK — PEHLE AATA HAI ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="h-cta-block"
            style={{ margin: "80px 0" }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="h-eyebrow" style={{ color: "#555" }}>
                <span style={{ flex: "0 0 36px", height: 1, background: "rgba(255,255,255,0.1)", display: "block" }} />
                Ready?
                <span style={{ flex: "0 0 36px", height: 1, background: "rgba(255,255,255,0.1)", display: "block" }} />
              </div>
              <h2 style={{ fontFamily: "Geist, sans-serif", fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>
                ⚡ Get Started Today
              </h2>
              <p style={{ color: "#666", fontSize: 16, maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.65 }}>
                Whether you're looking for{" "}
                <span style={{ color: "#999" }}>reliable services</span> or want to{" "}
                <span style={{ color: "#999" }}>earn money as a professional</span>, FairDeal is your trusted partner.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <button
                  onClick={() => navigate("/services")}
                  style={{ padding: "14px 32px", borderRadius: 10, border: "none", background: "#fff", color: "#111", fontFamily: "Geist,sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  🔍 Explore Services
                </button>
                <button
                  onClick={() => navigate("/services")}
                  style={{ padding: "13px 32px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#888", fontFamily: "Geist,sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#888"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  💰 Start Earning
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── WHY FAIRDEAL — BAAD MEIN ── */}
          <div style={{ padding: "0 0 80px" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: 52 }}
            >
              <div className="h-eyebrow">
                <span className="h-eyebrow-line" /> ✨ Why FairDeal <span className="h-eyebrow-line" />
              </div>
              <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#111", letterSpacing: "-0.03em", marginBottom: 12 }}>
                Built Different.
              </h2>
              <p style={{ color: "#888", fontSize: 15, maxWidth: 440, margin: "0 auto" }}>
                The safest, fastest, and most reliable platform for local services in India.
              </p>
            </motion.div>

            <div className="h-feat-grid">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  className="h-feat"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  <span className="h-feat-badge">{feat.badge}</span>
                  <span className="h-feat-icon">{feat.icon}</span>
                  <div className="h-feat-title">{feat.title}</div>
                  <div className="h-feat-desc">{feat.desc}</div>
                  <span className="h-feat-hl">✓ {feat.highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}