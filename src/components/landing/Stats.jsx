import { Cloud, LockKeyhole, PlugZap, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: PlugZap,
    value: "5+",
    label: "Broker Integrations",
    text: "Upstox, Zerodha, Dhan, Angel One & Fyers ready architecture.",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Safety First Flow",
    text: "Live engine starts only after broker, risk and strategy checks.",
  },
  {
    icon: Cloud,
    value: "24×7",
    label: "Cloud Ready",
    text: "Built for continuous monitoring, logs and automation control.",
  },
  {
    icon: LockKeyhole,
    value: "Encrypted",
    label: "Token Security",
    text: "Broker credentials and access tokens planned with secure storage.",
  },
];

export default function Stats() {
  return (
    <>
      <section className="stats-section">
        <div className="landing-container stats-grid">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div className="stat-card" key={item.label}>
                <div className="stat-icon">
                  <Icon size={24} />
                </div>

                <h3>{item.value}</h3>
                <h4>{item.label}</h4>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
.stats-section{padding:40px 0 90px;}
.stats-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;}
.stat-card{position:relative;padding:30px 26px;border-radius:26px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);transition:.35s;overflow:hidden;}
.stat-card::before{content:"";position:absolute;left:0;top:0;width:100%;height:4px;background:linear-gradient(90deg,#7c3aed,#d946ef);transform:scaleX(0);transform-origin:left;transition:.35s;}
.stat-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);box-shadow:0 28px 70px rgba(124,58,237,.22);}
.stat-card:hover::before{transform:scaleX(1);}
.stat-icon{width:60px;height:60px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 40px rgba(124,58,237,.35);}
.stat-card h3{margin:24px 0 8px;font-size:34px;font-weight:900;color:#fff;letter-spacing:-1px;}
.stat-card h4{margin:0 0 14px;font-size:18px;font-weight:800;color:#fff;}
.stat-card p{margin:0;color:#b8acd6;font-size:15px;line-height:1.7;}
@media(max-width:1050px){.stats-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:760px){.stats-section{padding:25px 0 60px;}.stats-grid{grid-template-columns:1fr;gap:18px;}.stat-card{padding:24px;border-radius:22px;}.stat-icon{width:54px;height:54px;}.stat-card h3{font-size:30px;}.stat-card h4{font-size:17px;}}
`}</style>
    </>
  );
}
