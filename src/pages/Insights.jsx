import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowRight, BarChart3, BookOpenText, Bot, CalendarDays, CheckCircle2, Clock3, FileText, Flame, Lightbulb, PlugZap, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";

import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ROUTES } from "../constants/routes";
import { subscribeNewsletter } from "../api/newsletterApi";

const categories = ["All", "Trading", "Strategy", "Broker", "Risk", "Automation", "Product"];

const featuredArticle = {
  tag: "Featured Insight",
  title: "How BR30 Algo Terminal Helps Traders Build Discipline Before Automation",
  text: "A complete breakdown of why strategy testing, paper trading and risk verification should come before live algo execution.",
  readTime: "6 min read",
  date: "Latest",
};

const articles = [
  {
    icon: ShieldCheck,
    category: "Risk",
    title: "Why Risk Management Comes Before Live Algo Trading",
    text: "Understand daily loss limits, max trades, safety checks and why every automated system needs guardrails.",
    date: "BR30 Guide",
    read: "5 min",
  },
  {
    icon: PlugZap,
    category: "Broker",
    title: "Broker Connect: How Secure OAuth Flow Works",
    text: "Learn how broker connection, token handling and reconnect flow are planned inside BR30 Algo Terminal.",
    date: "Platform",
    read: "4 min",
  },
  {
    icon: Bot,
    category: "Strategy",
    title: "Strategy Builder: Moving From Manual Trading To Rules",
    text: "A practical overview of how traders can convert repeatable setups into structured strategy logic.",
    date: "Automation",
    read: "7 min",
  },
  {
    icon: BarChart3,
    category: "Trading",
    title: "Backtesting Vs Paper Trading: What Comes First?",
    text: "Know the difference between historical validation and live simulation before going real with automation.",
    date: "Learning",
    read: "6 min",
  },
  {
    icon: Zap,
    category: "Automation",
    title: "Live Engine Safety: Why One Click Is Not Enough",
    text: "BR30 live engine flow is designed to verify broker, risk and strategy status before order execution.",
    date: "Product",
    read: "5 min",
  },
  {
    icon: FileText,
    category: "Product",
    title: "Reports & Logs: The Missing Part Of Trading Discipline",
    text: "Trade history, analytics and logs help traders understand behavior, performance and execution quality.",
    date: "Insights",
    read: "4 min",
  },
];

