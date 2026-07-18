import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { APP_NAME } from "../config/app";
import lightLogo from "../assets/logo-light.png";

export default function ResetPassword() {
  return (
    <>
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-brand">
            <img className="auth-logo-img" src={lightLogo} alt="BR30" />

            <h1>Reset Password</h1>

            <p>{APP_NAME} now uses email OTP for secure password reset.</p>
          </div>

          <div className="auth-success">Please request a password reset OTP using your registered email.</div>

          <Link className="auth-btn auth-back-btn" to={ROUTES.FORGOT_PASSWORD}>
            Go to Forgot Password
          </Link>

          <p className="auth-footer">
            Remember your password? <Link to={ROUTES.LOGIN}>Sign In</Link>
          </p>
        </section>
      </main>

      <style>{`
.auth-page{min-height:100vh;width:100%;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(circle at top center,rgba(176,32,240,.16),transparent 38%),#fbf8ff;color:#101014;}
.auth-card{width:100%;max-width:470px;background:#fff;border:1px solid rgba(160,32,240,.14);border-radius:24px;padding:34px 32px;box-shadow:0 24px 70px rgba(160,32,240,.12);}
.auth-brand{text-align:center;margin-bottom:24px;}
.auth-logo-img{width:66px!important;height:66px!important;display:block;margin:0 auto 18px;border-radius:18px;object-fit:cover;box-shadow:0 14px 34px rgba(160,32,240,.18);}
.auth-brand h1{margin:0 0 8px;font-size:30px;font-weight:720;letter-spacing:-.035em;color:#101014;}
.auth-brand p{margin:0;color:#65726d;font-size:15px;line-height:1.55;}
.auth-success{padding:14px 16px;margin-bottom:22px;border-radius:14px;background:rgba(123,44,255,.08);border:1px solid rgba(123,44,255,.22);color:#7b2cff;font-size:14px;font-weight:650;text-align:center;}
.auth-btn{display:flex;align-items:center;justify-content:center;width:100%;height:52px;border:0;border-radius:15px;background:linear-gradient(135deg,#ff2bd6,#7b2cff);color:#fff;font-size:15px;font-weight:850;text-decoration:none;box-shadow:0 16px 38px rgba(160,32,240,.22);transition:.25s;}
.auth-btn:hover{transform:translateY(-2px);}
.auth-footer{text-align:center;margin:24px 0 0;color:#65726d;}
.auth-footer a{color:#a020f0;text-decoration:none;font-weight:700;}
.auth-footer a:hover{text-decoration:underline;}
@media(max-width:560px){
.auth-page{padding:16px;align-items:flex-start;padding-top:72px;}
.auth-card{max-width:100%;padding:26px 20px;border-radius:22px;}
.auth-brand h1{font-size:26px;font-weight:720;}
.auth-logo-img{width:58px!important;height:58px!important;border-radius:16px;}
.auth-btn{height:50px;}
}
      `}</style>
    </>
  );
}
