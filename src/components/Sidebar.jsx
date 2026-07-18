import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Activity, BarChart3, Bot, BrainCircuit, Cable, ClipboardList, Eye, EyeOff, Gauge, Home, PieChart, Settings, Shield, User } from "lucide-react";
import { ROUTES } from "../constants/routes";
import useAuth from "../hooks/useAuth";

const links = [
  { label: "Dashboard", path: ROUTES.DASHBOARD, icon: Home },
  { label: "Broker Connect", path: ROUTES.BROKER_CONNECT, icon: Cable },
  { label: "Strategy Builder", path: ROUTES.STRATEGY_BUILDER, icon: BrainCircuit },
  { label: "Backtest", path: ROUTES.BACKTEST, icon: BarChart3 },
  { label: "Paper Trading", path: ROUTES.PAPER_TRADING, icon: Activity },
  { label: "Live Algo", path: ROUTES.LIVE_ALGO, icon: Bot },
  { label: "Orders", path: ROUTES.ORDERS, icon: ClipboardList },
  { label: "Risk Settings", path: ROUTES.RISK_SETTINGS, icon: Shield },
  { label: "Reports", path: ROUTES.REPORTS, icon: PieChart },
  { label: "Settings", path: ROUTES.SETTINGS, icon: Settings },
];

