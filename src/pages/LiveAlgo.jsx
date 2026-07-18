import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, Bot, CircleStop, ClipboardList, Play, RefreshCcw, ShieldAlert, ShieldCheck, Zap } from "lucide-react";

import { getStrategies } from "../api/strategyApi";
import { getBrokerAccounts } from "../api/brokerApi";
import { getLiveOrders, getLivePositions, getLiveStatus, startLiveAlgo, stopLiveAlgo } from "../api/liveAlgoApi";

import { DEFAULT_LIVE_FORM, LIVE_SAFETY_RULES, LIVE_STATUS } from "../constants/liveAlgo";

const NUMBER_FIELDS = ["maxDailyLoss", "maxTrades"];

export default function LiveAlgo() {
  const [form, setForm] = useState(DEFAULT_LIVE_FORM);
  const [strategies, setStrategies] = useState([]);
  const [brokerAccounts, setBrokerAccounts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [session, setSession] = useState(null);

  const [loadingData, setLoadingData] = useState(true);
  const [starting, setStarting] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const connectedBrokerAccounts = useMemo(() => {
    return brokerAccounts.filter((item) => {
      const status = String(item?.status || "connected").toLowerCase();
      return status === "connected" || status === "saved";
    });
  }, [brokerAccounts]);

  const selectedStrategy = useMemo(() => strategies.find((item) => item._id === form.strategyId), [strategies, form.strategyId]);

  const selectedBroker = useMemo(() => connectedBrokerAccounts.find((item) => (item._id || item.id) === form.brokerAccountId), [connectedBrokerAccounts, form.brokerAccountId]);

  const isRunning = session?.status === LIVE_STATUS.RUNNING || session?.isRunning === true;

  const hasBroker = connectedBrokerAccounts.length > 0;

  const canStart = form.strategyId && form.brokerAccountId && form.confirmationChecked && !isRunning;

  const loadLiveData = async () => {
    const [strategyRes, brokerRes, statusRes, orderRes, positionRes] = await Promise.all([getStrategies(), getBrokerAccounts(), getLiveStatus(), getLiveOrders(), getLivePositions()]);

    setStrategies(strategyRes?.strategies || []);
    setBrokerAccounts(brokerRes?.accounts || brokerRes?.brokers || []);
    setSession(statusRes?.session || statusRes?.status || null);
    setOrders(orderRes?.orders || []);
    setPositions(positionRes?.positions || []);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoadingData(true);
        await loadLiveData();
      } catch {
        setStrategies([]);
        setBrokerAccounts([]);
        setOrders([]);
        setPositions([]);
        setSession(null);
      } finally {
        setLoadingData(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!form.brokerAccountId && connectedBrokerAccounts.length) {
        const defaultBroker = connectedBrokerAccounts.find((item) => item.isDefault) || connectedBrokerAccounts[0];

        setForm((prev) => ({
          ...prev,
          brokerAccountId: defaultBroker?._id || defaultBroker?.id || "",
        }));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [connectedBrokerAccounts, form.brokerAccountId]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      setMessage("");

      await loadLiveData();

      setMessage("Live algo data refreshed.");
    } catch {
      setError("Live data refresh nahi ho paya.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : NUMBER_FIELDS.includes(name) ? Number(value) : value,
    }));

    setError("");
    setMessage("");
  };

  const validateForm = () => {
    if (!form.strategyId) return "Strategy select karo.";
    if (!form.brokerAccountId) return "Broker account select karo.";
    if (!selectedBroker) return "Connected broker account valid nahi hai.";
    if (String(selectedBroker.status || "connected").toLowerCase() === "expired") return "Broker token expired hai. Broker Connect page se reconnect karo.";
    if (Number(form.maxDailyLoss) <= 0) return "Max daily loss valid hona chahiye.";
    if (Number(form.maxTrades) <= 0) return "Max trades valid hona chahiye.";
    if (!form.confirmationChecked) return "Live trading risk confirmation check karo.";
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

      const res = await startLiveAlgo({
        strategyId: form.strategyId,
        brokerAccountId: form.brokerAccountId,
        maxDailyLoss: form.maxDailyLoss,
        maxTrades: form.maxTrades,
        strategyName: selectedStrategy?.name,
        symbol: selectedStrategy?.symbol,
        broker: selectedBroker?.broker,
        brokerStatus: selectedBroker?.status,
      });

      setSession(res?.session || { status: LIVE_STATUS.RUNNING, isRunning: true });
      setMessage(res?.message || "Trade Engine started successfully.");

      await loadLiveData();
    } catch (err) {
      setError(err?.response?.data?.message || "Trade Engine start nahi ho paya. Broker/risk/backend check karo.");
    } finally {
      setStarting(false);
    }
  };

  const handleStop = async () => {
    const confirmStop = window.confirm("Trade Engine stop karna hai?");

    if (!confirmStop) return;

    try {
      setStopping(true);
      setError("");
      setMessage("");

      const sessionId = session?._id || session?.id || "";
      const res = await stopLiveAlgo(sessionId);

      setSession(res?.session || { status: LIVE_STATUS.STOPPED, isRunning: false });
      setMessage(res?.message || "Trade Engine stopped successfully.");

      await loadLiveData();
    } catch (err) {
      setError(err?.response?.data?.message || "Trade Engine stop nahi ho paya.");
    } finally {
      setStopping(false);
    }
  };

  return (
    <>
      <div className="live-page">
        <div className="live-head">
          <div>
            <h1>Algo Room</h1>
            <p>Before market opens, select your broker, verify your risk settings, and start the Trade Engine.</p>
          </div>

          <div className={isRunning ? "live-head-chip running" : "live-head-chip danger"}>
            {isRunning ? <Zap size={18} strokeWidth={2} /> : <ShieldAlert size={18} strokeWidth={2} />}
            <span>{isRunning ? "Trade Engine ON" : "Trade Engine OFF"}</span>
          </div>
        </div>

        <section className="live-warning-card">
          <div>
            <AlertTriangle size={22} strokeWidth={2} />
          </div>
          <p>Live trading places real orders in your broker account. Verify your broker connection, strategy, available capital, and risk settings before starting the Trade Engine.</p>
        </section>

        <section className="engine-status-grid">
          <div className="engine-tile">
            <span>Broker Status</span>
            <strong>{hasBroker ? "Broker Ready" : "No Broker"}</strong>
            <small>{hasBroker ? `${connectedBrokerAccounts.length} account available` : "Broker connection required. Complete the setup from the Broker Connect page."}</small>
          </div>

          <div className="engine-tile">
            <span>Engine Status</span>
            <strong>{isRunning ? "Running" : "Stopped"}</strong>
            <small>{isRunning ? "Trade Engine is running and ready for live execution." : "Trade Engine is stopped. No live orders will be executed."}</small>
          </div>

          <div className="engine-tile">
            <span>Risk Protection</span>
            <strong>{form.confirmationChecked ? "Enabled" : "Disabled"}</strong>
            <small>Capital protection and risk limits are active.</small>
          </div>
        </section>

        <section className="live-layout">
          <form className="live-card live-form" onSubmit={handleStart}>
            <div className="section-head">
              <div>
                <h3>Trade Engine Setup</h3>
                <p>Select strategy, connected broker and safety limits.</p>
              </div>
              <Bot size={22} strokeWidth={2} />
            </div>

            {error && <div className="live-alert error">{error}</div>}
            {message && <div className="live-alert success">{message}</div>}

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

            <label>
              Connected Broker
              <select name="brokerAccountId" value={form.brokerAccountId} onChange={handleChange} disabled={loadingData || isRunning || !hasBroker}>
                <option value="">{hasBroker ? "Select broker account" : "No connected broker"}</option>

                {connectedBrokerAccounts.map((account) => (
                  <option key={account._id || account.id} value={account._id || account.id}>
                    {account.broker} — {account.accountName || account.clientId || account.accountId || "Account"}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-grid two">
              <label>
                Max Daily Loss %
                <input name="maxDailyLoss" type="number" min="0.1" step="0.1" value={form.maxDailyLoss} onChange={handleChange} disabled={isRunning} />
              </label>

              <label>
                Max Trades
                <input name="maxTrades" type="number" min="1" value={form.maxTrades} onChange={handleChange} disabled={isRunning} />
              </label>
            </div>

            <div className="live-safety-box">
              <strong>Live Safety Checklist</strong>

              <ul>
                {LIVE_SAFETY_RULES.map((rule) => (
                  <li key={rule}>
                    <ShieldCheck size={15} strokeWidth={2} />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              <label className="checkbox-line live-check">
                <input name="confirmationChecked" type="checkbox" checked={form.confirmationChecked} onChange={handleChange} disabled={isRunning} />
                <span>I understand Trade Engine can place real broker orders.</span>
              </label>
            </div>

            <div className="live-actions">
              <button className="live-submit" type="submit" disabled={starting || !canStart}>
                <Play size={18} strokeWidth={2} />
                {starting ? "Starting..." : "Trade Engine ON"}
              </button>

              <button className="live-btn danger" type="button" disabled={stopping || !isRunning} onClick={handleStop}>
                <CircleStop size={18} strokeWidth={2} />
                {stopping ? "Stopping..." : "Emergency Stop"}
              </button>

              <button className="live-btn" type="button" disabled={refreshing} onClick={handleRefresh}>
                <RefreshCcw size={18} strokeWidth={2} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </form>

          <aside className="live-side">
            <div className="live-card">
              <div className="section-head">
                <div>
                  <h3>Selected Strategy</h3>
                  <p>Execution summary.</p>
                </div>
                <Activity size={22} strokeWidth={2} />
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
            </div>

            <div className="live-card">
              <div className="section-head">
                <div>
                  <h3>Selected Broker</h3>
                  <p>Execution account.</p>
                </div>
                <ShieldCheck size={22} strokeWidth={2} />
              </div>

              {selectedBroker ? (
                <div className="preview-list">
                  <div>
                    <span>Broker</span>
                    <strong>{selectedBroker.broker}</strong>
                  </div>
                  <div>
                    <span>Client ID</span>
                    <strong>{selectedBroker.clientId || selectedBroker.accountId || "-"}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{selectedBroker.status || "Connected"}</strong>
                  </div>
                </div>
              ) : (
                <p className="empty-text">No broker selected.</p>
              )}
            </div>
          </aside>
        </section>

        <section className="live-panels">
          <div className="live-card">
            <div className="section-head">
              <div>
                <h3>Live Positions</h3>
                <p>Broker open positions.</p>
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
                      <th>Avg</th>
                      <th>LTP</th>
                      <th>P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((p, i) => (
                      <tr key={p._id || `${p.symbol}-${i}`}>
                        <td>{p.symbol || "-"}</td>
                        <td>{p.side || "-"}</td>
                        <td>{p.quantity || "-"}</td>
                        <td>{p.avgPrice || "-"}</td>
                        <td>{p.ltp || "-"}</td>
                        <td>{p.pnl || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-text">No live positions found.</p>
            )}
          </div>
          <div className="live-card">
            <div className="section-head">
              <div>
                <h3>Live Orders</h3>
                <p>Broker order history.</p>
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
                    {orders.map((o, i) => (
                      <tr key={o._id || `${o.symbol}-${i}`}>
                        <td>{o.time || o.createdAt || "-"}</td>
                        <td>{o.symbol || "-"}</td>
                        <td>{o.side || "-"}</td>
                        <td>{o.quantity || "-"}</td>
                        <td>{o.price || "-"}</td>
                        <td>{o.status || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-text">No live orders found.</p>
            )}
          </div>
        </section>
      </div>

      <style>{`
        .live-page{width:100%;min-height:calc(100vh - 68px);padding:34px;background:radial-gradient(circle at top center,rgba(0,255,136,.06),transparent 42%),var(--br30-bg);}
        .live-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin-bottom:24px;}
        .live-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);line-height:1.1;font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .live-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;font-weight:450;}
        .live-head-chip{display:flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;border:1px solid var(--br30-border);background:var(--br30-card);font-size:14px;font-weight:760;white-space:nowrap;box-shadow:var(--br30-shadow);}
        .live-head-chip.running{color:var(--br30-primary);background:var(--br30-primary-soft);}
        .live-head-chip.danger{color:#ff8c8e;background:rgba(255,77,79,.08);}
        .live-warning-card{display:flex;gap:12px;padding:18px;border-radius:18px;border:1px solid rgba(255,170,0,.2);background:rgba(255,170,0,.08);margin-bottom:18px;color:var(--br30-text);}
        .live-warning-card svg{color:#fbbf24;flex-shrink:0;}
        .live-warning-card p{margin:0;color:var(--br30-muted);line-height:1.6;font-size:15px;}

        .engine-status-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:18px;}
        .engine-tile{border:1px solid var(--br30-border);background:var(--br30-card);border-radius:18px;padding:16px;box-shadow:var(--br30-shadow);}
        .engine-tile span{display:block;color:var(--br30-muted);font-size:13px;font-weight:650;margin-bottom:6px;}
        .engine-tile strong{display:block;color:var(--br30-text);font-size:18px;font-weight:780;letter-spacing:-.02em;}
        .engine-tile small{display:block;color:var(--br30-muted);font-size:12px;line-height:1.45;margin-top:6px;}

        .live-layout{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;margin-bottom:18px;}
        .live-side{display:grid;gap:18px;}
        .live-card{border:1px solid var(--br30-border);background:var(--br30-card);border-radius:22px;padding:24px;box-shadow:var(--br30-shadow);}
        .section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px;}
        .section-head h3{margin:0 0 6px;font-size:22px;font-weight:750;letter-spacing:-.03em;color:var(--br30-text);}
        .section-head p{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.55;font-weight:450;}
        .section-head svg{color:var(--br30-primary);flex-shrink:0;}

        .live-form{display:grid;gap:14px;}
        .live-form label{display:grid;gap:8px;font-size:14px;font-weight:650;color:var(--br30-text);}
        .live-form input,.live-form select{height:50px;border:1px solid var(--br30-border);border-radius:15px;padding:0 14px;background:var(--br30-surface);color:var(--br30-text);outline:0;font-size:15px;}
        .live-form input:focus,.live-form select:focus{outline:0;border-color:var(--br30-primary);box-shadow:0 0 0 4px var(--br30-primary-soft);}
        .live-form input:disabled,.live-form select:disabled{opacity:.65;cursor:not-allowed;}
        .form-grid.two{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

        .live-alert{border-radius:15px;padding:12px 14px;font-size:14px;font-weight:650;line-height:1.45;}
        .live-alert.error{border:1px solid rgba(255,77,79,.35);background:rgba(255,77,79,.08);color:#ff8c8e;}
        .live-alert.success{border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);}

        .live-safety-box{border:1px solid var(--br30-border);background:var(--br30-surface);padding:18px;border-radius:18px;color:var(--br30-text);}
        .live-safety-box strong{display:block;font-size:15px;font-weight:780;color:var(--br30-text);}
        .live-safety-box ul{margin:12px 0;padding:0;list-style:none;display:grid;gap:8px;}
        .live-safety-box li{display:flex;gap:8px;align-items:center;color:var(--br30-muted);font-size:14px;line-height:1.45;}
        .live-safety-box li svg{color:var(--br30-primary);flex-shrink:0;}
        .checkbox-line{display:flex!important;grid-template-columns:none!important;align-items:flex-start;gap:10px!important;}
        .checkbox-line input{width:16px!important;height:16px!important;margin-top:2px;padding:0!important;accent-color:var(--br30-primary);}
        .checkbox-line span{color:var(--br30-muted);font-size:14px;line-height:1.45;}

        .live-actions{display:flex;gap:12px;flex-wrap:wrap;}
        .live-submit,.live-btn{height:52px;border-radius:16px;padding:0 18px;font-weight:760;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:.2s ease;}
        .live-submit{background:var(--br30-primary-soft);color:var(--br30-primary);border:1px solid rgba(0,255,136,.3);}
        .live-submit:hover,.live-btn:hover{transform:translateY(-1px);}
        .live-btn{border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);}
        .live-btn.danger{color:#ff8c8e;border-color:rgba(255,77,79,.3);background:rgba(255,77,79,.06);}
        .live-submit:disabled,.live-btn:disabled{opacity:.55;cursor:not-allowed;transform:none;}

        .preview-list{display:grid;gap:10px;}
        .preview-list div{border:1px solid var(--br30-border);padding:13px;border-radius:14px;background:var(--br30-surface);}
        .preview-list span{display:block;font-size:12px;color:var(--br30-muted);font-weight:650;}
        .preview-list strong{display:block;margin-top:4px;color:var(--br30-text);font-weight:760;word-break:break-word;}

        .live-panels{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .table-wrap{overflow:auto;border:1px solid var(--br30-border);border-radius:16px;}
        .terminal-table{width:100%;border-collapse:collapse;min-width:680px;color:var(--br30-text);}
        .terminal-table th,.terminal-table td{padding:13px;border-bottom:1px solid var(--br30-border);text-align:left;font-size:14px;}
        .terminal-table th{color:var(--br30-muted);font-weight:760;background:var(--br30-surface);}
        .terminal-table tr:last-child td{border-bottom:0;}
        .empty-text{color:var(--br30-muted);margin:0;line-height:1.6;font-size:15px;}

        [data-theme="light"] .live-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .live-head-chip.running,[data-theme="light"] .section-head svg,[data-theme="light"] .live-submit,[data-theme="light"] .live-safety-box li svg{color:#a020f0;}
        [data-theme="light"] .live-head-chip.running,[data-theme="light"] .live-submit,[data-theme="light"] .live-alert.success{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));border-color:rgba(160,32,240,.28);}
        [data-theme="light"] .live-card,[data-theme="light"] .engine-tile{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        [data-theme="light"] .live-form input:focus,[data-theme="light"] .live-form select:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
        [data-theme="light"] .live-btn:not(.danger){color:#101014;background:#ffffff;}
        [data-theme="light"] .live-alert.success{color:#a020f0;}
        [data-theme="dark"] .live-btn:not(.danger){color:#ffffff;}

        @media(max-width:1180px){
          .live-layout,.live-panels{grid-template-columns:1fr;}
          .engine-status-grid{grid-template-columns:1fr;}
        }
        @media(max-width:860px){
          .live-page{padding:22px;}
          .live-head{flex-direction:column;}
          .live-head-chip{width:100%;justify-content:center;}
          .live-actions{display:grid;grid-template-columns:1fr;}
          .form-grid.two{grid-template-columns:1fr;}
        }
        @media(max-width:560px){
          .live-page{padding:16px;}
          .live-head h1{font-size:26px;}
          .live-card{padding:16px;border-radius:18px;}
          .engine-tile{padding:14px;}
          .live-form input,.live-form select,.live-submit,.live-btn{height:48px;width:100%;}
          .section-head h3{font-size:20px;}
          .section-head p{font-size:14px;}
        }
      `}</style>
    </>
  );
}
