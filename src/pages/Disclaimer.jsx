import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Ban, BarChart3, CheckCircle2, FileText, Mail, Scale, ShieldAlert, ShieldCheck, Sparkles, TrendingDown, Zap } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";

const disclaimerSections = [
  {
    icon: AlertTriangle,
    title: "1. Trading Risk Warning",
    text: "Trading, investing, derivatives, futures, options, crypto, forex, commodities, and other financial markets involve significant risk. Users may lose part or all of their capital. BR30 Algo Terminal does not guarantee profits, returns, accuracy, or loss protection.",
  },
  {
    icon: BarChart3,
    title: "2. No Investment Advice",
    text: "BR30 Algo Terminal is a technology and automation platform. Any content, tools, dashboards, indicators, strategy builder, reports, or educational material provided on the platform should not be treated as financial, investment, legal, tax, or professional advice.",
  },
  {
    icon: Zap,
    title: "3. Algo Trading Risk",
    text: "Automated trading can execute orders faster than manual trading, but it can also create losses faster if strategies, risk settings, broker connection, or market conditions are not properly verified. Users are responsible for testing strategies before live execution.",
  },
  {
    icon: ShieldAlert,
    title: "4. Broker & API Risk",
    text: "Broker APIs, market data feeds, order placement systems, authentication services, exchanges, and third-party platforms may face downtime, delays, rejection, disconnection, incorrect data, or technical failures. BR30 Algo Terminal is not responsible for broker-side or third-party failures.",
  },
  {
    icon: TrendingDown,
    title: "5. Backtesting & Paper Trading Limitations",
    text: "Backtesting and paper trading results are for analysis and simulation only. They may not represent real market execution, slippage, liquidity, brokerage charges, latency, spreads, order rejection, or emotional decision-making in live trading conditions.",
  },
  {
    icon: Ban,
    title: "6. No Profit Guarantee",
    text: "No strategy, signal, indicator, automation system, risk setting, report, or trading tool can guarantee profits. Past performance, backtest results, paper trading results, or example strategies do not guarantee future results.",
  },
];

const userChecks = ["Understand market risk before trading.", "Test strategies before live execution.", "Use paper trading before real orders.", "Set daily loss and max trade limits.", "Verify broker status before live trading.", "Accept full responsibility for results."];

