import { Activity, Bot, CheckCircle2, CircleDollarSign, DatabaseZap, Gauge, ShieldCheck, TrendingUp } from "lucide-react";

const metrics = [
  {
    label: "Broker Status",
    value: "Connected",
    status: "Live",
  },
  {
    label: "Risk Mode",
    value: "Protected",
    status: "Safe",
  },
  {
    label: "Strategy",
    value: "Paper Test",
    status: "Active",
  },
];

const modules = [
  {
    icon: Bot,
    title: "Strategy Engine",
    value: "Ready",
  },
  {
    icon: ShieldCheck,
    title: "Risk Engine",
    value: "Verified",
  },
  {
    icon: DatabaseZap,
    title: "Market Data",
    value: "Streaming",
  },
];

export default function DashboardPreview() {
  return (
    <>
      <section className="dashboard-preview-section">
        <div className="landing-container dashboard-preview-grid">
          <div className="dashboard-preview-content">
            <span className="section-tag">Terminal Preview</span>

            <h2>One Dashboard To Control Your Complete Algo Trading System</h2>

            <p>Monitor broker connection, strategy status, risk protection, paper trading, live execution and reports from a single clean terminal.</p>

            <div className="preview-points">
              <div>
                <CheckCircle2 size={18} />
                Broker connection status
              </div>

              <div>
                <CheckCircle2 size={18} />
                Strategy and engine control
              </div>

              <div>
                <CheckCircle2 size={18} />
                Risk verification before live trading
              </div>

              <div>
                <CheckCircle2 size={18} />
                Real-time reports and trade logs
              </div>
            </div>
          </div>

          <div className="dashboard-mockup">
            <div className="mockup-glow" />

            <div className="mockup-window">
              <div className="mockup-header">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <strong>BR30 Algo Terminal</strong>

                <div className="mockup-live">
                  <span />
                  LIVE READY
                </div>
              </div>

              <div className="mockup-body">
                <aside className="mockup-sidebar">
                  <div className="mockup-logo">BR</div>

                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </aside>

                <div className="mockup-main">
                  <div className="mockup-title-row">
                    <div>
                      <h3>Dashboard</h3>
                      <p>Trading automation control center</p>
                    </div>

                    <button>Engine OFF</button>
                  </div>

                  <div className="mockup-metrics">
                    {metrics.map((item) => (
                      <div className="mockup-metric-card" key={item.label}>
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                        <span>{item.status}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mockup-chart-row">
                    <div className="mockup-chart">
                      <div className="mockup-chart-line">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="mockup-risk-card">
                      <Gauge size={24} />
                      <h4>Risk Score</h4>
                      <strong>92%</strong>
                      <p>Live safety ready</p>
                    </div>
                  </div>

                  <div className="mockup-modules">
                    {modules.map((module) => {
                      const Icon = module.icon;

                      return (
                        <div className="mockup-module" key={module.title}>
                          <Icon size={20} />
                          <div>
                            <strong>{module.title}</strong>
                            <span>{module.value}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="preview-floating-card preview-card-one">
              <TrendingUp size={18} />
              <div>
                <strong>+2.4%</strong>
                <span>Paper P&L</span>
              </div>
            </div>

            <div className="preview-floating-card preview-card-two">
              <CircleDollarSign size={18} />
              <div>
                <strong>₹0 Risk</strong>
                <span>Before live mode</span>
              </div>
            </div>

            <div className="preview-floating-card preview-card-three">
              <Activity size={18} />
              <div>
                <strong>8 Logs</strong>
                <span>Today activity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
.dashboard-preview-section{padding:90px 0;}
.dashboard-preview-grid{display:grid;grid-template-columns:.9fr 1.2fr;gap:56px;align-items:center;}
.dashboard-preview-content h2{font-size:clamp(36px,4vw,52px);line-height:1.08;margin:20px 0;letter-spacing:-1.6px;color:#fff;}
.dashboard-preview-content p{color:#b8acd6;font-size:17px;line-height:1.8;}
.preview-points{display:grid;gap:14px;margin-top:26px;}
.preview-points div{display:flex;align-items:center;gap:10px;color:#e7ddff;font-weight:750;}
.preview-points svg{color:#22c55e;}
.dashboard-mockup{position:relative;}
.mockup-window{position:relative;overflow:hidden;border-radius:30px;background:linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.035));border:1px solid rgba(255,255,255,.105);box-shadow:0 35px 110px rgba(0,0,0,.45);backdrop-filter:blur(22px);}
.mockup-window::before{content:"";position:absolute;inset:-2px;background:radial-gradient(circle at top,rgba(217,70,239,.24),transparent 45%);pointer-events:none;}
.mockup-header{position:relative;z-index:2;padding:18px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.08);}
.mockup-header strong{font-size:14px;font-weight:900;color:#fff;}
.mockup-live{display:flex;align-items:center;gap:8px;color:#22c55e;font-size:12px;font-weight:900;}
.mockup-live span{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 7px rgba(34,197,94,.12);}
.mockup-body{position:relative;z-index:2;display:grid;grid-template-columns:86px 1fr;min-height:460px;}
.mockup-sidebar{padding:20px;background:rgba(0,0,0,.22);display:grid;gap:16px;align-content:start;}
.mockup-logo{width:44px;height:44px;display:grid;place-items:center;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#d946ef);font-weight:950;color:#fff;}
.mockup-sidebar span{height:34px;border-radius:12px;background:rgba(255,255,255,.08);}
.mockup-main{padding:22px;}
.mockup-title-row{display:flex;align-items:center;justify-content:space-between;gap:14px;}
.mockup-title-row h3{margin:0;color:#fff;font-size:20px;}
.mockup-title-row p{margin:5px 0 0;color:#b8acd6;font-size:13px;}
.mockup-title-row button{border:0;padding:10px 16px;border-radius:999px;color:#fff;background:linear-gradient(135deg,#ef4444,#f97316);font-weight:900;white-space:nowrap;}
.mockup-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:20px 0;}
.mockup-metric-card,.mockup-risk-card,.mockup-module,.preview-floating-card{border-radius:18px;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.08);padding:16px;}
.mockup-metric-card small,.mockup-metric-card span{color:#b8acd6;display:block;font-size:12px;}
.mockup-metric-card strong{display:block;margin:7px 0;color:#fff;}
.mockup-chart-row{display:grid;grid-template-columns:1fr 150px;gap:14px;}
.mockup-chart{min-height:145px;border-radius:20px;background:rgba(124,58,237,.09);display:flex;align-items:end;padding:18px;border:1px solid rgba(168,85,247,.12);}
.mockup-chart-line{width:100%;display:flex;align-items:end;gap:10px;}
.mockup-chart-line span{flex:1;height:60px;border-radius:999px 999px 5px 5px;background:linear-gradient(180deg,#a855f7,#d946ef);}
.mockup-chart-line span:nth-child(2){height:95px;}
.mockup-chart-line span:nth-child(3){height:75px;}
.mockup-chart-line span:nth-child(4){height:122px;}
.mockup-chart-line span:nth-child(5){height:88px;}
.mockup-chart-line span:nth-child(6){height:135px;}
.mockup-risk-card h4{margin:10px 0 6px;color:#fff;}
.mockup-risk-card strong{font-size:30px;color:#fff;}
.mockup-risk-card p{margin:6px 0 0;color:#b8acd6;font-size:13px;}
.mockup-modules{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px;}
.mockup-module{display:flex;gap:12px;align-items:center;}
.mockup-module strong{display:block;color:#fff;font-size:13px;}
.mockup-module span{display:block;color:#b8acd6;font-size:12px;}
.preview-floating-card{position:absolute;display:flex;align-items:center;gap:12px;color:#fff;backdrop-filter:blur(18px);box-shadow:0 18px 55px rgba(0,0,0,.35);}
.preview-floating-card strong{display:block;color:#fff;}
.preview-floating-card span{color:#b8acd6;font-size:13px;}
.preview-card-one{left:-25px;top:92px;}
.preview-card-two{right:-24px;top:210px;}
.preview-card-three{left:60px;bottom:-24px;}
@media(max-width:1050px){.dashboard-preview-grid{grid-template-columns:1fr;gap:42px;}.dashboard-mockup{width:100%;max-width:760px;margin:auto;}}
@media(max-width:760px){.dashboard-preview-section{padding:60px 0;}.dashboard-preview-content h2{font-size:clamp(32px,9vw,44px);}.mockup-body{grid-template-columns:1fr;min-height:auto;}.mockup-sidebar{display:none;}.mockup-main{padding:18px;}.mockup-metrics,.mockup-chart-row,.mockup-modules{grid-template-columns:1fr;}.mockup-title-row{align-items:flex-start;}.mockup-header strong{font-size:12px;}.preview-floating-card{position:static;margin-top:14px;}.dashboard-mockup{max-width:100%;margin:0;}.mockup-window{border-radius:24px;}}
`}</style>
    </>
  );
}
