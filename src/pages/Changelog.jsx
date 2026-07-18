import { Link } from "react-router-dom";
import { ArrowRight, Bug, CheckCircle2, Clock3, Code2, Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";

const releaseSummary = [
  { value: "v1.0.0", label: "Current Version" },
  { value: "12+", label: "Core Updates" },
  { value: "8", label: "Platform Modules" },
  { value: "Live", label: "Active Build" },
];

const changelog = [
  {
    version: "1.0.0",
    title: "Production Foundation Release",
    date: "Latest",
    status: "Current",
    type: "Major Release",
    highlights: ["Premium landing page completed", "Authentication flow prepared", "Broker connect architecture added", "Strategy builder structure prepared", "Backtesting and paper trading modules planned", "Risk-first live engine flow prepared", "Newsletter subscription connected with backend", "Documentation and roadmap resources added"],
  },
];

export default function Changelog() {
  return (
    <>
      <div className="changelog-page">
        <Navbar />

        <main>
          <section className="changelog-hero">
            <div className="changelog-orb changelog-orb-one" />
            <div className="changelog-orb changelog-orb-two" />

            <div className="landing-container changelog-hero-grid">
              <div className="changelog-hero-content">
                <span className="section-tag">
                  <Sparkles size={14} /> BR30 Changelog
                </span>

                <h1>
                  Product Updates, Fixes & <span>Release History.</span>
                </h1>

                <p>Track every important BR30 Algo Terminal update including new features, improvements, bug fixes, security upgrades and platform releases.</p>

                <div className="changelog-actions">
                  <a href="#release-notes" className="btn-primary">
                    View Releases <ArrowRight size={18} />
                  </a>

                  <Link to={ROUTES.DOCUMENTATION} className="btn-outline">
                    Read Docs
                  </Link>
                </div>
              </div>

              <div className="changelog-release-card">
                <div className="release-card-top">
                  <div>
                    <span>Current Build</span>
                    <h3>BR30 Algo Terminal v1.0.0</h3>
                  </div>

                  <div className="release-status">
                    <i />
                    Stable
                  </div>
                </div>

                <div className="release-progress">
                  <div />
                </div>

                <div className="release-points">
                  <p>
                    <CheckCircle2 size={18} />
                    Production UI foundation completed
                  </p>
                  <p>
                    <ShieldCheck size={18} />
                    Risk-first workflow prepared
                  </p>
                  <p>
                    <Rocket size={18} />
                    Platform resources added
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="changelog-stats-section">
            <div className="landing-container changelog-stats-grid">
              {releaseSummary.map((item) => (
                <div className="changelog-stat-card" key={item.label}>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="release-notes-section" id="release-notes">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Release Notes</span>
                <h2>Latest BR30 Algo Terminal Updates</h2>
                <p>Every release is focused on stability, safety, automation workflow and a better trading experience.</p>
              </div>

              <div className="release-notes-list">
                {changelog.map((release) => (
                  <article className="release-note-card" key={release.version}>
                    <div className="release-note-head">
                      <div>
                        <span>{release.type}</span>
                        <h3>Version {release.version}</h3>
                        <p>{release.title}</p>
                      </div>

                      <div className="release-note-meta">
                        <strong>{release.status}</strong>
                        <small>{release.date}</small>
                      </div>
                    </div>

                    <div className="release-highlights">
                      {release.highlights.map((item) => (
                        <div key={item}>
                          <CheckCircle2 size={18} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="update-types-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Update Categories</span>
                <h2>What We Track In Every Release</h2>
                <p>BR30 changelog records product improvements clearly so users know what changed and why it matters.</p>
              </div>

              <div className="update-types-grid">
                <div className="update-type-card">
                  <Rocket size={30} />
                  <h3>New Features</h3>
                  <p>New modules, pages, broker features and automation workflows added to the platform.</p>
                </div>

                <div className="update-type-card">
                  <Zap size={30} />
                  <h3>Improvements</h3>
                  <p>UI upgrades, performance improvements, workflow polishing and better user experience.</p>
                </div>

                <div className="update-type-card">
                  <Bug size={30} />
                  <h3>Bug Fixes</h3>
                  <p>Resolved issues related to frontend, backend, API, routes, validation and user flow.</p>
                </div>

                <div className="update-type-card">
                  <ShieldCheck size={30} />
                  <h3>Security</h3>
                  <p>Risk checks, account safety, broker validation, API protection and secure data flow.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="upcoming-release-section">
            <div className="landing-container upcoming-release-grid">
              <div className="upcoming-content">
                <span className="section-tag">Coming Next</span>

                <h2>Upcoming Release Direction</h2>

                <p>Future versions will focus on deeper broker connectivity, stronger strategy workflow, admin controls, reports, notifications and live automation safety.</p>

                <Link to={ROUTES.ROADMAP} className="btn-primary">
                  View Roadmap <ArrowRight size={18} />
                </Link>
              </div>

              <div className="upcoming-list">
                <div>
                  <Clock3 size={19} />
                  <span>v1.1.0 — Broker Connect Upgrade</span>
                </div>

                <div>
                  <Clock3 size={19} />
                  <span>v1.2.0 — Strategy Builder Workflow</span>
                </div>

                <div>
                  <Clock3 size={19} />
                  <span>v1.3.0 — Paper Trading & Backtest Reports</span>
                </div>

                <div>
                  <Clock3 size={19} />
                  <span>v2.0.0 — Live Algo Engine Safety Release</span>
                </div>
              </div>
            </div>
          </section>

          <section className="changelog-final-section">
            <div className="landing-container changelog-final-card">
              <Code2 size={38} />

              <h2>BR30 Algo Terminal Is Actively Evolving</h2>

              <p>Every update moves the platform closer to a complete broker-connected, risk-first and automation-ready trading ecosystem.</p>

              <Link to={ROUTES.REGISTER} className="btn-primary">
                Start Using BR30
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.changelog-page{min-height:100vh;padding-top:82px;overflow-x:hidden;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.changelog-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.changelog-page .section-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;font-size:13px;font-weight:800;color:#dccdff;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);}
.changelog-page .section-heading{max-width:760px;margin:0 auto 46px;text-align:center;}
.changelog-page .section-heading h2{font-size:clamp(34px,4vw,52px);line-height:1.1;margin:18px 0;letter-spacing:-1.6px;color:#fff;}
.changelog-page .section-heading p{color:#b8acd6;line-height:1.8;font-size:17px;margin:0;}
.changelog-page .btn-primary,.changelog-page .btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none!important;transition:.35s;font-weight:900;border-radius:999px;min-height:52px;padding:13px 24px;}
.changelog-page .btn-primary{background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.changelog-page .btn-primary:hover{transform:translateY(-3px);box-shadow:0 26px 70px rgba(124,58,237,.45);}
.changelog-page .btn-outline{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;}
.changelog-page .btn-outline:hover{background:rgba(255,255,255,.1);transform:translateY(-3px);}
.changelog-hero{position:relative;padding:58px 0 28px;overflow:hidden;}
.changelog-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
.changelog-orb-one{width:420px;height:420px;left:-160px;top:80px;background:rgba(124,58,237,.35);}
.changelog-orb-two{width:360px;height:360px;right:-130px;top:150px;background:rgba(217,70,239,.28);}
.changelog-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.08fr .92fr;gap:48px;align-items:center;}
.changelog-hero-content h1{margin:24px 0 20px;font-size:clamp(44px,6vw,76px);line-height:1.02;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.changelog-hero-content h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.changelog-hero-content p{max-width:710px;color:#b8acd6;font-size:18px;line-height:1.8;margin:0;}
.changelog-actions{display:flex;gap:15px;flex-wrap:wrap;margin-top:34px;}
.changelog-release-card{position:relative;padding:28px;border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.1);box-shadow:0 35px 110px rgba(0,0,0,.45);backdrop-filter:blur(22px);overflow:hidden;}
.changelog-release-card::before{content:"";position:absolute;inset:-2px;background:radial-gradient(circle at top,rgba(217,70,239,.22),transparent 46%);pointer-events:none;}
.release-card-top,.release-progress,.release-points{position:relative;z-index:2;}
.release-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;}
.release-card-top span{display:block;color:#b8acd6;font-size:13px;font-weight:800;}
.release-card-top h3{margin:8px 0 0;color:#fff;font-size:26px;line-height:1.15;}
.release-status{display:flex;align-items:center;gap:8px;color:#22c55e;font-weight:900;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.22);padding:9px 12px;border-radius:999px;white-space:nowrap;}
.release-status i{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 7px rgba(34,197,94,.12);}
.release-progress{height:12px;margin:28px 0;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;}
.release-progress div{height:100%;width:86%;border-radius:999px;background:linear-gradient(90deg,#7c3aed,#d946ef);}
.release-points{display:grid;gap:14px;}
.release-points p{display:flex;align-items:center;gap:10px;color:#e9ddff;font-weight:750;margin:0;}
.release-points svg{color:#22c55e;flex-shrink:0;}
.changelog-stats-section{padding:18px 0 70px;}
.release-notes-section,.update-types-section,.upcoming-release-section,.changelog-final-section{padding:80px 0;}
.changelog-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.changelog-stat-card,.release-note-card,.update-type-card,.upcoming-list div,.changelog-final-card{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.26);}
.changelog-stat-card{padding:30px;border-radius:26px;text-align:center;}
.changelog-stat-card h3{margin:0 0 8px;font-size:42px;color:#fff;letter-spacing:-1.2px;}
.changelog-stat-card p{margin:0;color:#b8acd6;font-weight:800;font-size:14px;}
.release-notes-list{display:grid;gap:24px;max-width:980px;margin:auto;}
.release-note-card{border-radius:30px;padding:30px;}
.release-note-head{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,.08);}
.release-note-head span{display:inline-flex;width:max-content;padding:8px 13px;border-radius:999px;background:rgba(168,85,247,.16);color:#e9d5ff;border:1px solid rgba(168,85,247,.28);font-size:12px;font-weight:900;}
.release-note-head h3{margin:16px 0 8px;color:#fff;font-size:30px;letter-spacing:-.8px;}
.release-note-head p{margin:0;color:#b8acd6;font-size:16px;line-height:1.7;}
.release-note-meta{text-align:right;}
.release-note-meta strong{display:inline-flex;padding:8px 13px;border-radius:999px;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.22);color:#22c55e;font-size:12px;font-weight:900;}
.release-note-meta small{display:block;margin-top:10px;color:#9f94c0;font-weight:800;}
.release-highlights{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:24px;}
.release-highlights div{display:flex;align-items:center;gap:10px;padding:15px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);color:#d8cbff;font-weight:800;}
.release-highlights svg{color:#22c55e;flex-shrink:0;}
.update-types-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.update-type-card{border-radius:26px;padding:28px;transition:.35s;}
.update-type-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);}
.update-type-card svg{color:#d946ef;margin-bottom:20px;}
.update-type-card h3{margin:0 0 12px;color:#fff;font-size:21px;}
.update-type-card p,.upcoming-content p,.changelog-final-card p{color:#b8acd6;font-size:16px;line-height:1.8;margin:0;}
.upcoming-release-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center;}
.upcoming-content h2,.changelog-final-card h2{margin:20px 0;font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-1.5px;color:#fff;}
.upcoming-content .btn-primary{margin-top:28px;}
.upcoming-list{display:grid;gap:16px;}
.upcoming-list div{border-radius:20px;padding:18px;display:flex;align-items:center;gap:12px;color:#fff;font-weight:850;}
.upcoming-list svg{color:#d946ef;flex-shrink:0;}
.changelog-final-card{border-radius:34px;padding:62px;text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.changelog-final-card svg{color:#fff;margin-bottom:18px;}
.changelog-final-card p{max-width:680px;margin:18px auto 30px;color:#f3e8ff;}
.changelog-final-card .btn-primary{background:#fff;color:#5b21b6;box-shadow:none;}
@media(max-width:1050px){.changelog-hero-grid,.upcoming-release-grid{grid-template-columns:1fr;}.changelog-release-card{max-width:760px;margin:auto;width:100%;}.changelog-stats-grid{grid-template-columns:repeat(2,1fr);}.update-types-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:760px){.changelog-page{padding-top:72px;}.changelog-hero{padding:32px 0 24px;}.changelog-hero-grid{gap:30px;}.changelog-hero-content h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.changelog-hero-content p{font-size:15px;}.changelog-actions{flex-direction:column;}.changelog-actions a{width:100%;}.changelog-release-card{padding:20px;border-radius:24px;}.release-card-top{flex-direction:column;}.release-card-top h3{font-size:22px;}.changelog-stats-section{padding:16px 0 45px;}.release-notes-section,.update-types-section,.upcoming-release-section,.changelog-final-section{padding:55px 0;}.changelog-stats-grid,.update-types-grid,.release-highlights{grid-template-columns:1fr;gap:16px;}.changelog-stat-card,.release-note-card,.update-type-card{border-radius:22px;padding:22px;}.release-note-head{flex-direction:column;}.release-note-meta{text-align:left;}.changelog-final-card{padding:34px 24px;border-radius:24px;}.upcoming-content h2,.changelog-final-card h2{font-size:clamp(30px,9vw,42px);}}
@media(max-width:430px){.changelog-hero-content h1{font-size:40px;}.changelog-stat-card h3{font-size:36px;}}
`}</style>
    </>
  );
}
