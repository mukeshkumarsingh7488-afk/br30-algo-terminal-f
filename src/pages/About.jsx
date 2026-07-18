import { Link } from "react-router-dom";
import { Activity, BarChart3, Bot, CheckCircle2, Crown, DatabaseZap, Rocket, ShieldCheck, Sparkles, Target, Zap } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";
import founderPhoto from "../assets/founder-photo.png";

const stats = [
  { value: "5+", label: "Broker Architecture" },
  { value: "24×7", label: "Cloud Ready Vision" },
  { value: "100%", label: "Risk First Flow" },
  { value: "V1.0", label: "Production Build" },
];

const values = [
  { icon: ShieldCheck, title: "Safety First", text: "Live execution starts only after broker, strategy and risk verification." },
  { icon: Bot, title: "Rule-Based Trading", text: "Move from emotional trades to structured automated workflows." },
  { icon: BarChart3, title: "Data Clarity", text: "Track reports, logs, performance and trading behavior from one terminal." },
  { icon: Zap, title: "Execution Speed", text: "Reduce manual delay with a clean broker-connected automation engine." },
];

const ecosystem = ["Broker Connect", "Strategy Builder", "Backtesting", "Paper Trading", "Risk Engine", "Live Algo", "Orders", "Reports"];

export default function About() {
  return (
    <>
      <div className="about-page">
        <Navbar />

        <main>
          <section className="about-hero">
            <div className="about-orb about-orb-one" />
            <div className="about-orb about-orb-two" />

            <div className="landing-container about-hero-grid">
              <div className="about-hero-content">
                <span className="section-tag">
                  <Sparkles size={14} /> About BR30 Algo Terminal
                </span>

                <h1>
                  Trading Automation Built For <span>Discipline, Safety & Speed.</span>
                </h1>

                <p>BR30 Algo Terminal is a modern algo trading platform created to help traders connect brokers, build strategies, test ideas, control risk and automate execution with a professional workflow.</p>

                <div className="about-hero-actions">
                  <Link to={ROUTES.REGISTER} className="btn-primary">
                    Start Journey <Rocket size={18} />
                  </Link>
                  <a href="#founder" className="btn-outline">
                    Founder Note
                  </a>
                </div>
              </div>

              <div className="about-hero-panel">
                <div className="about-panel-top">
                  <span />
                  <span />
                  <span />
                  <strong>BR30 SYSTEM</strong>
                </div>

                <div className="about-panel-card main">
                  <Target size={28} />
                  <div>
                    <h3>Mission</h3>
                    <p>Make algo trading simple, safe and accessible for serious traders.</p>
                  </div>
                </div>

                <div className="about-panel-card">
                  <ShieldCheck size={24} />
                  <div>
                    <h3>Risk First</h3>
                    <p>Every live trade needs safety confirmation.</p>
                  </div>
                </div>

                <div className="about-panel-card">
                  <DatabaseZap size={24} />
                  <div>
                    <h3>Automation Ready</h3>
                    <p>Broker, strategy, paper and live flow in one terminal.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-stats-section">
            <div className="landing-container about-stats-grid">
              {stats.map((item) => (
                <div className="about-stat-card" key={item.label}>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="about-story">
            <div className="landing-container about-story-grid">
              <div className="about-story-left">
                <span className="section-tag">Why We Built It</span>
                <h2>Most Traders Do Not Need More Noise. They Need A Better Trading Process.</h2>
              </div>

              <div className="about-story-right">
                <p>Many traders already have strategies, but emotions, overtrading, late execution and weak risk control destroy performance.</p>
                <p>BR30 Algo Terminal is designed to solve that exact problem by bringing broker connection, strategy testing, paper trading, live execution and risk controls into one clean system.</p>
                <div className="about-story-highlight">
                  <CheckCircle2 size={22} />
                  <span>Built for traders who want structure before scale.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="about-values">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Core Principles</span>
                <h2>Built Around The Rules Serious Traders Need</h2>
                <p>Every feature inside BR30 Algo Terminal follows one simple idea — trade with logic, verify with data and execute with discipline.</p>
              </div>

              <div className="about-values-grid">
                {values.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="about-value-card" key={item.title}>
                      <div className="about-value-icon">
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

          <section className="about-founder" id="founder">
            <div className="landing-container founder-grid">
              <div className="founder-image-card">
                <img src={founderPhoto} alt="Mukesh Raj - Founder BR30 Group" />

                <div className="founder-badge">
                  <Crown size={18} />
                  Founder — BR30 Group
                </div>
              </div>

              <div className="founder-content">
                <span className="section-tag">Founder Note</span>

                <h2>A Note From Mukesh Raj</h2>

                <p>BR30 Algo Terminal started with a clear vision: trading should be more disciplined, structured and safe. I wanted to build a platform that helps traders move from emotional decisions to rule-based execution.</p>

                <p>This is not just a broker panel. This is the foundation of a complete BR30 trading automation ecosystem — built step by step with real trader problems in mind.</p>

                <div className="founder-quote">“The goal is simple — help traders test before live trading, control risk before execution and build discipline through automation.”</div>
              </div>
            </div>
          </section>

          <section className="about-ecosystem">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">BR30 Ecosystem</span>
                <h2>One Terminal. Complete Algo Trading Flow.</h2>
                <p>From account setup to reports, BR30 Algo Terminal is planned as a complete control center for automation.</p>
              </div>

              <div className="ecosystem-grid">
                {ecosystem.map((item, index) => (
                  <div className="ecosystem-card" key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="about-final-cta">
            <div className="landing-container about-final-card">
              <Activity size={38} />
              <h2>Ready To Build Your Algo Trading Workflow?</h2>
              <p>Create your BR30 Algo Terminal account and start with broker connect, strategy testing, paper mode and risk-first automation.</p>
              <Link to={ROUTES.REGISTER} className="btn-primary">
                Get Started
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.about-page{min-height:100vh;padding-top:82px;overflow-x:hidden;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.about-hero{position:relative;padding:55px 0 25px;overflow:hidden;}
.about-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
.about-orb-one{width:420px;height:420px;left:-160px;top:80px;background:rgba(124,58,237,.35);}
.about-orb-two{width:360px;height:360px;right:-130px;top:150px;background:rgba(217,70,239,.28);}
.about-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.08fr .92fr;gap:48px;align-items:center;}
.about-hero-content h1{margin:24px 0 20px;font-size:clamp(44px,6vw,76px);line-height:1.02;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.about-hero-content h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.about-hero-content p{max-width:710px;color:#b8acd6;font-size:18px;line-height:1.8;margin:0;}
.about-hero-actions{display:flex;gap:15px;flex-wrap:wrap;margin-top:34px;}
.about-hero-panel{position:relative;padding:24px;border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.1);box-shadow:0 35px 110px rgba(0,0,0,.45);backdrop-filter:blur(22px);overflow:hidden;}
.about-panel-top{display:flex;align-items:center;gap:8px;margin-bottom:22px;}
.about-panel-top span{width:11px;height:11px;border-radius:50%;background:#8b5cf6;}
.about-panel-top strong{margin-left:auto;font-size:13px;color:#e9ddff;}
.about-panel-card{display:flex;gap:16px;align-items:flex-start;padding:20px;border-radius:22px;background:rgba(0,0,0,.26);border:1px solid rgba(255,255,255,.08);margin-top:14px;}
.about-panel-card.main{background:linear-gradient(135deg,rgba(124,58,237,.35),rgba(217,70,239,.16));}
.about-panel-card svg{color:#d946ef;flex-shrink:0;}
.about-panel-card h3{margin:0 0 7px;color:#fff;font-size:19px;}
.about-panel-card p{margin:0;color:#b8acd6;line-height:1.65;font-size:14px;}
.about-stats-section{padding:20px 0 70px;}
.about-story,.about-values,.about-founder,.about-ecosystem,.about-final-cta{padding:80px 0;}
.about-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.about-stat-card{padding:30px;border-radius:26px;text-align:center;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);}
.about-stat-card h3{margin:0 0 8px;font-size:42px;color:#fff;letter-spacing:-1.2px;}
.about-stat-card p{margin:0;color:#b8acd6;font-weight:800;font-size:14px;}
.about-story-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:stretch;}
.about-story-left,.about-story-right,.about-value-card,.founder-content,.founder-image-card,.ecosystem-card,.about-final-card{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.26);}
.about-story-left,.about-story-right{border-radius:30px;padding:36px;}
.about-story-left h2,.founder-content h2,.about-final-card h2{margin:20px 0 0;font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-1.5px;color:#fff;}
.about-story-right p,.founder-content p,.about-final-card p,.about-value-card p{color:#b8acd6;font-size:16px;line-height:1.8;}
.about-story-highlight{margin-top:24px;padding:18px;border-radius:18px;background:rgba(124,58,237,.14);border:1px solid rgba(168,85,247,.22);display:flex;gap:12px;align-items:center;color:#fff;font-weight:850;}
.about-story-highlight svg{color:#22c55e;flex-shrink:0;}
.about-values-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.about-value-card{border-radius:26px;padding:28px;transition:.35s;}
.about-value-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);}
.about-value-icon{width:60px;height:60px;border-radius:18px;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.35);}
.about-value-card h3{margin:22px 0 12px;color:#fff;font-size:21px;}
.founder-grid{display:grid;grid-template-columns:.95fr 1.05fr;gap:34px;align-items:stretch;}
.founder-image-card{position:relative;border-radius:34px;padding:16px;overflow:hidden;min-height:560px;}
.founder-image-card img{width:100%;height:100%;min-height:528px;object-fit:cover;border-radius:24px;display:block;}
.founder-badge{position:absolute;left:32px;right:32px;bottom:32px;padding:18px 20px;border-radius:20px;background:rgba(8,3,18,.72);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px);display:flex;align-items:center;gap:10px;color:#fff;font-weight:900;}
.founder-badge svg{color:#d946ef;}
.founder-content{border-radius:34px;padding:42px;}
.founder-quote{margin-top:30px;padding:24px;border-radius:22px;background:rgba(124,58,237,.14);border:1px solid rgba(168,85,247,.25);color:#fff;font-weight:850;line-height:1.7;}
.ecosystem-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.ecosystem-card{border-radius:22px;padding:24px;transition:.35s;}
.ecosystem-card:hover{transform:translateY(-6px);border-color:rgba(168,85,247,.45);}
.ecosystem-card span{display:block;color:rgba(255,255,255,.24);font-weight:950;font-size:28px;margin-bottom:12px;}
.ecosystem-card strong{color:#fff;font-size:16px;}
.about-final-card{border-radius:34px;padding:62px;text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.about-final-card svg{color:#fff;margin-bottom:18px;}
.about-final-card p{max-width:680px;margin:18px auto 30px;color:#f3e8ff;}
.about-final-card .btn-primary{background:#fff;color:#5b21b6;box-shadow:none;}
*{box-sizing:border-box;}
.about-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.about-page .section-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;font-size:13px;font-weight:800;color:#dccdff;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);}
.about-page .section-heading{max-width:760px;margin:0 auto 45px;text-align:center;}
.about-page .section-heading h2{font-size:clamp(34px,4vw,52px);line-height:1.1;margin:18px 0;letter-spacing:-1.6px;color:#fff;}
.about-page .section-heading p{color:#b8acd6;line-height:1.8;font-size:17px;margin:0;}
.about-page .btn-primary,.about-page .btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;transition:.35s;font-weight:900;border-radius:999px;min-height:52px;padding:13px 24px;}
.about-page .btn-primary{background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.about-page .btn-primary:hover{transform:translateY(-3px);box-shadow:0 26px 70px rgba(124,58,237,.45);}
.about-page .btn-outline{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;}
.about-page .btn-outline:hover{background:rgba(255,255,255,.1);transform:translateY(-3px);}
@media(max-width:1050px){.about-hero-grid,.about-story-grid,.founder-grid{grid-template-columns:1fr;}.about-hero-panel{max-width:760px;margin:auto;width:100%;}.about-stats-grid,.about-values-grid,.ecosystem-grid{grid-template-columns:repeat(2,1fr);}.founder-image-card{min-height:auto;}.founder-image-card img{min-height:460px;}}
@media(max-width:760px){.about-page{padding-top:72px;}.about-hero{padding:32px 0 55px;}.about-hero-grid{gap:30px;}.about-hero-content h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.about-hero-content p{font-size:15px;}.about-hero-actions{flex-direction:column;}.about-hero-actions a{width:100%;}.about-hero-panel{padding:18px;border-radius:24px;}.about-panel-card{padding:16px;border-radius:18px;}.about-stats-section{padding:18px 0 45px;}
.about-story,.about-values,.about-founder,.about-ecosystem,.about-final-cta{padding:55px 0;}.about-stats-grid,.about-values-grid,.ecosystem-grid{grid-template-columns:1fr;gap:16px;}.about-stat-card{padding:24px;border-radius:22px;}.about-story-left,.about-story-right,.founder-content,.about-final-card{padding:26px;border-radius:24px;}.about-story-left h2,.founder-content h2,.about-final-card h2{font-size:clamp(30px,9vw,42px);}.founder-image-card{border-radius:24px;padding:10px;}.founder-image-card img{min-height:390px;border-radius:18px;}.founder-badge{left:20px;right:20px;bottom:20px;padding:15px;border-radius:16px;font-size:14px;}.about-value-card,.ecosystem-card{border-radius:22px;padding:22px;}.about-final-card{padding:34px 24px;}}
@media(max-width:430px){.about-hero-content h1{font-size:40px;}.about-panel-top strong{font-size:11px;}.about-panel-card h3{font-size:17px;}.founder-image-card img{min-height:340px;}.about-stat-card h3{font-size:36px;}}
`}</style>
    </>
  );
}
