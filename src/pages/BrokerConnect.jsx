import { useEffect, useMemo, useState } from "react";
import { Cable, CheckCircle2, Eye, EyeOff, KeyRound, Link2, Lock, PlugZap, Search, ShieldCheck, Star, Unplug } from "lucide-react";
import { BROKERS } from "../constants/brokers";
import { connectBroker, disconnectBroker, getBrokerAccounts, startBrokerLogin } from "../api/brokerApi";

export default function BrokerConnect() {
  const [accounts, setAccounts] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState("upstox");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    apiKey: "",
    apiSecret: "",
    clientId: "",
    redirectUrl: "",
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [disconnectingId, setDisconnectingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedBrokerData = useMemo(() => BROKERS.find((b) => b.id === selectedBroker), [selectedBroker]);

  const selectedAccount = useMemo(() => accounts.find((a) => a.broker === selectedBroker), [accounts, selectedBroker]);

  const filteredBrokers = useMemo(() => {
    return BROKERS.filter((broker) => `${broker.name} ${broker.description}`.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const getBrokerAccount = (brokerId) => {
    return accounts.find((account) => account.broker === brokerId);
  };

  const getStatusLabel = (brokerId) => {
    const account = getBrokerAccount(brokerId);

    if (!account) return "Not Connected";

    if (account.status === "connected") return "Connected";

    if (account.status === "expired") return "Expired";

    if (account.status === "error") return "Error";

    return "Saved";
  };

  const getStatusClass = (brokerId) => {
    const account = getBrokerAccount(brokerId);

    if (!account) return "idle";

    if (account.status === "connected") return "connected";

    if (account.status === "expired") return "expired";

    if (account.status === "error") return "error";

    return "saved";
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Not available";
    }
  };

  const fetchAccounts = async () => {
    try {
      setLoadingAccounts(true);
      const res = await getBrokerAccounts();
      setAccounts(res?.accounts || res?.brokers || []);
    } catch {
      setAccounts([]);
    } finally {
      setLoadingAccounts(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAccounts();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForm({
        apiKey: "",
        apiSecret: "",
        clientId: "",
        redirectUrl: "",
      });

      setShowApiKey(false);
      setShowApiSecret(false);
      setMessage("");
      setError("");
    }, 0);

    return () => clearTimeout(timer);
  }, [selectedBroker]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setMessage("");
  };

  const validateForm = () => {
    const fields = selectedBrokerData?.fields || {};

    if (!selectedBroker) {
      return "Please select broker.";
    }

    if (fields.apiKey && !form.apiKey.trim()) {
      return "API Key required.";
    }

    if (fields.apiSecret && !form.apiSecret.trim()) {
      return "API Secret required hai.";
    }

    if (fields.clientId && !form.clientId.trim()) {
      return "Client ID required hai.";
    }

    if (fields.redirectUrl && !form.redirectUrl.trim()) {
      return "Redirect URL required hai.";
    }

    return "";
  };

  const handleConnect = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const fields = selectedBrokerData?.fields || {};

    const payload = {
      broker: selectedBroker,
      authType: selectedBrokerData?.authType || "manual",
    };

    if (fields.apiKey) payload.apiKey = form.apiKey.trim();
    if (fields.apiSecret) payload.apiSecret = form.apiSecret.trim();
    if (fields.clientId) payload.clientId = form.clientId.trim();
    if (fields.redirectUrl) payload.redirectUrl = form.redirectUrl.trim();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await connectBroker(payload);

      setMessage(res?.message || `${selectedBrokerData?.name || "Broker"} credentials saved successfully.`);

      setForm({
        apiKey: "",
        apiSecret: "",
        clientId: "",
        redirectUrl: "",
      });

      setShowApiKey(false);
      setShowApiSecret(false);

      await fetchAccounts();

      if (selectedBrokerData?.authType === "oauth") {
        const loginRes = await startBrokerLogin(selectedBroker);

        if (loginRes?.loginUrl) {
          window.location.href = loginRes.loginUrl;
          return;
        }
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Broker save/connect failed. Details check karo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (account) => {
    try {
      const accountId = account?._id || account?.broker;

      if (!accountId) return;

      setDisconnectingId(accountId);
      setError("");
      setMessage("");

      const res = await disconnectBroker(accountId);

      setMessage(res?.message || "Broker disconnected successfully.");
      await fetchAccounts();
    } catch (err) {
      setError(err?.response?.data?.message || "Broker disconnect failed.");
    } finally {
      setDisconnectingId("");
    }
  };

  const renderSecretInput = ({ label, name, icon, placeholder, show, onToggle }) => {
    return (
      <label>
        {label}

        <div className="input-wrap">
          {icon}

          <input name={name} type={show ? "text" : "password"} placeholder={placeholder} value={form[name]} onChange={handleChange} autoComplete="off" />

          <button type="button" className="eye-btn" onClick={onToggle}>
            {show ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        </div>
      </label>
    );
  };

  return (
    <>
      <div className="broker-page">
        <div className="broker-head">
          <div>
            <h1>Broker Connect</h1>
            <p>Connect once, then turn on Trade Engine daily before market open.</p>
          </div>

          <div className="broker-head-chip">
            <ShieldCheck size={18} strokeWidth={2} />
            <span>Encrypted Backend Storage</span>
          </div>
        </div>

        <section className="broker-grid">
          <div className="broker-card-box">
            <div className="section-head">
              <div>
                <h3>Available Brokers</h3>
                <p>Select broker for one-time setup.</p>
              </div>
              <Cable size={22} strokeWidth={2} />
            </div>

            <div className="broker-search">
              <Search size={18} strokeWidth={2} />
              <input type="text" placeholder="Search broker..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="broker-list">
              {filteredBrokers.map((broker) => {
                const account = getBrokerAccount(broker.id);
                const statusClass = getStatusClass(broker.id);

                return (
                  <button key={broker.id} type="button" className={selectedBroker === broker.id ? "broker-item active" : "broker-item"} onClick={() => setSelectedBroker(broker.id)}>
                    <span className="broker-icon">
                      <PlugZap size={18} strokeWidth={2} />
                    </span>

                    <span className="broker-info">
                      <strong>{broker.name}</strong>
                      <small>{broker.description}</small>
                    </span>

                    <em className={`status-pill ${statusClass}`}>
                      {account?.isDefault && <Star size={12} strokeWidth={2.4} />}
                      {getStatusLabel(broker.id)}
                    </em>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="broker-card-box">
            <div className="section-head">
              <div>
                <h3>API Credentials</h3>
                <p>Save your broker credentials to enable secure authentication and live Trade Engine access.</p>
              </div>
              <Lock size={22} strokeWidth={2} />
            </div>

            {selectedBrokerData && (
              <div className="selected-box">
                <div className="broker-icon">
                  <PlugZap size={18} strokeWidth={2} />
                </div>

                <div>
                  <strong>{selectedBrokerData.name}</strong>
                  <span>{selectedBrokerData.description}</span>

                  <div className="mini-tags">
                    <small>{selectedBrokerData.authType === "oauth" ? "OAuth Flow" : "Manual Token Flow"}</small>
                    <small>Paper + Live Ready</small>
                  </div>
                </div>
              </div>
            )}

            {selectedAccount && (
              <div className={`broker-alert ${selectedAccount.status === "connected" ? "success" : "saved"}`}>
                {selectedBrokerData?.name} already saved
                {selectedAccount.status === "connected" ? " and connected." : ". Update credentials if needed."}
              </div>
            )}

            {error && <div className="broker-alert error">{error}</div>}
            {message && <div className="broker-alert success">{message}</div>}

            <form className="broker-form" onSubmit={handleConnect}>
              <label>
                Broker
                <select value={selectedBroker} onChange={(e) => setSelectedBroker(e.target.value)}>
                  {BROKERS.map((broker) => (
                    <option key={broker.id} value={broker.id}>
                      {broker.name}
                    </option>
                  ))}
                </select>
              </label>

              {selectedBrokerData?.fields?.apiKey &&
                renderSecretInput({
                  label: "API Key",
                  name: "apiKey",
                  icon: <KeyRound size={18} strokeWidth={2} />,
                  placeholder: "Enter broker API key",
                  show: showApiKey,
                  onToggle: () => setShowApiKey((v) => !v),
                })}

              {selectedBrokerData?.fields?.apiSecret &&
                renderSecretInput({
                  label: "API Secret",
                  name: "apiSecret",
                  icon: <Lock size={18} strokeWidth={2} />,
                  placeholder: "Enter broker API secret",
                  show: showApiSecret,
                  onToggle: () => setShowApiSecret((v) => !v),
                })}

              {selectedBrokerData?.fields?.clientId && (
                <label>
                  Client ID
                  <div className="input-wrap">
                    <ShieldCheck size={18} strokeWidth={2} />
                    <input name="clientId" type="text" placeholder="Enter broker client ID" value={form.clientId} onChange={handleChange} autoComplete="off" />
                  </div>
                </label>
              )}

              {selectedBrokerData?.fields?.redirectUrl && (
                <label>
                  Redirect URL
                  <div className="input-wrap">
                    <Link2 size={18} strokeWidth={2} />
                    <input name="redirectUrl" type="url" placeholder="https://your-domain.com/broker/callback" value={form.redirectUrl} onChange={handleChange} autoComplete="off" />
                  </div>
                </label>
              )}

              <button className="broker-submit" type="submit" disabled={loading}>
                {loading ? "Saving..." : selectedAccount ? "Update Credentials" : selectedBrokerData?.authType === "oauth" ? "Save & Connect Broker" : "Save Broker"}
              </button>
            </form>
          </div>
        </section>

        <section className="broker-card-box connected-box">
          <div className="section-head">
            <div>
              <h3>Connected Accounts</h3>
              <p>Securely connected broker accounts ready for live Trade Engine execution.</p>
            </div>
            <ShieldCheck size={22} strokeWidth={2} />
          </div>

          {loadingAccounts ? (
            <p className="empty-text">Loading broker accounts...</p>
          ) : accounts.length ? (
            <div className="account-list">
              {accounts.map((account) => {
                const brokerData = BROKERS.find((b) => b.id === account.broker);
                const accountId = account._id || account.broker;
                const status = account.status || "saved";

                return (
                  <div key={accountId} className="account-row">
                    <div className="account-main">
                      <div className="account-title">
                        <strong>{brokerData?.name || account.broker}</strong>

                        <span className={`account-badge ${status}`}>
                          {status === "connected" ? <CheckCircle2 size={14} strokeWidth={2.4} /> : <PlugZap size={14} strokeWidth={2.4} />}
                          {status}
                        </span>

                        {account.isDefault && (
                          <span className="account-badge default">
                            <Star size={14} strokeWidth={2.4} />
                            Default
                          </span>
                        )}
                      </div>

                      <div className="account-meta">
                        <span>
                          Client ID: <b>{account.clientId || account.accountId || "Hidden"}</b>
                        </span>

                        <span>
                          Account: <b>{account.accountName || account.email || "Not fetched yet"}</b>
                        </span>

                        <span>
                          Last Connected: <b>{formatDate(account.lastConnectedAt)}</b>
                        </span>
                      </div>
                    </div>

                    <div className="account-actions">
                      <button type="button" className="mini-action" onClick={() => setSelectedBroker(account.broker)}>
                        Update
                      </button>

                      <button type="button" className="mini-action danger" disabled={disconnectingId === accountId} onClick={() => handleDisconnect(account)}>
                        <Unplug size={15} strokeWidth={2.3} />
                        {disconnectingId === accountId ? "..." : "Disconnect"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="empty-text">No broker account connected yet.</p>
          )}
        </section>
      </div>

      <style>{`
        .broker-page{width:100%;min-height:calc(100vh - 68px);padding:34px 34px 44px;background:radial-gradient(circle at top center,rgba(0,255,136,.065),transparent 42%),var(--br30-bg);}
        .broker-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:24px;}
        .broker-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);line-height:1.1;font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .broker-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;font-weight:450;}
        .broker-head-chip{min-height:42px;border:1px solid var(--br30-border);background:var(--br30-card);color:var(--br30-primary);border-radius:999px;padding:0 15px;display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:650;white-space:nowrap;box-shadow:var(--br30-shadow);}
        .broker-grid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(360px,1.05fr);gap:18px;margin-bottom:18px;}
        .broker-card-box{border:1px solid var(--br30-border);background:var(--br30-card);box-shadow:var(--br30-shadow);border-radius:22px;padding:24px;color:var(--br30-text);}
        .section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px;}
        .section-head h3{margin:0 0 6px;font-size:22px;font-weight:750;letter-spacing:-.03em;color:var(--br30-text);}
        .section-head p{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.55;font-weight:450;}
        .section-head svg{color:var(--br30-primary);flex-shrink:0;}
        .broker-search{height:48px;border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:16px;padding:0 14px;display:flex;align-items:center;gap:10px;margin-bottom:14px;color:var(--br30-muted);}
        .broker-search input{width:100%;border:0;outline:0;background:transparent;color:var(--br30-text);font-size:15px;}
        .broker-search input::placeholder{color:var(--br30-muted);}
        .broker-list{display:grid;gap:10px;max-height:560px;overflow:auto;padding-right:2px;}
        .broker-list::-webkit-scrollbar{width:6px;}
        .broker-list::-webkit-scrollbar-thumb{background:var(--br30-primary-soft);border-radius:999px;}
        .broker-item{width:100%;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:17px;padding:14px;display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:12px;align-items:center;text-align:left;cursor:pointer;transition:.2s ease;}
        .broker-item:hover,.broker-item.active{border-color:rgba(0,255,136,.34);background:var(--br30-primary-soft);}
        .broker-icon{width:44px;height:44px;border-radius:15px;display:grid;place-items:center;background:var(--br30-primary-soft);color:var(--br30-primary);flex-shrink:0;}
        .broker-info{min-width:0;}
        .broker-info strong{display:block;font-size:15px;font-weight:720;color:var(--br30-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .broker-info small{display:block;color:var(--br30-muted);font-size:13px;line-height:1.35;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .broker-item em{font-style:normal;font-size:12px;font-weight:720;border:1px solid var(--br30-border);background:var(--br30-card);border-radius:999px;padding:6px 9px;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;}
        .status-pill.connected{color:var(--br30-primary);}
        .status-pill.saved{color:#fbbf24;}
        .status-pill.expired{color:#fb923c;}
        .status-pill.error{color:#ff8c8e;}
        .status-pill.idle{color:var(--br30-muted);}
        .selected-box{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:18px;padding:14px;display:flex;align-items:flex-start;gap:12px;margin-bottom:16px;}
        .selected-box strong{display:block;font-size:15px;font-weight:720;color:var(--br30-text);}
        .selected-box span{display:block;color:var(--br30-muted);font-size:13px;margin-top:4px;line-height:1.4;}
        .mini-tags{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px;}
        .mini-tags small{display:inline-flex;align-items:center;border:1px solid var(--br30-border);border-radius:999px;padding:5px 8px;background:var(--br30-card);color:var(--br30-primary);font-size:11px;font-weight:720;}
        .broker-alert{border-radius:15px;padding:12px 14px;font-size:14px;font-weight:650;margin-bottom:14px;line-height:1.45;}
        .broker-alert.error{border:1px solid rgba(239,68,68,.28);background:rgba(239,68,68,.08);color:#dc2626;}
        .broker-alert.success{border:1px solid rgba(59,130,246,.28);background:rgba(59,130,246,.08);color:#2563eb;}
        .broker-alert.saved{border:1px solid rgba(245,158,11,.28);background:rgba(245,158,11,.08);color:#d97706;}
        .broker-form{display:grid;gap:14px;}
        .broker-form label{display:grid;gap:8px;color:var(--br30-text);font-size:14px;font-weight:650;}
        .broker-form select,.input-wrap{height:50px;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:15px;outline:0;}
        .broker-form select{width:100%;padding:0 14px;}
        .input-wrap{display:flex;align-items:center;gap:10px;padding:0 14px;color:var(--br30-muted);}
        .input-wrap input{width:100%;border:0;outline:0;background:transparent;color:var(--br30-text);font-size:15px;}
        .input-wrap input::placeholder{color:var(--br30-muted);}
        .eye-btn{border:0;background:transparent;color:var(--br30-muted);display:grid;place-items:center;cursor:pointer;padding:0;transition:.2s ease;}
        .eye-btn:hover{color:var(--br30-primary);}
        .broker-form select:focus,.input-wrap:focus-within,.broker-search:focus-within{border-color:var(--br30-primary);box-shadow:0 0 0 4px var(--br30-primary-soft);}
        .broker-submit{height:52px;border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);border-radius:16px;font-weight:760;cursor:pointer;margin-top:4px;transition:.2s ease;}
        .broker-submit:hover{transform:translateY(-1px);border-color:rgba(0,255,136,.5);}
        .broker-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .connected-box{margin-top:0;}
        .empty-text{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.6;}
        .account-list{display:grid;gap:12px;}
        .account-row{border:1px solid var(--br30-border);background:var(--br30-surface);border-radius:18px;padding:16px;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;}
        .account-main{min-width:0;display:grid;gap:10px;}
        .account-title{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
        .account-title strong{display:block;color:var(--br30-text);font-size:16px;font-weight:760;text-transform:capitalize;}
        .account-badge{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--br30-border);background:var(--br30-card);border-radius:999px;padding:5px 8px;font-size:12px;font-weight:760;text-transform:capitalize;color:var(--br30-muted);}
        .account-badge.connected{color:var(--br30-primary);background:var(--br30-primary-soft);border-color:rgba(0,255,136,.32);}
        .account-badge.saved{color:#fbbf24;background:rgba(251,191,36,.08);border-color:rgba(251,191,36,.28);}
        .account-badge.expired{color:#fb923c;background:rgba(251,146,60,.08);border-color:rgba(251,146,60,.28);}
        .account-badge.error{color:#ff8c8e;background:rgba(255,77,79,.08);border-color:rgba(255,77,79,.28);}
        .account-badge.default{color:var(--br30-primary);background:var(--br30-primary-soft);border-color:rgba(0,255,136,.32);}
        .account-meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;color:var(--br30-muted);font-size:13px;line-height:1.45;}
        .account-meta span{border:1px solid var(--br30-border);background:var(--br30-card);border-radius:999px;padding:6px 9px;}
        .account-meta b{color:var(--br30-text);font-weight:720;}
        .account-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end;flex-shrink:0;}
        .mini-action{min-height:36px;border:1px solid var(--br30-border);background:var(--br30-card);color:var(--br30-text);border-radius:999px;padding:0 12px;font-size:13px;font-weight:760;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:.2s ease;}
        .mini-action:hover{border-color:rgba(0,255,136,.38);color:var(--br30-primary);background:var(--br30-primary-soft);}
        .mini-action.danger{color:#ff8c8e;}
        .mini-action.danger:hover{border-color:rgba(255,77,79,.35);background:rgba(255,77,79,.08);}
        .mini-action:disabled{opacity:.6;cursor:not-allowed;}
        [data-theme="light"] .broker-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .broker-head-chip,[data-theme="light"] .section-head svg,[data-theme="light"] .broker-icon,[data-theme="light"] .broker-submit{color:#a020f0;}
        [data-theme="light"] .broker-icon,[data-theme="light"] .broker-submit,[data-theme="light"] .broker-item:hover,[data-theme="light"] .broker-item.active,[data-theme="light"] .account-badge.connected,[data-theme="light"] .account-badge.default,[data-theme="light"] .mini-action:hover{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));}
        [data-theme="light"] .broker-alert.success{background:rgba(59,130,246,.10)!important;border:1px solid rgba(59,130,246,.25)!important;color:#2563eb!important;}
        [data-theme="light"] .broker-card-box,[data-theme="light"] .broker-head-chip{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        [data-theme="light"] .broker-item:hover,[data-theme="light"] .broker-item.active,[data-theme="light"] .broker-submit{border-color:rgba(160,32,240,.28);}
        [data-theme="light"] .broker-form select:focus,[data-theme="light"] .input-wrap:focus-within,[data-theme="light"] .broker-search:focus-within{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
        [data-theme="light"] .status-pill.connected,[data-theme="light"] .account-badge.connected,[data-theme="light"] .account-badge.default,[data-theme="light"] .eye-btn:hover,[data-theme="light"] .mini-tags small,[data-theme="light"] .mini-action:hover{color:#a020f0;}
        @media(max-width:1180px){.broker-grid{grid-template-columns:1fr;}.broker-list{max-height:none;}}
        @media(max-width:820px){.broker-page{padding:24px 20px 34px;}.broker-head{flex-direction:column;align-items:stretch;}.broker-head-chip{justify-content:center;width:100%;}.broker-card-box{padding:20px;border-radius:20px;}.section-head h3{font-size:21px;}.account-row{flex-direction:column;}.account-actions{justify-content:flex-start;}}
        @media(max-width:560px){.broker-page{padding:18px 14px 26px;}.broker-head h1{font-size:26px;}.broker-head p{font-size:14px;}.broker-card-box{padding:16px;border-radius:18px;}.section-head{margin-bottom:14px;}.section-head h3{font-size:20px;}.section-head p{font-size:14px;}.broker-item{grid-template-columns:42px minmax(0,1fr);}.broker-item em{grid-column:2/3;width:max-content;margin-top:-2px;}.broker-icon{width:42px;height:42px;border-radius:14px;}.broker-form select,.input-wrap{height:48px;}.broker-submit{height:50px;}.account-meta{display:grid;gap:8px;width:100%;}.account-meta span{border-radius:13px;}.account-actions{width:100%;}.mini-action{flex:1;justify-content:center;}}
      `}</style>
    </>
  );
}
