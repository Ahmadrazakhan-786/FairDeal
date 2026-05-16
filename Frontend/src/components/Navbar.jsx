import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clean SVG diagonal arrow — no emoji
  const ArrowIcon = () => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 10L10 1M10 1H3M10 1V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <style>{`
        .navbar-blur {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .nav-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #111;
          color: #fff;
          font-family: 'Geist', sans-serif;
          font-size: 15px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: -0.02em;
        }

        .nav-avatar:hover {
          background: #333;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .nav-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          width: 220px;
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          z-index: 100;
        }

        .nav-dropdown-name {
          font-size: 14px;
          font-weight: 800;
          color: #111;
          padding: 0 4px;
          letter-spacing: -0.02em;
        }

        .nav-dropdown-email {
          font-size: 12px;
          color: #aaa;
          padding: 0 4px;
          margin-top: 2px;
          margin-bottom: 12px;
        }

        .nav-dropdown-divider {
          height: 1px;
          background: #f0f0f0;
          margin-bottom: 10px;
        }

        .nav-logout-btn {
          width: 100%;
          text-align: left;
          padding: 9px 10px;
          border-radius: 8px;
          background: transparent;
          border: none;
          font-family: 'Geist', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #dc2626;
          cursor: pointer;
          transition: background 0.18s;
        }

        .nav-logout-btn:hover { background: #fef2f2; }

        .nav-get-started {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: 10px;
          background: #111;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .nav-get-started:hover {
          background: #333;
          transform: translateY(-1px);
        }

        .nav-get-started-mobile {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 14px;
          border-radius: 10px;
          background: #111;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          transition: background 0.18s;
        }

        .nav-get-started-mobile:hover { background: #333; }
      `}</style>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "navbar-blur shadow-lg border-b border-slate-200"
            : "bg-white/90 border-b border-slate-200/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://www.nicepng.com/png/full/2-27661_business-handshake-deal-contract-sign-comments-hand-shaking.png"
              alt="Handshake"
              className="w-8 h-8 object-contain"
              style={{ filter: "grayscale(1)", opacity: 0.85 }}
            />
            <span className="text-2xl font-black text-slate-950 tracking-tighter">
              Fair Deal
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/services"
              className="text-slate-600 hover:text-slate-950 font-semibold transition-colors text-sm"
            >
              Services
            </Link>

            {token ? (
              <div className="relative">
                <button className="nav-avatar" onClick={() => setShowMenu(!showMenu)}>
                  {user?.name?.charAt(0).toUpperCase()}
                </button>

                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="nav-dropdown"
                  >
                    <div className="nav-dropdown-name">{user?.name}</div>
                    <div className="nav-dropdown-email">{user?.email}</div>
                    <div className="nav-dropdown-divider" />
                    <button
                      className="nav-logout-btn"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/auth");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="nav-get-started">
                Get Started <ArrowIcon />
              </Link>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
          >
            <span className={`w-5 h-0.5 bg-slate-950 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-slate-950 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-slate-950 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <div className="p-4 flex flex-col gap-2">
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                style={{ padding: "10px 14px", borderRadius: 10, fontWeight: 600, fontSize: 14, color: "#444", textDecoration: "none" }}
              >
                🔧 Services
              </Link>

              {token ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/auth");
                    window.location.reload();
                  }}
                  style={{ padding: "11px 14px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fee2e2", color: "#dc2626", fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "left" }}
                >
                  Logout
                </button>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)} className="nav-get-started-mobile">
                  Get Started <ArrowIcon />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <div className="h-[72px]" />
    </>
  );
}

export default Navbar;