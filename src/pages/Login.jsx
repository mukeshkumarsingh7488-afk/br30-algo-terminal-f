import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../api/authApi";
import useAuth from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import { APP_NAME } from "../config/app";
import lightLogo from "../assets/logo-light.png";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email aur password required.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await loginUser(form);

      if (!res?.token || !res?.user) {
        throw new Error("Invalid login response");
      }

      login({ token: res.token, user: res.user });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please check your email address and password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-brand">
            <img className="auth-logo-img" src={lightLogo} alt="BR30" />
            <h1>{APP_NAME}</h1>
            <p>Secure login to your trading terminal.</p>
          </div>

          {error && <div className="auth-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email
              <input name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} autoComplete="email" />
            </label>

            <label>
              Password
              <div className="auth-password-field">
                <input name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={form.password} onChange={handleChange} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} title={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="auth-row">
              <label className="auth-check">
                <input type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)} />
                Show password
              </label>

              <Link to="/forgot-password">Forgot?</Link>
            </div>

            <button className="auth-btn" type="submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-footer">
            New user? <Link to={ROUTES.REGISTER}>Create account</Link>
          </p>
        </section>
      </main>

      <style>{`
.auth-page{min-height:100vh;width:100%;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(circle at top center,rgba(176,32,240,.16),transparent 38%),#fbf8ff;color:#101014;}
.auth-card{width:100%;max-width:475px;background:#fff;border:1px solid rgba(160,32,240,.14);border-radius:24px;padding:34px 32px;box-shadow:0 24px 70px rgba(160,32,240,.12);}
.auth-brand{text-align:center;margin-bottom:24px;}
.auth-logo-img{width:66px;height:66px;border-radius:18px;object-fit:cover;display:block;margin:0 auto 18px;box-shadow:0 14px 34px rgba(160,32,240,.18);}
.auth-brand h1{margin:0 0 8px;font-size:30px;font-weight:720;letter-spacing:-.035em;color:#101014;}
.auth-brand p{margin:0;color:#65726d;font-size:15px;line-height:1.55;}
.auth-alert{border:1px solid rgba(255,77,79,.28);background:rgba(255,77,79,.08);color:#d9363e;border-radius:14px;padding:12px 14px;font-size:14px;font-weight:650;margin-bottom:16px;}
.auth-form{display:grid;gap:15px;}
.auth-form label{display:grid;gap:8px;color:#101014;font-size:14px;font-weight:650;text-align:left;}
.auth-form input{width:100%;height:50px;border:1px solid #e8dff0;background:#fff;color:#101014;border-radius:15px;padding:0 14px;outline:0;font-size:14px;}
.auth-form input:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
.auth-password-field{position:relative;}
.auth-password-field input{padding-right:48px;}
.auth-password-field button{position:absolute;right:9px;top:50%;transform:translateY(-50%);width:34px;height:34px;border:0;border-radius:10px;background:rgba(160,32,240,.1);color:#a020f0;display:grid;place-items:center;cursor:pointer;}
.auth-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:2px;}
.auth-check{display:flex!important;grid-template-columns:unset!important;flex-direction:row;align-items:center;gap:8px!important;color:#65726d!important;font-weight:550!important;}
.auth-check input{width:16px!important;height:16px!important;accent-color:#a020f0;}
.auth-row a,.auth-footer a{color:#a020f0;text-decoration:none;font-weight:700;}
.auth-row a:hover,.auth-footer a:hover{text-decoration:underline;}
.auth-btn{height:52px;border:0;border-radius:15px;background:linear-gradient(135deg,#ff2bd6,#7b2cff);color:#fff;font-size:15px;font-weight:850;cursor:pointer;margin-top:6px;box-shadow:0 16px 38px rgba(160,32,240,.22);}
.auth-btn:disabled{opacity:.65;cursor:not-allowed;}
.auth-footer{text-align:center;margin:24px 0 0;color:#65726d;}
@media(max-width:560px){.auth-page{padding:16px;align-items:flex-start;padding-top:72px;}.auth-card{padding:26px 20px;border-radius:22px;}.auth-brand h1{font-size:26px;font-weight:720;}.auth-logo-img{width:58px;height:58px;border-radius:16px;}.auth-row{align-items:flex-start;}.auth-btn{height:50px;}}
      `}</style>
    </>
  );
}
