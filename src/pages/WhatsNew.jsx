import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Bot, CheckCircle2, Clock3, DatabaseZap, FileBarChart2, PlugZap, Rocket, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";

const releaseStats = [
  { value: "V1.0", label: "Production Release" },
  { value: "5+", label: "Broker Architecture" },
  { value: "8", label: "Core Modules" },
  { value: "100%", label: "Risk First Flow" },
];

const latestUpdates = [
  {
    icon: PlugZap,
    title: "Broker Connect Flow",
    text: "Secure broker connection architecture with OAuth-ready flow, token handling and reconnect planning.",
    badge: "Live Core",
  },
  {
    icon: Bot,
    title: "Strategy Builder",
    text: "Create rule-based strategy workflows for testing, paper trading and future live automation.",
    badge: "Updated",
  },
  {
    icon: ShieldCheck,
    title: "Live Safety Engine",
    text: "Live algo execution is protected by broker status, strategy validation and risk verification checks.",
    badge: "Risk First",
  },
];

const modules = [
  { icon: PlugZap, title: "Broker Connect", text: "Upstox-ready architecture with scalable broker integration planning." },
  { icon: Bot, title: "Strategy Builder", text: "Build and manage trading logic in a clean workflow." },
  { icon: BarChart3, title: "Backtesting", text: "Test strategy performance before real execution." },
  { icon: DatabaseZap, title: "Paper Trading", text: "Run strategies safely without risking real capital." },
  { icon: Zap, title: "Live Algo", text: "Enable real execution only after safety verification." },
  { icon: FileBarChart2, title: "Reports", text: "Track trade logs, performance and analytics." },
];

const timeline = [
  {
    version: "01",
    title: "V1.0 Production Foundation",
    text: "Landing page, authentication flow, dashboard structure and core terminal modules prepared.",
    status: "Completed",
  },
  {
    version: "02",
    title: "Broker Connectivity",
    text: "Broker connect page and Upstox-first architecture designed for scalable integrations.",
    status: "In Progress",
  },
  {
    version: "03",
    title: "Strategy & Backtest Flow",
    text: "Strategy builder, backtesting and paper trading modules prepared for professional workflow.",
    status: "Active",
  },
  {
    version: "04",
    title: "Risk First Live Engine",
    text: "Live trading flow protected with daily loss, max trades and confirmation-based execution.",
    status: "Planned",
  },
];

const roadmap = ["Zerodha integration", "Dhan integration", "Angel One integration", "Advanced strategy templates", "Cloud logs & monitoring", "AI powered trade insights"];

const comparison = [
  { label: "Manual execution delay", br30: "Reduced", other: "High" },
  { label: "Risk checks before live", br30: "Required", other: "Often skipped" },
  { label: "Paper testing flow", br30: "Built-in", other: "Separate tools" },
  { label: "Reports & logs", br30: "Centralized", other: "Scattered" },
  { label: "Broker automation", br30: "Ready architecture", other: "Manual setup" },
];

