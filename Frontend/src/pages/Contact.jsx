import { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  const info = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: "+0123456789",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "support@fairdeal.in",
      active: true,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "775 Rolling Green Rd.",
    },
  ];

  const socials = [
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        .contact-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f5f5f4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .contact-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid #e7e5e4;
          box-shadow: 0 2px 32px rgba(0,0,0,0.07);
          width: 100%;
          max-width: 900px;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          overflow: hidden;
          min-height: 580px;
        }

        /* LEFT PANEL */
        .contact-left {
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid #f0efed;
        }

        .contact-title {
          font-size: 36px;
          font-weight: 800;
          color: #111;
          line-height: 1.1;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }

        .contact-subtitle {
          font-size: 15px;
          color: #78716c;
          line-height: 1.6;
          margin: 0 0 36px;
          font-weight: 400;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 36px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 16px;
          border-radius: 12px;
          border: 1px solid #e7e5e4;
          font-size: 14px;
          font-weight: 500;
          color: #44403c;
          background: #fafaf9;
          transition: border-color 0.18s, background 0.18s;
        }

        .info-item.active {
          background: #1c1917;
          color: #fff;
          border-color: #1c1917;
        }

        .info-item svg {
          flex-shrink: 0;
          opacity: 0.7;
        }

        .info-item.active svg {
          opacity: 1;
        }

        .socials-row {
          display: flex;
          gap: 10px;
        }

        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #1c1917;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.18s, background 0.18s;
        }

        .social-icon:hover {
          background: #44403c;
          transform: translateY(-2px);
        }

        /* RIGHT PANEL */
        .contact-right {
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #1c1917;
          letter-spacing: 0.01em;
        }

        .form-input,
        .form-textarea {
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid #e7e5e4;
          background: #fafaf9;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1c1917;
          outline: none;
          transition: border-color 0.18s, background 0.18s;
          width: 100%;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #c4bfba;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: #a8a29e;
          background: #fff;
        }

        .form-textarea {
          resize: none;
          min-height: 110px;
          line-height: 1.5;
        }

        .send-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: #1c1917;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
          margin-top: 18px;
        }

        .send-btn:hover {
          background: #292524;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.18);
        }

        .send-btn:active {
          transform: translateY(0);
        }

        .send-btn.success {
          background: #15803d;
        }

        /* RESPONSIVE */
        @media (max-width: 700px) {
          .contact-card {
            grid-template-columns: 1fr;
            max-width: 440px;
          }

          .contact-left {
            padding: 36px 28px 28px;
            border-right: none;
            border-bottom: 1px solid #f0efed;
          }

          .contact-right {
            padding: 28px 28px 36px;
          }

          .contact-title {
            font-size: 28px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="contact-root">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="contact-card"
        >
          {/* LEFT */}
          <div className="contact-left">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="contact-title"
              >
                Contact Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="contact-subtitle"
              >
                Any question? We would be<br />happy to help you!
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="info-list"
              >
                {info.map((item, i) => (
                  <div key={i} className={`info-item${item.active ? " active" : ""}`}>
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="socials-row"
            >
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="social-icon" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="contact-right"
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    className="form-input"
                    value={formData.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    className="form-input"
                    value={formData.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="youremail@email.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number:</label>
                <input
                  type="tel"
                  placeholder="+9876543210"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message:</label>
                <textarea
                  placeholder="Type your message here..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className={`send-btn${sent ? " success" : ""}`}
              >
                {sent ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Contact;