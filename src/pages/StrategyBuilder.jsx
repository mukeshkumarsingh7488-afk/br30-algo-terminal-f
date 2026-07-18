import { useEffect, useState } from "react";
import { Activity, BrainCircuit, CheckCircle2, Clock, Copy, Play, Save, ShieldCheck, Trash2 } from "lucide-react";
import { DEFAULT_STRATEGY_FORM, ENTRY_RULES, EXIT_RULES, MARKET_TYPES, ORDER_TYPES, PRODUCT_TYPES, STRATEGY_MODES, TIMEFRAMES } from "../constants/strategyRules";
import { createStrategy, deleteStrategy, getStrategies } from "../api/strategyApi";

export default function StrategyBuilder() {
  const [form, setForm] = useState(DEFAULT_STRATEGY_FORM);
  const [strategies, setStrategies] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadStrategies = async () => {
    try {
      setLoadingList(true);
      const res = await getStrategies();
      setStrategies(res?.strategies || []);
    } catch {
      setStrategies([]);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    const initStrategies = async () => {
      try {
        setLoadingList(true);
        const res = await getStrategies();
        setStrategies(res?.strategies || []);
      } catch {
        setStrategies([]);
      } finally {
        setLoadingList(false);
      }
    };

    initStrategies();
  }, []);

  const numberFields = ["fastEma", "slowEma", "rsiPeriod", "rsiLevel", "supertrendPeriod", "supertrendMultiplier", "quantity", "riskPerTrade", "stopLossValue", "targetValue", "trailingValue", "maxTradesPerDay", "maxDailyLoss"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : numberFields.includes(name) ? Number(value) : value,
    }));

    setError("");
    setMessage("");
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Strategy name required hai.";
    if (!form.symbol.trim()) return "Symbol required hai.";
    if (Number(form.quantity) <= 0) return "Quantity valid honi chahiye.";
    if (Number(form.riskPerTrade) <= 0) return "Risk per trade valid hona chahiye.";
    if (Number(form.maxDailyLoss) <= 0) return "Max daily loss valid hona chahiye.";
    return "";
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        name: form.name.trim(),
        symbol: form.symbol.trim().toUpperCase(),
        description: form.description.trim(),
      };

      const res = await createStrategy(payload);
      setMessage(res?.message || "Strategy saved successfully.");
      setForm(DEFAULT_STRATEGY_FORM);
      await loadStrategies();
    } catch (err) {
      setError(err?.response?.data?.message || "Strategy save nahi ho payi. Backend ya input check karo.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm("Is strategy ko delete karna hai?");
    if (!confirmDelete) return;

    try {
      await deleteStrategy(id);
      setMessage("Strategy deleted successfully.");
      await loadStrategies();
    } catch (err) {
      setError(err?.response?.data?.message || "Strategy delete nahi ho payi.");
    }
  };

  const handleDuplicate = (strategy) => {
    const duplicate = {
      ...DEFAULT_STRATEGY_FORM,
      ...strategy,
      name: `${strategy.name || "Strategy"} Copy`,
      isActive: false,
    };

    delete duplicate._id;
    delete duplicate.createdAt;
    delete duplicate.updatedAt;

    setForm(duplicate);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="strategy-page">
        <div className="strategy-head">
          <div>
            <h1>Strategy Builder</h1>
            <p>Create rule-based algo strategies for backtest, paper and live execution.</p>
          </div>

          <div className="strategy-head-chip">
            <ShieldCheck size={18} strokeWidth={2} />
            <span>Risk Engine Required</span>
          </div>
        </div>

        <section className="strategy-layout">
          <form className="strategy-card strategy-form" onSubmit={handleSave}>
            <div className="section-head">
              <div>
                <h3>Strategy Configuration</h3>
                <p>Define market, symbol, timeframe and execution mode.</p>
              </div>
              <BrainCircuit size={22} strokeWidth={2} />
            </div>

            {error && <div className="strategy-alert error">{error}</div>}
            {message && <div className="strategy-alert success">{message}</div>}

            <div className="form-grid two">
              <label>
                Strategy Name
                <input name="name" type="text" placeholder="Example: BR30 EMA Scalper" value={form.name} onChange={handleChange} />
              </label>

              <label>
                Mode
                <select name="mode" value={form.mode} onChange={handleChange}>
                  {STRATEGY_MODES.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Description
              <textarea name="description" placeholder="Short strategy note..." value={form.description} onChange={handleChange} rows="3" />
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

            <div className="strategy-section-title">
              <Activity size={18} strokeWidth={2} />
              <span>Entry Logic</span>
            </div>

            <div className="form-grid two">
              <label>
                Entry Rule
                <select name="entryRule" value={form.entryRule} onChange={handleChange}>
                  {ENTRY_RULES.map((rule) => (
                    <option key={rule.value} value={rule.value}>
                      {rule.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Exit Rule
                <select name="exitRule" value={form.exitRule} onChange={handleChange}>
                  {EXIT_RULES.map((rule) => (
                    <option key={rule.value} value={rule.value}>
                      {rule.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-grid three">
              <label>
                Fast EMA
                <input name="fastEma" type="number" min="1" value={form.fastEma} onChange={handleChange} />
              </label>

              <label>
                Slow EMA
                <input name="slowEma" type="number" min="1" value={form.slowEma} onChange={handleChange} />
              </label>

              <label>
                RSI Level
                <input name="rsiLevel" type="number" min="1" max="100" value={form.rsiLevel} onChange={handleChange} />
              </label>
            </div>

            <div className="form-grid three">
              <label>
                Supertrend Period
                <input name="supertrendPeriod" type="number" min="1" value={form.supertrendPeriod} onChange={handleChange} />
              </label>

              <label>
                Supertrend Multiplier
                <input name="supertrendMultiplier" type="number" min="0.1" step="0.1" value={form.supertrendMultiplier} onChange={handleChange} />
              </label>

              <label>
                RSI Period
                <input name="rsiPeriod" type="number" min="1" value={form.rsiPeriod} onChange={handleChange} />
              </label>
            </div>

            <div className="strategy-section-title">
              <Play size={18} strokeWidth={2} />
              <span>Execution</span>
            </div>

            <div className="form-grid three">
              <label>
                Order Type
                <select name="orderType" value={form.orderType} onChange={handleChange}>
                  {ORDER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Product Type
                <select name="productType" value={form.productType} onChange={handleChange}>
                  {PRODUCT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Quantity / Lot
                <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} />
              </label>
            </div>

            <div className="strategy-section-title">
              <ShieldCheck size={18} strokeWidth={2} />
              <span>Risk Management</span>
            </div>
            <div className="form-grid three">
              <label>
                Risk Per Trade %
                <input name="riskPerTrade" type="number" min="0.1" step="0.1" value={form.riskPerTrade} onChange={handleChange} />
              </label>

              <label>
                Stop Loss %
                <input name="stopLossValue" type="number" min="0.1" step="0.1" value={form.stopLossValue} onChange={handleChange} />
              </label>

              <label>
                Target RR
                <input name="targetValue" type="number" min="0.1" step="0.1" value={form.targetValue} onChange={handleChange} />
              </label>
            </div>

            <div className="form-grid three">
              <label>
                Max Trades / Day
                <input name="maxTradesPerDay" type="number" min="1" value={form.maxTradesPerDay} onChange={handleChange} />
              </label>

              <label>
                Max Daily Loss %
                <input name="maxDailyLoss" type="number" min="0.1" step="0.1" value={form.maxDailyLoss} onChange={handleChange} />
              </label>

              <label className="checkbox-line">
                <input name="trailingEnabled" type="checkbox" checked={form.trailingEnabled} onChange={handleChange} />
                <span>Enable Trailing SL</span>
              </label>
            </div>

            {form.trailingEnabled && (
              <label>
                Trailing SL %
                <input name="trailingValue" type="number" min="0.1" step="0.1" value={form.trailingValue} onChange={handleChange} />
              </label>
            )}

            <div className="form-grid two">
              <label>
                Start Time
                <input name="startTime" type="time" value={form.startTime} onChange={handleChange} />
              </label>

              <label>
                End Time
                <input name="endTime" type="time" value={form.endTime} onChange={handleChange} />
              </label>
            </div>

            <button className="strategy-submit" type="submit" disabled={saving}>
              <Save size={18} strokeWidth={2} />
              {saving ? "Saving Strategy..." : "Save Strategy"}
            </button>
          </form>

          <aside className="strategy-side">
            <div className="strategy-card">
              <div className="section-head">
                <div>
                  <h3>Strategy Preview</h3>
                  <p>Current rule summary before save.</p>
                </div>
                <CheckCircle2 size={22} strokeWidth={2} />
              </div>

              <div className="preview-list">
                <div>
                  <span>Name</span>
                  <strong>{form.name || "Not set"}</strong>
                </div>
                <div>
                  <span>Symbol</span>
                  <strong>{form.symbol || "Not set"}</strong>
                </div>
                <div>
                  <span>Timeframe</span>
                  <strong>{form.timeframe}</strong>
                </div>
                <div>
                  <span>Entry</span>
                  <strong>{form.entryRule}</strong>
                </div>
                <div>
                  <span>Exit</span>
                  <strong>{form.exitRule}</strong>
                </div>
                <div>
                  <span>Risk</span>
                  <strong>{form.riskPerTrade}% / Trade</strong>
                </div>
                <div>
                  <span>Target</span>
                  <strong>1:{form.targetValue}</strong>
                </div>
                <div>
                  <span>Mode</span>
                  <strong>{form.mode}</strong>
                </div>
              </div>
            </div>

            <div className="strategy-card">
              <div className="section-head">
                <div>
                  <h3>Saved Strategies</h3>
                  <p>Manage existing strategy presets.</p>
                </div>
                <Clock size={22} strokeWidth={2} />
              </div>

              {loadingList ? (
                <p className="empty-text">Loading strategies...</p>
              ) : strategies.length ? (
                <div className="saved-list">
                  {strategies.map((strategy) => (
                    <div key={strategy._id} className="saved-card">
                      <div>
                        <strong>{strategy.name}</strong>
                        <span>
                          {strategy.symbol} • {strategy.timeframe} • {strategy.mode}
                        </span>
                      </div>

                      <div className="mini-actions">
                        <button type="button" onClick={() => handleDuplicate(strategy)} title="Duplicate">
                          <Copy size={16} strokeWidth={2} />
                        </button>

                        <button type="button" onClick={() => handleDelete(strategy._id)} title="Delete">
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-text">No strategy saved yet.</p>
              )}
            </div>
          </aside>
        </section>
      </div>

      <style>{`
        .strategy-page{width:100%;min-height:calc(100vh - 68px);padding:34px 34px 44px;background:radial-gradient(circle at top center,rgba(0,255,136,.065),transparent 42%),var(--br30-bg);}
        .strategy-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:24px;}
        .strategy-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);line-height:1.1;font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .strategy-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;font-weight:450;}
        .strategy-head-chip{min-height:42px;border:1px solid var(--br30-border);background:var(--br30-card);color:var(--br30-primary);border-radius:999px;padding:0 15px;display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:650;white-space:nowrap;box-shadow:var(--br30-shadow);}
        .strategy-layout{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(340px,.6fr);gap:18px;align-items:start;}
        .strategy-side{display:grid;gap:18px;position:sticky;top:88px;}
        .strategy-card{border:1px solid var(--br30-border);background:var(--br30-card);box-shadow:var(--br30-shadow);border-radius:22px;padding:24px;color:var(--br30-text);}
        .strategy-form{display:grid;gap:14px;}
        .section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:6px;}
        .section-head h3{margin:0 0 6px;font-size:22px;font-weight:750;letter-spacing:-.03em;color:var(--br30-text);}
        .section-head p{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.55;font-weight:450;}
        .section-head svg{color:var(--br30-primary);flex-shrink:0;}
        .strategy-alert{border-radius:15px;padding:12px 14px;font-size:14px;font-weight:650;line-height:1.45;}
        .strategy-alert.error{border:1px solid rgba(255,77,79,.35);background:rgba(255,77,79,.08);color:#ff8c8e;}
        .strategy-alert.success{border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);}
        .form-grid{display:grid;gap:14px;}
        .form-grid.two{grid-template-columns:repeat(2,minmax(0,1fr));}
        .form-grid.three{grid-template-columns:repeat(3,minmax(0,1fr));}
        .strategy-form label{display:grid;gap:8px;color:var(--br30-text);font-size:14px;font-weight:650;}
        .strategy-form input,.strategy-form select,.strategy-form textarea{width:100%;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:15px;padding:13px 14px;outline:0;font-size:15px;}
        .strategy-form input,.strategy-form select{height:50px;}
        .strategy-form textarea{resize:vertical;min-height:88px;line-height:1.5;}
        .strategy-form input::placeholder,.strategy-form textarea::placeholder{color:var(--br30-muted);}
        .strategy-form input:focus,.strategy-form select:focus,.strategy-form textarea:focus{border-color:var(--br30-primary);box-shadow:0 0 0 4px var(--br30-primary-soft);}
        .strategy-section-title{margin:8px 0 0;padding-top:16px;border-top:1px solid var(--br30-border);display:flex;align-items:center;gap:8px;color:var(--br30-primary);font-size:15px;font-weight:750;}
        .checkbox-line{height:50px;border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:15px;padding:0 14px;display:flex!important;align-items:center;gap:10px!important;margin-top:22px;}
        .checkbox-line input{width:16px!important;height:16px!important;accent-color:var(--br30-primary);}
        .checkbox-line span{color:var(--br30-text);font-weight:650;}
        .strategy-submit{height:52px;border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);border-radius:16px;font-weight:760;cursor:pointer;margin-top:6px;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:.2s ease;}
        .strategy-submit:hover{transform:translateY(-1px);border-color:rgba(0,255,136,.5);}
        .strategy-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .preview-list{display:grid;gap:10px;}
        .preview-list div{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:15px;padding:13px;}
        .preview-list span{display:block;color:var(--br30-muted);font-size:12px;font-weight:650;margin-bottom:5px;}
        .preview-list strong{display:block;color:var(--br30-text);font-size:14px;font-weight:720;word-break:break-word;}
        .saved-list{display:grid;gap:10px;}
        .saved-card{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:15px;padding:13px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
        .saved-card strong{display:block;color:var(--br30-text);font-size:14px;font-weight:720;}
        .saved-card span{display:block;color:var(--br30-muted);font-size:12px;margin-top:4px;line-height:1.4;}
        .mini-actions{display:inline-flex;gap:7px;flex-shrink:0;}
        .mini-actions button{width:34px;height:34px;border:1px solid var(--br30-border);background:var(--br30-surface-2);color:var(--br30-text);border-radius:11px;cursor:pointer;display:grid;place-items:center;}
        .mini-actions button:hover{color:var(--br30-primary);border-color:rgba(0,255,136,.35);}
        .empty-text{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.6;}
        [data-theme="light"] .strategy-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .strategy-head-chip,[data-theme="light"] .section-head svg,[data-theme="light"] .strategy-section-title,[data-theme="light"] .strategy-submit,[data-theme="light"] .mini-actions button:hover{color:#a020f0;}
        [data-theme="light"] .strategy-submit,[data-theme="light"] .strategy-alert.success{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));}
        [data-theme="light"] .strategy-card,[data-theme="light"] .strategy-head-chip{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        [data-theme="light"] .strategy-submit{border-color:rgba(160,32,240,.28);}
        [data-theme="light"] .strategy-form input:focus,[data-theme="light"] .strategy-form select:focus,[data-theme="light"] .strategy-form textarea:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
        @media(max-width:1180px){.strategy-layout{grid-template-columns:1fr;}.strategy-side{position:static;grid-template-columns:1fr 1fr;}}
        @media(max-width:860px){.strategy-page{padding:24px 20px 34px;}.strategy-head{flex-direction:column;align-items:stretch;}.strategy-head-chip{justify-content:center;width:100%;}.strategy-side{grid-template-columns:1fr;}.form-grid.two,.form-grid.three{grid-template-columns:1fr;}.strategy-card{padding:20px;border-radius:20px;}.checkbox-line{margin-top:0;}}
        @media(max-width:560px){.strategy-page{padding:18px 14px 26px;}.strategy-head h1{font-size:26px;}.strategy-head p{font-size:14px;}.strategy-card{padding:16px;border-radius:18px;}.section-head h3{font-size:20px;}.section-head p{font-size:14px;}.strategy-form input,.strategy-form select{height:48px;}.strategy-submit{height:50px;}.saved-card{align-items:flex-start;}.mini-actions{margin-top:2px;}}
      `}</style>
    </>
  );
}
