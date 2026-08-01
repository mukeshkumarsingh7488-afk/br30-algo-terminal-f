import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ROUTES } from "../../constants/routes";
import logo from "../../assets/logo-light.png";
import { subscribeNewsletter } from "../../api/newsletterApi";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFooterSubscribe = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address.",
        confirmButtonColor: "#7c3aed",
        background: "#080313",
        color: "#ffffff",
      });
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#7c3aed",
        background: "#080313",
        color: "#ffffff",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await subscribeNewsletter({
        email: cleanEmail,
        source: "footer-newsletter",
      });

      setEmail("");

      Swal.fire({
        icon: "success",
        title: "Subscribed Successfully",
        text: res?.message || "Thank you for subscribing to BR30 Algo Terminal.",
        confirmButtonText: "Great",
        confirmButtonColor: "#7c3aed",
        background: "#080313",
        color: "#ffffff",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: error?.response?.data?.message || error?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#7c3aed",
        background: "#080313",
        color: "#ffffff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer className="footer-section">
        <div className="landing-container footer-grid">
          <div className="footer-brand">
            <Link to={ROUTES.HOME} className="landing-logo">
              <div className="landing-logo-icon">
                <img src={logo} alt="BR30 Logo" />
              </div>

              <div className="landing-logo-text">
                <span>BR30</span>
                <small>Algo Terminal</small>
              </div>
            </Link>

            <p>A modern trading automation platform built for broker connection, strategy building, paper trading, live algo execution and risk-first trading discipline.</p>

            <div className="footer-badges">
              <span>
                <i className="fa-solid fa-shield-halved"></i> SSL Secured
              </span>
              <span>
                <i className="fa-solid fa-shield-heart"></i> Risk First
              </span>
              <span>
                <i className="fa-solid fa-cloud"></i> Cloud Ready
              </span>
            </div>

            <div className="footer-socials">
              <a href="https://www.youtube.com/@br30traderofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="https://www.facebook.com/share/1DDJYGYYDf/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/br30Traderofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://x.com/MukeshKuma48159" target="_blank" rel="noopener noreferrer" aria-label="X Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#brokers">Brokers</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <Link to={ROUTES.INSIGHTS}>Insights</Link>
            <Link to={ROUTES.WHATS_NEW}>What's New</Link>
            <Link to={ROUTES.ROADMAP}>Roadmap</Link>
            <Link to={ROUTES.DOCUMENTATION}>Documentation</Link>
            <Link to={ROUTES.CHANGELOG}>Changelog</Link>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <Link to={ROUTES.ABOUT}>About Us</Link>
            <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
            <Link to={ROUTES.TERMS_CONDITIONS}>Terms & Conditions</Link>
            <Link to={ROUTES.REFUND_POLICY}>Refund Policy</Link>
            <Link to={ROUTES.DISCLAIMER}>Disclaimer</Link>
          </div>

          <div className="footer-links footer-contact">
            <h4>Contact</h4>

            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support.br30trader@gmail.com&su=BR30%20Algo%20Terminal%20Support&body=Hello%20BR30%20Algo%20Support,%0A%0AI%20need%20help%20with%20BR30%20Algo%20Terminal.%0A%0AName:%20%0AMessage:%20" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-envelope"></i>
              support.br30trader@gmail.com
            </a>

            <span>
              <i className="fa-solid fa-location-dot"></i> Bangalore, India
            </span>
            <a href="https://br-30-group-com.vercel.app/contact" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-building"></i> BR30 Group
            </a>

            <div className="footer-status">
              <strong>
                <i></i> All Systems Operational
              </strong>
              <small>Updated just now</small>
            </div>

            <div className="footer-support">
              <i className="fa-solid fa-headset"></i>
              <div>
                <strong>Support Hours</strong>
                <span>Mon – Sat</span>
                <span>9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        <div className="landing-container footer-newsletter">
          <div>
            <h3>Join 3,000+ Traders</h3>
            <p>Get BR30 insights, platform updates and strategy ideas in your inbox.</p>
          </div>

          <form onSubmit={handleFooterSubscribe}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" autoComplete="email" disabled={loading} />

            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Subscribe Now"} <i className="fa-solid fa-arrow-right"></i>
            </button>

            <small>
              <i className="fa-solid fa-lock"></i> No spam. Unsubscribe anytime.
            </small>
          </form>
        </div>

        <div className="landing-container footer-bottom">
          <div>
            <p>© {year} BR30 Algo Terminal. All rights reserved.</p>
            <small>Trading involves risk. Past performance does not guarantee future results.</small>
          </div>

          <div className="footer-bottom-info">
            <div>
              <span>
                <i className="fa-solid fa-shield-halved"></i> Risk Disclaimer
              </span>
              <small>All trading involves risk. Please trade responsibly.</small>
            </div>

            <div>
              <span>
                <i className="fa-solid fa-cloud"></i> Cloud Infrastructure
              </span>
              <small>Hosted on secure cloud infrastructure with 99.9% uptime.</small>
            </div>

            <div>
              <span>
                <i className="fa-solid fa-code"></i> Version 1.0.0
              </span>
              <small>Build v1.0.0 Production</small>
            </div>
          </div>

          <p>Built with ❤️ by BR30 Group</p>
        </div>
      </footer>

      <style>{`
.footer-section{padding:70px 0 25px;border-top:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at top left,rgba(124,58,237,.16),transparent 32%),rgba(6,3,15,.98);}
.footer-grid{display:grid;grid-template-columns:1.7fr .8fr 1fr 1fr 1.35fr;gap:38px;}
.footer-brand p{margin:22px 0;color:#b8acd6;line-height:1.8;font-size:15px;max-width:420px;}
.footer-badges{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0;}
.footer-badges span{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#d8cbff;font-size:14px;}
.footer-badges i{color:#22c55e;}
.footer-socials{display:flex;align-items:center;gap:12px;margin-top:22px;margin-bottom:10px;flex-wrap:wrap;}
.footer-socials a{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;text-decoration:none;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:#d8cbff;transition:.35s;font-size:19px;}
.footer-socials a:hover{background:linear-gradient(135deg,#7c3aed,#d946ef);border-color:transparent;color:#fff;transform:translateY(-5px);}
.footer-links h4{position:relative;margin:0 0 28px;font-size:18px;color:#fff;}
.footer-links h4::after{content:"";position:absolute;left:0;bottom:-11px;width:38px;height:3px;border-radius:999px;background:linear-gradient(135deg,#7c3aed,#d946ef);}
.footer-links a,.footer-links span{display:flex;align-items:center;gap:9px;margin-bottom:13px;text-decoration:none;color:#b8acd6;font-size:15px;transition:.3s;line-height:1.45;}
.footer-links a:hover{color:#fff;padding-left:6px;}
.footer-contact i{color:#d8cbff;}
.footer-status,.footer-support{margin-top:18px;padding:16px;border-radius:18px;background:rgba(255,255,255,.04);border:1px solid rgba(168,85,247,.22);}
.footer-status strong{display:flex;align-items:center;gap:9px;color:#22c55e;font-size:15px;}
.footer-status strong i{width:10px;height:10px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 7px rgba(34,197,94,.12);}
.footer-status small{display:block;margin-top:8px;color:#b8acd6;font-size:13px;}
.footer-support{display:flex;align-items:center;gap:14px;}
.footer-support>i{font-size:28px;color:#a855f7;}
.footer-support strong{display:block;color:#fff;margin-bottom:5px;}
.footer-support span{margin:0;color:#b8acd6;font-size:14px;}
.footer-newsletter{margin-top:58px;padding:30px;border-radius:26px;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.03));border:1px solid rgba(168,85,247,.2);display:grid;grid-template-columns:.9fr 1.3fr;gap:28px;align-items:center;}
.footer-newsletter h3{margin:0 0 10px;color:#fff;font-size:24px;}
.footer-newsletter p{margin:0;color:#b8acd6;line-height:1.7;}
.footer-newsletter form{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;}
.footer-newsletter input{height:54px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);outline:0;color:#fff;padding:0 20px;font-weight:700;}
.footer-newsletter input::placeholder{color:#9f94c0;}
.footer-newsletter button{height:54px;border:0;border-radius:999px;padding:0 24px;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;font-weight:950;cursor:pointer;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.footer-newsletter small{grid-column:1/-1;color:#9f94c0;display:flex;align-items:center;gap:8px;margin-left:8px;}
.footer-newsletter button:disabled,.footer-newsletter input:disabled{opacity:.75;cursor:not-allowed;}
.footer-bottom{margin-top:45px;padding-top:26px;border-top:1px solid rgba(255,255,255,.08);display:grid;grid-template-columns:1.1fr 1.4fr auto;gap:24px;align-items:start;}
.footer-bottom p,.footer-bottom small{margin:0;color:#9f94c0;font-size:14px;line-height:1.7;}
.footer-bottom-info{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.footer-bottom-info div{display:grid;gap:7px;}
.footer-bottom-info span{display:flex;align-items:center;gap:9px;color:#fff;font-weight:900;font-size:14px;}
.footer-bottom-info small{color:#9f94c0;font-size:13px;line-height:1.55;}
.footer-bottom-info i{color:#a855f7;}
@media(max-width:1180px){.footer-grid{grid-template-columns:repeat(3,1fr);}.footer-brand{grid-column:1/-1;}.footer-bottom{grid-template-columns:1fr;}.footer-bottom-info{grid-template-columns:repeat(3,1fr);}}
@media(max-width:760px){.footer-section{padding:55px 0 20px;}.footer-grid{grid-template-columns:1fr 1fr;gap:30px 24px;align-items:start;}.footer-brand{grid-column:1/-1;}.footer-links:nth-of-type(2){grid-column:1/2;}.footer-links:nth-of-type(3){grid-column:2/3;}.footer-links:nth-of-type(4){grid-column:1/2;text-align:left;}.footer-links:nth-of-type(4) h4::after{left:0;transform:none;}.footer-links:nth-of-type(4) a{justify-content:flex-start;}.footer-contact{grid-column:2/3;text-align:left;}.footer-newsletter{grid-column:1/-1;margin-top:18px;grid-template-columns:1fr;padding:22px;border-radius:22px;}.footer-newsletter form{grid-template-columns:1fr;}.footer-newsletter button{width:100%;}.footer-bottom{text-align:center;grid-template-columns:1fr;}.footer-bottom-info{grid-template-columns:1fr;}.footer-bottom-info span{justify-content:center;}.footer-socials{justify-content:flex-start;margin-bottom:16px;}}
@media(max-width:430px){.footer-grid{grid-template-columns:1fr 1fr;gap:28px 18px;}.footer-links a,.footer-links span{font-size:14px;}.footer-contact{grid-column:2/3;}.footer-newsletter{margin-top:18px;}}
`}</style>
    </>
  );
}
