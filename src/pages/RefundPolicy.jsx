import { Link } from "react-router-dom";
import { ArrowRight, BadgeIndianRupee, Ban, CheckCircle2, CreditCard, FileText, Mail, RefreshCcw, ShieldCheck, Sparkles, Wallet, XCircle } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";

const refundSections = [
  {
    icon: CreditCard,
    title: "1. Subscription Purchases",
    text: "BR30 Algo Terminal provides digital software services, trading automation tools, and subscription-based access. By purchasing any subscription, users acknowledge that they are purchasing access to digital services rather than physical products.",
  },
  {
    icon: BadgeIndianRupee,
    title: "2. Payment Confirmation",
    text: "Once a payment is successfully processed through our authorized payment partner, the selected subscription or service will be activated according to the purchased plan. Users should carefully review pricing, duration, and included features before completing payment.",
  },
  {
    icon: Ban,
    title: "3. Non-Refundable Services",
    text: "Because BR30 Algo Terminal delivers instant digital access, subscriptions, platform usage, broker connectivity, automation tools, reports, and other digital services are generally non-refundable once activated unless otherwise required by applicable law.",
  },
  {
    icon: RefreshCcw,
    title: "4. Exceptional Refund Cases",
    text: "Refund requests may be reviewed only in exceptional situations such as duplicate payment, accidental double charge, technical billing error, or other verified payment issues. Every request will be evaluated individually by the BR30 support team.",
  },
  {
    icon: Wallet,
    title: "5. Failed Transactions",
    text: "If a payment fails but money is deducted, users should first contact their bank or payment provider. In most cases the amount is automatically reversed by the payment gateway according to banking timelines.",
  },
];

const notRefundable = ["Activated subscriptions", "Used platform access", "Strategy builder usage", "Backtesting usage", "Paper trading access", "Live Algo usage", "Broker integration usage", "Downloaded digital resources"];

