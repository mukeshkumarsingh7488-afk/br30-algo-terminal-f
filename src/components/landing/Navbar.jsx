import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import logo from "../../assets/logo-light.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  const navItems = [
    { name: "Home", hash: "#home" },
    { name: "Features", hash: "#features" },
    { name: "Brokers", hash: "#brokers" },
    { name: "Pricing", hash: "#pricing" },
    { name: "FAQ", hash: "#faq" },
  ];

  const moreItems = [
    { name: "About", to: ROUTES.ABOUT },
    { name: "What’s New", to: ROUTES.WHATS_NEW },
    { name: "Insights", to: ROUTES.INSIGHTS },
    { name: "Roadmap", to: ROUTES.ROADMAP },
    { name: "Plans & Pricing", to: ROUTES.PLANS_PRICING },
    { name: "Broker Integrations", to: ROUTES.BROKER_INTEGRATIONS },
  ];

  const closeMenu = () => {
    setMobileOpen(false);
    setMoreOpen(false);
  };

  const scrollToHash = (hash) => {
    closeMenu();

    if (!hash) return;

    if (location.pathname !== ROUTES.HOME) {
      navigate(`${ROUTES.HOME}${hash}`);
      return;
    }

    window.history.replaceState(null, "", `${ROUTES.HOME}${hash}`);

    setTimeout(() => {
      const section = document.querySelector(hash);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 40);
  };

  useEffect(() => {
    if (location.pathname === ROUTES.HOME && location.hash) {
      setTimeout(() => {
        const section = document.querySelector(location.hash);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 120);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const renderNavItem = (item) => {
    if (item.to) {
      return (
        <NavLink key={item.name} to={item.to} onClick={closeMenu}>
          {item.name}
        </NavLink>
      );
    }

    return (
      <button key={item.name} type="button" className="nav-link-btn" onClick={() => scrollToHash(item.hash)}>
        {item.name}
      </button>
    );
  };

  const renderMoreItem = (item, onClick) => {
    if (item.to) {
      return (
        <NavLink key={item.name} to={item.to} onClick={onClick}>
          {item.name}
        </NavLink>
      );
    }

    return (
      <button key={item.name} type="button" className="nav-link-btn" onClick={() => scrollToHash(item.hash)}>
        {item.name}
      </button>
    );
  };

  return (
    <>
      <header className="landing-navbar">
        <div className="landing-container nav-inner">
          <Link to={ROUTES.HOME} className="landing-logo" onClick={closeMenu}>
            <div className="landing-logo-icon">
              <img src={logo} alt="BR30 Logo" />
            </div>

            <div className="landing-logo-text">
              <span>BR30</span>
              <small>Algo Terminal</small>
            </div>
          </Link>

          <nav className="landing-nav desktop-nav">
            {navItems.map(renderNavItem)}

            <div className="more-wrap" ref={moreRef}>
              <button className="more-btn" type="button" onClick={() => setMoreOpen(!moreOpen)}>
                More <ChevronDown size={16} className={moreOpen ? "more-rotate" : ""} />
              </button>

              {moreOpen && <div className="more-dropdown">{moreItems.map((item) => renderMoreItem(item, () => setMoreOpen(false)))}</div>}
            </div>
          </nav>

          <div className="landing-actions desktop-nav">
            <NavLink to={ROUTES.LOGIN} className="btn-login">
              Login
            </NavLink>

            <NavLink to={ROUTES.REGISTER} className="btn-primary">
              Get Started
            </NavLink>
          </div>

          <button className="mobile-toggle" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">
            {navItems.map(renderNavItem)}

            <div className="mobile-more" ref={moreRef}>
              <button type="button" onClick={() => setMoreOpen(!moreOpen)}>
                More <ChevronDown size={17} className={moreOpen ? "more-rotate" : ""} />
              </button>

              {moreOpen && <div className="mobile-more-dropdown">{moreItems.map((item) => renderMoreItem(item, closeMenu))}</div>}
            </div>

            <NavLink to={ROUTES.LOGIN} onClick={closeMenu}>
              Login
            </NavLink>

            <NavLink to={ROUTES.REGISTER} onClick={closeMenu} className="mobile-primary">
              Get Started
            </NavLink>
          </div>
        )}
      </header>

      <style>{`
.landing-navbar{position:fixed;top:0;left:0;width:100%;z-index:99999;background:rgba(5,2,13,.82);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.08);}
.nav-inner{height:82px;display:flex;align-items:center;justify-content:space-between;gap:20px;}
.landing-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff;min-width:0;}
.landing-logo-icon{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);overflow:hidden;}
.landing-logo-icon img{width:100%;height:100%;object-fit:contain;}
.landing-logo-text{display:flex;flex-direction:column;line-height:1.08;min-width:0;}
.landing-logo-text span{font-size:19px;font-weight:950;letter-spacing:-.04em;color:#fff;}
.landing-logo-text small{font-size:12px;font-weight:700;color:#b7a8d9;white-space:nowrap;}
.landing-nav,.landing-actions{display:flex;align-items:center;gap:24px;}
.btn-login{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 22px;border-radius:999px;text-decoration:none!important;font-size:15px;font-weight:800;color:#fff;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);transition:.3s;}
.btn-login:hover{background:rgba(255,255,255,.08);border-color:rgba(217,70,239,.45);box-shadow:0 0 20px rgba(217,70,239,.18);transform:translateY(-2px);color:#fff;text-decoration:none!important;}
.landing-nav a,.more-btn,.nav-link-btn{position:relative;text-decoration:none;font-size:14px;font-weight:800;color:#c9bdf0;transition:.3s;}
.nav-link-btn{border:0;background:transparent;cursor:pointer;padding:0;font-family:inherit;}
.landing-nav a::after,.more-btn::after,.nav-link-btn::after{content:"";position:absolute;left:0;bottom:-8px;width:0;height:2px;border-radius:999px;background:linear-gradient(90deg,#7c3aed,#d946ef);transition:.3s;}
.landing-nav a:hover,.more-btn:hover,.nav-link-btn:hover{color:#fff;}
.landing-nav a:hover::after,.more-btn:hover::after,.nav-link-btn:hover::after{width:100%;}
.more-wrap{position:relative;}
.more-btn{display:flex;align-items:center;gap:5px;border:0;background:transparent;cursor:pointer;padding:0;}
.more-btn svg{transition:.3s;}
.more-rotate{transform:rotate(180deg);}
.more-dropdown{position:absolute;top:34px;right:0;width:220px;padding:10px;border-radius:18px;background:rgba(12,5,24,.98);border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 70px rgba(0,0,0,.45);backdrop-filter:blur(20px);}
.more-dropdown a,.more-dropdown .nav-link-btn{display:block;width:100%;text-align:left;padding:12px 14px;border-radius:12px;color:#d8cbff!important;font-size:14px;}
.more-dropdown a::after,.more-dropdown .nav-link-btn::after{display:none;}
.more-dropdown a:hover,.more-dropdown .nav-link-btn:hover{background:rgba(255,255,255,.07);color:#fff!important;}
.mobile-toggle{display:none;width:42px;height:42px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,255,255,.06);color:#fff;place-items:center;cursor:pointer;}
.mobile-menu{display:none;}
@media(max-width:760px){.nav-inner{height:72px;}.desktop-nav{display:none;}.mobile-toggle{display:grid;}.mobile-menu{display:grid;gap:12px;padding:16px 18px 22px;background:rgba(5,2,13,.98);border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);}.mobile-menu a,.mobile-more button,.mobile-menu .nav-link-btn{text-decoration:none;color:#fff;font-weight:850;padding:13px 14px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.07);text-align:left;}.mobile-menu .nav-link-btn{width:100%;}.mobile-menu .nav-link-btn::after{display:none;}.mobile-more button{width:100%;display:flex;align-items:center;justify-content:space-between;cursor:pointer;font-size:16px;}.mobile-more-dropdown{display:grid;gap:10px;margin-top:10px;padding-left:10px;}.mobile-more-dropdown a,.mobile-more-dropdown .nav-link-btn{background:rgba(124,58,237,.12);}.mobile-menu .mobile-primary{text-align:center;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.35);}.landing-logo-icon{width:46px;height:46px;}.landing-logo-icon img{width:38px;height:38px;}.landing-logo-text span{font-size:17px;}.landing-logo-text small{font-size:11px;}}
@media(max-width:390px){.landing-logo-text small{display:none;}.landing-logo-text span{font-size:16px;}}
`}</style>
    </>
  );
}
