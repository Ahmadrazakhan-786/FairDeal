import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    rememberMe: false,
  });

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await axios.post("https://fairdeal-backend-rbz9.onrender.com/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
      } else {
        await axios.post("https://fairdeal-backend-rbz9.onrender.com/api/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        alert("Signup successful. Please login.");
        setIsLogin(true);
        return;
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');

        .auth-root * {
          font-family: 'Geist', 'Segoe UI', sans-serif;
          box-sizing: border-box;
        }

        .auth-bg {
          min-height: 100vh;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background-image: 
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .auth-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e5e5e5;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 420px;
          padding: 32px;
        }

        /* TABS */
        .tab-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #e5e5e5;
          background: transparent;
          font-size: 14px;
          font-weight: 500;
          color: #888;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: #f5f5f5;
          border-color: #d0d0d0;
          color: #111;
          font-weight: 600;
        }

        .tab-btn:hover:not(.active) {
          background: #fafafa;
          color: #444;
        }

        /* SOCIAL BUTTONS */
        .social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 11px 16px;
          border-radius: 10px;
          border: 1px solid #e5e5e5;
          background: #fff;
          font-size: 14px;
          font-weight: 500;
          color: #111;
          cursor: pointer;
          transition: all 0.18s;
          margin-bottom: 10px;
        }

        .social-btn:hover {
          background: #f8f8f8;
          border-color: #ccc;
        }

        /* DIVIDER */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
          color: #aaa;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8e8e8;
        }

        /* FORM FIELDS */
        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #444;
          margin-bottom: 6px;
        }

        .field-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid #e5e5e5;
          background: #fff;
          font-size: 14px;
          color: #111;
          outline: none;
          transition: border-color 0.18s;
          margin-bottom: 14px;
        }

        .field-input::placeholder {
          color: #bbb;
        }

        .field-input:focus {
          border-color: #aaa;
        }

        .password-wrap {
          position: relative;
          margin-bottom: 14px;
        }

        .password-wrap .field-input {
          margin-bottom: 0;
          padding-right: 44px;
        }

        .eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #aaa;
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.15s;
        }

        .eye-btn:hover {
          color: #666;
        }

        .forgot-link {
          font-size: 13px;
          color: #666;
          text-decoration: none;
          font-weight: 500;
          float: right;
        }

        .forgot-link:hover {
          color: #111;
        }

        .label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        /* SUBMIT BUTTON */
        .submit-btn {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          border: none;
          background: #111;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
          margin-top: 6px;
        }

        .submit-btn:hover {
          background: #222;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        /* SELECT */
        .field-select {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid #e5e5e5;
          background: #fff;
          font-size: 14px;
          color: #111;
          outline: none;
          transition: border-color 0.18s;
          margin-bottom: 14px;
          appearance: none;
          cursor: pointer;
        }

        .field-select:focus {
          border-color: #aaa;
        }

        /* CHECKBOX */
        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 4px;
          margin-bottom: 16px;
        }

        .checkbox-row input[type="checkbox"] {
          width: 16px;
          height: 16px;
          margin-top: 1px;
          accent-color: #111;
          cursor: pointer;
          flex-shrink: 0;
        }

        .checkbox-row label {
          font-size: 13px;
          color: #666;
          line-height: 1.4;
          cursor: pointer;
        }

        /* BOTTOM TEXT */
        .bottom-text {
          text-align: center;
          font-size: 13px;
          color: #888;
          margin-top: 22px;
        }

        .bottom-text button {
          background: none;
          border: none;
          color: #111;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
          text-decoration: underline;
          text-underline-offset: 2px;
          padding: 0;
          margin-left: 4px;
        }

        .bottom-text button:hover {
          color: #444;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 24px 20px;
            border-radius: 16px;
          }
        }
      `}</style>

      <div className="auth-root auth-bg">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="auth-card"
        >
          {/* TABS */}
          <div className="tab-bar">
            <button
              className={`tab-btn ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              {/* Login icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Login
            </button>
            <button
              className={`tab-btn ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              {/* Signup icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -12 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 12 : -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* SOCIAL BUTTONS */}
              <button
  className="social-btn"
  type="button"
  onClick={() => {
    window.location.href =
      "https://fairdeal-backend-rbz9.onrender.com/api/auth/google";
  }}
>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <button className="social-btn" type="button">
                {/* Apple logo */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.36.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.56-1.32 3.1-2.54 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>

              {/* DIVIDER */}
              <div className="divider">OR</div>

              {/* FORM */}
              <form onSubmit={handleSubmit}>

                {/* NAME - signup only */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="field-label">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="field-input"
                    />
                  </motion.div>
                )}

                {/* EMAIL */}
                <label className="field-label">Email address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="field-input"
                />

                {/* PASSWORD */}
                <div className="label-row">
                  <label className="field-label" style={{ marginBottom: 0 }}>Password</label>
                  {isLogin && (
                    <a href="#" className="forgot-link">Forgot password?</a>
                  )}
                </div>
                <div className="password-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="field-input"
                    style={{ marginBottom: 0 }}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>

                {/* ROLE - signup only */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <label className="field-label">I am a</label>
                    <select
                      value={formData.role}
                      onChange={(e) => updateField("role", e.target.value)}
                      className="field-select"
                    >
                      <option value="user">👤 Customer (Find Services)</option>
                      <option value="provider">💼 Professional (Provide Services)</option>
                    </select>
                  </motion.div>
                )}

                {/* REMEMBER ME - login only */}
                {isLogin && (
                  <div className="checkbox-row" style={{ marginTop: 12 }}>
                    <input
                      type="checkbox"
                      id="remember"
                      checked={formData.rememberMe}
                      onChange={(e) => updateField("rememberMe", e.target.checked)}
                    />
                    <label htmlFor="remember">Remember me for next time</label>
                  </div>
                )}

                {/* NEWSLETTER - signup only */}
                {!isLogin && (
                  <div className="checkbox-row" style={{ marginTop: 12 }}>
                    <input type="checkbox" id="newsletter" />
                    <label htmlFor="newsletter">
                      Please keep me updated by email with the latest news, research findings, reward programs, and event updates.
                    </label>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="submit-btn"
                  style={{ marginTop: isLogin ? 8 : 4 }}
                >
                  {isLogin ? "Log In" : "Create an account"}
                </motion.button>
              </form>

              {/* BOTTOM TOGGLE */}
              <div className="bottom-text">
                {isLogin ? "Don't have an account yet?" : "Already have an account?"}
                <button onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default Auth;