export default function Sidebar() {
  const { user } = useAuth();
  const [showInfo, setShowInfo] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const email = user?.email || "No email";
  const mobile = user?.mobile || user?.phone || "No mobile";

  useEffect(() => {
    const toggle = () => setMobileOpen((prev) => !prev);
    window.addEventListener("br30-sidebar-toggle", toggle);
    return () => window.removeEventListener("br30-sidebar-toggle", toggle);
  }, []);

  return (
    <>
      <button className="sidebar-backdrop" type="button" onClick={() => setMobileOpen(false)} data-open={mobileOpen} />

      <aside className={mobileOpen ? "sidebar mobile-open" : "sidebar"}>
        <div className="sidebar-head">
          <div className="sidebar-user-icon">
            <User size={18} strokeWidth={2} />
          </div>

          <div className="sidebar-user-info">
            <strong>{showInfo ? email : "••••••••••••••"}</strong>
            <span>{showInfo ? mobile : "••••••••••"}</span>
          </div>

          <button className="sidebar-eye" type="button" onClick={() => setShowInfo((prev) => !prev)}>
            {showInfo ? <EyeOff size={17} strokeWidth={2} /> : <Eye size={17} strokeWidth={2} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path} className="sidebar-link" onClick={() => setMobileOpen(false)}>
                <Icon size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Gauge size={18} strokeWidth={2} />
          <div>
            <strong>System Online</strong>
            <span>Server Ready</span>
          </div>
        </div>
      </aside>

      <style>{`
.sidebar{width:280px;height:calc(100vh - 76px);background:var(--br30-surface);border-right:1px solid var(--br30-border);padding:18px 14px;display:flex;flex-direction:column;gap:16px;position:sticky;top:76px;align-self:start;z-index:45;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:transparent transparent;}
.sidebar::-webkit-scrollbar{width:2px;}
.sidebar::-webkit-scrollbar-track{background:transparent;}
.sidebar::-webkit-scrollbar-thumb{background:rgba(0,255,136,.45);border-radius:999px;}
.sidebar::-webkit-scrollbar-thumb:hover{background:var(--br30-primary);}
[data-theme="light"] .sidebar{scrollbar-color:transparent transparent;}
[data-theme="light"] .sidebar::-webkit-scrollbar-thumb{background:rgba(160,32,240,.45);}
[data-theme="light"] .sidebar::-webkit-scrollbar-thumb:hover{background:#a020f0;}
.sidebar-head{display:flex;align-items:center;gap:10px;padding:6px 8px 16px;border-bottom:1px solid var(--br30-border);flex-shrink:0;}
.sidebar-user-icon{width:38px;height:38px;border-radius:13px;display:grid;place-items:center;background:var(--br30-primary-soft);color:var(--br30-primary);flex-shrink:0;}
.sidebar-user-info{min-width:0;flex:1;}
.sidebar-user-info strong{display:block;font-size:13px;font-weight:800;color:var(--br30-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.sidebar-user-info span{display:block;font-size:12px;color:var(--br30-muted);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.sidebar-eye{width:34px;height:34px;border:0;border-radius:12px;background:transparent;color:var(--br30-muted);cursor:pointer;display:grid;place-items:center;flex-shrink:0;}
.sidebar-eye:hover{background:var(--br30-primary-soft);color:var(--br30-primary);}
.sidebar-nav{display:grid;gap:7px;flex:1;}
.sidebar-link{display:flex;align-items:center;gap:11px;color:var(--br30-muted);text-decoration:none;padding:13px 14px;border-radius:15px;font-size:15px;font-weight:650;transition:.2s ease;border:1px solid transparent;}
.sidebar-link svg{flex-shrink:0;}
.sidebar-link:hover,.sidebar-link.active{color:var(--br30-text);background:var(--br30-primary-soft);}
.sidebar-link.active{border-color:rgba(0,255,136,.3);}
.sidebar-footer{border:1px solid var(--br30-border);background:var(--br30-surface-2);border-radius:18px;padding:14px;display:flex;align-items:center;gap:10px;color:var(--br30-primary);flex-shrink:0;}
.sidebar-footer strong{display:block;font-size:14px;font-weight:800;}
.sidebar-footer span{display:block;font-size:12px;color:var(--br30-muted);margin-top:2px;}
.sidebar-backdrop{display:none;}
[data-theme="light"] .sidebar-user-icon,[data-theme="light"] .sidebar-eye:hover,[data-theme="light"] .sidebar-link:hover,[data-theme="light"] .sidebar-link.active,[data-theme="light"] .sidebar-footer{background:linear-gradient(135deg,rgba(255,43,214,.13),rgba(123,44,255,.13));}
[data-theme="light"] .sidebar-user-icon,[data-theme="light"] .sidebar-eye:hover,[data-theme="light"] .sidebar-footer,[data-theme="light"] .sidebar-link.active svg{color:#a020f0;}
[data-theme="light"] .sidebar-link.active{border-color:rgba(160,32,240,.24);}
[data-theme="dark"] .sidebar-link.active svg{color:var(--br30-primary);}
@media(max-width:900px){.sidebar{width:82px;padding:16px 10px;top:68px;height:calc(100vh - 68px);}.sidebar-head{justify-content:center;padding:4px 0 14px;}.sidebar-user-icon{width:42px;height:42px;}.sidebar-user-info,.sidebar-eye,.sidebar-link span,.sidebar-footer div{display:none;}.sidebar-link{justify-content:center;padding:13px;}.sidebar-footer{justify-content:center;padding:13px;}}
@media(max-width:650px){.sidebar{position:fixed;left:0;top:68px;width:280px;height:calc(100vh - 68px);min-height:0;transform:translateX(-105%);transition:.25s ease;box-shadow:24px 0 70px rgba(0,0,0,.35);}.sidebar.mobile-open{transform:translateX(0);}.sidebar-head{justify-content:flex-start;padding:6px 8px 16px;}.sidebar-user-info,.sidebar-eye,.sidebar-link span,.sidebar-footer div{display:block;}.sidebar-link{justify-content:flex-start;}.sidebar-footer{justify-content:flex-start;}.sidebar-backdrop{display:block;position:fixed;inset:68px 0 0 0;background:rgba(0,0,0,.42);border:0;z-index:40;opacity:0;pointer-events:none;}.sidebar-backdrop[data-open="true"]{opacity:1;pointer-events:auto;}}
`}</style>
    </>
  );
}
