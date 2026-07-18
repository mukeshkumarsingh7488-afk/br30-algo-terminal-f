import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";

const sections = [
  { id: "getting-started", icon: "fa-rocket", title: "Getting Started", desc: "Create your account and access BR30 Algo Terminal." },
  { id: "authentication", icon: "fa-user-shield", title: "Authentication", desc: "Login, OTP verification and account security." },
  { id: "broker", icon: "fa-building-columns", title: "Broker Connection", desc: "Connect supported brokers securely." },
  { id: "strategy", icon: "fa-brain", title: "Strategy Builder", desc: "Create and manage automated strategies." },
  { id: "backtest", icon: "fa-chart-line", title: "Backtesting", desc: "Test strategies using historical data." },
  { id: "paper", icon: "fa-file-waveform", title: "Paper Trading", desc: "Practice without risking real capital." },
  { id: "live", icon: "fa-bolt", title: "Live Trading", desc: "Deploy strategies after safety verification." },
  { id: "risk", icon: "fa-shield-halved", title: "Risk Management", desc: "Protect your capital using advanced limits." },
  { id: "reports", icon: "fa-chart-pie", title: "Reports", desc: "Analyze performance and trading history." },
  { id: "faq", icon: "fa-circle-question", title: "FAQ", desc: "Frequently asked questions." },
];

