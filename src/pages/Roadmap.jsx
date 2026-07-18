import { Link } from "react-router-dom";
import { ArrowRight, Bot, CheckCircle2, Cloud, Crown, DatabaseZap, Flag, Gauge, Globe2, PlugZap, Rocket, ShieldCheck, Sparkles, Target, Zap } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";

const milestones = [
  { icon: CheckCircle2, status: "Completed", title: "V1.0 Production Base", text: "Landing page, authentication, dashboard structure and core terminal foundation prepared." },
  { icon: PlugZap, status: "In Progress", title: "Broker Connect", text: "Upstox-first broker connection architecture with secure OAuth-ready workflow." },
  { icon: Bot, status: "Active", title: "Strategy Builder", text: "Rule-based strategy creation flow for testing, backtesting and paper trading." },
  { icon: ShieldCheck, status: "Planned", title: "Risk First Live Engine", text: "Live trading enabled only after broker, strategy and risk verification." },
];

const phases = [
  { year: "2026", title: "Foundation & Production", points: ["Core terminal launch", "Broker connect base", "Strategy builder flow", "Risk settings foundation"] },
  { year: "2027", title: "Broker Expansion", points: ["Zerodha integration", "Dhan integration", "Angel One support", "Fyers support"] },
  { year: "2028", title: "Automation Intelligence", points: ["Advanced templates", "Cloud automation logs", "Smart alerts", "AI trade insights"] },
  { year: "2030", title: "BR30 Trading Ecosystem", points: ["Multi-product ecosystem", "Enterprise algo infra", "Education + automation", "Global trading tools"] },
];

const comingSoon = [
  { icon: Cloud, title: "Cloud Monitoring", text: "24×7 automation logs, status tracking and terminal health monitoring." },
  { icon: DatabaseZap, title: "Smart Logs", text: "Detailed order, strategy, broker and risk activity history." },
  { icon: Gauge, title: "Risk Score", text: "A clear live-readiness score before enabling automated execution." },
  { icon: Globe2, title: "Multi-Broker Hub", text: "Manage multiple broker integrations from one clean terminal." },
  { icon: Zap, title: "Fast Execution Layer", text: "Execution-ready system architecture for broker-based order placement." },
  { icon: Crown, title: "Premium Strategy Packs", text: "Ready-to-use strategy templates for serious traders." },
];

