import { useEffect, useMemo, useState } from "react";
import { BarChart3, CalendarDays, ClipboardList, LineChart, Play, ShieldCheck } from "lucide-react";

import { getStrategies } from "../api/strategyApi";
import { getBacktestReports, runBacktest } from "../api/backtestApi";

import { DEFAULT_BACKTEST_FORM, BACKTEST_METRICS } from "../constants/backtest";
import { MARKET_TYPES, TIMEFRAMES } from "../constants/strategyRules";

const NUMBER_FIELDS = ["initialCapital", "brokeragePerOrder", "slippagePercent", "quantity"];

export default function Backtest() {
  const [form, setForm] = useState(DEFAULT_BACKTEST_FORM);
  const [strategies, setStrategies] = useState([]);
  const [reports, setReports] = useState([]);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const selectedStrategy = useMemo(() => strategies.find((item) => item._id === form.strategyId), [strategies, form.strategyId]);

  const loadReports = async () => {
    try {
      const reportRes = await getBacktestReports();
      setReports(reportRes?.reports || []);
    } catch {
      setReports([]);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingData(true);
        const [strategyRes, reportRes] = await Promise.all([getStrategies(), getBacktestReports()]);

        setStrategies(strategyRes?.strategies || []);
        setReports(reportRes?.reports || []);
      } catch {
        setStrategies([]);
        setReports([]);
      } finally {
        setLoadingData(false);
      }
    };

    loadInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "strategyId") {
      const strategy = strategies.find((item) => item._id === value);

      setForm((prev) => ({
        ...prev,
        strategyId: value,
        symbol: strategy?.symbol || "",
        market: strategy?.market || prev.market,
        timeframe: strategy?.timeframe || prev.timeframe,
        quantity: strategy?.quantity || prev.quantity,
      }));

      setError("");
      setMessage("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: NUMBER_FIELDS.includes(name) ? Number(value) : value,
    }));

    setError("");
    setMessage("");
  };

  const validateForm = () => {
    if (!form.strategyId) return "Strategy select karo.";
    if (!form.symbol.trim()) return "Symbol required hai.";
    if (!form.startDate) return "Start date required hai.";
    if (!form.endDate) return "End date required hai.";
    if (new Date(form.startDate) > new Date(form.endDate)) {
      return "Start date end date se bada nahi ho sakta.";
    }
    if (Number(form.initialCapital) <= 0) return "Initial capital valid hona chahiye.";
    if (Number(form.quantity) <= 0) return "Quantity valid honi chahiye.";
    return "";
  };

  const handleRunBacktest = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const payload = {
        ...form,
        symbol: form.symbol.trim().toUpperCase(),
      };

      const res = await runBacktest(payload);

      setResult(res?.report || res?.result || null);
      setMessage(res?.message || "Backtest completed successfully.");
      await loadReports();
    } catch (err) {
      setError(err?.response?.data?.message || "Backtest run nahi ho paya. Backend ya data source check karo.");
    } finally {
      setLoading(false);
    }
  };

  const metricValue = (metric, source) => {
    if (!source) return "-";

    const value = source?.[metric.key];
    if (value === undefined || value === null || value === "") return "-";

    return `${metric.prefix || ""}${value}${metric.suffix || ""}`;
  };

  return (
    <>
      <div className="backtest-page">
        <div className="backtest-head">
          <div>
            <h1>Backtest Engine</h1>
            <p>Test strategies on historical data before paper or live execution.</p>
          </div>

          <div className="backtest-head-chip">
            <ShieldCheck size={18} strokeWidth={2} />
            <span>No Live Orders</span>
          </div>
        </div>

        <section className="backtest-layout">
          <form className="backtest-card backtest-form" onSubmit={handleRunBacktest}>
            <div className="section-head">
              <div>
                <h3>Run Backtest</h3>
                <p>Select strategy, market, date range and capital.</p>
              </div>
              <Play size={22} strokeWidth={2} />
            </div>

            {error && <div className="backtest-alert error">{error}</div>}
            {message && <div className="backtest-alert success">{message}</div>}

            <label>
              Strategy
              <select name="strategyId" value={form.strategyId} onChange={handleChange} disabled={loadingData}>
                <option value="">{loadingData ? "Loading strategies..." : "Select strategy"}</option>
                {strategies.map((strategy) => (
                  <option key={strategy._id} value={strategy._id}>
                    {strategy.name} — {strategy.symbol}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-grid three">
              <label>
                Market
                <select name="market" value={form.market} onChange={handleChange}>
                  {MARKET_TYPES.map((market) => (
                    <option key={market.value} value={market.value}>
                      {market.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Symbol
                <input name="symbol" type="text" placeholder="NIFTY, BANKNIFTY, BTCUSDT" value={form.symbol} onChange={handleChange} />
              </label>

              <label>
                Timeframe
                <select name="timeframe" value={form.timeframe} onChange={handleChange}>
                  {TIMEFRAMES.map((tf) => (
                    <option key={tf.value} value={tf.value}>
                      {tf.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="backtest-section-title">
              <CalendarDays size={18} strokeWidth={2} />
              <span>Date Range</span>
            </div>

            <div className="form-grid two">
              <label>
                Start Date
                <input name="startDate" type="date" value={form.startDate} onChange={handleChange} />
              </label>

              <label>
                End Date
                <input name="endDate" type="date" value={form.endDate} onChange={handleChange} />
              </label>
            </div>

            <div className="backtest-section-title">
              <BarChart3 size={18} strokeWidth={2} />
              <span>Capital & Cost</span>
            </div>

            <div className="form-grid two">
              <label>
                Initial Capital
                <input name="initialCapital" type="number" min="1000" value={form.initialCapital} onChange={handleChange} />
              </label>

              <label>
                Quantity / Lot
                <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} />
              </label>
            </div>

            <div className="form-grid two">
              <label>
                Brokerage / Order
                <input name="brokeragePerOrder" type="number" min="0" value={form.brokeragePerOrder} onChange={handleChange} />
              </label>

              <label>
                Slippage %
                <input name="slippagePercent" type="number" min="0" step="0.01" value={form.slippagePercent} onChange={handleChange} />
              </label>
            </div>

            <button className="backtest-submit" type="submit" disabled={loading}>
              <Play size={18} strokeWidth={2} />
              {loading ? "Running Backtest..." : "Run Backtest"}
            </button>
          </form>
          <aside className="backtest-side">
            <div className="backtest-card">
              <div className="section-head">
                <div>
                  <h3>Selected Strategy</h3>
                  <p>Strategy logic summary.</p>
                </div>
                <ClipboardList size={22} strokeWidth={2} />
              </div>

              {selectedStrategy ? (
                <div className="preview-list">
                  <div>
                    <span>Name</span>
                    <strong>{selectedStrategy.name}</strong>
                  </div>
                  <div>
                    <span>Entry</span>
                    <strong>{selectedStrategy.entryRule}</strong>
                  </div>
                  <div>
                    <span>Exit</span>
                    <strong>{selectedStrategy.exitRule}</strong>
                  </div>
                  <div>
                    <span>Risk</span>
                    <strong>{selectedStrategy.riskPerTrade}%</strong>
                  </div>
                </div>
              ) : (
                <p className="empty-text">No strategy selected.</p>
              )}
            </div>

            <div className="backtest-card">
              <div className="section-head">
                <div>
                  <h3>Latest Reports</h3>
                  <p>Recent backtest history.</p>
                </div>
                <LineChart size={22} strokeWidth={2} />
              </div>

              {reports.length ? (
                <div className="saved-list">
                  {reports.slice(0, 6).map((report) => (
                    <div key={report._id} className="saved-card">
                      <div>
                        <strong>{report.strategyName || report.symbol}</strong>
                        <span>
                          {report.symbol} • {report.timeframe} • {report.netProfit ?? "0"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-text">No backtest report found.</p>
              )}
            </div>
          </aside>
        </section>

        <section className="backtest-card result-card">
          <div className="section-head">
            <div>
              <h3>Backtest Result</h3>
              <p>Performance metrics will appear after test completion.</p>
            </div>
            <BarChart3 size={22} strokeWidth={2} />
          </div>

          <div className="metric-grid">
            {BACKTEST_METRICS.map((metric) => (
              <div key={metric.key} className="metric-box">
                <span>{metric.label}</span>
                <strong>{metricValue(metric, result)}</strong>
              </div>
            ))}
          </div>

          {result?.trades?.length ? (
            <div className="table-wrap">
              <table className="terminal-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Side</th>
                    <th>Entry</th>
                    <th>Exit</th>
                    <th>P&L</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.trades.map((trade, index) => (
                    <tr key={`${trade.entryTime || "trade"}-${index}`}>
                      <td>{trade.entryTime || "-"}</td>
                      <td>{trade.side || "-"}</td>
                      <td>{trade.entryPrice || "-"}</td>
                      <td>{trade.exitPrice || "-"}</td>
                      <td>{trade.pnl || "-"}</td>
                      <td>{trade.status || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-note">No trade result available yet.</p>
          )}
        </section>
      </div>

      <style>{`
        .backtest-page{width:100%;min-height:calc(100vh - 68px);padding:34px 34px 44px;background:radial-gradient(circle at top center,rgba(0,255,136,.065),transparent 42%),var(--br30-bg);}
        .backtest-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:24px;}
        .backtest-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);line-height:1.1;font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .backtest-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;font-weight:450;}
        .backtest-head-chip{min-height:42px;border:1px solid var(--br30-border);background:var(--br30-card);color:var(--br30-primary);border-radius:999px;padding:0 15px;display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:650;white-space:nowrap;box-shadow:var(--br30-shadow);}
        .backtest-layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(330px,.75fr);gap:18px;align-items:start;margin-bottom:18px;}
        .backtest-side{display:grid;gap:18px;position:sticky;top:88px;}
        .backtest-card{border:1px solid var(--br30-border);background:var(--br30-card);box-shadow:var(--br30-shadow);border-radius:22px;padding:24px;color:var(--br30-text);}
        .backtest-form{display:grid;gap:14px;}
        .section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:6px;}
        .section-head h3{margin:0 0 6px;font-size:22px;font-weight:750;letter-spacing:-.03em;color:var(--br30-text);}
        .section-head p{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.55;font-weight:450;}
        .section-head svg{color:var(--br30-primary);flex-shrink:0;}
        .backtest-alert{border-radius:15px;padding:12px 14px;font-size:14px;font-weight:650;line-height:1.45;}
        .backtest-alert.error{border:1px solid rgba(255,77,79,.35);background:rgba(255,77,79,.08);color:#ff8c8e;}
        .backtest-alert.success{border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);}
        .form-grid{display:grid;gap:14px;}
        .form-grid.two{grid-template-columns:repeat(2,minmax(0,1fr));}
        .form-grid.three{grid-template-columns:repeat(3,minmax(0,1fr));}
        .backtest-form label{display:grid;gap:8px;color:var(--br30-text);font-size:14px;font-weight:650;}
        .backtest-form input,.backtest-form select{width:100%;height:50px;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:15px;padding:0 14px;outline:0;font-size:15px;}
        .backtest-form input::placeholder{color:var(--br30-muted);}
        .backtest-form input:focus,.backtest-form select:focus{border-color:var(--br30-primary);box-shadow:0 0 0 4px var(--br30-primary-soft);}
        .backtest-section-title{margin:8px 0 0;padding-top:16px;border-top:1px solid var(--br30-border);display:flex;align-items:center;gap:8px;color:var(--br30-primary);font-size:15px;font-weight:750;}
        .backtest-submit{height:52px;border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);border-radius:16px;font-weight:760;cursor:pointer;margin-top:6px;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:.2s ease;}
        .backtest-submit:hover{transform:translateY(-1px);border-color:rgba(0,255,136,.5);}
        .backtest-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .preview-list{display:grid;gap:10px;}
        .preview-list div{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:15px;padding:13px;}
        .preview-list span{display:block;color:var(--br30-muted);font-size:12px;font-weight:650;margin-bottom:5px;}
        .preview-list strong{display:block;color:var(--br30-text);font-size:14px;font-weight:720;word-break:break-word;}
        .saved-list{display:grid;gap:10px;}
        .saved-card{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:15px;padding:13px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
        .saved-card strong{display:block;color:var(--br30-text);font-size:14px;font-weight:720;}
        .saved-card span{display:block;color:var(--br30-muted);font-size:12px;margin-top:4px;line-height:1.4;}
        .result-card{margin-top:0;}
        .metric-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:14px;}
        .metric-box{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:16px;padding:15px;}
        .metric-box span{display:block;color:var(--br30-muted);font-size:13px;font-weight:650;margin-bottom:8px;}
        .metric-box strong{display:block;color:var(--br30-text);font-size:22px;font-weight:750;letter-spacing:-.025em;}
        .table-wrap{width:100%;overflow-x:auto;margin-top:18px;border:1px solid var(--br30-border);border-radius:16px;}
        .terminal-table{width:100%;border-collapse:collapse;min-width:720px;background:var(--br30-surface);}
        .terminal-table th,.terminal-table td{padding:13px 14px;text-align:left;border-bottom:1px solid var(--br30-border);font-size:14px;white-space:nowrap;}
        .terminal-table th{color:var(--br30-muted);font-weight:750;background:var(--br30-surface-2);}
        .terminal-table td{color:var(--br30-text);font-weight:550;}
        .terminal-table tr:last-child td{border-bottom:0;}
        .empty-text,.empty-note{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.6;}
        .empty-note{margin-top:16px;}
        [data-theme="light"] .backtest-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .backtest-head-chip,[data-theme="light"] .section-head svg,[data-theme="light"] .backtest-section-title,[data-theme="light"] .backtest-submit{color:#a020f0;}
        [data-theme="light"] .backtest-submit,[data-theme="light"] .backtest-alert.success{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));}
        [data-theme="light"] .backtest-card,[data-theme="light"] .backtest-head-chip{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        [data-theme="light"] .backtest-submit{border-color:rgba(160,32,240,.28);}
        [data-theme="light"] .backtest-form input:focus,[data-theme="light"] .backtest-form select:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
        @media(max-width:1180px){.backtest-layout{grid-template-columns:1fr;}.backtest-side{position:static;grid-template-columns:1fr 1fr;}.metric-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
        @media(max-width:860px){.backtest-page{padding:24px 20px 34px;}.backtest-head{flex-direction:column;align-items:stretch;}.backtest-head-chip{justify-content:center;width:100%;}.backtest-side{grid-template-columns:1fr;}.form-grid.two,.form-grid.three{grid-template-columns:1fr;}.backtest-card{padding:20px;border-radius:20px;}}
        @media(max-width:560px){.backtest-page{padding:18px 14px 26px;}.backtest-head h1{font-size:26px;}.backtest-head p{font-size:14px;}.backtest-card{padding:16px;border-radius:18px;}.section-head h3{font-size:20px;}.section-head p{font-size:14px;}.backtest-form input,.backtest-form select{height:48px;}.backtest-submit{height:50px;}.metric-grid{grid-template-columns:1fr;}.metric-box strong{font-size:20px;}}
      `}</style>
    </>
  );
}
