import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function CTA() {
  return (
    <>
      <section className="cta-section">
        <div className="landing-container">
          <div className="cta-card">
            <div className="cta-glow" />

            <div className="cta-content">
              <span className="section-tag">Start Your Algo Journey</span>

              <h2>Build, Test And Automate Your Trading With BR30 Algo Terminal.</h2>

              <p>Create your account, connect your broker, test strategies in paper mode and enable live trading only after safety verification.</p>

              <div className="cta-actions">
                <Link to={ROUTES.REGISTER} className="btn-primary">
                  Get Started <ArrowRight size={18} />
                </Link>

                <a href="#features" className="btn-outline">
                  Explore Platform
                </a>
              </div>
            </div>

            <div className="cta-mini-cards">
              <div>
                <ShieldCheck size={22} />
                <strong>Risk First</strong>
                <span>Safety before live execution</span>
              </div>

              <div>
                <Zap size={22} />
                <strong>Fast Execution</strong>
                <span>Built for broker automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
.cta-section{padding:90px 0 110px;}
.cta-card{position:relative;overflow:hidden;padding:55px;border-radius:34px;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);display:grid;grid-template-columns:1.2fr .8fr;gap:42px;align-items:center;box-shadow:0 40px 120px rgba(124,58,237,.38);}
.cta-glow{position:absolute;width:420px;height:420px;right:-160px;top:-160px;border-radius:50%;background:rgba(255,255,255,.14);filter:blur(80px);pointer-events:none;}
.cta-content,.cta-mini-cards{position:relative;z-index:2;}
.cta-content h2{margin:20px 0;font-size:clamp(38px,4vw,58px);line-height:1.08;letter-spacing:-1.7px;color:#fff;}
.cta-content p{margin:0;color:#f4ebff;font-size:17px;line-height:1.8;max-width:640px;}
.cta-actions{display:flex;gap:16px;flex-wrap:wrap;margin-top:34px;}
.cta-actions .btn-primary{background:#fff;color:#5b21b6;font-weight:900;box-shadow:none;}
.cta-actions .btn-outline{border-color:rgba(255,255,255,.28);color:#fff;background:rgba(255,255,255,.08);}
.cta-actions .btn-outline:hover{background:#fff;color:#5b21b6;}
.cta-mini-cards{display:grid;gap:18px;}
.cta-mini-cards div{padding:22px;border-radius:22px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(18px);}
.cta-mini-cards svg{color:#fff;margin-bottom:14px;}
.cta-mini-cards strong{display:block;margin-bottom:8px;font-size:18px;color:#fff;}
.cta-mini-cards span{display:block;color:#f3e8ff;font-size:14px;line-height:1.7;}
@media(max-width:1050px){.cta-card{grid-template-columns:1fr;padding:42px;}}
@media(max-width:760px){.cta-section{padding:60px 0 80px;}.cta-card{padding:28px;border-radius:24px;gap:28px;}.cta-content h2{font-size:clamp(30px,9vw,42px);}.cta-content p{font-size:15px;}.cta-actions{flex-direction:column;}.cta-actions a{width:100%;justify-content:center;}.cta-mini-cards div{padding:18px;}}
`}</style>
    </>
  );
}
