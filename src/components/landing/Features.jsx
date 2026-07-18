import { PlugZap, Bot, BarChart3, FileBarChart2, ShieldCheck, Wallet, ArrowRight, Activity } from "lucide-react";

const features = [
  {
    icon: PlugZap,
    title: "Broker Connect",
    description: "Securely connect your trading account using OAuth with encrypted token management.",
  },
  {
    icon: Bot,
    title: "Strategy Builder",
    description: "Create and manage rule-based trading strategies without changing your workflow.",
  },
  {
    icon: BarChart3,
    title: "Backtesting Engine",
    description: "Validate strategies on historical market data before deploying them live.",
  },
  {
    icon: Activity,
    title: "Paper Trading",
    description: "Test every strategy in a simulated environment without risking real capital.",
  },
  {
    icon: Wallet,
    title: "Live Algo Trading",
    description: "Execute automated trades directly through your connected broker account.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description: "Daily loss limit, maximum trades, position sizing and multiple safety checks.",
  },
  {
    icon: FileBarChart2,
    title: "Reports & Analytics",
    description: "Monitor performance, trade history, win rate, drawdown and detailed statistics.",
  },
  {
    icon: ShieldCheck,
    title: "Production Security",
    description: "Designed with authentication, encrypted storage, secure APIs and production architecture.",
  },
];

export default function Features() {
  return (
    <>
      <section className="features-section" id="features">
        <div className="landing-container">
          <div className="section-heading">
            <span className="section-tag">Platform Features</span>

            <h2>Everything You Need For Professional Algo Trading</h2>

            <p>BR30 Algo Terminal combines broker connectivity, automation, risk management and analytics into one modern trading platform.</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={28} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <div className="feature-footer">
                    <span>Learn More</span>

                    <ArrowRight size={18} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
.features-section{padding:90px 0;}
.features-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;}
.feature-card{position:relative;padding:28px;border-radius:26px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);transition:.35s;overflow:hidden;}
.feature-card::before{content:"";position:absolute;top:0;left:0;width:100%;height:4px;background:linear-gradient(90deg,#7c3aed,#d946ef);transform:scaleX(0);transform-origin:left;transition:.35s;}
.feature-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.4);box-shadow:0 30px 70px rgba(124,58,237,.22);}
.feature-card:hover::before{transform:scaleX(1);}
.feature-icon{width:62px;height:62px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 40px rgba(124,58,237,.35);}
.feature-card h3{margin:22px 0 14px;font-size:20px;font-weight:900;color:#fff;}
.feature-card p{margin:0;color:#b8acd6;font-size:15px;line-height:1.75;min-height:82px;}
.feature-footer{margin-top:22px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;color:#d8cbff;font-size:14px;font-weight:800;}
.feature-footer svg{transition:.3s;}
.feature-card:hover .feature-footer svg{transform:translateX(6px);}
@media(max-width:1100px){.features-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:760px){.features-section{padding:60px 0;}.features-grid{grid-template-columns:1fr;gap:18px;}.feature-card{padding:22px;border-radius:22px;}.feature-icon{width:56px;height:56px;}.feature-card h3{font-size:18px;}.feature-card p{min-height:auto;}}
`}</style>
    </>
  );
}
