import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Crown, HelpCircle, Rocket, ShieldCheck, Sparkles, Star, XCircle, Zap } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";

const BILLING = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

const yearlyPrice = (monthly) => Math.round(monthly * 12 * 0.8);

const paidPrices = {
  pro: {
    monthly: 1999,
    yearly: yearlyPrice(1999),
  },
  ultra: {
    monthly: 2999,
    yearly: yearlyPrice(2999),
  },
};

const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

const getPlanPrice = (plan, billing) => {
  if (plan.free) return "Free";
  if (!plan.priceKey) return "Custom";

  const price = paidPrices[plan.priceKey][billing];

  return billing === BILLING.MONTHLY ? `${formatPrice(price)}/mo` : `${formatPrice(price)}/yr`;
};

const getPlanSubPrice = (plan, billing) => {
  if (plan.free) return "No payment required";
  if (!plan.priceKey) return "Custom pricing";

  if (billing === BILLING.MONTHLY) {
    return "Billed monthly";
  }

  return "20% yearly discount applied";
};

const plans = [
  {
    name: "Starter",
    tag: "For Testing",
    free: true,
    desc: "Explore BR30 Algo Terminal with basic platform access before upgrading.",
    icon: Rocket,
    active: false,
    features: ["Dashboard access", "Broker connect preview", "Strategy builder preview", "Paper trading preview", "Basic reports"],
  },
  {
    name: "Pro",
    tag: "Most Popular",
    priceKey: "pro",
    desc: "For serious traders who want the complete automation workflow.",
    icon: Crown,
    active: true,
    features: ["Broker connect", "Strategy builder", "Backtesting engine", "Paper trading", "Live algo engine", "Risk management", "Reports & analytics"],
  },
  {
    name: "Ultra",
    tag: "Advanced",
    priceKey: "ultra",
    desc: "For advanced traders who need more power, control and premium automation.",
    icon: ShieldCheck,
    active: false,
    features: ["Everything in Pro", "Multi-broker ready workflow", "Advanced risk controls", "More strategy capacity", "Priority support", "Advanced analytics", "Premium automation modules", "Faster execution priority"],
  },
];

const compareRows = [
  ["Dashboard access", true, true, true],
  ["Broker connect", false, true, true],
  ["Strategy builder", "Preview", true, true],
  ["Backtesting engine", false, true, true],
  ["Paper trading", "Preview", true, true],
  ["Live algo engine", false, true, true],
  ["Risk management", "Basic", true, "Advanced"],
  ["Reports & analytics", "Basic", true, "Advanced"],
  ["Multi-broker workflow", false, false, true],
  ["Strategy capacity", "Basic", "Standard", "High"],
  ["Priority support", false, false, true],
  ["Premium automation modules", false, false, true],
];

const faqs = [
  {
    q: "Can I start for free?",
    a: "Yes. Starter plan gives basic access to explore the platform before upgrading.",
  },
  {
    q: "Which plan is best for serious traders?",
    a: "Pro plan is best for serious traders because it includes broker connect, backtesting, paper trading, live engine, risk management and reports.",
  },
  {
    q: "What is the difference between Pro and Ultra?",
    a: "Ultra includes everything in Pro plus advanced risk controls, higher strategy capacity, priority support, advanced analytics and premium automation modules.",
  },
  {
    q: "Does yearly billing include discount?",
    a: "Yes. Yearly billing includes 20% discount compared to paying monthly for 12 months.",
  },
];