export default function RefundPolicy() {
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
                Refund Policy
              </span>

              <h1>
                Refund Policy For
                <span> BR30 Algo Terminal.</span>
              </h1>

              <p>This Refund Policy explains how subscription payments, billing, refund requests, cancellations, duplicate payments, and payment disputes are handled for BR30 Algo Terminal.</p>

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
                <h3>Policy Overview</h3>

                <a href="#intro">Introduction</a>
                <a href="#payment">Payments</a>
                <a href="#refund">Refund Rules</a>
                <a href="#cancel">Cancellation</a>
                <a href="#contact">Support</a>
              </aside>

              <div className="legal-content-card">
                <div className="legal-notice" id="intro">
                  <ShieldCheck size={26} />

                  <div>
                    <h2>Introduction</h2>

                    <p>BR30 Algo Terminal is a digital software platform. Subscription purchases provide access to online features, automation tools, dashboards, reports, and trading utilities. Because these services become available immediately after activation, refund eligibility is limited.</p>
                  </div>
                </div>

                <div className="legal-section" id="payment">
                  {refundSections.map((item) => {
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

                <div className="legal-rights" id="refund">
                  <h2>Generally Not Eligible For Refund</h2>

                  <p>The following services are normally considered consumed once access has been provided and therefore are not eligible for refund.</p>

                  <div className="rights-grid">
                    {notRefundable.map((item) => (
                      <div key={item}>
                        <XCircle size={20} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="legal-block" id="cancel">
                  <div className="legal-block-icon">
                    <RefreshCcw size={24} />
                  </div>

                  <div>
                    <h3>6. Subscription Cancellation</h3>
                    <p>Users may stop using the platform at any time. If future subscription cancellation features are provided inside the dashboard, users may cancel renewal from their account settings. Cancellation does not automatically create a refund for an already activated or consumed subscription period.</p>
                  </div>
                </div>

                <div className="legal-block">
                  <div className="legal-block-icon">
                    <CheckCircle2 size={24} />
                  </div>

                  <div>
                    <h3>7. Duplicate Payments</h3>
                    <p>If a user is charged twice for the same plan, same account, and same billing period, the duplicate payment may be reviewed for refund after verification. Users must share transaction details, registered email, payment screenshot, and payment ID where available.</p>
                  </div>
                </div>

                <div className="legal-block">
                  <div className="legal-block-icon">
                    <Ban size={24} />
                  </div>

                  <div>
                    <h3>8. Chargebacks & Payment Disputes</h3>
                    <p>If a chargeback or payment dispute is raised without first contacting BR30 support, the account may be temporarily restricted until the payment issue is resolved. Fraudulent disputes, misuse, or payment abuse may lead to permanent account limitation.</p>
                  </div>
                </div>

                <div className="legal-block">
                  <div className="legal-block-icon">
                    <FileText size={24} />
                  </div>

                  <div>
                    <h3>9. Policy Updates</h3>
                    <p>BR30 Algo Terminal may update this Refund Policy from time to time based on pricing changes, subscription models, payment gateway rules, product changes, or legal requirements. Updated policy versions will be posted on this page with a revised last updated date.</p>
                  </div>
                </div>

                <div className="legal-contact" id="contact">
                  <Mail size={28} />

                  <div>
                    <h2>Refund Support</h2>

                    <p>For refund-related queries, duplicate payment issues, or billing support, contact BR30 Algo Team with your registered email and payment details.</p>

                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support.br30trader@gmail.com&su=Refund%20Policy%20Query&body=Hello%20BR30%20Algo%20Team,%0A%0AI%20have%20a%20question%20regarding%20the%20Refund%20Policy.%0A%0ARegistered%20Email:%20%0APayment%20ID:%20%0AOrder%20ID:%20%0ADetails:%20%0A%0AThanks" target="_blank" rel="noopener noreferrer">
                      support.br30trader@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="legal-final-section">
            <div className="landing-container legal-final-card">
              <Wallet size={40} />

              <h2>Review Your Plan Before Purchase</h2>

              <p>BR30 Algo Terminal is a digital subscription platform. Please check plan details, features, and pricing carefully before completing payment.</p>

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
.legal-sidebar{position:sticky;top:110px;padding:22px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.24);}
.legal-sidebar h3{margin:0 0 16px;color:#fff;font-size:19px;}
.legal-sidebar a{display:block;text-decoration:none!important;color:#cdbfff;font-weight:800;padding:12px 13px;border-radius:14px;transition:.3s;}
.legal-sidebar a:hover{background:rgba(255,255,255,.07);color:#fff;}
.legal-content-card{padding:34px;border-radius:34px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.26);}
.legal-notice,.legal-block,.legal-contact,.legal-rights{border-radius:26px;background:rgba(0,0,0,.22);border:1px solid rgba(255,255,255,.08);}
.legal-notice{display:flex;gap:18px;padding:26px;margin-bottom:22px;background:linear-gradient(135deg,rgba(124,58,237,.3),rgba(217,70,239,.12));}
.legal-notice svg,.legal-contact svg{color:#d946ef;flex-shrink:0;}
.legal-notice h2,.legal-rights h2,.legal-contact h2{margin:0 0 12px;color:#fff;font-size:28px;letter-spacing:-.5px;}
.legal-notice p,.legal-block p,.legal-rights p,.legal-contact p{margin:0;color:#b8acd6;line-height:1.85;font-size:16px;}
.legal-section{display:grid;gap:18px;margin-bottom:18px;}
.legal-block{display:grid;grid-template-columns:58px 1fr;gap:18px;padding:24px;margin-bottom:18px;}
.legal-block-icon{width:58px;height:58px;border-radius:18px;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.28);}
.legal-block h3{margin:0 0 10px;color:#fff;font-size:21px;}
.legal-rights{padding:28px;margin:18px 0;}
.rights-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:22px;}
.rights-grid div{display:flex;align-items:center;gap:10px;padding:14px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);color:#d8cbff;font-weight:850;}
.rights-grid svg{color:#fb7185;flex-shrink:0;}
.legal-contact{display:flex;gap:18px;padding:28px;margin-top:18px;}
.legal-contact a{display:inline-block;margin-top:14px;color:#fff;font-weight:900;text-decoration:none!important;word-break:break-word;}
.legal-contact a:hover{color:#e9d5ff;}
.legal-final-card{border-radius:34px;padding:62px;text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);border:1px solid rgba(255,255,255,.1);box-shadow:0 30px 90px rgba(124,58,237,.32);}
.legal-final-card svg{color:#fff;margin-bottom:18px;}
.legal-final-card h2{margin:0;font-size:clamp(34px,4vw,54px);letter-spacing:-1.5px;color:#fff;}
.legal-final-card p{max-width:680px;margin:18px auto 30px;color:#f3e8ff;line-height:1.8;}
.legal-final-card .btn-primary{background:#fff;color:#5b21b6;box-shadow:none;}
@media(max-width:1050px){.legal-layout{grid-template-columns:1fr;}.legal-sidebar{position:static;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}.legal-sidebar h3{grid-column:1/-1;}}
@media(max-width:760px){.legal-page{padding-top:72px;}.legal-hero{padding:32px 0 55px;}.legal-hero h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.legal-hero p{font-size:15px;}.legal-content-section,.legal-final-section{padding:55px 0;}.legal-content-card{padding:20px;border-radius:24px;}.legal-sidebar{grid-template-columns:1fr;border-radius:22px;padding:18px;}.legal-notice,.legal-contact{flex-direction:column;}.legal-notice,.legal-block,.legal-rights,.legal-contact{border-radius:20px;padding:20px;}.legal-block{grid-template-columns:1fr;}.legal-block-icon{width:54px;height:54px;}.rights-grid{grid-template-columns:1fr;}.legal-final-card{padding:34px 24px;border-radius:24px;}.legal-final-card h2{font-size:clamp(30px,9vw,42px);}}
@media(max-width:430px){.legal-hero h1{font-size:40px;}.legal-meta{gap:12px;}.legal-meta div{width:100%;}.legal-notice h2,.legal-rights h2,.legal-contact h2{font-size:24px;}}
`}</style>
    </>
  );
}
