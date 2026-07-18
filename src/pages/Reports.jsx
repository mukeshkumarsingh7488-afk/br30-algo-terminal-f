import { useEffect, useMemo, useState } from "react";
import { BarChart3, LineChart, PieChart, RefreshCcw, Target, TrendingDown, TrendingUp } from "lucide-react";

import { getEquityCurve, getReportSummary, getStrategyPerformance, getTradeHistory } from "../api/reportApi";

const normalizeText = (value) => String(value || "").toLowerCase();

export default function Reports() {
  const [summary, setSummary] = useState(null);
  const [equityCurve, setEquityCurve] = useState([]);
  const [trades, setTrades] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [mode, setMode] = useState("all");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadReports = async () => {
    const [summaryRes, curveRes, tradesRes, strategyRes] = await Promise.all([getReportSummary(), getEquityCurve(), getTradeHistory(), getStrategyPerformance()]);

    setSummary(summaryRes?.summary || null);
    setEquityCurve(curveRes?.curve || []);
    setTrades(tradesRes?.trades || []);
    setStrategies(strategyRes?.strategies || []);
  };

  useEffect(() => {
    const initReports = async () => {
      try {
        setLoading(true);

        const [summaryRes, curveRes, tradesRes, strategyRes] = await Promise.all([getReportSummary(), getEquityCurve(), getTradeHistory(), getStrategyPerformance()]);

        setSummary(summaryRes?.summary || null);
        setEquityCurve(curveRes?.curve || []);
        setTrades(tradesRes?.trades || []);
        setStrategies(strategyRes?.strategies || []);
      } catch {
        setSummary(null);
        setEquityCurve([]);
        setTrades([]);
        setStrategies([]);
      } finally {
        setLoading(false);
      }
    };

    initReports();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      setMessage("");
      await loadReports();
      setMessage("Reports refreshed successfully.");
    } catch {
      setError("Reports refresh nahi ho paya.");
    } finally {
      setRefreshing(false);
    }
  };

  const filteredTrades = useMemo(() => {
    if (mode === "all") return trades;
    return trades.filter((trade) => normalizeText(trade.mode) === mode);
  }, [trades, mode]);

  const totalPnL = summary?.totalPnL ?? 0;
  const winRate = summary?.winRate ?? 0;
  const totalTrades = summary?.totalTrades ?? trades.length;
  const maxDrawdown = summary?.maxDrawdown ?? 0;
  const profitFactor = summary?.profitFactor ?? 0;
  const avgRR = summary?.avgRR ?? 0;

  const equityStart = equityCurve?.[0]?.equity ?? 0;
  const equityEnd = equityCurve?.[equityCurve.length - 1]?.equity ?? 0;

  return (
    <>
      <div className="reports-page">
        <div className="reports-head">
          <div>
            <h1>Reports & Analytics</h1>
            <p>Analyze backtest, paper and live trading performance in one place.</p>
          </div>

          <button type="button" className="reports-refresh" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCcw size={18} strokeWidth={2} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && <div className="reports-alert error">{error}</div>}
        {message && <div className="reports-alert success">{message}</div>}

        <section className="reports-metrics">
          <div className="reports-card metric-card">
            <span>Total P&L</span>
            <strong className={Number(totalPnL) >= 0 ? "pnl-positive" : "pnl-negative"}>₹{totalPnL}</strong>
            <small>Overall trading result</small>
          </div>

          <div className="reports-card metric-card">
            <span>Win Rate</span>
            <strong>{winRate}%</strong>
            <small>Winning trades percentage</small>
          </div>

          <div className="reports-card metric-card">
            <span>Total Trades</span>
            <strong>{totalTrades}</strong>
            <small>Backtest + paper + live</small>
          </div>

          <div className="reports-card metric-card">
            <span>Max Drawdown</span>
            <strong className="pnl-negative">{maxDrawdown}%</strong>
            <small>Maximum equity decline</small>
          </div>

          <div className="reports-card metric-card">
            <span>Profit Factor</span>
            <strong>{profitFactor}</strong>
            <small>Gross profit / gross loss</small>
          </div>

          <div className="reports-card metric-card">
            <span>Avg R:R</span>
            <strong>{avgRR}</strong>
            <small>Average risk reward</small>
          </div>
        </section>

        <section className="reports-layout">
          <div className="reports-card">
            <div className="section-head">
              <div>
                <h3>Equity Curve</h3>
                <p>Account growth curve over time.</p>
              </div>
              <LineChart size={22} strokeWidth={2} />
            </div>

            <div className="equity-chart-box">
              {loading ? (
                <p className="empty-text">Loading equity curve...</p>
              ) : equityCurve.length ? (
                <>
                  <div className="equity-line">
                    {equityCurve.slice(-18).map((point, index) => (
                      <span
                        key={point.date || index}
                        style={{
                          height: `${Math.max(8, Math.min(100, Number(point.percent || point.change || 20)))}%`,
                        }}
                        title={`${point.date || ""} ${point.equity || ""}`}
                      />
                    ))}
                  </div>

                  <div className="equity-summary">
                    <div>
                      <span>Start</span>
                      <strong>₹{equityStart}</strong>
                    </div>
                    <div>
                      <span>Current</span>
                      <strong>₹{equityEnd}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <p className="empty-text">No equity curve data found.</p>
              )}
            </div>
          </div>
          <div className="reports-card">
            <div className="section-head">
              <div>
                <h3>Strategy Performance</h3>
                <p>Compare strategy-wise performance.</p>
              </div>
              <BarChart3 size={22} strokeWidth={2} />
            </div>

            {loading ? (
              <p className="empty-text">Loading strategy performance...</p>
            ) : strategies.length ? (
              <div className="strategy-list">
                {strategies.slice(0, 8).map((strategy, index) => (
                  <div key={strategy._id || strategy.name || index} className="strategy-row">
                    <div>
                      <strong>{strategy.name || "Strategy"}</strong>
                      <span>
                        {strategy.totalTrades || 0} trades • {strategy.winRate || 0}% win
                      </span>
                    </div>
                    <em className={Number(strategy.pnl || 0) >= 0 ? "pnl-positive" : "pnl-negative"}>₹{strategy.pnl || 0}</em>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-text">No strategy performance found.</p>
            )}
          </div>
        </section>

        <section className="reports-card">
          <div className="section-head">
            <div>
              <h3>Trade History</h3>
              <p>Detailed trade analytics across all modes.</p>
            </div>
            <PieChart size={22} strokeWidth={2} />
          </div>

          <div className="report-filter-row">
            <button type="button" className={mode === "all" ? "filter-pill active" : "filter-pill"} onClick={() => setMode("all")}>
              All
            </button>
            <button type="button" className={mode === "backtest" ? "filter-pill active" : "filter-pill"} onClick={() => setMode("backtest")}>
              Backtest
            </button>
            <button type="button" className={mode === "paper" ? "filter-pill active" : "filter-pill"} onClick={() => setMode("paper")}>
              Paper
            </button>
            <button type="button" className={mode === "live" ? "filter-pill active" : "filter-pill"} onClick={() => setMode("live")}>
              Live
            </button>
          </div>

          {loading ? (
            <p className="empty-text">Loading trades...</p>
          ) : filteredTrades.length ? (
            <div className="table-wrap">
              <table className="terminal-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Mode</th>
                    <th>Strategy</th>
                    <th>Symbol</th>
                    <th>Side</th>
                    <th>Entry</th>
                    <th>Exit</th>
                    <th>P&L</th>
                    <th>Result</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTrades.slice(0, 50).map((trade, index) => (
                    <tr key={trade._id || `${trade.symbol}-${index}`}>
                      <td>{trade.date || trade.entryTime || "-"}</td>
                      <td>{trade.mode || "-"}</td>
                      <td>{trade.strategyName || "-"}</td>
                      <td>{trade.symbol || "-"}</td>
                      <td>
                        <span className={normalizeText(trade.side) === "buy" ? "side-buy" : "side-sell"}>
                          {normalizeText(trade.side) === "buy" ? <TrendingUp size={14} strokeWidth={2} /> : <TrendingDown size={14} strokeWidth={2} />}
                          {trade.side || "-"}
                        </span>
                      </td>
                      <td>{trade.entryPrice || "-"}</td>
                      <td>{trade.exitPrice || "-"}</td>
                      <td className={Number(trade.pnl || 0) >= 0 ? "pnl-positive" : "pnl-negative"}>{trade.pnl ?? "-"}</td>
                      <td>
                        <span className={normalizeText(trade.result) === "win" ? "result-win" : "result-loss"}>
                          <Target size={13} strokeWidth={2} />
                          {trade.result || "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-text">No trade history found.</p>
          )}
        </section>
      </div>

      <style>{`
        .reports-page{width:100%;min-height:calc(100vh - 68px);padding:34px;background:radial-gradient(circle at top center,rgba(0,255,136,.06),transparent 42%),var(--br30-bg);}
        .reports-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:24px;}
        .reports-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .reports-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;}
        .reports-refresh{height:42px;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:999px;padding:0 16px;display:inline-flex;align-items:center;gap:8px;font-weight:700;cursor:pointer;}
        .reports-refresh:disabled{opacity:.55;cursor:not-allowed;}
        .reports-alert{border-radius:15px;padding:12px 14px;font-size:14px;font-weight:650;line-height:1.45;margin-bottom:14px;}
        .reports-alert.error{border:1px solid rgba(255,77,79,.35);background:rgba(255,77,79,.08);color:#ff8c8e;}
        .reports-alert.success{border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);}
        .reports-metrics{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:18px;margin-bottom:18px;}
        .reports-card{border:1px solid var(--br30-border);background:var(--br30-card);box-shadow:var(--br30-shadow);border-radius:22px;padding:24px;color:var(--br30-text);margin-bottom:18px;}
        .metric-card span,.metric-card strong,.metric-card small{display:block;}
        .metric-card span{color:var(--br30-muted);font-size:13px;font-weight:650;}
        .metric-card strong{font-size:25px;font-weight:750;letter-spacing:-.025em;margin:8px 0;color:var(--br30-text);}
        .metric-card small{color:var(--br30-muted);font-size:12px;line-height:1.45;}
        .pnl-positive{color:var(--br30-primary)!important;}
        .pnl-negative{color:#ff8c8e!important;}
        .reports-layout{display:grid;grid-template-columns:1.25fr .75fr;gap:18px;margin-bottom:0;}
        .section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px;}
        .section-head h3{margin:0 0 6px;font-size:22px;font-weight:750;letter-spacing:-.03em;color:var(--br30-text);}
        .section-head p{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.55;}
        .section-head svg{color:var(--br30-primary);flex-shrink:0;}
        .equity-chart-box{min-height:280px;}
        .equity-line{height:210px;display:flex;align-items:end;gap:8px;border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:18px;padding:16px;}
        .equity-line span{flex:1;min-width:10px;border-radius:999px 999px 4px 4px;background:linear-gradient(180deg,var(--br30-primary),rgba(0,255,136,.2));box-shadow:0 0 18px rgba(0,255,136,.18);}
        .equity-summary{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;}
        .equity-summary div{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:14px;padding:12px;}
        .equity-summary span,.equity-summary strong{display:block;}
        .equity-summary span{color:var(--br30-muted);font-size:12px;margin-bottom:5px;}
        .equity-summary strong{color:var(--br30-text);}
        .strategy-list{display:grid;gap:10px;}
        .strategy-row{display:flex;justify-content:space-between;align-items:center;gap:12px;border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:14px;padding:12px;}
        .strategy-row strong,.strategy-row span{display:block;}
        .strategy-row strong{color:var(--br30-text);font-weight:720;}
        .strategy-row span{color:var(--br30-muted);font-size:12px;margin-top:4px;}
        .strategy-row em{font-style:normal;font-weight:750;white-space:nowrap;}
        .report-filter-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;}
        .filter-pill{border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-muted);border-radius:999px;padding:9px 14px;cursor:pointer;font-weight:750;}
        .filter-pill.active,.filter-pill:hover{color:var(--br30-primary);border-color:rgba(0,255,136,.35);background:var(--br30-primary-soft);}
        .side-buy,.side-sell,.result-win,.result-loss{display:inline-flex;align-items:center;gap:5px;font-weight:750;text-transform:capitalize;}
        .side-buy,.result-win{color:var(--br30-primary);}
        .side-sell,.result-loss{color:#ff8c8e;}
        .table-wrap{width:100%;overflow:auto;border:1px solid var(--br30-border);border-radius:16px;}
        .terminal-table{width:100%;border-collapse:collapse;min-width:900px;background:var(--br30-surface);color:var(--br30-text);}
        .terminal-table th,.terminal-table td{padding:13px 14px;text-align:left;border-bottom:1px solid var(--br30-border);font-size:14px;white-space:nowrap;}
        .terminal-table th{color:var(--br30-muted);font-weight:750;background:var(--br30-surface-2);}
        .terminal-table td{color:var(--br30-text);font-weight:550;}
        .terminal-table tr:last-child td{border-bottom:0;}
        .empty-text{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.6;}
        [data-theme="light"] .reports-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .reports-alert.success,[data-theme="light"] .filter-pill.active,[data-theme="light"] .filter-pill:hover{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));border-color:rgba(160,32,240,.28);}
        [data-theme="light"] .section-head svg,[data-theme="light"] .pnl-positive,[data-theme="light"] .side-buy,[data-theme="light"] .result-win,[data-theme="light"] .filter-pill.active,[data-theme="light"] .filter-pill:hover{color:#a020f0!important;}
        [data-theme="light"] .reports-card{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        [data-theme="light"] .equity-line span{background:linear-gradient(180deg,#ff2bd6,#7b2cff);box-shadow:0 0 18px rgba(160,32,240,.18);}
        [data-theme="light"] .reports-refresh{color:#101014;background:#ffffff;}
        [data-theme="dark"] .reports-refresh{color:#ffffff;}
        @media(max-width:1250px){.reports-metrics{grid-template-columns:repeat(3,minmax(0,1fr));}.reports-layout{grid-template-columns:1fr;}}
        @media(max-width:760px){.reports-page{padding:22px;}.reports-head{flex-direction:column;align-items:stretch;}.reports-refresh{justify-content:center;width:100%;}.reports-metrics{grid-template-columns:repeat(2,minmax(0,1fr));}.reports-card{padding:20px;border-radius:20px;}}
        @media(max-width:560px){.reports-page{padding:16px;}.reports-head h1{font-size:26px;}.reports-metrics{grid-template-columns:1fr;}.reports-card{padding:16px;border-radius:18px;}.section-head h3{font-size:20px;}.terminal-table{min-width:820px;}}
      `}</style>
    </>
  );
}