export default function WhatsNew() {
  return (
    <>
      <div className="whats-page">
        <Navbar />

        <main>
          <section className="whats-hero">
            <div className="whats-orb whats-orb-one" />
            <div className="whats-orb whats-orb-two" />

            <div className="landing-container whats-hero-grid">
              <div className="whats-hero-content">
                <span className="section-tag">
                  <Sparkles size={14} /> What’s New
                </span>

                <h1>
                  Latest Updates Inside <span>BR30 Algo Terminal.</span>
                </h1>

                <p>Explore the latest BR30 Algo Terminal improvements, new modules, production upgrades and upcoming roadmap built for safer and smarter trading automation.</p>

                <div className="whats-hero-actions">
                  <Link to={ROUTES.REGISTER} className="btn-primary">
                    Explore Latest <Rocket size={18} />
                  </Link>

                  <a href="#roadmap" className="btn-outline">
                    View Roadmap
                  </a>
                </div>
              </div>

              <div className="release-card">
                <div className="release-top">
                  <div>
                    <span>Current Release</span>
                    <h3>BR30 Algo Terminal V1.0</h3>
                  </div>

                  <div className="release-live">
                    <span />
                    Production
                  </div>
                </div>

                <div className="release-meter">
                  <div className="release-meter-fill" />
                </div>

                <div className="release-list">
                  <div>
                    <CheckCircle2 size={18} />
                    Broker connect architecture ready
                  </div>

                  <div>
                    <CheckCircle2 size={18} />
                    Risk-first live engine flow
                  </div>

                  <div>
                    <CheckCircle2 size={18} />
                    Paper trading and reporting structure
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="release-stats-section">
            <div className="landing-container release-stats-grid">
              {releaseStats.map((item) => (
                <div className="release-stat-card" key={item.label}>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="latest-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Latest Release Highlights</span>
                <h2>Built For A Cleaner, Safer Trading Workflow</h2>
                <p>The latest BR30 build focuses on broker connection, strategy control, risk checks and production-ready automation flow.</p>
              </div>

              <div className="latest-grid">
                {latestUpdates.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="latest-card" key={item.title}>
                      <div className="latest-badge">{item.badge}</div>

                      <div className="latest-icon">
                        <Icon size={26} />
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="modules-section">
            <div className="landing-container modules-grid-layout">
              <div className="modules-content">
                <span className="section-tag">New Platform Modules</span>

                <h2>Everything Is Moving Toward One Complete Terminal</h2>

                <p>BR30 Algo Terminal is not just one feature. It is a complete workflow that connects every important part of trading automation into one system.</p>

                <Link to={ROUTES.REGISTER} className="btn-primary">
                  Start With BR30 <ArrowRight size={18} />
                </Link>
              </div>

              <div className="modules-grid">
                {modules.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="module-update-card" key={item.title}>
                      <Icon size={25} />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="timeline-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Release Timeline</span>
                <h2>Step By Step Product Evolution</h2>
                <p>Every release is planned around real trader needs — broker, strategy, testing, safety and execution.</p>
              </div>

              <div className="timeline-list">
                {timeline.map((item) => (
                  <div className="timeline-card" key={item.version}>
                    <div className="timeline-number">{item.version}</div>

                    <div className="timeline-content">
                      <div className="timeline-top">
                        <h3>{item.title}</h3>
                        <span>{item.status}</span>
                      </div>

                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="roadmap-section" id="roadmap">
            <div className="landing-container roadmap-grid">
              <div className="roadmap-content">
                <span className="section-tag">Upcoming Roadmap</span>

                <h2>What’s Coming Next</h2>

                <p>BR30 Algo Terminal will keep evolving with more broker support, better automation controls, analytics and intelligent trading tools.</p>
              </div>

              <div className="roadmap-list">
                {roadmap.map((item) => (
                  <div className="roadmap-item" key={item}>
                    <Clock3 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="comparison-section">
            <div className="landing-container comparison-grid">
              <div className="comparison-left">
                <span className="section-tag">Why Updates Matter</span>

                <h2>Manual Workflow Vs BR30 Terminal</h2>

                <p>New updates are focused on reducing trading mistakes, improving discipline and making automation safer before live execution.</p>
              </div>

              <div className="comparison-card">
                <div className="comparison-head">
                  <span>Workflow</span>
                  <strong>BR30</strong>
                  <strong>Manual</strong>
                </div>

                {comparison.map((item) => (
                  <div className="comparison-row" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.br30}</strong>
                    <em>{item.other}</em>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="whats-final-section">
            <div className="landing-container whats-final-card">
              <TrendingUp size={40} />

              <h2>Stay Updated With Every BR30 Release</h2>

              <p>Every new update moves BR30 Algo Terminal closer to a complete broker-connected, risk-first and automation-ready trading ecosystem.</p>

              <Link to={ROUTES.REGISTER} className="btn-primary">
                Get Started
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.whats-page{min-height:100vh;padding-top:82px;overflow-x:hidden;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.whats-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.whats-page .section-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;font-size:13px;font-weight:800;color:#dccdff;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);}
.whats-page .section-heading{max-width:760px;margin:0 auto 46px;text-align:center;}
.whats-page .section-heading h2{font-size:clamp(34px,4vw,52px);line-height:1.1;margin:18px 0;letter-spacing:-1.6px;color:#fff;}
.whats-page .section-heading p{color:#b8acd6;line-height:1.8;font-size:17px;margin:0;}
.whats-page .btn-primary,.whats-page .btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none!important;transition:.35s;font-weight:900;border-radius:999px;min-height:52px;padding:13px 24px;}
.whats-page .btn-primary{background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.whats-page .btn-primary:hover{transform:translateY(-3px);box-shadow:0 26px 70px rgba(124,58,237,.45);}
.whats-page .btn-outline{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;}
.whats-page .btn-outline:hover{background:rgba(255,255,255,.1);transform:translateY(-3px);}
.whats-hero{position:relative;padding:58px 0 28px;overflow:hidden;}
.whats-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
.whats-orb-one{width:420px;height:420px;left:-160px;top:80px;background:rgba(124,58,237,.35);}
.whats-orb-two{width:360px;height:360px;right:-130px;top:150px;background:rgba(217,70,239,.28);}
.whats-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.08fr .92fr;gap:48px;align-items:center;}
.whats-hero-content h1{margin:24px 0 20px;font-size:clamp(44px,6vw,76px);line-height:1.02;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.whats-hero-content h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.whats-hero-content p{max-width:710px;color:#b8acd6;font-size:18px;line-height:1.8;margin:0;}
.whats-hero-actions{display:flex;gap:15px;flex-wrap:wrap;margin-top:34px;}
.release-card{position:relative;padding:28px;border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.1);box-shadow:0 35px 110px rgba(0,0,0,.45);backdrop-filter:blur(22px);overflow:hidden;}
.release-card::before{content:"";position:absolute;inset:-2px;background:radial-gradient(circle at top,rgba(217,70,239,.22),transparent 46%);pointer-events:none;}
.release-top,.release-list,.release-meter{position:relative;z-index:2;}
.release-top{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;}
.release-top span{display:block;color:#b8acd6;font-size:13px;font-weight:800;}
.release-top h3{margin:8px 0 0;color:#fff;font-size:26px;line-height:1.15;}
.release-live{display:flex!important;align-items:center;gap:8px;color:#22c55e!important;font-weight:900;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.22);padding:9px 12px;border-radius:999px;white-space:nowrap;}
.release-live span{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 7px rgba(34,197,94,.12);}
.release-meter{height:12px;margin:28px 0;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;}
.release-meter-fill{height:100%;width:78%;border-radius:999px;background:linear-gradient(90deg,#7c3aed,#d946ef);}
.release-list{display:grid;gap:14px;}
.release-list div{display:flex;align-items:center;gap:10px;color:#e9ddff;font-weight:750;}
.release-list svg{color:#22c55e;flex-shrink:0;}
.release-stats-section{padding:18px 0 70px;}
.latest-section,.modules-section,.timeline-section,.roadmap-section,.comparison-section,.whats-final-section{padding:80px 0;}
.release-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.release-stat-card,.latest-card,.module-update-card,.timeline-card,.roadmap-item,.comparison-card,.whats-final-card{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.26);}
.release-stat-card{padding:30px;border-radius:26px;text-align:center;}
.release-stat-card h3{margin:0 0 8px;font-size:42px;color:#fff;letter-spacing:-1.2px;}
.release-stat-card p{margin:0;color:#b8acd6;font-weight:800;font-size:14px;}
.latest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.latest-card{position:relative;border-radius:28px;padding:28px;transition:.35s;overflow:hidden;}
.latest-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);}
.latest-badge{width:max-content;padding:7px 12px;border-radius:999px;background:rgba(168,85,247,.16);color:#e9d5ff;border:1px solid rgba(168,85,247,.28);font-size:12px;font-weight:900;}
.latest-icon{width:60px;height:60px;margin:24px 0 20px;border-radius:18px;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.35);}
.latest-card h3,.module-update-card h3{margin:0 0 12px;color:#fff;font-size:21px;}
.latest-card p,.module-update-card p,.modules-content p,.roadmap-content p,.comparison-left p,.whats-final-card p{color:#b8acd6;font-size:16px;line-height:1.8;margin:0;}
.modules-grid-layout{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center;}
.modules-content h2,.roadmap-content h2,.comparison-left h2,.whats-final-card h2{margin:20px 0;font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-1.5px;color:#fff;}
.modules-content .btn-primary{margin-top:28px;}
.modules-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
.module-update-card{border-radius:24px;padding:24px;transition:.35s;}
.module-update-card:hover{transform:translateY(-6px);border-color:rgba(168,85,247,.45);}
.module-update-card svg{color:#d946ef;margin-bottom:16px;}
.timeline-list{display:grid;gap:18px;max-width:940px;margin:auto;}
.timeline-card{border-radius:26px;padding:24px;display:grid;grid-template-columns:76px 1fr;gap:22px;align-items:start;}
.timeline-number{width:64px;height:64px;border-radius:20px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;font-size:22px;font-weight:950;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.timeline-top{display:flex;align-items:center;justify-content:space-between;gap:16px;}
.timeline-top h3{margin:0;color:#fff;font-size:21px;}
.timeline-top span{padding:7px 12px;border-radius:999px;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.22);color:#22c55e;font-size:12px;font-weight:900;white-space:nowrap;}
.timeline-content p{margin:12px 0 0;color:#b8acd6;line-height:1.75;}
.roadmap-grid,.comparison-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center;}
.roadmap-list{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.roadmap-item{border-radius:20px;padding:18px;display:flex;align-items:center;gap:12px;color:#fff;font-weight:850;}
.roadmap-item svg{color:#d946ef;flex-shrink:0;}
.comparison-card{border-radius:30px;padding:24px;}
.comparison-head,.comparison-row{display:grid;grid-template-columns:1.3fr .75fr .75fr;gap:14px;align-items:center;}
.comparison-head{padding:0 0 14px;border-bottom:1px solid rgba(255,255,255,.08);color:#fff;}
.comparison-row{padding:16px 0;border-bottom:1px solid rgba(255,255,255,.06);}
.comparison-row:last-child{border-bottom:0;}
.comparison-row span{color:#d8cbff;font-weight:750;}
.comparison-row strong{color:#22c55e;}
.comparison-row em{font-style:normal;color:#fb7185;font-weight:800;}
.whats-final-card{border-radius:34px;padding:62px;text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.whats-final-card svg{color:#fff;margin-bottom:18px;}
.whats-final-card p{max-width:680px;margin:18px auto 30px;color:#f3e8ff;}
.whats-final-card .btn-primary{background:#fff;color:#5b21b6;box-shadow:none;}
@media(max-width:1050px){.whats-hero-grid,.modules-grid-layout,.roadmap-grid,.comparison-grid{grid-template-columns:1fr;}.release-card{max-width:760px;margin:auto;width:100%;}.release-stats-grid{grid-template-columns:repeat(2,1fr);}.latest-grid{grid-template-columns:1fr;}.modules-grid,.roadmap-list{grid-template-columns:repeat(2,1fr);}}
@media(max-width:760px){.whats-page{padding-top:72px;}.whats-hero{padding:32px 0 55px;}.whats-hero-grid{gap:30px;}.whats-hero-content h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.whats-hero-content p{font-size:15px;}.whats-hero-actions{flex-direction:column;}.whats-hero-actions a{width:100%;}.release-card{padding:20px;border-radius:24px;}.release-top{flex-direction:column;}.release-top h3{font-size:22px;}.release-stats-section{padding:16px 0 45px;}
.latest-section,.modules-section,.timeline-section,.roadmap-section,.comparison-section,.whats-final-section{padding:55px 0;}.release-stats-grid,.modules-grid,.roadmap-list{grid-template-columns:1fr;gap:16px;}.release-stat-card,.latest-card,.module-update-card,.comparison-card{border-radius:22px;padding:22px;}.timeline-card{grid-template-columns:1fr;gap:16px;border-radius:22px;padding:22px;}.timeline-top{flex-direction:column;align-items:flex-start;}.comparison-head,.comparison-row{grid-template-columns:1fr;gap:8px;}.comparison-head strong{display:none;}.whats-final-card{padding:34px 24px;border-radius:24px;}.modules-content h2,.roadmap-content h2,.comparison-left h2,.whats-final-card h2{font-size:clamp(30px,9vw,42px);}}
@media(max-width:430px){.whats-hero-content h1{font-size:40px;}.release-stat-card h3{font-size:36px;}.latest-icon{width:56px;height:56px;}.timeline-number{width:56px;height:56px;border-radius:18px;}}
`}</style>
    </>
  );
}
