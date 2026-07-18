import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, verifyRegisterOtp } from "../api/authApi";
import { ROUTES } from "../constants/routes";
import { APP_NAME } from "../config/app";
import lightLogo from "../assets/logo-light.png";

export default function Register() {
  const navigate = useNavigate();

  const LEGAL_VERSION = "BR30 Algo Legal v1 - 2026";

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [lockedEmail, setLockedEmail] = useState("");
  const [acceptLegal, setAcceptLegal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;

    if (name === "name") cleanValue = value.replace(/[^A-Za-z\s]/g, "");
    if (name === "mobile") cleanValue = value.replace(/\D/g, "").slice(0, 10);

    setForm((prev) => ({ ...prev, [name]: cleanValue }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!form.name || !form.email || !form.mobile || !form.password || !form.confirmPassword) {
      return "Please fill in all required fields.";
    }

    if (!nameRegex.test(form.name.trim())) return "Full name should contain only English letters.";
    if (!mobileRegex.test(form.mobile.trim())) return "Please enter a valid 10-digit mobile number.";
    if (form.password.length < 6) return "Password must be at least 6 characters long.";
    if (form.password !== form.confirmPassword) return "Password and confirm password do not match.";
    if (!acceptLegal) return "Please accept Terms, Privacy Policy, Refund Policy and Disclaimer.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const cleanEmail = form.email.trim().toLowerCase();

      await registerUser({
        name: form.name.trim(),
        email: cleanEmail,
        mobile: form.mobile.trim(),
        password: form.password,

        acceptedLegal: true,
        acceptedLegalAt: new Date().toISOString(),
        acceptedLegalVersion: LEGAL_VERSION,

        acceptedTerms: true,
        acceptedTermsVersion: "BR30 Algo Terms v1 - 2026",

        acceptedPrivacy: true,
        acceptedPrivacyVersion: "BR30 Algo Privacy v1 - 2026",

        acceptedRefund: true,
        acceptedRefundVersion: "BR30 Algo Refund v1 - 2026",

        acceptedDisclaimer: true,
        acceptedDisclaimerVersion: "BR30 Algo Disclaimer v1 - 2026",
      });

      setLockedEmail(cleanEmail);
      setOtpStep(true);
      setSuccess("OTP sent to your email. Please verify to complete registration.");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setVerifying(true);
      setError("");
      setSuccess("");

      await verifyRegisterOtp({
        email: lockedEmail,
        otp: otp.trim(),
      });

      navigate(ROUTES.LOGIN, {
        replace: true,
        state: { message: "Account created successfully. Please sign in." },
      });
    } catch (err) {
      setError(err?.response?.data?.message || "OTP verification failed.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      <main className="auth-page">
        <section className="auth-card register-card">
          <div className="auth-brand">
            <img className="auth-logo-img" src={lightLogo} alt="BR30" />
            <h1>{otpStep ? "Verify Email" : "Create Account"}</h1>
            <p>{otpStep ? "Enter the OTP sent to your registered email." : `Join ${APP_NAME} and start your algo journey.`}</p>
          </div>

          {error && <div className="auth-alert">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {!otpStep ? (
            <form onSubmit={handleSubmit} className="auth-form">
              <label>
                Full Name
                <input name="name" type="text" placeholder="Enter full name" value={form.name} onChange={handleChange} autoComplete="name" />
              </label>

              <label>
                Email
                <input name="email" type="email" placeholder="Enter email" value={form.email} onChange={handleChange} autoComplete="email" />
              </label>

              <label>
                Mobile
                <input name="mobile" type="tel" inputMode="numeric" placeholder="Enter mobile number" value={form.mobile} onChange={handleChange} autoComplete="tel" />
              </label>

              <label>
                Password
                <div className="auth-password-field">
                  <input name="password" type={showPassword ? "text" : "password"} placeholder="Create password" value={form.password} onChange={handleChange} autoComplete="new-password" />

                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} title={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <label>
                Confirm Password
                <div className="auth-password-field">
                  <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" />

                  <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} title={showConfirmPassword ? "Hide password" : "Show password"}>
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <label className="algoLegalBox">
                <input type="checkbox" checked={acceptLegal} onChange={(e) => setAcceptLegal(e.target.checked)} />
                <span>
                  I agree to the{" "}
                  <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer">
                    Terms & Conditions
                  </Link>
                  ,{" "}
                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link to="/refund-policy" target="_blank" rel="noopener noreferrer">
                    Refund Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/disclaimer" target="_blank" rel="noopener noreferrer">
                    Disclaimer
                  </Link>
                  .
                </span>
              </label>

              <button className="auth-btn" type="submit" disabled={submitting}>
                {submitting ? "Sending OTP..." : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="auth-form">
              <label>
                Email
                <input type="email" value={lockedEmail} disabled />
              </label>

              <label>
                Email OTP
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                />
              </label>

              <button className="auth-btn" type="submit" disabled={verifying}>
                {verifying ? "Verifying..." : "Verify & Create Account"}
              </button>

              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setOtpStep(false);
                  setOtp("");
                  setError("");
                  setSuccess("");
                }}
              >
                Edit registration details
              </button>
            </form>
          )}

          <p className="auth-footer">
            Already registered? <Link to={ROUTES.LOGIN}>Sign In</Link>
          </p>
        </section>
      </main>

      <style>{`
.auth-page{min-height:100vh;width:100%;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(circle at top center,rgba(176,32,240,.16),transparent 38%),#fbf8ff;color:#101014;}
.auth-card{width:100%;max-width:520px;background:#fff;border:1px solid rgba(160,32,240,.14);border-radius:24px;padding:34px 32px;box-shadow:0 24px 70px rgba(160,32,240,.12);}
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
.algoLegalBox{display:flex!important;align-items:flex-start!important;gap:10px!important;margin:2px 0 0!important;padding:14px!important;border-radius:16px!important;background:#fbf7ff!important;border:1px solid #e8dff0!important;color:#4b5563!important;line-height:1.55!important;}
.algoLegalBox input{width:17px!important;height:17px!important;min-width:17px!important;margin-top:3px!important;padding:0!important;border-radius:4px!important;accent-color:#a020f0!important;cursor:pointer!important;}
.algoLegalBox span{font-size:13px!important;font-weight:650!important;color:#4b5563!important;}
.algoLegalBox a{color:#a020f0!important;text-decoration:none!important;font-weight:850!important;}
.algoLegalBox a:hover{text-decoration:underline!important;color:#7b2cff!important;}
.auth-btn{height:52px;border:0;border-radius:15px;background:linear-gradient(135deg,#ff2bd6,#7b2cff);color:#fff;font-size:15px;font-weight:850;cursor:pointer;margin-top:6px;box-shadow:0 16px 38px rgba(160,32,240,.22);}
.auth-btn:disabled{opacity:.65;cursor:not-allowed;}
.auth-link-btn{width:100%;height:48px;margin-top:12px;border:1px solid rgba(160,32,240,.18);border-radius:14px;background:#fff;color:#a020f0;font-size:14px;font-weight:700;cursor:pointer;transition:.25s;}
.auth-link-btn:hover{background:rgba(160,32,240,.08);border-color:#a020f0;}
.auth-footer{text-align:center;margin:24px 0 0;color:#65726d;}
.auth-footer a{color:#a020f0;text-decoration:none;font-weight:700;}
.auth-footer a:hover{text-decoration:underline;}
@media(max-width:560px){.auth-page{padding:16px;align-items:flex-start;padding-top:72px;}.auth-card{max-width:100%;padding:26px 20px;border-radius:22px;}.auth-brand h1{font-size:26px;font-weight:720;}.auth-logo-img{width:58px!important;height:58px!important;min-width:58px;min-height:58px;max-width:58px!important;max-height:58px!important;border-radius:16px;}.auth-btn{height:50px;}.algoLegalBox span{font-size:12.5px!important;}}
`}</style>
    </>
  );
}
