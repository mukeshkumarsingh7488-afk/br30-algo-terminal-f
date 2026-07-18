import { Link } from "react-router-dom";
import { Activity, ArrowRight, BadgeCheck, CheckCircle2, DatabaseZap, KeyRound, Landmark, LockKeyhole, PlugZap, Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";

const brokers = [
  { name: "Upstox", status: "Supported", type: "Live Core", color: "green", features: ["OAuth Ready", "Token Flow", "Order API"] },
  { name: "Zerodha", status: "Coming Soon", type: "Planned", color: "orange", features: ["Kite API", "OAuth", "Order Flow"] },
  { name: "Dhan", status: "Coming Soon", type: "Planned", color: "orange", features: ["API Ready", "Data Flow", "Orders"] },
  { name: "Angel One", status: "Coming Soon", type: "Planned", color: "orange", features: ["SmartAPI", "OAuth", "Trading"] },
  { name: "Fyers", status: "Coming Soon", type: "Planned", color: "orange", features: ["API Connect", "Market Data", "Orders"] },
  { name: "Groww", status: "Roadmap", type: "Future", color: "purple", features: ["Research", "Integration", "Testing"] },
  { name: "Alice Blue", status: "Roadmap", type: "Future", color: "purple", features: ["API Study", "Broker Hub", "Automation"] },
  { name: "Shoonya", status: "Roadmap", type: "Future", color: "purple", features: ["API Study", "Trading Flow", "Execution"] },
  { name: "5Paisa", status: "Roadmap", type: "Future", color: "purple", features: ["API Study", "Token Flow", "Orders"] },
];

const securityPoints = [
  { icon: ShieldCheck, title: "Risk First Flow", text: "Live execution is planned only after broker, strategy and risk checks are verified." },
  { icon: LockKeyhole, title: "Encrypted Token Design", text: "Broker access tokens are planned with secure storage and controlled reconnect flow." },
  { icon: KeyRound, title: "OAuth Based Login", text: "Broker connection is designed around OAuth authorization instead of exposing credentials." },
];

const workflow = ["Choose broker", "Authorize securely", "Verify token status", "Enable paper trading", "Confirm risk settings", "Start live engine"];

export default function BrokerIntegrations() {
  return (
    <>
      <div className="broker-page">
        <Navbar />

        <main>
          <section className="broker-hero">
            <div className="broker-orb broker-orb-one" />
            <div className="broker-orb broker-orb-two" />

            <div className="landing-container broker-hero-grid">
              <div className="broker-hero-content">
                <span className="section-tag">
                  <Sparkles size={14} /> Broker Integrations
                </span>

                <h1>
                  Connect Your Broker With <span>Security, Speed & Control.</span>
                </h1>

                <p>BR30 Algo Terminal is built with a scalable broker integration architecture for OAuth connection, token verification, paper trading, live order flow and risk-first automation.</p>

                <div className="broker-hero-actions">
                  <Link to={ROUTES.REGISTER} className="btn-primary">
                    Connect Broker <PlugZap size={18} />
                  </Link>

                  <a href="#brokers-list" className="btn-outline">
                    View Brokers
                  </a>
                </div>
              </div>

              <div className="broker-engine-card">
                <div className="engine-topbar">
                  <span />
                  <span />
                  <span />
                  <strong>BROKER ENGINE</strong>
                </div>

                <div className="engine-status-card">
                  <Activity size={28} />
                  <div>
                    <h3>Connection Status</h3>
                    <p>Upstox architecture ready for broker authorization flow.</p>
                  </div>
                </div>

                <div className="engine-status-grid">
                  <div>
                    <strong>OAuth</strong>
                    <span>Ready</span>
                  </div>

                  <div>
                    <strong>Risk</strong>
                    <span>Required</span>
                  </div>

                  <div>
                    <strong>Live</strong>
                    <span>Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="broker-stats-section">
            <div className="landing-container broker-stats-grid">
              <div className="broker-stat-card">
                <h3>9+</h3>
                <p>Broker Roadmap</p>
              </div>

              <div className="broker-stat-card">
                <h3>OAuth</h3>
                <p>Secure Connect</p>
              </div>

              <div className="broker-stat-card">
                <h3>API</h3>
                <p>Order Ready Flow</p>
              </div>

              <div className="broker-stat-card">
                <h3>Risk</h3>
                <p>Before Live</p>
              </div>
            </div>
          </section>

          <section className="brokers-list-section" id="brokers-list">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Supported & Planned Brokers</span>
                <h2>Broker Connectivity Built For Indian Traders</h2>
                <p>Start with Upstox-ready architecture and expand toward multiple broker support with the same secure BR30 workflow.</p>
              </div>

              <div className="brokers-list-grid">
                {brokers.map((broker) => (
                  <div className="broker-item-card" key={broker.name}>
                    <div className="broker-card-top">
                      <div className="broker-brand-icon">
                        <Landmark size={28} />
                      </div>

                      <div>
                        <h3>{broker.name}</h3>
                        <span className={`broker-status ${broker.color}`}>
                          <BadgeCheck size={14} />
                          {broker.status}
                        </span>
                      </div>
                    </div>

                    <p>{broker.type} integration for broker connection, market workflow and automated execution planning.</p>

                    <div className="broker-features">
                      {broker.features.map((feature) => (
                        <span key={feature}>{feature}</span>
                      ))}
                    </div>

                    <div className="broker-card-bottom">
                      <span>
                        <DatabaseZap size={15} />
                        API Flow
                      </span>

                      <ArrowRight size={18} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="security-section">
            <div className="landing-container security-grid">
              <div className="security-content">
                <span className="section-tag">Security First</span>

                <h2>Broker Connection Is Designed Around Safety</h2>

                <p>BR30 Algo Terminal does not treat broker connect as a simple button. Every connection flow is planned with authentication, token status, risk settings and live execution checks.</p>

                <Link to={ROUTES.REGISTER} className="btn-primary">
                  Start Secure Setup <ShieldCheck size={18} />
                </Link>
              </div>

              <div className="security-card-grid">
                {securityPoints.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="security-card" key={item.title}>
                      <Icon size={28} />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="broker-workflow-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Connection Workflow</span>
                <h2>From Broker Authorization To Live Engine</h2>
                <p>A structured workflow keeps broker connection, testing and live execution controlled from the first step.</p>
              </div>

              <div className="broker-workflow-grid">
                {workflow.map((step, index) => (
                  <div className="workflow-step-card" key={step}>
                    <div className="workflow-step-number">{String(index + 1).padStart(2, "0")}</div>
                    <CheckCircle2 size={22} />
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="broker-final-section">
            <div className="landing-container broker-final-card">
              <Zap size={40} />

              <h2>Ready To Connect Your Broker With BR30?</h2>

              <p>Start your BR30 Algo Terminal journey with broker connect, paper trading, strategy testing and risk-first live automation.</p>

              <Link to={ROUTES.REGISTER} className="btn-primary">
                Get Started <Rocket size={18} />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.broker-page{min-height:100vh;padding-top:82px;overflow-x:hidden;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.broker-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.broker-page .section-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;font-size:13px;font-weight:800;color:#dccdff;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);}
.broker-page .section-heading{max-width:780px;margin:0 auto 46px;text-align:center;}
.broker-page .section-heading h2{font-size:clamp(34px,4vw,52px);line-height:1.1;margin:18px 0;letter-spacing:-1.6px;color:#fff;}
.broker-page .section-heading p{color:#b8acd6;line-height:1.8;font-size:17px;margin:0;}
.broker-page .btn-primary,.broker-page .btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none!important;transition:.35s;font-weight:900;border-radius:999px;min-height:52px;padding:13px 24px;}
.broker-page .btn-primary{background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.broker-page .btn-primary:hover{transform:translateY(-3px);box-shadow:0 26px 70px rgba(124,58,237,.45);}
.broker-page .btn-outline{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;}
.broker-page .btn-outline:hover{background:rgba(255,255,255,.1);transform:translateY(-3px);}
.broker-hero{position:relative;padding:58px 0 82px;overflow:hidden;}
.broker-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
.broker-orb-one{width:420px;height:420px;left:-160px;top:80px;background:rgba(124,58,237,.35);}
.broker-orb-two{width:360px;height:360px;right:-130px;top:150px;background:rgba(217,70,239,.28);}
.broker-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.08fr .92fr;gap:48px;align-items:center;}
.broker-hero-content h1{margin:24px 0 20px;font-size:clamp(44px,6vw,76px);line-height:1.02;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.broker-hero-content h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.broker-hero-content p{max-width:710px;color:#b8acd6;font-size:18px;line-height:1.8;margin:0;}
.broker-hero-actions{display:flex;gap:15px;flex-wrap:wrap;margin-top:34px;}
.broker-engine-card{position:relative;padding:28px;border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.1);box-shadow:0 35px 110px rgba(0,0,0,.45);backdrop-filter:blur(22px);overflow:hidden;}
.broker-engine-card::before{content:"";position:absolute;inset:-2px;background:radial-gradient(circle at top,rgba(217,70,239,.22),transparent 46%);pointer-events:none;}
.engine-topbar,.engine-status-card,.engine-status-grid{position:relative;z-index:2;}
.engine-topbar{display:flex;align-items:center;gap:8px;margin-bottom:24px;}
.engine-topbar span{width:11px;height:11px;border-radius:50%;background:#8b5cf6;}
.engine-topbar strong{margin-left:auto;font-size:13px;color:#e9ddff;}
.engine-status-card{display:flex;gap:16px;align-items:flex-start;padding:22px;border-radius:24px;background:linear-gradient(135deg,rgba(124,58,237,.35),rgba(217,70,239,.16));border:1px solid rgba(255,255,255,.09);}
.engine-status-card svg{color:#fff;flex-shrink:0;}
.engine-status-card h3{margin:0 0 8px;color:#fff;font-size:22px;}
.engine-status-card p{margin:0;color:#d8cbff;line-height:1.65;}
.engine-status-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:20px;}
.engine-status-grid div{padding:18px;border-radius:18px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.08);}
.engine-status-grid strong{display:block;color:#fff;font-size:21px;}
.engine-status-grid span{color:#b8acd6;font-weight:800;font-size:13px;}
.broker-stats-section,.brokers-list-section,.security-section,.broker-workflow-section,.broker-final-section{padding:80px 0;}
.broker-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.broker-stat-card,.broker-item-card,.security-card,.workflow-step-card,.broker-final-card{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.26);}
.broker-stat-card{padding:30px;border-radius:26px;text-align:center;}
.broker-stat-card h3{margin:0 0 8px;font-size:42px;color:#fff;letter-spacing:-1.2px;}
.broker-stat-card p{margin:0;color:#b8acd6;font-weight:800;font-size:14px;}
.brokers-list-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.broker-item-card{border-radius:28px;padding:26px;transition:.35s;}
.broker-item-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);}
.broker-card-top{display:flex;align-items:center;gap:16px;margin-bottom:20px;}
.broker-brand-icon{width:62px;height:62px;border-radius:20px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.35);color:#fff;flex-shrink:0;}
.broker-card-top h3{margin:0 0 8px;color:#fff;font-size:22px;}
.broker-status{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:900;}
.broker-status.green{background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.25);color:#22c55e;}
.broker-status.orange{background:rgba(249,115,22,.12);border:1px solid rgba(249,115,22,.25);color:#fb923c;}
.broker-status.purple{background:rgba(168,85,247,.13);border:1px solid rgba(168,85,247,.25);color:#e9d5ff;}
.broker-item-card p{color:#b8acd6;line-height:1.75;margin:0;}
.broker-features{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0;}
.broker-features span{padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:#d8cbff;font-size:12px;font-weight:850;}
.broker-card-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);color:#fff;}
.broker-card-bottom span{display:flex;align-items:center;gap:8px;color:#d8cbff;font-weight:850;font-size:13px;}
.security-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center;}
.security-content h2{margin:20px 0;font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-1.5px;color:#fff;}
.security-content p{color:#b8acd6;line-height:1.8;font-size:16px;margin:0 0 28px;}
.security-card-grid{display:grid;gap:18px;}
.security-card{border-radius:24px;padding:24px;transition:.35s;}
.security-card:hover{transform:translateX(8px);border-color:rgba(168,85,247,.45);}
.security-card svg{color:#d946ef;margin-bottom:16px;}
.security-card h3{margin:0 0 10px;color:#fff;font-size:21px;}
.security-card p{margin:0;color:#b8acd6;line-height:1.7;}
.broker-workflow-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;}
.workflow-step-card{border-radius:22px;padding:22px;text-align:center;transition:.35s;}
.workflow-step-card:hover{transform:translateY(-6px);border-color:rgba(168,85,247,.45);}
.workflow-step-number{color:rgba(255,255,255,.24);font-size:26px;font-weight:950;margin-bottom:12px;}
.workflow-step-card svg{color:#22c55e;margin-bottom:12px;}
.workflow-step-card strong{display:block;color:#fff;font-size:14px;line-height:1.45;}
.broker-final-card{border-radius:34px;padding:62px;text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.broker-final-card svg{color:#fff;margin-bottom:18px;}
.broker-final-card h2{margin:0;font-size:clamp(34px,4vw,54px);letter-spacing:-1.5px;color:#fff;}
.broker-final-card p{max-width:680px;margin:18px auto 30px;color:#f3e8ff;line-height:1.8;}
.broker-final-card .btn-primary{background:#fff;color:#5b21b6;box-shadow:none;}
@media(max-width:1050px){.broker-hero-grid,.security-grid{grid-template-columns:1fr;}.broker-engine-card{max-width:760px;margin:auto;width:100%;}.broker-stats-grid{grid-template-columns:repeat(2,1fr);}.brokers-list-grid{grid-template-columns:repeat(2,1fr);}.broker-workflow-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:760px){.broker-page{padding-top:72px;}.broker-hero{padding:32px 0 55px;}.broker-hero-grid{gap:30px;}.broker-hero-content h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.broker-hero-content p{font-size:15px;}.broker-hero-actions{flex-direction:column;}.broker-hero-actions a{width:100%;}.broker-engine-card{padding:20px;border-radius:24px;}.engine-status-grid{grid-template-columns:1fr;}.broker-stats-section,.brokers-list-section,.security-section,.broker-workflow-section,.broker-final-section{padding:55px 0;}.broker-stats-grid,.brokers-list-grid,.broker-workflow-grid{grid-template-columns:1fr;gap:16px;}.broker-stat-card,.broker-item-card,.security-card,.workflow-step-card{border-radius:22px;padding:22px;}.security-card:hover{transform:translateY(-6px);}.security-content h2,.broker-final-card h2{font-size:clamp(30px,9vw,42px);}.broker-final-card{padding:34px 24px;border-radius:24px;}}
@media(max-width:430px){.broker-hero-content h1{font-size:40px;}.engine-topbar strong{font-size:11px;}.broker-card-top{align-items:flex-start;}.broker-brand-icon{width:56px;height:56px;}}
`}</style>
    </>
  );
}
