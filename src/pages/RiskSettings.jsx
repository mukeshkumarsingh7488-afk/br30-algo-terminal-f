import { useState } from "react";
import { Clock, Save, ShieldAlert, ShieldCheck, SlidersHorizontal, Zap } from "lucide-react";

const defaultRisk = {
  dailyLoss: 3,
  maxTrades: 5,
  maxOpenPositions: 2,
  maxLotSize: 1,
  riskPerTrade: 1,
  maxDrawdown: 8,
  startTime: "09:15",
  endTime: "15:20",
  cooldown: 10,
  autoStop: true,
  killSwitch: false,
};

export default function RiskSettings() {
  const [risk, setRisk] = useState(defaultRisk);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRisk((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("Risk settings saved successfully.");
  };

  return (
    <>
      <div className="risk-page">
        <div className="risk-head">
          <div>
            <h1>Risk Settings</h1>
            <p>Control max loss, max trades, lot size and auto square-off.</p>
          </div>
          <div className={risk.killSwitch ? "risk-chip danger" : "risk-chip"}>
            {risk.killSwitch ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
            <span>{risk.killSwitch ? "Kill Switch ON" : "Risk Engine Active"}</span>
          </div>
        </div>

        {message && <div className="risk-alert success">{message}</div>}

        <form className="risk-card risk-form" onSubmit={handleSave}>
          <div className="section-head">
            <div>
              <h3>Risk Engine</h3>
              <p>Daily limits, cooldown and trade safety rules.</p>
            </div>
            <SlidersHorizontal size={22} />
          </div>

          <div className="risk-grid">
            <label>
              Daily Loss Limit %<input name="dailyLoss" type="number" min="0.1" step="0.1" value={risk.dailyLoss} onChange={handleChange} />
            </label>
            <label>
              Max Trades / Day
              <input name="maxTrades" type="number" min="1" value={risk.maxTrades} onChange={handleChange} />
            </label>
            <label>
              Max Open Positions
              <input name="maxOpenPositions" type="number" min="1" value={risk.maxOpenPositions} onChange={handleChange} />
            </label>
            <label>
              Max Lot Size
              <input name="maxLotSize" type="number" min="1" value={risk.maxLotSize} onChange={handleChange} />
            </label>
            <label>
              Risk Per Trade %<input name="riskPerTrade" type="number" min="0.1" step="0.1" value={risk.riskPerTrade} onChange={handleChange} />
            </label>
            <label>
              Max Drawdown %<input name="maxDrawdown" type="number" min="0.1" step="0.1" value={risk.maxDrawdown} onChange={handleChange} />
            </label>
          </div>

          <div className="risk-section-title">
            <Clock size={18} />
            <span>Trading Window</span>
          </div>

          <div className="risk-grid two">
            <label>
              Start Time
              <input name="startTime" type="time" value={risk.startTime} onChange={handleChange} />
            </label>
            <label>
              End Time
              <input name="endTime" type="time" value={risk.endTime} onChange={handleChange} />
            </label>
            <label>
              Cooldown Minutes
              <input name="cooldown" type="number" min="0" value={risk.cooldown} onChange={handleChange} />
            </label>
          </div>

          <div className="risk-section-title">
            <Zap size={18} />
            <span>Safety Toggles</span>
          </div>

          <div className="toggle-grid">
            <label className="toggle-box">
              <input name="autoStop" type="checkbox" checked={risk.autoStop} onChange={handleChange} />
              <span>
                <strong>Auto Stop Trading</strong>
                <small>Stop new trades after limit hit.</small>
              </span>
            </label>
            <label className="toggle-box danger">
              <input name="killSwitch" type="checkbox" checked={risk.killSwitch} onChange={handleChange} />
              <span>
                <strong>Emergency Kill Switch</strong>
                <small>Block all live execution instantly.</small>
              </span>
            </label>
          </div>

          <button className="risk-submit" type="submit">
            <Save size={18} />
            Save Risk Settings
          </button>
        </form>
      </div>

      <style>{`
        .risk-page{width:100%;min-height:calc(100vh - 68px);padding:34px;background:radial-gradient(circle at top center,rgba(0,255,136,.06),transparent 42%),var(--br30-bg);}
        .risk-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:24px;}
        .risk-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .risk-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;}
        .risk-chip{height:42px;border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);border-radius:999px;padding:0 16px;display:flex;align-items:center;gap:8px;font-weight:700;white-space:nowrap;}
        .risk-chip.danger{color:#ff8c8e;border-color:rgba(255,77,79,.35);background:rgba(255,77,79,.08);}
        .risk-card{border:1px solid var(--br30-border);background:var(--br30-card);box-shadow:var(--br30-shadow);border-radius:22px;padding:24px;color:var(--br30-text);}
        .section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px;}
        .section-head h3{margin:0 0 6px;font-size:22px;font-weight:750;color:var(--br30-text);}
        .section-head p{margin:0;color:var(--br30-muted);font-size:15px;}
        .section-head svg{color:var(--br30-primary);}
        .risk-alert{border-radius:15px;padding:12px 14px;font-size:14px;font-weight:650;margin-bottom:14px;}
        .risk-alert.success{border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);}
        .risk-form{display:grid;gap:16px;}
        .risk-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}
        .risk-grid.two{grid-template-columns:repeat(3,minmax(0,1fr));}
        .risk-form label{display:grid;gap:8px;font-size:14px;font-weight:650;color:var(--br30-text);}
        .risk-form input{height:50px;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:15px;padding:0 14px;outline:0;}
        .risk-form input:focus{border-color:var(--br30-primary);box-shadow:0 0 0 4px var(--br30-primary-soft);}
        .risk-section-title{margin-top:6px;padding-top:16px;border-top:1px solid var(--br30-border);display:flex;align-items:center;gap:8px;color:var(--br30-primary);font-weight:750;}
        .toggle-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .toggle-box{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:16px;padding:15px;display:flex!important;grid-template-columns:unset!important;flex-direction:row;align-items:flex-start;gap:12px!important;}
        .toggle-box input{width:17px;height:17px;accent-color:var(--br30-primary);margin-top:3px;}
        .toggle-box strong,.toggle-box small{display:block;}
        .toggle-box strong{color:var(--br30-text);}
        .toggle-box small{color:var(--br30-muted);margin-top:4px;font-size:13px;}
        .toggle-box.danger input{accent-color:#ff4d4f;}
        .risk-submit{height:52px;border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);border-radius:16px;font-weight:760;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;}
        [data-theme="light"] .risk-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .risk-chip,[data-theme="light"] .section-head svg,[data-theme="light"] .risk-section-title,[data-theme="light"] .risk-submit,[data-theme="light"] .risk-alert.success{color:#a020f0;}
        [data-theme="light"] .risk-chip,[data-theme="light"] .risk-submit,[data-theme="light"] .risk-alert.success{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));border-color:rgba(160,32,240,.28);}
        [data-theme="light"] .risk-card{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        [data-theme="light"] .risk-form input:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
        @media(max-width:980px){.risk-grid,.risk-grid.two{grid-template-columns:1fr 1fr;}.toggle-grid{grid-template-columns:1fr;}}
        @media(max-width:760px){.risk-page{padding:22px;}.risk-head{flex-direction:column;}.risk-chip{width:100%;justify-content:center;}.risk-card{padding:20px;border-radius:20px;}}
        @media(max-width:560px){.risk-page{padding:16px;}.risk-head h1{font-size:26px;}.risk-grid,.risk-grid.two{grid-template-columns:1fr;}.risk-card{padding:16px;border-radius:18px;}.risk-submit{width:100%;}}
      `}</style>
    </>
  );
}