export default function Disclaimer() {
  return (
    <>
      <div className="legal-page">
        <Navbar />

        <main>
          <section className="legal-hero">
            <div className="legal-orb legal-orb-one" />
            <div className="legal-orb legal-orb-two" />

            <div className="landing-container legal-hero-inner">
              <span className="section-tag">
                <Sparkles size={14} />
                Disclaimer
              </span>

              <h1>
                Important Risk Disclaimer For
                <span> BR30 Algo Terminal.</span>
              </h1>

              <p>This Disclaimer explains the risks, limitations, responsibilities, and important warnings related to using BR30 Algo Terminal, trading automation, broker connectivity, strategy testing, and live execution features.</p>

              <div className="legal-meta">
                <div>
                  <strong>Effective From</strong>
                  <span>June 28, 2026</span>
                </div>

                <div>
                  <strong>Last Updated</strong>
                  <span>June 28, 2026</span>
                </div>
              </div>
            </div>
          </section>

          <section className="legal-content-section">
            <div className="landing-container legal-layout">
              <aside className="legal-sidebar">
                <h3>Disclaimer Overview</h3>

                <a href="#intro">Introduction</a>
                <a href="#risk">Trading Risk</a>
                <a href="#automation">Automation Risk</a>
                <a href="#broker">Broker Risk</a>
                <a href="#responsibility">User Responsibility</a>
                <a href="#contact">Contact</a>
              </aside>

              <div className="legal-content-card">
                <div className="legal-notice" id="intro">
                  <AlertTriangle size={26} />

                  <div>
                    <h2>Important Notice</h2>

                    <p>BR30 Algo Terminal is built to help traders create a more structured workflow using broker connectivity, strategy building, backtesting, paper trading, live algo execution, reports, and risk settings. However, trading always involves risk, and the platform does not remove market risk, strategy risk, execution risk, or user decision risk.</p>
                  </div>
                </div>

                <div className="legal-section" id="risk">
                  {disclaimerSections.slice(0, 2).map((item) => {
                    const Icon = item.icon;

                    return (
                      <div className="legal-block" key={item.title}>
                        <div className="legal-block-icon">
                          <Icon size={24} />
                        </div>

                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="legal-section" id="automation">
                  {disclaimerSections.slice(2, 3).map((item) => {
                    const Icon = item.icon;

                    return (
                      <div className="legal-block" key={item.title}>
                        <div className="legal-block-icon">
                          <Icon size={24} />
                        </div>

                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="legal-section" id="broker">
                  {disclaimerSections.slice(3, 5).map((item) => {
                    const Icon = item.icon;

                    return (
                      <div className="legal-block" key={item.title}>
                        <div className="legal-block-icon">
                          <Icon size={24} />
                        </div>

                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="legal-section">
                  {disclaimerSections.slice(5).map((item) => {
                    const Icon = item.icon;

                    return (
                      <div className="legal-block" key={item.title}>
                        <div className="legal-block-icon">
                          <Icon size={24} />
                        </div>

                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="legal-rights" id="responsibility">
                  <h2>User Responsibility</h2>

                  <p>Every trader using BR30 Algo Terminal should understand the risks involved before enabling live trading. The platform provides tools, but the final responsibility for every trading decision always remains with the user.</p>

                  <div className="rights-grid">
                    {userChecks.map((item) => (
                      <div key={item}>
                        <CheckCircle2 size={20} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="legal-block">
                  <div className="legal-block-icon">
                    <Scale size={24} />
                  </div>

                  <div>
                    <h3>7. User Responsibility</h3>

                    <p>Users are solely responsible for account security, strategy verification, broker configuration, API permissions, trading decisions, position sizing, risk management, capital allocation, and compliance with applicable laws in their jurisdiction.</p>
                  </div>
                </div>

                <div className="legal-block">
                  <div className="legal-block-icon">
                    <ShieldCheck size={24} />
                  </div>

                  <div>
                    <h3>8. Limitation Of Liability</h3>

                    <p>BR30 Algo Terminal, BR30 Group, its founder, developers, contributors, employees, affiliates, partners, or service providers shall not be liable for trading losses, opportunity losses, broker failures, API outages, incorrect market data, technical issues, software bugs, delayed execution, or any direct, indirect, incidental, or consequential damages arising from platform usage.</p>
                  </div>
                </div>

                <div className="legal-block">
                  <div className="legal-block-icon">
                    <FileText size={24} />
                  </div>

                  <div>
                    <h3>9. Disclaimer Updates</h3>

                    <p>This Disclaimer may be updated periodically to reflect changes in platform features, broker integrations, regulatory requirements, business operations, or security practices. Continued use of BR30 Algo Terminal indicates acceptance of the latest version.</p>
                  </div>
                </div>

                <div className="legal-contact" id="contact">
                  <Mail size={28} />
                  <div>
                    <h2>Need More Information?</h2>

                    <p>If you have questions regarding this Disclaimer or the risks associated with BR30 Algo Terminal, please contact the BR30 Algo Team.</p>

                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support.br30trader@gmail.com&su=Disclaimer%20Query&body=Hello%20BR30%20Algo%20Team,%0A%0AI%20have%20a%20question%20regarding%20the%20Disclaimer.%0A%0AQuestion:%20%0A%0AThanks" target="_blank" rel="noopener noreferrer">
                      support.br30trader@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="legal-final-section">
            <div className="landing-container legal-final-card">
              <ShieldAlert size={40} />

              <h2>Trade Smart. Manage Risk. Stay Disciplined.</h2>

              <p>BR30 Algo Terminal is designed to help traders build a safer and more structured trading workflow, but every trading decision should be backed by proper analysis, risk management, and personal responsibility.</p>

              <Link to={ROUTES.HOME} className="btn-primary">
                Back To Home <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.legal-page{min-height:100vh;padding-top:82px;overflow-x:hidden;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.legal-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.legal-page .section-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;font-size:13px;font-weight:800;color:#dccdff;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);}
.legal-page .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none!important;transition:.35s;font-weight:900;border-radius:999px;min-height:52px;padding:13px 24px;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.legal-page .btn-primary:hover{transform:translateY(-3px);box-shadow:0 26px 70px rgba(124,58,237,.45);}
.legal-hero{position:relative;padding:58px 0 82px;overflow:hidden;text-align:center;}
.legal-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
.legal-orb-one{width:420px;height:420px;left:-160px;top:80px;background:rgba(124,58,237,.35);}
.legal-orb-two{width:360px;height:360px;right:-130px;top:150px;background:rgba(217,70,239,.28);}
.legal-hero-inner{position:relative;z-index:2;max-width:960px;}
.legal-hero h1{margin:24px auto 20px;font-size:clamp(44px,6vw,76px);line-height:1.02;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.legal-hero h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.legal-hero p{max-width:820px;margin:0 auto;color:#b8acd6;font-size:18px;line-height:1.8;}
.legal-meta{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;margin-top:34px;}
.legal-meta div{padding:16px 22px;border-radius:20px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(18px);}
.legal-meta strong{display:block;color:#fff;font-size:14px;margin-bottom:6px;}
.legal-meta span{color:#d8cbff;font-weight:800;font-size:13px;}
.legal-content-section,.legal-final-section{padding:75px 0;}
.legal-layout{display:grid;grid-template-columns:270px 1fr;gap:28px;align-items:start;}
.legal-sidebar{position:sticky;top:110px;padding:22px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);}
.legal-sidebar h3{margin:0 0 16px;color:#fff;font-size:19px;}
.legal-sidebar a{display:block;padding:12px;border-radius:14px;text-decoration:none;color:#cdbfff;font-weight:800;}
.legal-sidebar a:hover{background:rgba(255,255,255,.07);color:#fff;}
.legal-content-card{padding:34px;border-radius:34px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);}
.legal-notice,.legal-block,.legal-contact,.legal-rights{border-radius:26px;background:rgba(0,0,0,.22);border:1px solid rgba(255,255,255,.08);}
.legal-notice{display:flex;gap:18px;padding:26px;margin-bottom:22px;background:linear-gradient(135deg,rgba(124,58,237,.30),rgba(217,70,239,.12));}
.legal-notice svg,.legal-contact svg{color:#d946ef;flex-shrink:0;}
.legal-block{display:grid;grid-template-columns:58px 1fr;gap:18px;padding:24px;margin-bottom:18px;}
.legal-block-icon{width:58px;height:58px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);}
.legal-block h3{margin:0 0 10px;color:#fff;font-size:21px;}
.legal-block p,.legal-notice p,.legal-rights p,.legal-contact p{color:#b8acd6;line-height:1.85;}
.legal-rights{padding:28px;margin:20px 0;}
.rights-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:20px;}
.rights-grid div{display:flex;gap:10px;align-items:center;padding:14px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);}
.rights-grid svg{color:#22c55e;}
.legal-contact{display:flex;gap:18px;padding:28px;margin-top:18px;}
.legal-contact a{display:inline-block;margin-top:12px;color:#fff;font-weight:800;text-decoration:none;}
.legal-final-card{text-align:center;padding:60px;border-radius:34px;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.legal-final-card h2{font-size:clamp(34px,4vw,54px);margin:16px 0;}
.legal-final-card p{max-width:700px;margin:0 auto 30px;color:#f3e8ff;line-height:1.8;}
.legal-final-card .btn-primary{background:#fff;color:#5b21b6;}
@media(max-width:1050px){.legal-layout{grid-template-columns:1fr;}.legal-sidebar{position:static;}}
@media(max-width:760px){.legal-page{padding-top:72px;}.legal-layout{gap:20px;}.legal-content-card{padding:20px;border-radius:24px;}.legal-notice,.legal-contact{flex-direction:column;}.legal-block{grid-template-columns:1fr;}.rights-grid{grid-template-columns:1fr;}.legal-final-card{padding:34px 22px;}}
`}</style>
    </>
  );
}
