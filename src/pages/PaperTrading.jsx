import { useEffect, useMemo, useState } from "react";
import { Activity, CircleStop, ClipboardList, Play, RefreshCcw, ShieldCheck, Wallet } from "lucide-react";

import { getStrategies } from "../api/strategyApi";
import { getPaperOrders, getPaperPositions, getPaperStatus, startPaperTrading, stopPaperTrading } from "../api/orderApi";

import { DEFAULT_PAPER_FORM, PAPER_STATUS } from "../constants/paperTrading";

const NUMBER_FIELDS = ["capital", "maxDailyLoss", "maxTrades"];

export default function PaperTrading() {
  const [form, setForm] = useState(DEFAULT_PAPER_FORM);
  const [strategies, setStrategies] = useState([]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [session, setSession] = useState(null);

  const [loadingData, setLoadingData] = useState(true);
  const [starting, setStarting] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const selectedStrategy = useMemo(() => strategies.find((item) => item._id === form.strategyId), [strategies, form.strategyId]);

  const isRunning = session?.status === PAPER_STATUS.RUNNING || session?.isRunning;

  const loadPaperData = async () => {
    const [strategyRes, statusRes, orderRes, positionRes] = await Promise.all([getStrategies(), getPaperStatus(), getPaperOrders(), getPaperPositions()]);

    setStrategies(strategyRes?.strategies || []);
    setSession(statusRes?.session || statusRes?.status || null);
    setOrders(orderRes?.orders || []);
    setPositions(positionRes?.positions || []);
  };

  useEffect(() => {
    const initPaperData = async () => {
      try {
        setLoadingData(true);
        const [strategyRes, statusRes, orderRes, positionRes] = await Promise.all([getStrategies(), getPaperStatus(), getPaperOrders(), getPaperPositions()]);

        setStrategies(strategyRes?.strategies || []);
        setSession(statusRes?.session || statusRes?.status || null);
        setOrders(orderRes?.orders || []);
        setPositions(positionRes?.positions || []);
      } catch {
        setStrategies([]);
        setOrders([]);
        setPositions([]);
        setSession(null);
      } finally {
        setLoadingData(false);
      }
    };

    initPaperData();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      setMessage("");
      await loadPaperData();
      setMessage("Paper trading data refreshed.");
    } catch {
      setError("Data refresh nahi ho paya.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: NUMBER_FIELDS.includes(name) ? Number(value) : value,
    }));

    setError("");
    setMessage("");
  };

  const validateForm = () => {
    if (!form.strategyId) return "Strategy select karo.";
    if (Number(form.capital) <= 0) return "Capital valid hona chahiye.";
    if (Number(form.maxDailyLoss) <= 0) return "Max daily loss valid hona chahiye.";
    if (Number(form.maxTrades) <= 0) return "Max trades valid hona chahiye.";
    return "";
  };

  const handleStart = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setStarting(true);
      setError("");
      setMessage("");

      const res = await startPaperTrading({
        ...form,
        strategyName: selectedStrategy?.name,
        symbol: selectedStrategy?.symbol,
        timeframe: selectedStrategy?.timeframe,
      });

      setSession(res?.session || { status: PAPER_STATUS.RUNNING, isRunning: true });
      setMessage(res?.message || "Paper trading started successfully.");

      await loadPaperData();
    } catch (err) {
      setError(err?.response?.data?.message || "Paper trading start nahi ho paya. Backend check karo.");
    } finally {
      setStarting(false);
    }
  };

  const handleStop = async () => {
    try {
      setStopping(true);
      setError("");
      setMessage("");

      const sessionId = session?._id || session?.id || "";
      const res = await stopPaperTrading(sessionId);

      setSession(res?.session || { status: PAPER_STATUS.STOPPED, isRunning: false });
      setMessage(res?.message || "Paper trading stopped successfully.");

      await loadPaperData();
    } catch (err) {
      setError(err?.response?.data?.message || "Paper trading stop nahi ho paya.");
    } finally {
      setStopping(false);
    }
  };

  return (
    <>
      <div className="paper-page">
        <div className="paper-head">
          <div>
            <h1>Paper Trading</h1>
            <p>Run algo strategies in simulation mode before live execution.</p>
          </div>

          <div className={isRunning ? "paper-head-chip live" : "paper-head-chip"}>
            <Activity size={18} strokeWidth={2} />
            <span>{isRunning ? "Paper Running" : "Paper Idle"}</span>
          </div>
        </div>

        <section className="paper-layout">
          <form className="paper-card paper-form" onSubmit={handleStart}>
            <div className="section-head">
              <div>
                <h3>Paper Session Setup</h3>
                <p>Select strategy and risk settings for simulation.</p>
              </div>
              <Wallet size={22} strokeWidth={2} />
            </div>

            {error && <div className="paper-alert error">{error}</div>}
            {message && <div className="paper-alert success">{message}</div>}

            <label>
              Strategy
              <select name="strategyId" value={form.strategyId} onChange={handleChange} disabled={loadingData || isRunning}>
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
                Virtual Capital
                <input name="capital" type="number" min="1000" value={form.capital} onChange={handleChange} disabled={isRunning} />
              </label>

              <label>
                Max Daily Loss %
                <input name="maxDailyLoss" type="number" min="0.1" step="0.1" value={form.maxDailyLoss} onChange={handleChange} disabled={isRunning} />
              </label>

              <label>
                Max Trades
                <input name="maxTrades" type="number" min="1" value={form.maxTrades} onChange={handleChange} disabled={isRunning} />
              </label>
            </div>

            <div className="paper-actions">
              <button className="paper-submit" type="submit" disabled={starting || isRunning}>
                <Play size={18} strokeWidth={2} />
                {starting ? "Starting..." : "Start Paper Trading"}
              </button>

              <button className="paper-btn danger" type="button" disabled={stopping || !isRunning} onClick={handleStop}>
                <CircleStop size={18} strokeWidth={2} />
                {stopping ? "Stopping..." : "Stop"}
              </button>

              <button className="paper-btn" type="button" disabled={refreshing} onClick={handleRefresh}>
                <RefreshCcw size={18} strokeWidth={2} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </form>
          <aside className="paper-card">
            <div className="section-head">
              <div>
                <h3>Selected Strategy</h3>
                <p>Simulation rule summary.</p>
              </div>
              <ShieldCheck size={22} strokeWidth={2} />
            </div>

            {selectedStrategy ? (
              <div className="preview-list">
                <div>
                  <span>Name</span>
                  <strong>{selectedStrategy.name}</strong>
                </div>
                <div>
                  <span>Symbol</span>
                  <strong>{selectedStrategy.symbol}</strong>
                </div>
                <div>
                  <span>Timeframe</span>
                  <strong>{selectedStrategy.timeframe}</strong>
                </div>
                <div>
                  <span>Risk</span>
                  <strong>{selectedStrategy.riskPerTrade}%</strong>
                </div>
              </div>
            ) : (
              <p className="empty-text">No strategy selected.</p>
            )}
          </aside>
        </section>

        <section className="paper-panels">
          <div className="paper-card">
            <div className="section-head">
              <div>
                <h3>Paper Positions</h3>
                <p>Currently simulated open positions.</p>
              </div>
              <Activity size={22} strokeWidth={2} />
            </div>

            {positions.length ? (
              <div className="table-wrap">
                <table className="terminal-table">
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Side</th>
                      <th>Qty</th>
                      <th>Avg Price</th>
                      <th>LTP</th>
                      <th>P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position, index) => (
                      <tr key={position._id || `${position.symbol}-${index}`}>
                        <td>{position.symbol || "-"}</td>
                        <td>{position.side || "-"}</td>
                        <td>{position.quantity || "-"}</td>
                        <td>{position.avgPrice || "-"}</td>
                        <td>{position.ltp || "-"}</td>
                        <td>{position.pnl || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-text">No paper positions found.</p>
            )}
          </div>

          <div className="paper-card">
            <div className="section-head">
              <div>
                <h3>Paper Orders</h3>
                <p>Simulation order history.</p>
              </div>
              <ClipboardList size={22} strokeWidth={2} />
            </div>

            {orders.length ? (
              <div className="table-wrap">
                <table className="terminal-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Symbol</th>
                      <th>Side</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id || `${order.symbol}-${index}`}>
                        <td>{order.time || order.createdAt || "-"}</td>
                        <td>{order.symbol || "-"}</td>
                        <td>{order.side || "-"}</td>
                        <td>{order.quantity || "-"}</td>
                        <td>{order.price || "-"}</td>
                        <td>{order.status || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-text">No paper orders found.</p>
            )}
          </div>
        </section>
      </div>

      <style>{`
        .paper-page{width:100%;min-height:calc(100vh - 68px);padding:34px 34px 44px;background:radial-gradient(circle at top center,rgba(0,255,136,.065),transparent 42%),var(--br30-bg);}
        .paper-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:24px;}
        .paper-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);line-height:1.1;font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .paper-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;font-weight:450;}
        .paper-head-chip{min-height:42px;border:1px solid var(--br30-border);background:var(--br30-card);color:var(--br30-muted);border-radius:999px;padding:0 15px;display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:650;white-space:nowrap;box-shadow:var(--br30-shadow);}
        .paper-head-chip.live{color:var(--br30-primary);border-color:rgba(0,255,136,.34);background:var(--br30-primary-soft);}
        .paper-layout{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(330px,.65fr);gap:18px;align-items:start;margin-bottom:18px;}
        .paper-card{border:1px solid var(--br30-border);background:var(--br30-card);box-shadow:var(--br30-shadow);border-radius:22px;padding:24px;color:var(--br30-text);}
        .paper-form{display:grid;gap:14px;}
        .section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:6px;}
        .section-head h3{margin:0 0 6px;font-size:22px;font-weight:750;letter-spacing:-.03em;color:var(--br30-text);}
        .section-head p{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.55;font-weight:450;}
        .section-head svg{color:var(--br30-primary);flex-shrink:0;}
        .paper-alert{border-radius:15px;padding:12px 14px;font-size:14px;font-weight:650;line-height:1.45;}
        .paper-alert.error{border:1px solid rgba(255,77,79,.35);background:rgba(255,77,79,.08);color:#ff8c8e;}
        .paper-alert.success{border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);}
        .form-grid{display:grid;gap:14px;}
        .form-grid.three{grid-template-columns:repeat(3,minmax(0,1fr));}
        .paper-form label{display:grid;gap:8px;color:var(--br30-text);font-size:14px;font-weight:650;}
        .paper-form input,.paper-form select{width:100%;height:50px;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:15px;padding:0 14px;outline:0;font-size:15px;}
        .paper-form input:disabled,.paper-form select:disabled{opacity:.65;cursor:not-allowed;}
        .paper-form input:focus,.paper-form select:focus{border-color:var(--br30-primary);box-shadow:0 0 0 4px var(--br30-primary-soft);}
        .paper-actions{display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-top:4px;}
        .paper-submit,.paper-btn{height:52px;border-radius:16px;font-weight:760;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:.2s ease;padding:0 16px;}
        .paper-submit{border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);}
        .paper-btn{border:1px solid var(--br30-border);background:var(--br30-surface-2);color:var(--br30-text);}
        .paper-btn.danger{color:#ff8c8e;border-color:rgba(255,77,79,.35);background:rgba(255,77,79,.08);}
        .paper-submit:hover,.paper-btn:hover{transform:translateY(-1px);}
        .paper-submit:disabled,.paper-btn:disabled{opacity:.55;cursor:not-allowed;transform:none;}
        .preview-list{display:grid;gap:10px;}
        .preview-list div{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:15px;padding:13px;}
        .preview-list span{display:block;color:var(--br30-muted);font-size:12px;font-weight:650;margin-bottom:5px;}
        .preview-list strong{display:block;color:var(--br30-text);font-size:14px;font-weight:720;word-break:break-word;}
        .paper-panels{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .table-wrap{width:100%;overflow-x:auto;margin-top:12px;border:1px solid var(--br30-border);border-radius:16px;}
        .terminal-table{width:100%;border-collapse:collapse;min-width:680px;background:var(--br30-surface);}
        .terminal-table th,.terminal-table td{padding:13px 14px;text-align:left;border-bottom:1px solid var(--br30-border);font-size:14px;white-space:nowrap;}
        .terminal-table th{color:var(--br30-muted);font-weight:750;background:var(--br30-surface-2);}
        .terminal-table td{color:var(--br30-text);font-weight:550;}
        .terminal-table tr:last-child td{border-bottom:0;}
        .empty-text{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.6;}
        [data-theme="light"] .paper-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .paper-head-chip.live,[data-theme="light"] .section-head svg,[data-theme="light"] .paper-submit{color:#a020f0;}
        [data-theme="light"] .paper-head-chip.live,[data-theme="light"] .paper-submit,[data-theme="light"] .paper-alert.success{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));}
        [data-theme="light"] .paper-card,[data-theme="light"] .paper-head-chip{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        [data-theme="light"] .paper-head-chip.live,[data-theme="light"] .paper-submit{border-color:rgba(160,32,240,.28);}
        [data-theme="light"] .paper-form input:focus,[data-theme="light"] .paper-form select:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
        @media(max-width:1180px){.paper-layout{grid-template-columns:1fr;}.paper-panels{grid-template-columns:1fr;}}
        @media(max-width:860px){.paper-page{padding:24px 20px 34px;}.paper-head{flex-direction:column;align-items:stretch;}.paper-head-chip{justify-content:center;width:100%;}.form-grid.three{grid-template-columns:1fr;}.paper-card{padding:20px;border-radius:20px;}.paper-actions{display:grid;grid-template-columns:1fr 1fr;}.paper-submit{grid-column:1/-1;}}
        @media(max-width:560px){.paper-page{padding:18px 14px 26px;}.paper-head h1{font-size:26px;}.paper-head p{font-size:14px;}.paper-card{padding:16px;border-radius:18px;}.section-head h3{font-size:20px;}.section-head p{font-size:14px;}.paper-form input,.paper-form select{height:48px;}.paper-submit,.paper-btn{height:50px;width:100%;}.paper-actions{grid-template-columns:1fr;}.terminal-table{min-width:620px;}}
      `}</style>
    </>
  );
}
