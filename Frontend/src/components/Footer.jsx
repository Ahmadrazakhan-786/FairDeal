import { FaGithub, FaLinkedin, FaInstagram, FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Contact Us", "Careers", "Press & Media", "Trust & Safety"],
    },
    {
      title: "For Customers",
      links: ["Book a Service", "How it Works", "Service Locations", "Safety for You", "Offers"],
    },
    {
      title: "For Providers",
      links: ["Join as Provider", "Provider App", "Success Stories", "Safety Guidelines"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"],
    },
  ];

  return (
    <>
      <style>{`
        .f-root {
          font-family: 'Geist', 'Segoe UI', sans-serif;
          background: #fafafa;
          border-top: 1px solid #e8e8e8;
          padding: 72px 0 32px;
          position: relative;
          overflow: hidden;
        }

        .f-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── NEWSLETTER BOX ── */
        .f-newsletter {
          background: #111;
          border-radius: 20px;
          border: 1px solid #222;
          padding: 52px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 64px;
          position: relative;
          overflow: hidden;
        }

        .f-newsletter::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: rgba(255,255,255,0.03);
          border-radius: 50%;
        }

        .f-newsletter::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -40px;
          width: 140px; height: 140px;
          background: rgba(255,255,255,0.02);
          border-radius: 50%;
        }

        .f-nl-text {
          position: relative;
          z-index: 1;
          max-width: 460px;
        }

        .f-nl-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 10px;
          display: block;
        }

        .f-nl-title {
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          margin: 0 0 8px;
          line-height: 1.15;
        }

        .f-nl-sub {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .f-nl-form {
          display: flex;
          gap: 10px;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .f-nl-input {
          padding: 12px 18px;
          border-radius: 10px;
          border: 1px solid #2a2a2a;
          background: #1a1a1a;
          color: #fff;
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 500;
          width: 240px;
          outline: none;
          transition: border-color 0.2s;
        }

        .f-nl-input::placeholder { color: #444; }
        .f-nl-input:focus { border-color: #444; }

        .f-nl-btn {
          padding: 12px 22px;
          border-radius: 10px;
          border: none;
          background: #fff;
          color: #111;
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .f-nl-btn:hover {
          background: #e8e8e8;
          transform: translateY(-1px);
        }

        /* ── LINKS GRID ── */
        .f-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 48px;
        }

        .f-col-title {
          font-size: 13px;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.01em;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .f-col-link {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #888;
          text-decoration: none;
          margin-bottom: 11px;
          transition: color 0.18s;
        }

        .f-col-link:hover { color: #111; }

        /* ── DIVIDER ── */
        .f-divider {
          height: 1px;
          background: #e8e8e8;
          margin-bottom: 28px;
        }

        /* ── BOTTOM BAR ── */
        .f-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .f-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .f-logo-img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.85;
        }

        .f-logo-text {
          font-size: 18px;
          font-weight: 900;
          color: #111;
          letter-spacing: -0.04em;
        }

        .f-copy {
          font-size: 12px;
          color: #aaa;
          font-weight: 500;
        }

        /* ── SOCIAL ICONS ── */
        .f-socials {
          display: flex;
          gap: 8px;
        }

        .f-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: #fff;
          border: 1px solid #e8e8e8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .f-social-btn:hover {
          background: #111;
          border-color: #111;
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .f-newsletter {
            flex-direction: column;
            align-items: flex-start;
            padding: 40px 32px;
          }
          .f-nl-form { width: 100%; }
          .f-nl-input { width: 100%; flex: 1; }
        }

        @media (max-width: 768px) {
          .f-links-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
          .f-newsletter { padding: 32px 24px; }
          .f-nl-form { flex-direction: column; }
          .f-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
        }

        @media (max-width: 480px) {
          .f-links-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="f-root">
        <div className="f-section">

          {/* ── NEWSLETTER ── */}
          <div className="f-newsletter">
            <div className="f-nl-text">
              <span className="f-nl-eyebrow">Stay Updated</span>
              <h3 className="f-nl-title">Be the first to know.</h3>
              <p className="f-nl-sub">
                Subscribe for exclusive offers and new service launches in your area.
              </p>
            </div>
            <div className="f-nl-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="f-nl-input"
              />
              <button className="f-nl-btn">Subscribe →</button>
            </div>
          </div>

          {/* ── LINKS ── */}
          <div className="f-links-grid">
            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <div className="f-col-title">{section.title}</div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="f-col-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="f-divider" />

          {/* ── BOTTOM BAR ── */}
          <div className="f-bottom">
            {/* Logo */}
            <a href="/" className="f-logo">
              <img
                src="https://www.nicepng.com/png/full/2-27661_business-handshake-deal-contract-sign-comments-hand-shaking.png"
                alt="FairDeal"
                className="f-logo-img"
              />
              <span className="f-logo-text">Fair Deal</span>
            </a>

            <p className="f-copy">© 2026 FairDeal Services India. All rights reserved.</p>

            {/* Socials */}
            <div className="f-socials">
              <a
                href="https://github.com/Ahmadrazakhan-786/AhmadRazaKhan-786"
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmad-khan04/Ahmad"
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://t.me/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="f-social-btn"
                title="Telegram"
              >
                <FaTelegramPlane />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

export default Footer;