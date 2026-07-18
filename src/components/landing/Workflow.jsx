import { UserPlus, PlugZap, Bot, ChartNoAxesCombined, MonitorPlay, ShieldCheck, PlayCircle, BarChart3 } from "lucide-react";

const workflow = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up and access your personal BR30 Algo Terminal dashboard.",
  },
  {
    icon: PlugZap,
    title: "Connect Broker",
    description: "Securely connect your broker account using OAuth authentication.",
  },
  {
    icon: Bot,
    title: "Build Strategy",
    description: "Create your own automated trading strategy with complete flexibility.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Backtest",
    description: "Validate your strategy using historical market data before deployment.",
  },
  {
    icon: MonitorPlay,
    title: "Paper Trading",
    description: "Test your strategy in a risk-free simulated market environment.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Verification",
    description: "Daily loss, maximum trades and safety checks are verified automatically.",
  },
  {
    icon: PlayCircle,
    title: "Enable Live Trading",
    description: "Turn ON the trade engine only after every safety requirement is satisfied.",
  },
  {
    icon: BarChart3,
    title: "Track Performance",
    description: "Monitor P&L, trade history, analytics and overall trading performance.",
  },
];

export default function Workflow() {
  return (
    <>
      <section className="workflow-section">
        <div className="landing-container">
          <div className="section-heading">
            <span className="section-tag">Platform Workflow</span>

            <h2>From Registration To Automated Trading</h2>

            <p>Every trade follows a structured workflow to maximize security, discipline and execution quality.</p>
          </div>

          <div className="workflow-grid">
            {workflow.map((step, index) => {
              const Icon = step.icon;

              return (
                <div className="workflow-card" key={index}>
                  <div className="workflow-number">{String(index + 1).padStart(2, "0")}</div>

                  <div className="workflow-icon">
                    <Icon size={30} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>

                  {index !== workflow.length - 1 && <div className="workflow-arrow">↓</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
.workflow-section{padding:90px 0;}
.workflow-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;}
.workflow-card{position:relative;padding:30px 24px;border-radius:26px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);transition:.35s;overflow:hidden;text-align:center;}
.workflow-card::before{content:"";position:absolute;left:0;top:0;width:100%;height:4px;background:linear-gradient(90deg,#7c3aed,#d946ef);transform:scaleX(0);transform-origin:left;transition:.35s;}
.workflow-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.4);box-shadow:0 28px 70px rgba(124,58,237,.22);}
.workflow-card:hover::before{transform:scaleX(1);}
.workflow-number{position:absolute;top:18px;right:18px;font-size:38px;font-weight:900;color:rgba(255,255,255,.08);}
.workflow-icon{width:72px;height:72px;margin:0 auto 22px;border-radius:22px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.workflow-card h3{margin:0 0 14px;font-size:20px;font-weight:900;color:#fff;}
.workflow-card p{margin:0;color:#b8acd6;font-size:15px;line-height:1.75;min-height:78px;}
.workflow-arrow{margin-top:22px;font-size:26px;color:#d946ef;font-weight:900;animation:workflowBounce 1.4s infinite;}
@keyframes workflowBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(6px);}}
@media(max-width:1100px){.workflow-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:760px){.workflow-section{padding:60px 0;}.workflow-grid{grid-template-columns:1fr;gap:18px;}.workflow-card{padding:24px;border-radius:22px;}.workflow-icon{width:60px;height:60px;border-radius:18px;}.workflow-number{font-size:30px;top:14px;right:16px;}.workflow-card h3{font-size:18px;}.workflow-card p{min-height:auto;}.workflow-arrow{display:none;}}
`}</style>
    </>
  );
}
