import { Link } from "react-router-dom";
import { ArrowRight, Bot, ShieldCheck, Zap, Activity } from "lucide-react";
import { ROUTES } from "../../constants/routes";

export default function Hero() {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-bg-glow hero-glow-one" />
        <div className="hero-bg-glow hero-glow-two" />

        <div className="landing-container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot" />
              BR30 Algo Terminal V1.0 Production
            </div>

            <h1>
              Automate Your Trading With <span>Discipline, Speed & Safety.</span>
            </h1>

            <p>BR30 Algo Terminal is a modern trading automation platform built for strategy building, broker connection, paper trading, live algo execution, risk control, and performance tracking.</p>

            <div className="hero-actions">
              <Link to={ROUTES.REGISTER} className="btn-primary hero-btn">
                Get Started <ArrowRight size={18} />
              </Link>

              <a href="#features" className="btn-outline hero-btn">
                Explore Features
              </a>
            </div>

            <div className="hero-trust">
              <div>
                <strong>5+</strong>
                <span>Broker Ready</span>
              </div>

              <div>
                <strong>24×7</strong>
                <span>Cloud Monitoring</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Risk First Flow</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="terminal-card">
              <div className="terminal-topbar">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <p>BR30 LIVE ENGINE</p>
                <small>Connected</small>
              </div>

              <div className="terminal-status">
                <div>
                  <span>Trade Engine</span>
                  <strong>OFF</strong>
                </div>

                <div>
                  <span>Broker</span>
                  <strong className="green-text">Upstox Ready</strong>
                </div>
              </div>

              <div className="terminal-chart">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="terminal-modules">
                <div className="module-card active">
                  <Bot size={22} />

                  <div>
                    <strong>Strategy Builder</strong>
                    <span>Create rule based algo</span>
                  </div>
                </div>

                <div className="module-card">
                  <ShieldCheck size={22} />

                  <div>
                    <strong>Risk Engine</strong>
                    <span>Daily loss & max trade safety</span>
                  </div>
                </div>

                <div className="module-card">
                  <Zap size={22} />

                  <div>
                    <strong>Live Execution</strong>
                    <span>Auto order placement ready</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-one">
              <Activity size={18} />

              <div>
                <strong>Paper Mode</strong>
                <span>Testing before live</span>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <ShieldCheck size={18} />

              <div>
                <strong>Safety Check</strong>
                <span>Required before engine ON</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
.hero-section{position:relative;padding:30px 0 70px;overflow:hidden;scroll-margin-top:82px;}
.hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.hero-bg-glow{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0;}
.hero-glow-one{width:420px;height:420px;left:-160px;top:80px;background:rgba(124,58,237,.35);}
.hero-glow-two{width:360px;height:360px;right:-120px;top:160px;background:rgba(217,70,239,.28);}
.hero-content,.hero-visual{position:relative;z-index:2;}
.hero-badge{display:inline-flex;align-items:center;gap:9px;padding:9px 14px;border-radius:999px;color:#d8c8ff;font-weight:800;font-size:13px;background:rgba(124,58,237,.14);border:1px solid rgba(168,85,247,.28);}
.pulse-dot{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 8px rgba(34,197,94,.12);}
.hero-content h1{margin:24px 0 20px;font-size:clamp(42px,6vw,72px);line-height:.98;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.hero-content h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.hero-content p{color:#b8acd6;font-size:17px;line-height:1.8;max-width:660px;}
.hero-actions{display:flex;gap:14px;margin-top:32px;flex-wrap:wrap;}
.hero-btn{min-height:52px;}
.hero-trust{display:flex;gap:22px;margin-top:36px;flex-wrap:wrap;}
.hero-trust div{padding:14px 18px;border-radius:18px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(16px);}
.hero-trust strong{display:block;font-size:24px;color:#fff;}
.hero-trust span{color:#b8acd6;font-size:13px;font-weight:700;}
.terminal-card{position:relative;overflow:hidden;border-radius:30px;padding:22px;background:linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.035));border:1px solid rgba(255,255,255,.105);box-shadow:0 30px 100px rgba(0,0,0,.42);backdrop-filter:blur(22px);}
.terminal-card::before{content:"";position:absolute;inset:-2px;background:radial-gradient(circle at top,rgba(217,70,239,.24),transparent 45%);pointer-events:none;}
.terminal-topbar{position:relative;display:flex;align-items:center;justify-content:space-between;}
.window-dots{display:flex;gap:7px;}
.window-dots span{width:10px;height:10px;border-radius:50%;background:#7c3aed;}
.terminal-topbar p{margin:0;color:#eee;font-size:13px;font-weight:900;}
.terminal-topbar small{color:#22c55e;font-weight:900;font-size:12px;}
.terminal-status{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:24px 0;}
.terminal-status div{border-radius:18px;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.08);padding:16px;}
.terminal-status span{color:#afa3cc;display:block;font-size:13px;}
.terminal-status strong{font-size:20px;color:#fff;}
.green-text{color:#22c55e!important;}
.terminal-chart{height:170px;display:flex;align-items:end;gap:12px;padding:18px;border-radius:24px;background:rgba(124,58,237,.09);border:1px solid rgba(168,85,247,.16);}
.terminal-chart span{flex:1;border-radius:999px 999px 6px 6px;background:linear-gradient(180deg,#d946ef,#7c3aed);min-height:35px;}
.terminal-chart span:nth-child(2){height:70px;}
.terminal-chart span:nth-child(3){height:110px;}
.terminal-chart span:nth-child(4){height:80px;}
.terminal-chart span:nth-child(5){height:135px;}
.terminal-chart span:nth-child(6){height:95px;}
.terminal-chart span:nth-child(7){height:150px;}
.terminal-chart span:nth-child(8){height:115px;}
.terminal-modules{display:grid;gap:12px;margin-top:18px;}
.module-card{display:flex;gap:12px;align-items:center;padding:14px;border-radius:18px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.055);}
.module-card strong{display:block;color:#fff;}
.module-card span{color:#b8acd6;font-size:13px;}
.floating-card{position:absolute;display:flex;gap:12px;align-items:center;color:#fff;backdrop-filter:blur(18px);border-radius:18px;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.08);padding:16px;box-shadow:0 18px 55px rgba(0,0,0,.35);}
.floating-card strong{display:block;color:#fff;}
.floating-card span{color:#b8acd6;font-size:13px;}
.floating-card-one{left:-28px;bottom:95px;}
.floating-card-two{right:-20px;top:92px;}
@media(max-width:1050px){.hero-grid{grid-template-columns:1fr;gap:42px;}.hero-content{text-align:left;}.hero-visual{width:100%;max-width:100%;margin:0;}.terminal-card{width:100%;}}
@media(max-width:760px){.hero-section{padding:15px 0 50px;scroll-margin-top:72px;}.hero-grid{gap:28px;}.hero-content h1{font-size:clamp(40px,12vw,58px);letter-spacing:-1.3px;}.hero-actions{gap:12px;}.hero-trust{gap:12px;}.hero-trust div{flex:1;min-width:135px;}.hero-visual{width:100%;max-width:100%;margin:0;}.terminal-card{width:100%;padding:18px;border-radius:24px;}.terminal-status{grid-template-columns:1fr;}.floating-card{position:static;margin-top:14px;}.terminal-chart{height:140px;gap:8px;padding:14px;}}
@media(max-width:430px){.hero-section{padding:10px 0 40px;}.hero-badge{font-size:11px;padding:8px 11px;}.hero-content p{font-size:15px;}.hero-actions a{width:100%;}.hero-trust{display:grid;grid-template-columns:1fr;}.hero-visual{width:100%;max-width:100%;margin:0;}.terminal-card{width:100%;padding:16px;border-radius:20px;}.terminal-topbar p{font-size:11px;}.terminal-topbar small{font-size:11px;}}
`}</style>
    </>
  );
}
