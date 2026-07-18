import { useEffect, useState } from "react";
import { LogOut, Menu, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/useAuth";
import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";

export default function Navbar() {
  const { user } = useAuth();
  const [theme, setTheme] = useState(document.documentElement.getAttribute("data-theme") || "light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff4d4f",
      background: theme === "light" ? "#ffffff" : "#0b1110",
      color: theme === "light" ? "#101014" : "#f4fff9",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("br30_algo_token");
      localStorage.removeItem("br30_algo_user");
      window.location.replace("/");
    }
  };

  const openSidebar = () => {
    window.dispatchEvent(new Event("br30-sidebar-toggle"));
  };

  return (
    <>
      <header className="br30-navbar">
        <div className="br30-nav-brand">
          <button className="mobile-menu-btn" type="button" onClick={openSidebar} title="Open menu">
            <Menu size={21} strokeWidth={2} />
          </button>

          <img className="br30-nav-logo" src={theme === "dark" ? darkLogo : lightLogo} alt="BR30 Logo" />

          <div className="br30-nav-brand-text">
            <span className="br30-nav-title">
              <span>BR30</span> Algo Terminal
            </span>
            <span className="br30-nav-subtitle">Professional Algo Trading Terminal</span>
          </div>
        </div>

        <div className="br30-nav-actions">
          <div className="br30-paper-chip" title="Paper Mode means no real broker order will be placed.">
            <ShieldCheck size={16} />
            <span>Paper Mode</span>
          </div>

          <ThemeToggle />

          <div className="br30-user-chip">
            <span>{user?.name || "BR30 User"}</span>
            <button type="button" onClick={handleLogout} title="Logout">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      <style>{`
.br30-navbar{width:100%;min-height:76px;border-bottom:1px solid var(--br30-border);background:rgba(255,255,255,.94);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:space-between;gap:18px;padding:0 20px;position:sticky;top:0;z-index:50;overflow:hidden;}
[data-theme="dark"] .br30-navbar{background:rgba(11,17,16,.94);}
.br30-nav-brand{display:flex;align-items:center;gap:14px;min-width:0;flex:1;}
.mobile-menu-btn{display:none;width:38px;height:38px;border:1px solid var(--br30-border);background:var(--br30-surface-2);color:var(--br30-text);border-radius:12px;place-items:center;cursor:pointer;flex-shrink:0;}
[data-theme="light"] .mobile-menu-btn{color:#a020f0;}
[data-theme="dark"] .mobile-menu-btn{color:var(--br30-primary);}
.br30-nav-logo{width:43px;height:43px;border-radius:8px;object-fit:cover;display:block;flex-shrink:0;box-shadow:0 10px 28px rgba(0,0,0,.16);}
.br30-nav-brand-text{display:flex;flex-direction:column;gap:2px;min-width:0;overflow:hidden;}
.br30-nav-title{display:block;font-size:20px;font-weight:800;letter-spacing:-.035em;color:var(--br30-text);line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;}
.br30-nav-title span{color:#a020f0;}
[data-theme="dark"] .br30-nav-title span{color:var(--br30-primary);}
.br30-nav-subtitle{display:block;font-size:13px;color:var(--br30-muted);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;}
.br30-nav-actions{display:flex;align-items:center;gap:14px;flex-shrink:0;}
.br30-paper-chip,.br30-user-chip{min-height:44px;border:1px solid var(--br30-border);background:var(--br30-surface-2);color:var(--br30-text);border-radius:16px;padding:0 15px;display:inline-flex;align-items:center;gap:9px;font-size:14px;font-weight:650;white-space:nowrap;}
.br30-paper-chip svg{color:#101014;}
[data-theme="dark"] .br30-paper-chip svg{color:var(--br30-primary);}
.br30-user-chip button{width:32px;height:32px;border:0;border-radius:50%;background:linear-gradient(135deg,rgba(255,43,214,.18),rgba(123,44,255,.18));color:#a020f0;cursor:pointer;display:grid;place-items:center;flex-shrink:0;}
[data-theme="dark"] .br30-user-chip button{background:var(--br30-primary-soft);color:var(--br30-primary);}
@media(max-width:820px){.br30-navbar{padding:10px 14px;min-height:68px;gap:10px;}.br30-nav-brand{gap:10px;}.br30-nav-logo{width:39px;height:39px;}.br30-nav-title{font-size:17px;max-width:190px;}.br30-nav-subtitle,.br30-paper-chip span,.br30-user-chip span{display:none;}.br30-paper-chip,.br30-user-chip{min-height:40px;padding:0 10px;border-radius:999px;}.br30-nav-actions{gap:9px;}}
@media(max-width:650px){.mobile-menu-btn{display:grid;}.br30-paper-chip{display:none;}.br30-nav-subtitle{display:none;}.br30-nav-title{font-size:16px;max-width:155px;}.br30-paper-chip span,.br30-user-chip span{display:none;}}
@media(max-width:520px){.br30-navbar{gap:8px;padding:8px 10px;}.br30-nav-brand{gap:8px;}.br30-nav-actions{gap:7px;}.br30-nav-title{font-size:15px;max-width:145px;}.br30-nav-logo{width:36px;height:36px;}.mobile-menu-btn{width:36px;height:36px;border-radius:11px;}.br30-user-chip{min-height:38px;padding:0 8px;}.br30-user-chip button{width:30px;height:30px;}}
@media(max-width:390px){.br30-nav-title{max-width:118px;font-size:14px;}.br30-nav-logo{width:34px;height:34px;}.mobile-menu-btn{width:34px;height:34px;}.br30-user-chip{padding:0 7px;}}
`}</style>
    </>
  );
}