export default function Roadmap() {
  return (
    <>
      <div className="roadmap-page">
        <Navbar />

        <main>
          <section className="roadmap-hero">
            <div className="roadmap-orb roadmap-orb-one" />
            <div className="roadmap-orb roadmap-orb-two" />

            <div className="landing-container roadmap-hero-grid">
              <div className="roadmap-hero-content">
                <span className="section-tag">
                  <Sparkles size={14} /> Product Roadmap
                </span>

                <h1>
                  The Future Of <span>BR30 Algo Terminal.</span>
                </h1>

                <p>Explore the development roadmap of BR30 Algo Terminal — from broker connect and risk-first automation to a complete trading technology ecosystem.</p>

                <div className="roadmap-actions">
                  <Link to={ROUTES.REGISTER} className="btn-primary">
                    Start Now <Rocket size={18} />
                  </Link>

                  <a href="#vision2030" className="btn-outline">
                    Vision 2030
                  </a>
                </div>
              </div>

              <div className="roadmap-terminal">
                <div className="roadmap-terminal-top">
                  <span />
                  <span />
                  <span />
                  <strong>ROADMAP STATUS</strong>
                </div>

                <div className="roadmap-progress-card">
                  <Target size={28} />
                  <div>
                    <h3>BR30 Vision Build</h3>
                    <p>From V1.0 production base to full trading ecosystem.</p>
                  </div>
                </div>

                <div className="roadmap-progress">
                  <div className="roadmap-progress-fill" />
                </div>

                <div className="roadmap-mini-status">
                  <div>
                    <strong>2026</strong>
                    <span>Foundation</span>
                  </div>

                  <div>
                    <strong>2030</strong>
                    <span>Ecosystem</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="milestone-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Current Build Status</span>
                <h2>What We Are Building Step By Step</h2>
                <p>Every milestone is focused on real trader problems: execution, risk, discipline, reports and automation control.</p>
              </div>

              <div className="milestone-grid">
                {milestones.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="milestone-card" key={item.title}>
                      <div className="milestone-top">
                        <div className="milestone-icon">
                          <Icon size={25} />
                        </div>

                        <span>{item.status}</span>
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="phase-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Vision Timeline</span>
                <h2>From Product Launch To Trading Ecosystem</h2>
                <p>BR30 Algo Terminal is planned as a long-term trading automation infrastructure, not just a single dashboard.</p>
              </div>

              <div className="phase-timeline">
                {phases.map((phase) => (
                  <div className="phase-card" key={phase.year}>
                    <div className="phase-year">{phase.year}</div>

                    <div className="phase-content">
                      <h3>{phase.title}</h3>

                      <ul>
                        {phase.points.map((point) => (
                          <li key={point}>
                            <CheckCircle2 size={17} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="coming-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Coming Soon</span>
                <h2>Features Planned For The Next Releases</h2>
                <p>The upcoming roadmap is focused on broker expansion, safety, analytics and smarter automation.</p>
              </div>

              <div className="coming-grid">
                {comingSoon.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="coming-card" key={item.title}>
                      <Icon size={28} />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="vision-section" id="vision2030">
            <div className="landing-container vision-grid">
              <div className="vision-content">
                <span className="section-tag">Founder Vision</span>

                <h2>BR30 Vision 2030</h2>

                <p>By 2030, the goal is to build BR30 into a trusted digital ecosystem for traders, creators, entrepreneurs and businesses.</p>

                <p>BR30 Algo Terminal is one important step toward that vision — a trading technology product built around discipline, automation and long-term value.</p>

                <div className="vision-quote">“The goal is not just to build tools. The goal is to build value, trust and systems that help people grow.”</div>
              </div>

              <div className="vision-card">
                <Flag size={38} />
                <h3>Build. Innovate. Grow.</h3>
                <p>Trading education, digital products, automation tools, web solutions and future BR30 ventures — all connected by one long-term vision.</p>

                <div className="vision-tags">
                  <span>Trading Tech</span>
                  <span>Automation</span>
                  <span>Education</span>
                  <span>BR30 Group</span>
                </div>
              </div>
            </div>
          </section>

          <section className="roadmap-final-section">
            <div className="landing-container roadmap-final-card">
              <Rocket size={40} />

              <h2>Be Part Of The BR30 Algo Journey</h2>

              <p>Start with the current BR30 Algo Terminal build and grow with every new release, integration and automation upgrade.</p>

              <Link to={ROUTES.REGISTER} className="btn-primary">
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.roadmap-page{min-height:100vh;padding-top:82px;overflow-x:hidden;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.roadmap-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.roadmap-page .section-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;font-size:13px;font-weight:800;color:#dccdff;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);}
.roadmap-page .section-heading{max-width:780px;margin:0 auto 46px;text-align:center;}
.roadmap-page .section-heading h2{font-size:clamp(34px,4vw,52px);line-height:1.1;margin:18px 0;letter-spacing:-1.6px;color:#fff;}
.roadmap-page .section-heading p{color:#b8acd6;line-height:1.8;font-size:17px;margin:0;}
.roadmap-page .btn-primary,.roadmap-page .btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none!important;transition:.35s;font-weight:900;border-radius:999px;min-height:52px;padding:13px 24px;}
.roadmap-page .btn-primary{background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.roadmap-page .btn-primary:hover{transform:translateY(-3px);box-shadow:0 26px 70px rgba(124,58,237,.45);}
.roadmap-page .btn-outline{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;}
.roadmap-page .btn-outline:hover{background:rgba(255,255,255,.1);transform:translateY(-3px);}
.roadmap-hero{position:relative;padding:58px 0 82px;overflow:hidden;}
.roadmap-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
.roadmap-orb-one{width:420px;height:420px;left:-160px;top:80px;background:rgba(124,58,237,.35);}
.roadmap-orb-two{width:360px;height:360px;right:-130px;top:150px;background:rgba(217,70,239,.28);}
.roadmap-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.08fr .92fr;gap:48px;align-items:center;}
.roadmap-hero-content h1{margin:24px 0 20px;font-size:clamp(44px,6vw,76px);line-height:1.02;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.roadmap-hero-content h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.roadmap-hero-content p{max-width:710px;color:#b8acd6;font-size:18px;line-height:1.8;margin:0;}
.roadmap-actions{display:flex;gap:15px;flex-wrap:wrap;margin-top:34px;}
.roadmap-terminal{position:relative;padding:28px;border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.1);box-shadow:0 35px 110px rgba(0,0,0,.45);backdrop-filter:blur(22px);overflow:hidden;}
.roadmap-terminal::before{content:"";position:absolute;inset:-2px;background:radial-gradient(circle at top,rgba(217,70,239,.22),transparent 46%);pointer-events:none;}
.roadmap-terminal-top,.roadmap-progress-card,.roadmap-progress,.roadmap-mini-status{position:relative;z-index:2;}
.roadmap-terminal-top{display:flex;align-items:center;gap:8px;margin-bottom:24px;}
.roadmap-terminal-top span{width:11px;height:11px;border-radius:50%;background:#8b5cf6;}
.roadmap-terminal-top strong{margin-left:auto;font-size:13px;color:#e9ddff;}
.roadmap-progress-card{display:flex;gap:16px;align-items:flex-start;padding:22px;border-radius:24px;background:linear-gradient(135deg,rgba(124,58,237,.35),rgba(217,70,239,.16));border:1px solid rgba(255,255,255,.09);}
.roadmap-progress-card svg{color:#fff;flex-shrink:0;}
.roadmap-progress-card h3{margin:0 0 8px;color:#fff;font-size:22px;}
.roadmap-progress-card p{margin:0;color:#d8cbff;line-height:1.65;}
.roadmap-progress{height:14px;margin:28px 0;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;}
.roadmap-progress-fill{height:100%;width:42%;border-radius:999px;background:linear-gradient(90deg,#7c3aed,#d946ef);}
.roadmap-mini-status{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.roadmap-mini-status div{padding:18px;border-radius:18px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.08);}
.roadmap-mini-status strong{display:block;color:#fff;font-size:24px;}
.roadmap-mini-status span{color:#b8acd6;font-weight:800;font-size:13px;}
.milestone-section,.phase-section,.coming-section,.vision-section,.roadmap-final-section{padding:80px 0;}
.milestone-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.milestone-card,.phase-card,.coming-card,.vision-content,.vision-card,.roadmap-final-card{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.26);}
.milestone-card{border-radius:26px;padding:26px;transition:.35s;}
.milestone-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);}
.milestone-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px;}
.milestone-icon{width:58px;height:58px;border-radius:18px;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.35);}
.milestone-top span{padding:7px 11px;border-radius:999px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.22);color:#22c55e;font-size:12px;font-weight:900;}
.milestone-card h3,.coming-card h3{margin:0 0 12px;color:#fff;font-size:21px;}
.milestone-card p,.coming-card p,.vision-content p,.vision-card p,.roadmap-final-card p{margin:0;color:#b8acd6;line-height:1.75;font-size:15px;}
.phase-timeline{display:grid;gap:22px;max-width:980px;margin:auto;}
.phase-card{position:relative;border-radius:28px;padding:26px;display:grid;grid-template-columns:150px 1fr;gap:28px;align-items:start;}
.phase-year{width:112px;height:112px;border-radius:30px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 22px 60px rgba(124,58,237,.38);color:#fff;font-size:30px;font-weight:950;}
.phase-content h3{margin:0 0 18px;color:#fff;font-size:25px;}
.phase-content ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
.phase-content li{display:flex;align-items:center;gap:9px;color:#d8cbff;font-weight:750;}
.phase-content svg{color:#22c55e;flex-shrink:0;}
.coming-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.coming-card{border-radius:26px;padding:28px;transition:.35s;}
.coming-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);}
.coming-card svg{color:#d946ef;margin-bottom:20px;}
.vision-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:stretch;}
.vision-content,.vision-card{border-radius:34px;padding:40px;}
.vision-content h2{margin:20px 0;font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-1.5px;color:#fff;}
.vision-content p + p{margin-top:18px;}
.vision-quote{margin-top:30px;padding:24px;border-radius:22px;background:rgba(124,58,237,.14);border:1px solid rgba(168,85,247,.25);color:#fff;font-weight:850;line-height:1.7;}
.vision-card{background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.vision-card svg{color:#fff;margin-bottom:24px;}
.vision-card h3{margin:0 0 16px;color:#fff;font-size:32px;}
.vision-card p{color:#f3e8ff;}
.vision-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px;}
.vision-tags span{padding:9px 13px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.16);color:#fff;font-weight:850;font-size:13px;}
.roadmap-final-card{border-radius:34px;padding:62px;text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.roadmap-final-card svg{color:#fff;margin-bottom:18px;}
.roadmap-final-card h2{margin:0;font-size:clamp(34px,4vw,54px);letter-spacing:-1.5px;color:#fff;}
.roadmap-final-card p{max-width:680px;margin:18px auto 30px;color:#f3e8ff;}
.roadmap-final-card .btn-primary{background:#fff;color:#5b21b6;box-shadow:none;}
@media(max-width:1050px){.roadmap-hero-grid,.vision-grid{grid-template-columns:1fr;}.roadmap-terminal{max-width:760px;margin:auto;width:100%;}.milestone-grid,.coming-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:760px){.roadmap-page{padding-top:72px;}.roadmap-hero{padding:32px 0 55px;}.roadmap-hero-grid{gap:30px;}.roadmap-hero-content h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.roadmap-hero-content p{font-size:15px;}.roadmap-actions{flex-direction:column;}.roadmap-actions a{width:100%;}.roadmap-terminal{padding:20px;border-radius:24px;}.roadmap-progress-card{padding:18px;border-radius:20px;}.milestone-section,.phase-section,.coming-section,.vision-section,.roadmap-final-section{padding:55px 0;}.milestone-grid,.coming-grid{grid-template-columns:1fr;gap:16px;}.milestone-card,.coming-card{border-radius:22px;padding:22px;}.phase-card{grid-template-columns:1fr;gap:18px;border-radius:24px;padding:22px;}.phase-year{width:92px;height:92px;border-radius:24px;font-size:24px;}.phase-content ul{grid-template-columns:1fr;}.vision-content,.vision-card,.roadmap-final-card{padding:28px;border-radius:24px;}.vision-card h3{font-size:26px;}.roadmap-final-card{padding:34px 24px;}.roadmap-final-card h2{font-size:clamp(30px,9vw,42px);}}
@media(max-width:430px){.roadmap-hero-content h1{font-size:40px;}.roadmap-terminal-top strong{font-size:11px;}.roadmap-mini-status{grid-template-columns:1fr;}.milestone-top{align-items:flex-start;flex-direction:column;}}
`}</style>
    </>
  );
}