export default function Documentation() {
  return (
    <>
      <div className="documentation-page">
        <Navbar />

        <main>
          <section className="documentation-hero">
            <div className="landing-container documentation-grid">
              <div>
                <span className="documentation-badge">Official Documentation</span>

                <h1>
                  BR30 Algo Terminal <span>Documentation.</span>
                </h1>

                <p>Everything you need to learn BR30 Algo Terminal — account setup, broker connection, strategy creation, backtesting, paper trading, live execution, reports and risk-first workflow.</p>

                <div className="documentation-buttons">
                  <a href="#docs-navigation" className="primary-btn">
                    Start Reading
                  </a>
                  <Link to={ROUTES.ROADMAP} className="secondary-btn">
                    View Roadmap
                  </Link>
                </div>
              </div>

              <div className="documentation-card">
                <span>Documentation Version</span>
                <h2>Version 1.0</h2>

                <ul>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Broker Architecture
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Strategy Builder
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Paper Trading
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Live Trading
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i> Reports & Analytics
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="documentation-navigation" id="docs-navigation">
            <div className="landing-container">
              <div className="section-title">
                <span>Documentation Index</span>
                <h2>Quick Navigation</h2>
                <p>Jump directly to any module of BR30 Algo Terminal.</p>
              </div>

              <div className="documentation-nav-grid">
                {sections.map((item) => (
                  <a href={`#${item.id}`} key={item.id} className="documentation-nav-card">
                    <i className={`fa-solid ${item.icon}`}></i>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="documentation-content">
            <div className="landing-container docs-content-grid">
              <aside className="docs-sidebar">
                {sections.map((item) => (
                  <a href={`#${item.id}`} key={item.id}>
                    {item.title}
                  </a>
                ))}
              </aside>

              <div className="docs-main">
                <article className="docs-block" id="getting-started">
                  <span className="docs-label">01</span>
                  <h2>Getting Started</h2>
                  <p>BR30 Algo Terminal is designed as a complete trading automation control center. New users should start by creating an account, verifying their email and exploring the dashboard before connecting brokers or enabling any trading module.</p>

                  <div className="docs-steps">
                    <div>
                      <strong>Create Account</strong>
                      <p>Register with your name, email, mobile number and password.</p>
                    </div>
                    <div>
                      <strong>Verify Email</strong>
                      <p>Complete OTP verification to activate your account securely.</p>
                    </div>
                    <div>
                      <strong>Login Dashboard</strong>
                      <p>Access your dashboard and review available modules.</p>
                    </div>
                    <div>
                      <strong>Start Safely</strong>
                      <p>Use testing modules before live broker execution.</p>
                    </div>
                  </div>
                </article>

                <article className="docs-block" id="authentication">
                  <span className="docs-label">02</span>
                  <h2>Authentication</h2>
                  <p>Authentication protects user accounts and trading data. BR30 Algo Terminal uses register, OTP verification, login, forgot password and reset password flows to keep account access structured and secure.</p>

                  <div className="docs-feature-list">
                    <div>
                      <i className="fa-solid fa-user-plus"></i>
                      <span>Register with secure user details.</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-key"></i>
                      <span>Verify account using OTP flow.</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-right-to-bracket"></i>
                      <span>Login securely using email and password.</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-lock"></i>
                      <span>Reset password using OTP-based recovery.</span>
                    </div>
                  </div>

                  <div className="docs-note">
                    <strong>Security Note:</strong> Never share your password, OTP or broker credentials with anyone.
                  </div>
                </article>

                <article className="docs-block" id="broker">
                  <span className="docs-label">03</span>
                  <h2>Broker Connection</h2>
                  <p>Broker Connect is the bridge between BR30 Algo Terminal and supported trading accounts. The platform is planned with secure OAuth-ready broker connection, token handling, status validation and reconnect flow.</p>

                  <div className="docs-table">
                    <div className="docs-table-head">
                      <span>Broker</span>
                      <span>Status</span>
                      <span>Use Case</span>
                    </div>
                    <div>
                      <span>Upstox</span>
                      <span>Ready Architecture</span>
                      <span>Primary broker integration flow.</span>
                    </div>
                    <div>
                      <span>Zerodha</span>
                      <span>Planned</span>
                      <span>Future broker support.</span>
                    </div>
                    <div>
                      <span>Dhan</span>
                      <span>Planned</span>
                      <span>Future broker support.</span>
                    </div>
                    <div>
                      <span>Angel One</span>
                      <span>Planned</span>
                      <span>Future broker support.</span>
                    </div>
                  </div>

                  <div className="docs-warning">
                    <strong>Important:</strong> Live execution should only be enabled after broker status, strategy and risk verification are completed.
                  </div>
                </article>

                <article className="docs-block" id="strategy">
                  <span className="docs-label">04</span>
                  <h2>Strategy Builder</h2>
                  <p>Strategy Builder helps traders convert repeatable trading logic into a structured workflow. The goal is to move from emotional manual decisions to rule-based strategy design.</p>

                  <div className="docs-steps">
                    <div>
                      <strong>Define Setup</strong>
                      <p>Add market, instrument, timeframe and basic strategy conditions.</p>
                    </div>
                    <div>
                      <strong>Add Entry Rules</strong>
                      <p>Set rule-based conditions for trade entries.</p>
                    </div>
                    <div>
                      <strong>Add Exit Rules</strong>
                      <p>Define target, stop loss, trailing stop or exit conditions.</p>
                    </div>
                    <div>
                      <strong>Save Strategy</strong>
                      <p>Store the strategy for backtesting, paper trading or future live use.</p>
                    </div>
                  </div>

                  <div className="docs-note">
                    <strong>Best Practice:</strong> A strategy should be tested in backtesting and paper trading before live execution.
                  </div>
                </article>

                <article className="docs-block" id="backtest">
                  <span className="docs-label">05</span>
                  <h2>Backtesting</h2>
                  <p>Backtesting helps traders validate strategy logic using historical market data before moving to paper trading or live execution.</p>

                  <div className="docs-steps">
                    <div>
                      <strong>Select Strategy</strong>
                      <p>Choose a saved strategy from your dashboard.</p>
                    </div>
                    <div>
                      <strong>Choose Market</strong>
                      <p>Select instrument, timeframe and testing range.</p>
                    </div>
                    <div>
                      <strong>Run Test</strong>
                      <p>Check win rate, drawdown, profit factor and trade history.</p>
                    </div>
                    <div>
                      <strong>Improve Logic</strong>
                      <p>Adjust weak rules before using real-time simulation.</p>
                    </div>
                  </div>
                </article>

                <article className="docs-block" id="paper">
                  <span className="docs-label">06</span>
                  <h2>Paper Trading</h2>
                  <p>Paper Trading allows strategies to run in live market conditions without placing real broker orders or risking capital.</p>
                  <div className="docs-note">
                    <strong>Recommended:</strong> Use paper trading after backtesting and before enabling live algo trading.
                  </div>
                </article>

                <article className="docs-block" id="live">
                  <span className="docs-label">07</span>
                  <h2>Live Trading</h2>
                  <p>Live Trading is the final execution layer where BR30 Algo Terminal can place real broker orders after safety checks.</p>
                  <div className="docs-warning">
                    <strong>Live Safety:</strong> Broker status, strategy validation, daily loss limit and max trade limit must be verified before live engine starts.
                  </div>
                </article>

                <article className="docs-block" id="risk">
                  <span className="docs-label">08</span>
                  <h2>Risk Management</h2>
                  <p>Risk Management protects traders from emotional decisions, overtrading and uncontrolled losses.</p>

                  <div className="docs-feature-list">
                    <div>
                      <i className="fa-solid fa-shield-halved"></i>
                      <span>Daily loss limit protection.</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-list-check"></i>
                      <span>Maximum trades per day control.</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      <span>Live engine confirmation before execution.</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-lock"></i>
                      <span>Broker and strategy status validation.</span>
                    </div>
                  </div>
                </article>

                <article className="docs-block" id="reports">
                  <span className="docs-label">09</span>
                  <h2>Reports</h2>
                  <p>Reports help traders understand performance, execution quality and trading behavior.</p>

                  <div className="docs-table">
                    <div className="docs-table-head">
                      <span>Report</span>
                      <span>Purpose</span>
                      <span>Use</span>
                    </div>
                    <div>
                      <span>P&L Summary</span>
                      <span>Profit/Loss view</span>
                      <span>Track account performance.</span>
                    </div>
                    <div>
                      <span>Trade History</span>
                      <span>Order records</span>
                      <span>Review every executed trade.</span>
                    </div>
                    <div>
                      <span>Equity Curve</span>
                      <span>Growth tracking</span>
                      <span>Understand consistency.</span>
                    </div>
                    <div>
                      <span>Strategy Report</span>
                      <span>Strategy performance</span>
                      <span>Compare systems.</span>
                    </div>
                  </div>
                </article>

                <article className="docs-block" id="faq">
                  <span className="docs-label">10</span>
                  <h2>FAQ</h2>

                  <div className="docs-faq">
                    <div>
                      <strong>Can I use BR30 Algo Terminal without live trading?</strong>
                      <p>Yes. You can use strategy builder, backtesting and paper trading before live execution.</p>
                    </div>
                    <div>
                      <strong>Is broker connection required?</strong>
                      <p>Broker connection is required only for broker status and live execution features.</p>
                    </div>
                    <div>
                      <strong>Does BR30 store broker password?</strong>
                      <p>No. Broker connection should work through secure broker authorization flow, not password storage.</p>
                    </div>
                    <div>
                      <strong>Is live trading risky?</strong>
                      <p>Yes. Live trading involves market risk, so risk limits and testing are strongly recommended.</p>
                    </div>
                  </div>
                </article>

                <article className="docs-support-card">
                  <h2>Need Help?</h2>
                  <p>For support, product questions or broker integration help, contact BR30 Algo Support.</p>

                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support.br30trader@gmail.com&su=BR30%20Algo%20Terminal%20Support&body=Hello%20BR30%20Algo%20Support,%0A%0AI%20need%20help%20with%20BR30%20Algo%20Terminal.%0A%0AName:%20%0AMessage:%20" target="_blank" rel="noopener noreferrer">
                    Contact Support <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </article>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.documentation-page{min-height:100vh;padding-top:82px;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.documentation-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.documentation-hero{position:relative;padding:70px 0 60px;}
.documentation-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:42px;align-items:center;}
.documentation-badge,.section-title span,.docs-label{display:inline-flex;align-items:center;width:max-content;border-radius:999px;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);color:#dccdff;font-size:13px;font-weight:900;padding:8px 15px;}
.documentation-hero h1{margin:24px 0 18px;font-size:clamp(44px,6vw,74px);line-height:1.02;letter-spacing:-2.4px;font-weight:950;}
.documentation-hero h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.documentation-hero p{max-width:720px;color:#b8acd6;font-size:18px;line-height:1.8;margin:0;}
.documentation-buttons{display:flex;gap:14px;flex-wrap:wrap;margin-top:34px;}
.primary-btn,.secondary-btn{min-height:52px;padding:13px 24px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-weight:950;transition:.35s;}
.primary-btn{background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.secondary-btn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);color:#fff;}
.primary-btn:hover,.secondary-btn:hover{transform:translateY(-3px);}
.documentation-card{padding:30px;border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.1);box-shadow:0 35px 110px rgba(0,0,0,.45);backdrop-filter:blur(22px);}
.documentation-card>span{color:#b8acd6;font-weight:850;font-size:14px;}
.documentation-card h2{margin:10px 0 24px;color:#fff;font-size:32px;}
.documentation-card ul{list-style:none;margin:0;padding:0;display:grid;gap:16px;}
.documentation-card li{display:flex;align-items:center;gap:12px;color:#e9ddff;font-weight:800;}
.documentation-card i{color:#22c55e;}
.documentation-navigation,.documentation-content{padding:70px 0;}
.section-title{text-align:center;max-width:760px;margin:0 auto 42px;}
.section-title h2{font-size:clamp(34px,4vw,52px);line-height:1.1;margin:18px 0;color:#fff;letter-spacing:-1.5px;}
.section-title p{margin:0;color:#b8acd6;font-size:17px;line-height:1.8;}
.documentation-nav-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;}
.documentation-nav-card{text-decoration:none;padding:22px;border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);transition:.35s;}
.documentation-nav-card:hover{transform:translateY(-6px);border-color:rgba(168,85,247,.45);}
.documentation-nav-card i{width:48px;height:48px;border-radius:16px;background:linear-gradient(135deg,#7c3aed,#d946ef);display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;margin-bottom:18px;}
.documentation-nav-card h3{margin:0 0 10px;color:#fff;font-size:18px;}
.documentation-nav-card p{margin:0;color:#b8acd6;font-size:14px;line-height:1.65;}
.docs-content-grid{display:grid;grid-template-columns:260px 1fr;gap:28px;align-items:start;}
.docs-sidebar{position:relative;display:grid;gap:10px;padding:18px;border-radius:22px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);}
.docs-sidebar a{text-decoration:none;color:#b8acd6;font-weight:850;padding:12px 14px;border-radius:14px;transition:.3s;}
.docs-sidebar a:hover{background:rgba(124,58,237,.18);color:#fff;}
.docs-main{display:grid;gap:24px;}
.docs-block,.docs-support-card{padding:34px;border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);box-shadow:0 28px 80px rgba(0,0,0,.26);scroll-margin-top:110px;}
.docs-block h2,.docs-support-card h2{margin:18px 0 14px;color:#fff;font-size:34px;letter-spacing:-.8px;}
.docs-block>p,.docs-support-card p{margin:0;color:#b8acd6;font-size:16px;line-height:1.8;}
.docs-steps{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:24px;}
.docs-steps div,.docs-feature-list div,.docs-faq div{padding:18px;border-radius:18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);}
.docs-steps strong,.docs-faq strong{display:block;color:#fff;margin-bottom:8px;font-size:16px;}
.docs-steps p,.docs-faq p{margin:0;color:#b8acd6;line-height:1.7;font-size:14px;}
.docs-feature-list{display:grid;gap:14px;margin-top:24px;}
.docs-feature-list div{display:flex;align-items:center;gap:12px;color:#d8cbff;font-weight:800;}
.docs-feature-list i{color:#a855f7;font-size:18px;}
.docs-note,.docs-warning{margin-top:24px;padding:18px;border-radius:18px;line-height:1.7;color:#fff;}
.docs-note{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.24);}
.docs-warning{background:rgba(251,113,133,.1);border:1px solid rgba(251,113,133,.24);}
.docs-table{margin-top:24px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);}
.docs-table>div{display:grid;grid-template-columns:1fr 1fr 1.4fr;gap:14px;padding:15px 18px;border-bottom:1px solid rgba(255,255,255,.07);color:#b8acd6;}
.docs-table>div:last-child{border-bottom:0;}
.docs-table-head{background:rgba(124,58,237,.18);color:#fff!important;font-weight:950;}
.docs-faq{display:grid;gap:14px;margin-top:24px;}
.docs-support-card{text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.docs-support-card p{max-width:680px;margin:0 auto 24px;color:#f3e8ff;}
.docs-support-card a{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;background:#fff;color:#5b21b6;font-weight:950;padding:14px 24px;border-radius:999px;}
@media(max-width:1050px){.documentation-grid,.docs-content-grid{grid-template-columns:1fr;}.docs-sidebar{grid-template-columns:repeat(2,1fr);}.documentation-nav-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:760px){.documentation-page{padding-top:72px;}.documentation-hero{padding:45px 0 45px;}.documentation-hero h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.documentation-hero p{font-size:15px;}.documentation-buttons{flex-direction:column;}.primary-btn,.secondary-btn{width:100%;}.documentation-card{padding:22px;border-radius:24px;}.documentation-navigation,.documentation-content{padding:55px 0;}.documentation-nav-grid,.docs-sidebar,.docs-steps{grid-template-columns:1fr;}.docs-block,.docs-support-card{padding:24px;border-radius:22px;}.docs-block h2,.docs-support-card h2{font-size:28px;}.docs-table>div{grid-template-columns:1fr;gap:6px;}.section-title h2{font-size:clamp(30px,9vw,42px);}}
`}</style>
    </>
  );
}