export default function PlansPricing() {
  const [billing, setBilling] = useState(BILLING.YEARLY);

  return (
    <>
      <div className="plans-page">
        <Navbar />

        <main>
          <section className="plans-hero">
            <div className="plans-orb plans-orb-one" />
            <div className="plans-orb plans-orb-two" />

            <div className="landing-container plans-hero-inner">
              <span className="section-tag">
                <Sparkles size={14} /> Plans & Pricing
              </span>

              <h1>
                Choose The Right Plan For Your <span>Algo Trading Journey.</span>
              </h1>

              <p>Start with basic access and upgrade when you are ready for broker connection, strategy testing, paper trading, live algo execution and full risk-first automation.</p>

              <div className="pricing-toggle">
                <button type="button" className={billing === BILLING.MONTHLY ? "active" : ""} onClick={() => setBilling(BILLING.MONTHLY)}>
                  Monthly
                </button>

                <button type="button" className={billing === BILLING.YEARLY ? "active" : ""} onClick={() => setBilling(BILLING.YEARLY)}>
                  Yearly
                </button>

                <span>20% OFF</span>
              </div>

              <p className="billing-note">{billing === BILLING.YEARLY ? "Yearly plan saves 20% compared to monthly billing." : "Monthly plan gives flexible access without yearly commitment."}</p>
            </div>
          </section>

          <section className="plans-section">
            <div className="landing-container plans-grid">
              {plans.map((plan) => {
                const Icon = plan.icon;

                return (
                  <div className={plan.active ? "plan-card active" : "plan-card"} key={plan.name}>
                    <div className="plan-top">
                      <div className="plan-icon">
                        <Icon size={28} />
                      </div>

                      <span>{plan.tag}</span>
                    </div>

                    <h3>{plan.name}</h3>

                    <h4>{getPlanPrice(plan, billing)}</h4>

                    <small className="plan-sub-price">{getPlanSubPrice(plan, billing)}</small>

                    <p>{plan.desc}</p>

                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircle2 size={17} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link to={ROUTES.REGISTER} className="plan-btn">
                      {plan.free ? "Start Free" : `Choose ${plan.name}`} <ArrowRight size={17} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="compare-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Compare Plans</span>
                <h2>See What Each Plan Includes</h2>
                <p>Compare features side by side and choose the plan that fits your workflow.</p>
              </div>

              <div className="compare-card">
                <div className="compare-row compare-head">
                  <strong>Feature</strong>
                  <strong>Starter</strong>
                  <strong>Pro</strong>
                  <strong>Ultra</strong>
                </div>

                {compareRows.map((row) => (
                  <div className="compare-row" key={row[0]}>
                    <span>{row[0]}</span>

                    {row.slice(1).map((value, index) => (
                      <div key={index}>{value === true ? <CheckCircle2 size={18} className="yes" /> : value === false ? <XCircle size={18} className="no" /> : <em>{value}</em>}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="why-section">
            <div className="landing-container why-grid">
              <div className="why-content">
                <span className="section-tag">Why Pro & Ultra</span>

                <h2>Built For Traders Who Want More Than A Dashboard</h2>

                <p>BR30 Algo Terminal is designed as a full trading automation workflow, not just a simple panel. Pro unlocks the complete trading flow, and Ultra adds more power for advanced traders.</p>

                <Link to={ROUTES.REGISTER} className="btn-primary">
                  Start Your Journey <Zap size={18} />
                </Link>
              </div>

              <div className="why-list">
                <div>
                  <Star size={22} />
                  <strong>Complete Automation Flow</strong>
                  <span>Broker, strategy, backtest, paper, live and reports.</span>
                </div>

                <div>
                  <ShieldCheck size={22} />
                  <strong>Risk First Execution</strong>
                  <span>Safety checks before live trading activation.</span>
                </div>

                <div>
                  <Crown size={22} />
                  <strong>Ultra Power Upgrade</strong>
                  <span>Advanced controls, priority support and premium modules.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="pricing-faq-section">
            <div className="landing-container faq-grid">
              <div className="faq-left">
                <span className="section-tag">Pricing FAQ</span>
                <h2>Questions Before You Start?</h2>
                <p>Here are the most common questions traders ask before choosing a BR30 plan.</p>
              </div>

              <div className="faq-list">
                {faqs.map((item, index) => (
                  <div className="faq-card" key={item.q}>
                    <div>
                      <HelpCircle size={22} />
                      <h3>
                        {String(index + 1).padStart(2, "0")}. {item.q}
                      </h3>
                    </div>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="plans-final-section">
            <div className="landing-container plans-final-card">
              <Rocket size={40} />

              <h2>Start Building Your Algo Trading System Today</h2>

              <p>Choose your plan and move toward a safer, smarter and more disciplined trading automation workflow with BR30 Algo Terminal.</p>

              <Link to={ROUTES.REGISTER} className="btn-primary">
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.plans-page{min-height:100vh;padding-top:82px;overflow-x:hidden;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.plans-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.plans-page .section-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;font-size:13px;font-weight:800;color:#dccdff;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);}
.plans-page .section-heading{max-width:760px;margin:0 auto 46px;text-align:center;}
.plans-page .section-heading h2{font-size:clamp(34px,4vw,52px);line-height:1.1;margin:18px 0;letter-spacing:-1.6px;color:#fff;}
.plans-page .section-heading p{color:#b8acd6;line-height:1.8;font-size:17px;margin:0;}
.plans-page .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none!important;transition:.35s;font-weight:900;border-radius:999px;min-height:52px;padding:13px 24px;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.plans-page .btn-primary:hover{transform:translateY(-3px);box-shadow:0 26px 70px rgba(124,58,237,.45);}
.plans-hero{position:relative;padding:58px 0 34px;text-align:center;overflow:hidden;}
.plans-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
.plans-orb-one{width:420px;height:420px;left:-160px;top:70px;background:rgba(124,58,237,.35);}
.plans-orb-two{width:360px;height:360px;right:-130px;top:130px;background:rgba(217,70,239,.28);}
.plans-hero-inner{position:relative;z-index:2;max-width:940px;}
.plans-hero h1{margin:24px auto 20px;font-size:clamp(44px,6vw,76px);line-height:1.02;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.plans-hero h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.plans-hero p{max-width:760px;margin:0 auto;color:#b8acd6;font-size:18px;line-height:1.8;}
.billing-note{margin-top:15px!important;font-size:14px!important;color:#e9d5ff!important;font-weight:800;}
.pricing-toggle{width:max-content;margin:34px auto 0;padding:8px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:8px;position:relative;}
.pricing-toggle button{height:42px;padding:0 18px;border:0;border-radius:999px;background:transparent;color:#d8cbff;font-weight:900;cursor:pointer;transition:.3s;}
.pricing-toggle button:hover{color:#fff;background:rgba(255,255,255,.06);}
.pricing-toggle button.active{background:#fff;color:#5b21b6;}
.pricing-toggle span{position:absolute;right:-68px;top:-16px;padding:6px 10px;border-radius:999px;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;font-size:11px;font-weight:950;}
.plans-section{padding:24px 0 75px;}
.compare-section,.why-section,.pricing-faq-section,.plans-final-section{padding:75px 0;}
.plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:stretch;}
.plan-card,.compare-card,.why-content,.why-list div,.faq-card,.plans-final-card{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.26);}
.plan-card{position:relative;border-radius:30px;padding:30px;transition:.35s;overflow:hidden;display:flex;flex-direction:column;height:100%;}
.plan-card.active{border-color:rgba(217,70,239,.55);transform:translateY(-12px);box-shadow:0 35px 110px rgba(124,58,237,.32);}
.plan-card:hover{transform:translateY(-10px);border-color:rgba(168,85,247,.45);}
.plan-card.active:hover{transform:translateY(-16px);}
.plan-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:24px;}
.plan-icon{width:62px;height:62px;border-radius:20px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.35);color:#fff;}
.plan-top span{padding:7px 12px;border-radius:999px;background:rgba(168,85,247,.16);border:1px solid rgba(168,85,247,.28);color:#e9d5ff;font-size:12px;font-weight:900;}
.plan-card h3{margin:0;color:#fff;font-size:26px;}
.plan-card h4{margin:14px 0 4px;font-size:42px;color:#fff;letter-spacing:-1.5px;}
.plan-sub-price{display:block;margin-bottom:16px;color:#cdbfff;font-size:13px;font-weight:900;}
.plan-card p{margin:0;color:#b8acd6;line-height:1.7;}
.plan-card ul{list-style:none;padding:0;margin:26px 0;display:grid;gap:13px;}
.plan-card li{display:flex;align-items:center;gap:9px;color:#d8cbff;font-weight:750;}
.plan-card li svg{color:#22c55e;flex-shrink:0;}
.plan-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:52px;border-radius:999px;text-decoration:none!important;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;font-weight:950;margin-top:auto;}
.compare-card{border-radius:30px;padding:24px;overflow:auto;}
.compare-row{min-width:760px;display:grid;grid-template-columns:1.2fr repeat(3,1fr);gap:16px;align-items:center;padding:17px 14px;border-bottom:1px solid rgba(255,255,255,.07);}
.compare-row:last-child{border-bottom:0;}
.compare-head{color:#fff;background:rgba(255,255,255,.045);border-radius:18px;}
.compare-row span{color:#d8cbff;font-weight:800;}
.compare-row div{text-align:center;color:#fff;font-weight:850;}
.compare-row .yes{color:#22c55e;}
.compare-row .no{color:#fb7185;}
.compare-row em{font-style:normal;color:#e9d5ff;font-weight:850;}
.why-grid,.faq-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center;}
.why-content{border-radius:34px;padding:40px;}
.why-content h2,.faq-left h2,.plans-final-card h2{margin:20px 0;font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-1.5px;color:#fff;}
.why-content p,.faq-left p,.faq-card p,.plans-final-card p{color:#b8acd6;line-height:1.8;font-size:16px;}
.why-content .btn-primary{margin-top:26px;}
.why-list{display:grid;gap:18px;}
.why-list div{border-radius:24px;padding:24px;display:grid;gap:8px;}
.why-list svg{color:#d946ef;}
.why-list strong{color:#fff;font-size:20px;}
.why-list span{color:#b8acd6;line-height:1.6;}
.faq-left{max-width:520px;}
.faq-list{display:grid;gap:18px;}
.faq-card{border-radius:24px;padding:24px;}
.faq-card div{display:flex;gap:12px;align-items:center;}
.faq-card svg{color:#d946ef;flex-shrink:0;}
.faq-card h3{margin:0;color:#fff;font-size:20px;}
.faq-card p{margin:14px 0 0;}
.plans-final-card{border-radius:34px;padding:62px;text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.plans-final-card svg{color:#fff;margin-bottom:18px;}
.plans-final-card p{max-width:680px;margin:18px auto 30px;color:#f3e8ff;}
.plans-final-card .btn-primary{background:#fff;color:#5b21b6;box-shadow:none;}
@media(max-width:1050px){.plans-grid,.why-grid,.faq-grid{grid-template-columns:1fr;}.plan-card.active{transform:none;}.plan-card.active:hover{transform:translateY(-10px);}.faq-left{max-width:100%;}.plans-grid{max-width:760px;margin:auto;}}
@media(max-width:760px){.plans-page{padding-top:72px;}.plans-hero{padding:32px 0 30px;}.plans-hero h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.plans-hero p{font-size:15px;}.pricing-toggle{width:100%;justify-content:center;border-radius:22px;}.pricing-toggle span{position:static;}.plans-section{padding:22px 0 55px;}.compare-section,.why-section,.pricing-faq-section,.plans-final-section{padding:55px 0;}.plan-card,.why-content,.faq-card{border-radius:24px;padding:24px;}.plan-card h4{font-size:36px;}.compare-card{border-radius:22px;padding:14px;}.why-content h2,.faq-left h2,.plans-final-card h2{font-size:clamp(30px,9vw,42px);}.plans-final-card{padding:34px 24px;border-radius:24px;}}
@media(max-width:430px){.plans-hero h1{font-size:40px;}.pricing-toggle{flex-wrap:wrap;}.pricing-toggle button{flex:1;}.plan-top{align-items:flex-start;flex-direction:column;}.faq-card div{align-items:flex-start;}}
`}</style>
    </>
  );
}
