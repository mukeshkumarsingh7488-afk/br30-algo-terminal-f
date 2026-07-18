import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is BR30 Algo Terminal?",
    answer: "BR30 Algo Terminal is a professional trading automation platform that allows you to connect your broker, build strategies, perform backtesting, paper trade, and execute live automated trading with advanced risk management.",
  },
  {
    question: "Which brokers are supported?",
    answer: "The platform is designed with a scalable broker integration architecture. Upstox is the initial supported broker, while Zerodha, Dhan, Angel One and Fyers are planned for future releases.",
  },
  {
    question: "Is my broker account secure?",
    answer: "Yes. Broker authentication is designed using secure OAuth flow and encrypted token storage. Your credentials are never displayed after successful authentication.",
  },
  {
    question: "Can I test my strategy before live trading?",
    answer: "Absolutely. You can use both Backtesting and Paper Trading before enabling the Live Algo Engine.",
  },
  {
    question: "Does the platform include risk management?",
    answer: "Yes. Risk management is a core feature including maximum daily loss, maximum trades, strategy validation and safety confirmation before enabling live execution.",
  },
  {
    question: "Is coding required to use BR30 Algo Terminal?",
    answer: "No. The platform is designed to make strategy creation and automation simple, even for traders without programming experience.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className="faq-section" id="faq">
        <div className="landing-container">
          <div className="section-heading">
            <span className="section-tag">Frequently Asked Questions</span>

            <h2>Everything You Need To Know</h2>

            <p>Find answers to the most common questions about BR30 Algo Terminal, broker connectivity, automation and platform security.</p>
          </div>

          <div className="faq-wrapper">
            {faqData.map((item, index) => (
              <div className={`faq-item ${openIndex === index ? "active" : ""}`} key={index}>
                <button className="faq-question" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                  <span>{item.question}</span>

                  <ChevronDown className={openIndex === index ? "rotate" : ""} size={20} />
                </button>

                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
.faq-section{padding:90px 0;}
.faq-wrapper{max-width:920px;margin:50px auto 0;display:grid;gap:18px;}
.faq-item{border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.08);overflow:hidden;transition:.35s;backdrop-filter:blur(18px);}
.faq-item.active{border-color:rgba(168,85,247,.45);box-shadow:0 25px 65px rgba(124,58,237,.18);}
.faq-question{width:100%;padding:22px 24px;border:0;background:transparent;color:#fff;font-size:17px;font-weight:850;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;}
.faq-question span{padding-right:18px;line-height:1.6;}
.faq-question svg{transition:.35s;flex-shrink:0;color:#d946ef;}
.faq-question svg.rotate{transform:rotate(180deg);}
.faq-answer{padding:0 24px 24px;}
.faq-answer p{margin:0;color:#b8acd6;font-size:15px;line-height:1.8;}
@media(max-width:760px){.faq-section{padding:60px 0;}.faq-wrapper{margin-top:34px;gap:14px;}.faq-question{padding:18px;font-size:15px;}.faq-answer{padding:0 18px 18px;}}
`}</style>
    </>
  );
}