const popularGuides = ["How to connect broker safely", "How to build a rule-based strategy", "How to test before live trading", "How to set daily loss limits", "How to track reports and logs"];

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const filteredArticles = articles.filter((article) => activeCategory === "All" || article.category === activeCategory);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = newsletterEmail.trim().toLowerCase();

    if (!cleanEmail) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address.",
        confirmButtonText: "OK",
        confirmButtonColor: "#7c3aed",
        background: "#080313",
        color: "#ffffff",
      });
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonText: "OK",
        confirmButtonColor: "#7c3aed",
        background: "#080313",
        color: "#ffffff",
      });
      return;
    }

    try {
      setNewsletterLoading(true);

      const res = await subscribeNewsletter({
        email: cleanEmail,
        source: "insights-page",
      });

      setNewsletterEmail("");

      Swal.fire({
        icon: "success",
        title: "Subscribed Successfully",
        text: res?.message || "You will receive BR30 Algo Terminal insights and updates.",
        confirmButtonText: "Great",
        confirmButtonColor: "#7c3aed",
        background: "#080313",
        color: "#ffffff",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: error?.response?.data?.message || error?.message || "Something went wrong. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#7c3aed",
        background: "#080313",
        color: "#ffffff",
      });
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <>
      <div className="insights-page">
        <Navbar />

        <main>
          <section className="insights-hero">
            <div className="insights-orb insights-orb-one" />
            <div className="insights-orb insights-orb-two" />

            <div className="landing-container insights-hero-grid">
              <div className="insights-hero-content">
                <span className="section-tag">
                  <Sparkles size={14} /> BR30 Insights
                </span>

                <h1>
                  Learn Trading Automation With <span>Clarity, Logic & Discipline.</span>
                </h1>

                <p>Explore practical guides, platform knowledge, trading automation concepts, broker connectivity, risk management and BR30 product insights in one premium knowledge hub.</p>
              </div>

              <div className="featured-card">
                <div className="featured-top">
                  <span>{featuredArticle.tag}</span>
                  <Flame size={20} />
                </div>

                <h3>{featuredArticle.title}</h3>
                <p>{featuredArticle.text}</p>

                <div className="featured-meta">
                  <div>
                    <Clock3 size={16} />
                    {featuredArticle.readTime}
                  </div>

                  <div>
                    <CalendarDays size={16} />
                    {featuredArticle.date}
                  </div>
                </div>

                <Link to={ROUTES.REGISTER} className="featured-btn">
                  Start Learning <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </section>

          <section className="category-section">
            <div className="landing-container category-wrap">
              {categories.map((item) => (
                <button type="button" className={activeCategory === item ? "active" : ""} key={item} onClick={() => setActiveCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="articles-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Latest Knowledge</span>
                <h2>Guides Built For Serious Traders</h2>
                <p>Short, practical and focused insights for traders who want to build automation the right way.</p>
              </div>

              <div className="articles-grid">
                {filteredArticles.map((article) => {
                  const Icon = article.icon;

                  return (
                    <article className="article-card" key={article.title}>
                      <div className="article-icon">
                        <Icon size={25} />
                      </div>

                      <span className="article-category">{article.category}</span>

                      <h3>{article.title}</h3>
                      <p>{article.text}</p>

                      <div className="article-footer">
                        <span>{article.date}</span>
                        <strong>{article.read}</strong>
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredArticles.length === 0 && <p className="insights-empty">No insights found.</p>}
            </div>
          </section>

          <section className="popular-section">
            <div className="landing-container popular-grid">
              <div className="popular-content">
                <span className="section-tag">Popular Guides</span>

                <h2>Start With The Topics Traders Ask Most</h2>

                <p>These guides are designed for beginners and serious traders who want to understand how BR30 Algo Terminal works before using live automation.</p>

                <Link to={ROUTES.REGISTER} className="btn-primary">
                  Create Account <ArrowRight size={18} />
                </Link>
              </div>

              <div className="popular-list">
                {popularGuides.map((item, index) => (
                  <div className="popular-item" key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <CheckCircle2 size={20} />
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="learning-path-section">
            <div className="landing-container">
              <div className="section-heading">
                <span className="section-tag">Learning Path</span>
                <h2>From Manual Trading To Automated Workflow</h2>
                <p>A simple path to understand trading automation step by step.</p>
              </div>

              <div className="learning-path-grid">
                <div className="path-card">
                  <BookOpenText size={30} />
                  <span>Step 01</span>
                  <h3>Understand The Setup</h3>
                  <p>Learn your trading rules, entry conditions, exits and risk structure.</p>
                </div>

                <div className="path-card">
                  <Lightbulb size={30} />
                  <span>Step 02</span>
                  <h3>Build The Strategy</h3>
                  <p>Convert your repeatable trading logic into a structured strategy workflow.</p>
                </div>

                <div className="path-card">
                  <TrendingUp size={30} />
                  <span>Step 03</span>
                  <h3>Test Before Live</h3>
                  <p>Use backtesting and paper trading before enabling live broker execution.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="newsletter-section">
            <div className="landing-container newsletter-card">
              <Sparkles size={38} />
              <h2>Get BR30 Trading Automation Insights</h2>
              <p>Stay updated with product guides, strategy ideas, risk-first workflow and BR30 Algo Terminal updates.</p>

              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Enter your email address" autoComplete="email" disabled={newsletterLoading} />
                <button type="submit" disabled={newsletterLoading}>
                  {newsletterLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      Subscribe Now&nbsp;
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
.insights-page{min-height:100vh;padding-top:82px;overflow-x:hidden;color:#fff;background:radial-gradient(circle at top left,rgba(124,58,237,.24),transparent 35%),radial-gradient(circle at top right,rgba(217,70,239,.18),transparent 32%),linear-gradient(180deg,#05020d 0%,#080313 48%,#05020d 100%);}
.insights-page .landing-container{width:min(1180px,calc(100% - 32px));margin:auto;}
.insights-page .section-tag{display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;font-size:13px;font-weight:800;color:#dccdff;background:rgba(124,58,237,.15);border:1px solid rgba(168,85,247,.28);}
.insights-page .section-heading{max-width:760px;margin:0 auto 34px;text-align:center;}
.insights-page .section-heading h2{font-size:clamp(34px,4vw,52px);line-height:1.1;margin:18px 0;letter-spacing:-1.6px;color:#fff;}
.insights-page .section-heading p{color:#b8acd6;line-height:1.8;font-size:17px;margin:0;}
.insights-page .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none!important;transition:.35s;font-weight:900;border-radius:999px;min-height:52px;padding:13px 24px;background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;box-shadow:0 18px 45px rgba(124,58,237,.35);}
.insights-page .btn-primary:hover{transform:translateY(-3px);box-shadow:0 26px 70px rgba(124,58,237,.45);}
.insights-hero{position:relative;padding:58px 0 58px;overflow:hidden;}
.insights-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
.insights-orb-one{width:420px;height:420px;left:-160px;top:80px;background:rgba(124,58,237,.35);}
.insights-orb-two{width:360px;height:360px;right:-130px;top:150px;background:rgba(217,70,239,.28);}
.insights-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.08fr .92fr;gap:48px;align-items:center;}
.insights-hero-content h1{margin:24px 0 20px;font-size:clamp(44px,6vw,76px);line-height:1.02;letter-spacing:-2.5px;font-weight:950;color:#fff;}
.insights-hero-content h1 span{background:linear-gradient(135deg,#c084fc,#f0abfc,#fff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.insights-hero-content p{max-width:710px;color:#b8acd6;font-size:18px;line-height:1.8;margin:0;}
.featured-card{position:relative;padding:30px;border-radius:32px;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.1);box-shadow:0 35px 110px rgba(0,0,0,.45);backdrop-filter:blur(22px);overflow:hidden;}
.featured-card::before{content:"";position:absolute;inset:-2px;background:radial-gradient(circle at top,rgba(217,70,239,.22),transparent 46%);pointer-events:none;}
.featured-top,.featured-card h3,.featured-card p,.featured-meta,.featured-btn{position:relative;z-index:2;}
.featured-top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:24px;}
.featured-top span{padding:8px 13px;border-radius:999px;background:rgba(124,58,237,.16);border:1px solid rgba(168,85,247,.28);color:#e9d5ff;font-size:12px;font-weight:900;}
.featured-top svg{color:#f97316;}
.featured-card h3{margin:0 0 16px;color:#fff;font-size:31px;line-height:1.18;letter-spacing:-.8px;}
.featured-card p{margin:0;color:#b8acd6;line-height:1.8;font-size:16px;}
.featured-meta{display:flex;gap:14px;flex-wrap:wrap;margin:26px 0;}
.featured-meta div{display:flex;align-items:center;gap:8px;color:#d8cbff;font-weight:800;font-size:13px;}
.featured-meta svg{color:#d946ef;}
.featured-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none!important;color:#fff;font-weight:900;border-radius:999px;background:linear-gradient(135deg,#7c3aed,#d946ef);padding:13px 20px;}
.category-section{padding:34px 0 16px;}
.articles-section{padding:16px 0 70px;}
.popular-section,.learning-path-section,.newsletter-section{padding:70px 0;}
.category-wrap{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
.category-wrap button{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:#d8cbff;border-radius:999px;padding:11px 18px;font-weight:900;cursor:pointer;transition:.3s;}
.category-wrap button.active,.category-wrap button:hover{background:linear-gradient(135deg,#7c3aed,#d946ef);color:#fff;border-color:transparent;transform:translateY(-3px);}
.articles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.insights-empty{text-align:center;color:#b8acd6;font-weight:800;margin:28px 0 0;}
.article-card,.popular-item,.path-card,.newsletter-card{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.26);}
.article-card{border-radius:28px;padding:28px;transition:.35s;}
.article-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);}
.article-icon{width:60px;height:60px;border-radius:18px;display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 18px 45px rgba(124,58,237,.35);margin-bottom:20px;}
.article-category{display:inline-flex;padding:7px 12px;border-radius:999px;background:rgba(168,85,247,.16);color:#e9d5ff;border:1px solid rgba(168,85,247,.28);font-size:12px;font-weight:900;}
.article-card h3{margin:18px 0 12px;color:#fff;font-size:22px;line-height:1.25;}
.article-card p{margin:0;color:#b8acd6;line-height:1.75;font-size:15px;}
.article-footer{display:flex;align-items:center;justify-content:space-between;margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);}
.article-footer span{color:#9f94c0;font-weight:800;font-size:13px;}
.article-footer strong{color:#fff;font-size:13px;}
.popular-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center;}
.popular-content h2{margin:20px 0;font-size:clamp(34px,4vw,54px);line-height:1.08;letter-spacing:-1.5px;color:#fff;}
.popular-content p{color:#b8acd6;line-height:1.8;font-size:16px;margin:0 0 28px;}
.popular-list{display:grid;gap:16px;}
.popular-item{border-radius:20px;padding:20px;display:grid;grid-template-columns:54px 24px 1fr;gap:14px;align-items:center;transition:.35s;}
.popular-item:hover{transform:translateX(8px);border-color:rgba(168,85,247,.45);}
.popular-item span{color:rgba(255,255,255,.24);font-weight:950;font-size:25px;}
.popular-item svg{color:#22c55e;}
.popular-item strong{color:#fff;}
.learning-path-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.path-card{border-radius:28px;padding:30px;transition:.35s;}
.path-card:hover{transform:translateY(-8px);border-color:rgba(168,85,247,.45);}
.path-card svg{color:#d946ef;margin-bottom:22px;}
.path-card span{display:inline-flex;padding:7px 12px;border-radius:999px;background:rgba(124,58,237,.14);border:1px solid rgba(168,85,247,.24);color:#e9d5ff;font-size:12px;font-weight:900;}
.path-card h3{margin:18px 0 12px;color:#fff;font-size:22px;}
.path-card p{margin:0;color:#b8acd6;line-height:1.75;}
.newsletter-card{border-radius:34px;padding:62px;text-align:center;background:linear-gradient(135deg,#5b21b6,#7c3aed,#d946ef);}
.newsletter-card svg{color:#fff;margin-bottom:18px;}
.newsletter-card h2{margin:0;font-size:clamp(34px,4vw,54px);letter-spacing:-1.5px;color:#fff;}
.newsletter-card p{max-width:680px;margin:18px auto 30px;color:#f3e8ff;line-height:1.8;}
.newsletter-form{max-width:620px;margin:auto;display:flex;gap:12px;padding:8px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.18);}
.newsletter-form input{flex:1;border:0;outline:0;background:transparent;color:#fff;font-size:15px;font-weight:700;padding:0 16px;}
.newsletter-form input::placeholder{color:#eadcff;}
.newsletter-form button{border:0;border-radius:999px;background:#fff;color:#5b21b6;font-weight:950;padding:14px 24px;cursor:pointer;}
.newsletter-form button:disabled,.newsletter-form input:disabled{opacity:.75;cursor:not-allowed;}
@media(max-width:1050px){.insights-hero-grid,.popular-grid{grid-template-columns:1fr;}.featured-card{max-width:760px;margin:auto;width:100%;}.articles-grid,.learning-path-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:760px){.insights-page{padding-top:72px;}.insights-hero{padding:32px 0 42px;}.insights-hero-grid{gap:30px;}.insights-hero-content h1{font-size:clamp(38px,11vw,56px);letter-spacing:-1.4px;}.insights-hero-content p{font-size:15px;}.featured-card{padding:22px;border-radius:24px;}.featured-card h3{font-size:24px;}.category-section{padding:30px 0 14px;}.articles-section{padding:14px 0 55px;}.popular-section,.learning-path-section,.newsletter-section{padding:55px 0;}.articles-grid,.learning-path-grid{grid-template-columns:1fr;gap:16px;}.article-card,.path-card{border-radius:22px;padding:22px;}.popular-item{grid-template-columns:44px 22px 1fr;padding:18px;}.newsletter-card{padding:34px 24px;border-radius:24px;}.newsletter-form{border-radius:22px;flex-direction:column;}.newsletter-form input{min-height:48px;}.newsletter-form button{width:100%;}.popular-content h2,.newsletter-card h2{font-size:clamp(30px,9vw,42px);}}
@media(max-width:430px){.insights-hero-content h1{font-size:40px;}.category-wrap{justify-content:flex-start;}.featured-meta{flex-direction:column;}.article-icon{width:56px;height:56px;}}
`}</style>
    </>
  );
}
