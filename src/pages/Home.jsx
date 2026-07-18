import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Brokers from "../components/landing/Brokers";
import Features from "../components/landing/Features";
import Workflow from "../components/landing/Workflow";
import DashboardPreview from "../components/landing/DashboardPreview";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <>
      <div className="landing-page">
        <Navbar />

        <main>
          <Hero />

          <Stats />

          <Brokers />

          <Features />

          <Workflow />

          <DashboardPreview />

          <Pricing />

          <FAQ />

          <CTA />
        </main>

        <Footer />
      </div>

      <style>{`
html{
scroll-behavior:smooth;
}

*{
box-sizing:border-box;
}

body{
margin:0;
padding:0;
background:#05020d;
font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
overflow-x:hidden;
}

.landing-page{
min-height:100vh;
padding-top:82px;
overflow-x:hidden;
color:#fff;

background:
radial-gradient(circle at top left,rgba(124,58,237,.22),transparent 35%),
radial-gradient(circle at top right,rgba(168,85,247,.18),transparent 30%),
linear-gradient(180deg,#05020d 0%,#080313 45%,#05020d 100%);
}

.landing-container{
width:min(1180px,calc(100% - 32px));
margin:auto;
}

.section-heading{
max-width:760px;
margin:auto auto 45px;
text-align:center;
}

.section-tag{
display:inline-flex;
align-items:center;
gap:8px;

padding:8px 15px;

border-radius:999px;

font-size:13px;
font-weight:800;

color:#dccdff;

background:rgba(124,58,237,.15);

border:1px solid rgba(168,85,247,.28);
}

.section-heading h2{
font-size:clamp(36px,4vw,52px);
line-height:1.1;
margin:18px 0;
letter-spacing:-1.6px;
}

.section-heading p{
color:#b8acd6;
line-height:1.8;
font-size:17px;
}

.btn-primary,
.btn-outline,
.btn-login{

display:inline-flex;
align-items:center;
justify-content:center;
gap:8px;

text-decoration:none;

transition:.35s;

font-weight:800;

border-radius:999px;
}

.btn-primary{

padding:13px 24px;

background:linear-gradient(135deg,#7c3aed,#d946ef);

color:#fff;

box-shadow:0 18px 45px rgba(124,58,237,.35);
}

.btn-primary:hover{

transform:translateY(-3px);

box-shadow:0 26px 70px rgba(124,58,237,.45);

}

.btn-outline{

padding:13px 24px;

border:1px solid rgba(255,255,255,.15);

background:rgba(255,255,255,.05);

color:#fff;

}

.btn-login{

color:#d8cbff;

}

@media(max-width:760px){

.landing-page{

padding-top:72px;

}

}
      `}</style>
    </>
  );
}
