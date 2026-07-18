import { useState } from "react";
import { CheckCircle2, Crown, Rocket, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const BILLING = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

const yearlyPrice = (monthly) => Math.round(monthly * 12 * 0.8);
const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

const paidPrices = {
  pro: { monthly: 1999, yearly: yearlyPrice(1999) },
  ultra: { monthly: 2999, yearly: yearlyPrice(2999) },
};

const plans = [
  {
    name: "Starter",
    priceKey: null,
    badge: "For Testing",
    icon: Rocket,
    description: "Explore BR30 Algo Terminal with basic access.",
    features: ["Dashboard access", "Broker connect preview", "Strategy builder preview", "Paper trading preview", "Basic reports"],
    button: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    priceKey: "pro",
    badge: "Most Popular",
    icon: Crown,
    description: "For serious traders who want full algo automation.",
    features: ["Broker connect", "Strategy builder", "Backtesting engine", "Paper trading", "Live algo engine", "Risk management", "Reports & analytics"],
    button: "Choose Pro",
    highlighted: true,
  },
  {
    name: "Ultra",
    priceKey: "ultra",
    badge: "Advanced",
    icon: ShieldCheck,
    description: "For advanced traders who need more power, control and premium automation.",
    features: ["Everything in Pro", "Multi-broker ready workflow", "Advanced risk controls", "More strategy capacity", "Priority support", "Advanced analytics", "Premium automation modules", "Faster execution priority"],
    button: "Choose Ultra",
    highlighted: false,
  },
];

const getPrice = (plan, billing) => {
  if (!plan.priceKey) return "Free";
  const price = paidPrices[plan.priceKey][billing];
  return billing === BILLING.MONTHLY ? `${formatPrice(price)}/mo` : `${formatPrice(price)}/yr`;
};

const getSubPrice = (plan, billing) => {
  if (!plan.priceKey) return "No payment required";
  return billing === BILLING.MONTHLY ? "Billed monthly" : "20% yearly discount applied";
};

export default function Pricing() {
  const [billing, setBilling] = useState(BILLING.MONTHLY);

  return (
    <>
      <section className="pricing-section" id="pricing">
        <div className="landing-container">
          <div className="section-heading">
            <span className="section-tag">Simple Pricing</span>

            <h2>Choose The Right Plan For Your Algo Journey</h2>

            <p>Start with basic access and upgrade when you are ready for broker connection, paper trading, live algo execution and full automation.</p>

            <div className="home-pricing-toggle">
              <button type="button" className={billing === BILLING.MONTHLY ? "active" : ""} onClick={() => setBilling(BILLING.MONTHLY)}>
                Monthly
              </button>

              <button type="button" className={billing === BILLING.YEARLY ? "active" : ""} onClick={() => setBilling(BILLING.YEARLY)}>
                Yearly
              </button>

              <span>20% OFF</span>
            </div>

            <p className="home-billing-note">{billing === BILLING.YEARLY ? "Yearly plan saves 20% compared to monthly billing." : "Monthly plan gives flexible access without yearly commitment."}</p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => {
              const Icon = plan.icon;

              return (
                <div key={plan.name} className={plan.highlighted ? "pricing-card active" : "pricing-card"}>
                  <div className="pricing-badge">{plan.badge}</div>

                  <div className="pricing-title">
                    <h3>{plan.name}</h3>

                    <div className="pricing-icon">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h4>{getPrice(plan, billing)}</h4>

                  <small className="pricing-sub-price">{getSubPrice(plan, billing)}</small>

                  <p>{plan.description}</p>

                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <CheckCircle2 size={17} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to={ROUTES.REGISTER} className="pricing-btn">
                    {plan.button}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
.pricing-section{padding:90px 0;scroll-margin-top:96px;}
.home-pricing-toggle{width:max-content;margin:30px auto 0;padding:8px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:8px;position:relative;}
.home-pricing-toggle button{height:42px;padding:0 18px;border:0;border-radius:999px;background:transparent;color:#d8cbff;font-weight:900;cursor:pointer;transition:.3s;}
.home-pricing-toggle button:hover{color:#fff;background:rgba(255,255,255,.06);}
.home-pricing-toggle button.active{background:#fff;color:#5b21b6;}
.home-pricing-toggle span{position:absolute;right:-68px;top:-16px;padding:6px 10px;border-radius:999px;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;font-size:11px;font-weight:950;}
.home-billing-note{margin:14px auto 0!important;font-size:14px!important;color:#e9d5ff!important;font-weight:800!important;}
.pricing-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;align-items:stretch;}
.pricing-card{position:relative;padding:22px 26px 26px;border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);transition:.35s;overflow:hidden;display:flex;flex-direction:column;height:100%;}
.pricing-card::before{content:"";position:absolute;left:0;top:0;width:100%;height:4px;background:linear-gradient(90deg,#7c3aed,#d946ef);transform:scaleX(0);transform-origin:left;transition:.35s;}
.pricing-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.4);box-shadow:0 30px 80px rgba(124,58,237,.24);}
.pricing-card:hover::before{transform:scaleX(1);}
.pricing-card.active{border-color:rgba(216,180,254,.55);box-shadow:0 35px 110px rgba(124,58,237,.35);transform:translateY(-12px);}
.pricing-card.active::before{transform:scaleX(1);}
.pricing-badge{width:max-content;margin:0 auto 18px;padding:7px 12px;border-radius:999px;background:rgba(168,85,247,.16);color:#e9d5ff;border:1px solid rgba(168,85,247,.28);font-size:12px;font-weight:900;text-align:center;}
.pricing-title{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 12px;}
.pricing-title h3{margin:0;font-size:22px;font-weight:950;color:#fff;}
.pricing-icon{width:54px;height:54px;margin:0;border-radius:17px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 40px rgba(124,58,237,.35);flex-shrink:0;}
.pricing-card h4{margin:0 0 4px;font-size:36px;font-weight:950;color:#fff;letter-spacing:-1.4px;}
.pricing-sub-price{display:block;margin-bottom:14px;color:#cdbfff;font-size:12px;font-weight:900;}
.pricing-card p{margin:0;color:#b8acd6;font-size:15px;line-height:1.7;}
.pricing-card ul{list-style:none;padding:0;margin:22px 0;display:grid;gap:12px;}
.pricing-card li{display:flex;align-items:center;gap:9px;color:#dcd3f5;font-size:14px;font-weight:700;}
.pricing-card li svg{color:#22c55e;flex-shrink:0;}
.pricing-btn{margin-top:auto;display:flex;align-items:center;justify-content:center;text-decoration:none!important;color:#fff;font-weight:900;padding:14px 20px;border-radius:999px;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.3);transition:.35s;}
.pricing-btn:hover{transform:translateY(-3px);box-shadow:0 24px 65px rgba(124,58,237,.45);}
@media(max-width:1050px){.pricing-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.pricing-card.active{transform:none;}}
@media(max-width:760px){.pricing-section{padding:60px 0;scroll-margin-top:82px;}.home-pricing-toggle{width:100%;justify-content:center;border-radius:22px;}.home-pricing-toggle span{position:static;}.pricing-grid{grid-template-columns:1fr;gap:18px;}.pricing-card{padding:22px;border-radius:22px;}.pricing-icon{width:50px;height:50px;}.pricing-card h4{font-size:32px;}}
@media(max-width:430px){.home-pricing-toggle{flex-wrap:wrap;}.home-pricing-toggle button{flex:1;}.pricing-badge{white-space:nowrap;}.pricing-title{align-items:center;}.pricing-title h3{font-size:21px;}}
`}</style>
    </>
  );
}
