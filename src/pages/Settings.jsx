import { useState } from "react";
import { Bell, Monitor, MoonStar, Save, Settings2, Sun } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function Settings() {
  const [settings, setSettings] = useState({
    autoRefresh: true,
    soundAlert: true,
    notification: true,
    defaultMode: "paper",
    refreshInterval: 5,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  };

  const handleSave = () => {
    setMessage("Settings saved successfully.");
  };

  return (
    <>
      <div className="settings-page">
        <div className="settings-head">
          <div>
            <h1>Terminal Settings</h1>
            <p>Manage appearance, notifications and terminal preferences.</p>
          </div>
        </div>

        {message && <div className="settings-success">{message}</div>}

        <div className="settings-grid">
          <div className="settings-card">
            <div className="section-head">
              <div>
                <h3>Appearance</h3>
                <p>Switch terminal theme.</p>
              </div>

              <Monitor size={22} />
            </div>

            <div className="theme-box">
              <div>
                <strong>
                  <Sun size={17} /> Light / <MoonStar size={17} /> Dark
                </strong>
                <span>Choose your preferred terminal appearance.</span>
              </div>

              <ThemeToggle />
            </div>
          </div>

          <div className="settings-card">
            <div className="section-head">
              <div>
                <h3>Terminal Preferences</h3>
                <p>Customize trading behaviour.</p>
              </div>

              <Settings2 size={22} />
            </div>

            <div className="settings-form">
              <label>
                Default Trading Mode
                <select name="defaultMode" value={settings.defaultMode} onChange={handleChange}>
                  <option value="paper">Paper Trading</option>
                  <option value="live">Live Trading</option>
                </select>
              </label>

              <label>
                Auto Refresh (Seconds)
                <input type="number" name="refreshInterval" min="1" value={settings.refreshInterval} onChange={handleChange} />
              </label>
            </div>
          </div>

          <div className="settings-card">
            <div className="section-head">
              <div>
                <h3>Notifications</h3>
                <p>Alert preferences.</p>
              </div>

              <Bell size={22} />
            </div>

            <div className="toggle-list">
              <label className="toggle-item">
                <input type="checkbox" name="notification" checked={settings.notification} onChange={handleChange} />
                <span>Desktop Notifications</span>
              </label>

              <label className="toggle-item">
                <input type="checkbox" name="soundAlert" checked={settings.soundAlert} onChange={handleChange} />
                <span>Sound Alerts</span>
              </label>

              <label className="toggle-item">
                <input type="checkbox" name="autoRefresh" checked={settings.autoRefresh} onChange={handleChange} />
                <span>Auto Refresh Data</span>
              </label>
            </div>
          </div>
        </div>

        <button className="settings-save" onClick={handleSave}>
          <Save size={18} />
          Save Settings
        </button>
      </div>

      <style>{`
.settings-page{width:100%;min-height:calc(100vh - 68px);padding:34px;background:radial-gradient(circle at top center,rgba(0,255,136,.06),transparent 42%),var(--br30-bg);}
.settings-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);font-weight:750;color:var(--br30-text);}
.settings-head p{margin:0 0 24px;color:var(--br30-muted);}
.settings-success{margin-bottom:18px;padding:12px 16px;border-radius:14px;background:var(--br30-primary-soft);color:var(--br30-primary);border:1px solid rgba(0,255,136,.25);}
.settings-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
.settings-card{background:var(--br30-card);border:1px solid var(--br30-border);border-radius:22px;padding:24px;box-shadow:var(--br30-shadow);}
.section-head{display:flex;justify-content:space-between;margin-bottom:18px;}
.section-head h3{margin:0 0 5px;font-size:22px;color:var(--br30-text);}
.section-head p{margin:0;color:var(--br30-muted);}
.section-head svg{color:var(--br30-primary);}
.theme-box{display:flex;justify-content:space-between;align-items:center;gap:18px;}
.theme-box strong{display:flex;align-items:center;gap:6px;color:var(--br30-text);}
.theme-box span{display:block;margin-top:5px;color:var(--br30-muted);}
.settings-form{display:grid;gap:14px;}
.settings-form label{display:grid;gap:8px;color:var(--br30-text);font-weight:650;}
.settings-form input,.settings-form select{height:48px;border-radius:15px;border:1px solid var(--br30-border);background:var(--br30-surface);padding:0 14px;color:var(--br30-text);}
.toggle-list{display:grid;gap:14px;}
.toggle-item{display:flex;align-items:center;gap:12px;color:var(--br30-text);font-weight:650;}
.toggle-item input{width:18px;height:18px;accent-color:var(--br30-primary);}
.settings-save{margin-top:22px;height:52px;padding:0 20px;border-radius:16px;border:1px solid rgba(0,255,136,.3);background:var(--br30-primary-soft);color:var(--br30-primary);display:flex;align-items:center;justify-content:center;gap:8px;font-weight:750;cursor:pointer;}
[data-theme="light"] .settings-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
[data-theme="light"] .section-head svg,[data-theme="light"] .settings-save,[data-theme="light"] .settings-success{color:#a020f0;}
[data-theme="light"] .settings-save,[data-theme="light"] .settings-success{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));border-color:rgba(160,32,240,.28);}
[data-theme="light"] .settings-card{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.07);}
[data-theme="light"] .settings-form input:focus,[data-theme="light"] .settings-form select:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
@media(max-width:900px){.settings-grid{grid-template-columns:1fr;}}
@media(max-width:600px){.settings-page{padding:18px;}.theme-box{flex-direction:column;align-items:flex-start;}.settings-save{width:100%;}}
`}</style>
    </>
  );
}
