import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { forgotPassword, resetPassword } from "../api/authApi";
import { ROUTES } from "../constants/routes";
import { APP_NAME } from "../config/app";
import lightLogo from "../assets/logo-light.png";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpStep, setOtpStep] = useState(false);

  const [form, setForm] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await forgotPassword({
        email: email.trim(),
      });

      setMessage(res?.message || "Password reset code sent successfully to your email.");
      setOtpStep(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to send password reset code.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.otp || form.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!form.password || !form.confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      setResetting(true);

      const res = await resetPassword({
        email: email.trim(),
        otp: form.otp.trim(),
        password: form.password,
      });

      navigate(ROUTES.LOGIN, {
        replace: true,
        state: {
          message: res?.message || "Password reset successfully. Please sign in.",
        },
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Password reset failed.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <>
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-brand">
            <img className="auth-logo-img" src={lightLogo} alt="BR30" />
            <h1>{otpStep ? "Reset Password" : "Forgot Password"}</h1>
            <p>{otpStep ? "Enter your OTP and create a new password." : `${APP_NAME} reset your password securely with email OTP.`}</p>
          </div>

          {error && <div className="auth-alert">{error}</div>}
          {message && <div className="auth-success">{message}</div>}

          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="auth-form">
              <label>
                Registered Email
                <input
                  type="email"
                  placeholder="Enter registered email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  autoComplete="email"
                />
              </label>

              <button className="auth-btn" type="submit" disabled={submitting}>
                {submitting ? "Sending OTP..." : "Send Reset OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="auth-form">
              <label>
                Registered Email
                <input type="email" value={email} disabled />
              </label>

              <label>
                OTP
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 6-digit OTP"
                  value={form.otp}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      otp: e.target.value.replace(/\D/g, "").slice(0, 6),
                    }));
                    setError("");
                  }}
                />
              </label>
              <label>
                New Password
                <div className="auth-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={form.password}
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                      setError("");
                    }}
                    autoComplete="new-password"
                  />

                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} title={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <label>
                Confirm Password
                <div className="auth-password-field">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={form.confirmPassword}
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }));
                      setError("");
                    }}
                    autoComplete="new-password"
                  />

                  <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} title={showConfirmPassword ? "Hide password" : "Show password"}>
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <button className="auth-btn" type="submit" disabled={resetting}>
                {resetting ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setOtpStep(false);
                  setForm({
                    otp: "",
                    password: "",
                    confirmPassword: "",
                  });
                  setError("");
                  setMessage("");
                }}>
                Change email
              </button>
            </form>
          )}

          <p className="auth-footer">
            Already have an account? <Link to={ROUTES.LOGIN}>Sign In</Link>
          </p>
        </section>
      </main>

      <style>{`
.auth-page{min-height:100vh;width:100%;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(circle at top center,rgba(176,32,240,.16),transparent 38%),#fbf8ff;color:#101014;}
.auth-card{width:100%;max-width:475px;background:#fff;border:1px solid rgba(160,32,240,.14);border-radius:24px;padding:34px 32px;box-shadow:0 24px 70px rgba(160,32,240,.12);}
.auth-brand{text-align:center;margin-bottom:24px;}
.auth-logo-img{width:66px!important;height:66px!important;min-width:66px;min-height:66px;max-width:66px!important;max-height:66px!important;border-radius:18px;object-fit:cover;display:block;margin:0 auto 18px;box-shadow:0 14px 34px rgba(160,32,240,.18);}
.auth-brand h1{margin:0 0 8px;font-size:30px;font-weight:720;letter-spacing:-.035em;color:#101014;}
.auth-brand p{margin:0;color:#65726d;font-size:15px;line-height:1.55;}
.auth-alert{border:1px solid rgba(255,77,79,.28);background:rgba(255,77,79,.08);color:#d9363e;border-radius:14px;padding:12px 14px;font-size:14px;font-weight:650;margin-bottom:16px;}
.auth-success{padding:12px 14px;margin-bottom:16px;border-radius:14px;background:rgba(123,44,255,.08);border:1px solid rgba(123,44,255,.22);color:#7b2cff;font-size:14px;font-weight:650;}
.auth-form{display:grid;gap:15px;}
.auth-form label{display:grid;gap:8px;color:#101014;font-size:14px;font-weight:650;text-align:left;}
.auth-form input{width:100%;height:50px;border:1px solid #e8dff0;background:#fff;color:#101014;border-radius:15px;padding:0 14px;outline:0;font-size:14px;}
.auth-form input:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
.auth-form input:disabled{background:#f7f3fb;color:#65726d;cursor:not-allowed;}
.auth-password-field{position:relative;}
.auth-password-field input{padding-right:48px;}
.auth-password-field button{position:absolute;right:9px;top:50%;transform:translateY(-50%);width:34px;height:34px;border:0;border-radius:10px;background:rgba(160,32,240,.1);color:#a020f0;display:grid;place-items:center;cursor:pointer;}
.auth-password-field button:hover{background:rgba(160,32,240,.16);}
.auth-btn{height:52px;border:0;border-radius:15px;background:linear-gradient(135deg,#ff2bd6,#7b2cff);color:#fff;font-size:15px;font-weight:850;cursor:pointer;margin-top:6px;box-shadow:0 16px 38px rgba(160,32,240,.22);}
.auth-btn:disabled{opacity:.65;cursor:not-allowed;}
.auth-link-btn{width:100%;height:48px;margin-top:12px;border:1px solid rgba(160,32,240,.18);border-radius:14px;background:#fff;color:#a020f0;font-size:14px;font-weight:700;cursor:pointer;transition:.25s;}
.auth-link-btn:hover{background:rgba(160,32,240,.08);border-color:#a020f0;}
.auth-footer{text-align:center;margin:24px 0 0;color:#65726d;}
.auth-footer a{color:#a020f0;text-decoration:none;font-weight:700;}
.auth-footer a:hover{text-decoration:underline;}
@media(max-width:560px){.auth-page{padding:16px;align-items:flex-start;padding-top:72px;}.auth-card{max-width:100%;padding:26px 20px;border-radius:22px;}.auth-brand h1{font-size:26px;font-weight:720;}.auth-logo-img{width:58px!important;height:58px!important;min-width:58px;min-height:58px;max-width:58px!important;max-height:58px!important;border-radius:16px;}.auth-btn{height:50px;}}
      `}</style>
    </>
  );
}
