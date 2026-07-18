import { Activity, BarChart3, Cpu, Eye, ShieldCheck, Wallet } from "lucide-react";

const stats = [
  { title: "Active Strategies", value: "0", icon: Activity },
  { title: "Open Positions", value: "0", icon: BarChart3 },
  { title: "Today P&L", value: "₹0.00", icon: Wallet },
  { title: "Risk Status", value: "Safe", icon: ShieldCheck },
];

const panels = [
  { title: "Market Watch", text: "No symbols added yet.", icon: Eye },
  { title: "Strategy Activity", text: "No active strategy running.", icon: Cpu },
  { title: "Execution Logs", text: "System ready.", icon: BarChart3 },
];

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-page">
        <div className="dashboard-head">
          <h1>Algo Dashboard</h1>
          <p>Live system overview, strategy activity, broker status and risk summary.</p>
        </div>

        <section className="dashboard-stats">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div className="dashboard-card stat-card" key={item.title}>
                <div className="dash-icon">
                  <Icon size={21} strokeWidth={2} />
                </div>
                <div>
                  <span>{item.title}</span>
                  <strong>{item.value}</strong>
                </div>
              </div>
            );
          })}
        </section>

        <section className="dashboard-panels">
          {panels.map((item) => {
            const Icon = item.icon;
            return (
              <div className="dashboard-card panel-card" key={item.title}>
                <div className="dash-icon">
                  <Icon size={23} strokeWidth={2} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            );
          })}
        </section>
      </div>

      <style>{`
        .dashboard-page{width:100%;min-height:calc(100vh - 68px);padding:34px 34px 44px;background:radial-gradient(circle at top center,rgba(0,255,136,.065),transparent 42%),var(--br30-bg);}
        .dashboard-head{margin:0 0 24px;}
        .dashboard-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);line-height:1.1;font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .dashboard-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;font-weight:450;}
        .dashboard-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-bottom:20px;}
        .dashboard-panels{display:grid;grid-template-columns:1.35fr 1fr 1fr;gap:18px;}
        .dashboard-card{border:1px solid var(--br30-border);background:var(--br30-card);box-shadow:var(--br30-shadow);border-radius:22px;color:var(--br30-text);}
        .stat-card{min-height:112px;padding:22px 24px;display:flex;align-items:center;gap:16px;}
        .dash-icon{width:48px;height:48px;border-radius:16px;display:grid;place-items:center;flex-shrink:0;background:var(--br30-primary-soft);color:var(--br30-primary);}
        .stat-card span{display:block;color:var(--br30-muted);font-size:14px;font-weight:650;margin-bottom:8px;}
        .stat-card strong{display:block;color:var(--br30-text);font-size:28px;font-weight:750;line-height:1.05;letter-spacing:-.025em;}
        .panel-card{min-height:238px;padding:26px 28px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;}
        .panel-card h3{margin:20px 0 8px;color:var(--br30-text);font-size:23px;font-weight:750;letter-spacing:-.03em;}
        .panel-card p{margin:0;color:var(--br30-muted);font-size:16px;line-height:1.6;font-weight:450;}
        [data-theme="light"] .dashboard-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .dash-icon{background:linear-gradient(135deg,rgba(255,43,214,.16),rgba(123,44,255,.16));color:#a020f0;}
        [data-theme="light"] .dashboard-card{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        @media(max-width:1280px){.dashboard-page{padding:30px 26px 40px;}.dashboard-stats{grid-template-columns:repeat(2,minmax(0,1fr));}.dashboard-panels{grid-template-columns:1fr 1fr;}.dashboard-panels .panel-card:first-child{grid-column:1/-1;}}
        @media(max-width:900px){.dashboard-page{padding:24px 20px 34px;}.dashboard-stats{gap:14px;}.dashboard-panels{grid-template-columns:1fr;gap:14px;}.panel-card{min-height:190px;}.dashboard-head h1{font-size:30px;}}
        @media(max-width:600px){.dashboard-page{padding:18px 14px 26px;}.dashboard-head{margin-bottom:18px;}.dashboard-head h1{font-size:26px;}.dashboard-head p{font-size:14px;}.dashboard-stats{grid-template-columns:1fr;gap:12px;margin-bottom:14px;}.dashboard-panels{gap:12px;}.stat-card{min-height:92px;padding:16px;border-radius:18px;gap:13px;}.panel-card{padding:18px;border-radius:18px;min-height:160px;}.dash-icon{width:42px;height:42px;border-radius:14px;}.stat-card strong{font-size:25px;font-weight:720;}.panel-card h3{font-size:20px;font-weight:720;margin-top:15px;}.panel-card p{font-size:14px;}}
      `}</style>
    </>
  );
}
