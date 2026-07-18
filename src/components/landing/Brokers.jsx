import { BadgeCheck, Shield, ArrowRight, Landmark } from "lucide-react";

const brokers = [
  {
    name: "Upstox",
    status: "Supported",
    color: "green",
  },
  {
    name: "Zerodha",
    status: "Coming Soon",
    color: "orange",
  },
  {
    name: "Dhan",
    status: "Coming Soon",
    color: "orange",
  },
  {
    name: "Angel One",
    status: "Coming Soon",
    color: "orange",
  },
  {
    name: "Fyers",
    status: "Coming Soon",
    color: "orange",
  },
];

export default function Brokers() {
  return (
    <>
      <section className="brokers-section" id="brokers">
        <div className="landing-container">
          <div className="section-heading">
            <span className="section-tag">Broker Connectivity</span>

            <h2>Connect Your Favourite Broker</h2>

            <p>BR30 Algo Terminal is designed with a scalable broker integration architecture. Secure OAuth authentication, encrypted token storage and one-click reconnect experience.</p>
          </div>

          <div className="brokers-grid">
            {brokers.map((broker) => (
              <div key={broker.name} className="broker-card">
                <div className="broker-top">
                  <div className="broker-logo">
                    <Landmark size={28} />
                  </div>

                  <div>
                    <h3>{broker.name}</h3>

                    <span className={broker.color === "green" ? "status-green" : "status-orange"}>
                      <BadgeCheck size={14} />
                      {broker.status}
                    </span>
                  </div>
                </div>

                <p>Fast, secure and reliable broker connectivity for automated trading.</p>

                <div className="broker-footer">
                  <div className="broker-security">
                    <Shield size={16} />
                    OAuth Security
                  </div>

                  <ArrowRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
.brokers-section{padding:90px 0;}
.brokers-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;}
.broker-card{position:relative;padding:28px;border-radius:26px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);transition:.35s;overflow:hidden;}
.broker-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,58,237,.12),transparent 45%);opacity:0;transition:.35s;}
.broker-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.4);box-shadow:0 30px 70px rgba(124,58,237,.22);}
.broker-card:hover::before{opacity:1;}
.broker-top{display:flex;align-items:center;gap:16px;margin-bottom:18px;}
.broker-logo{width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 16px 38px rgba(124,58,237,.35);}
.broker-top h3{margin:0 0 8px;font-size:20px;font-weight:900;color:#fff;}
.status-green,.status-orange{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:800;}
.status-green{background:rgba(34,197,94,.14);color:#22c55e;border:1px solid rgba(34,197,94,.25);}
.status-orange{background:rgba(249,115,22,.14);color:#fb923c;border:1px solid rgba(249,115,22,.25);}
.broker-card p{margin:18px 0 26px;color:#b8acd6;font-size:15px;line-height:1.7;}
.broker-footer{display:flex;align-items:center;justify-content:space-between;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);color:#fff;}
.broker-security{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:#d8cbff;}
.broker-footer svg:last-child{transition:.3s;}
.broker-card:hover .broker-footer svg:last-child{transform:translateX(6px);}
@media(max-width:1050px){.brokers-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:760px){.brokers-section{padding:60px 0;}.brokers-grid{grid-template-columns:1fr;gap:18px;}.broker-card{padding:22px;border-radius:22px;}.broker-logo{width:56px;height:56px;}.broker-top h3{font-size:18px;}}
`}</style>
    </>
  );
}
