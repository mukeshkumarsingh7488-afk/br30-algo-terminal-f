import { useEffect, useMemo, useState } from "react";
import { Activity, ClipboardList, Filter, RefreshCcw, Search, TrendingDown, TrendingUp } from "lucide-react";

import { getAllOrders, getAllPositions, getOrdersSummary } from "../api/orderApi";

const DEFAULT_FILTERS = {
  search: "",
  mode: "all",
  status: "all",
  side: "all",
};

const normalizeText = (value) => String(value || "").toLowerCase();

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadOrdersData = async () => {
    const [ordersRes, positionsRes, summaryRes] = await Promise.all([getAllOrders(), getAllPositions(), getOrdersSummary()]);

    setOrders(ordersRes?.orders || []);
    setPositions(positionsRes?.positions || []);
    setSummary(summaryRes?.summary || null);
  };

  useEffect(() => {
    const initOrdersData = async () => {
      try {
        setLoading(true);

        const [ordersRes, positionsRes, summaryRes] = await Promise.all([getAllOrders(), getAllPositions(), getOrdersSummary()]);

        setOrders(ordersRes?.orders || []);
        setPositions(positionsRes?.positions || []);
        setSummary(summaryRes?.summary || null);
      } catch {
        setOrders([]);
        setPositions([]);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    initOrdersData();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      setMessage("");
      await loadOrdersData();
      setMessage("Orders and positions refreshed.");
    } catch {
      setError("Orders refresh nahi ho paya.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = normalizeText(filters.search);
      const symbol = normalizeText(order.symbol);
      const strategyName = normalizeText(order.strategyName);
      const orderId = normalizeText(order.orderId || order._id);

      const searchMatch = !query || symbol.includes(query) || strategyName.includes(query) || orderId.includes(query);
      const modeMatch = filters.mode === "all" || normalizeText(order.mode) === filters.mode;
      const statusMatch = filters.status === "all" || normalizeText(order.status) === filters.status;
      const sideMatch = filters.side === "all" || normalizeText(order.side) === filters.side;

      return searchMatch && modeMatch && statusMatch && sideMatch;
    });
  }, [orders, filters]);

  const totalPnL = summary?.totalPnL ?? summary?.pnl ?? 0;
  const openPositions = summary?.openPositions ?? positions.length;
  const totalOrders = summary?.totalOrders ?? orders.length;
  const filledOrders = summary?.filledOrders ?? orders.filter((order) => normalizeText(order.status) === "filled").length;

  return (
    <>
      <div className="orders-page">
        <div className="orders-head">
          <div>
            <h1>Orders & Positions</h1>
            <p>Monitor paper and live order flow, active positions and execution status.</p>
          </div>

          <button type="button" className="orders-refresh" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCcw size={18} strokeWidth={2} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && <div className="orders-alert error">{error}</div>}
        {message && <div className="orders-alert success">{message}</div>}

        <section className="orders-summary">
          <div className="orders-card stat-card">
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>

          <div className="orders-card stat-card">
            <span>Filled Orders</span>
            <strong>{filledOrders}</strong>
          </div>

          <div className="orders-card stat-card">
            <span>Open Positions</span>
            <strong>{openPositions}</strong>
          </div>

          <div className="orders-card stat-card">
            <span>Total P&L</span>
            <strong className={Number(totalPnL) >= 0 ? "pnl-positive" : "pnl-negative"}>₹{totalPnL}</strong>
          </div>
        </section>

        <section className="orders-card filter-card">
          <div className="section-head">
            <div>
              <h3>Order Filters</h3>
              <p>Search and filter execution history.</p>
            </div>
            <Filter size={22} strokeWidth={2} />
          </div>

          <div className="filter-grid">
            <label className="search-field">
              <Search size={17} strokeWidth={2} />
              <input name="search" type="text" placeholder="Search symbol, strategy or order id" value={filters.search} onChange={handleFilterChange} />
            </label>

            <label>
              Mode
              <select name="mode" value={filters.mode} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="paper">Paper</option>
                <option value="live">Live</option>
              </select>
            </label>

            <label>
              Status
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="filled">Filled</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>

            <label>
              Side
              <select name="side" value={filters.side} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </label>
          </div>
        </section>
        <section className="orders-layout">
          <div className="orders-card">
            <div className="section-head">
              <div>
                <h3>Positions</h3>
                <p>Active paper/live positions.</p>
              </div>
              <Activity size={22} strokeWidth={2} />
            </div>

            {loading ? (
              <p className="empty-text">Loading positions...</p>
            ) : positions.length ? (
              <div className="table-wrap">
                <table className="terminal-table">
                  <thead>
                    <tr>
                      <th>Mode</th>
                      <th>Symbol</th>
                      <th>Side</th>
                      <th>Qty</th>
                      <th>Avg</th>
                      <th>LTP</th>
                      <th>P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position, index) => (
                      <tr key={position._id || `${position.symbol}-${index}`}>
                        <td>{position.mode || "-"}</td>
                        <td>{position.symbol || "-"}</td>
                        <td>
                          <span className={normalizeText(position.side) === "buy" ? "side-buy" : "side-sell"}>
                            {normalizeText(position.side) === "buy" ? <TrendingUp size={14} strokeWidth={2} /> : <TrendingDown size={14} strokeWidth={2} />}
                            {position.side || "-"}
                          </span>
                        </td>
                        <td>{position.quantity || "-"}</td>
                        <td>{position.avgPrice || "-"}</td>
                        <td>{position.ltp || "-"}</td>
                        <td className={Number(position.pnl || 0) >= 0 ? "pnl-positive" : "pnl-negative"}>{position.pnl ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-text">No open positions found.</p>
            )}
          </div>

          <div className="orders-card">
            <div className="section-head">
              <div>
                <h3>Orders</h3>
                <p>Filtered execution history.</p>
              </div>
              <ClipboardList size={22} strokeWidth={2} />
            </div>

            {loading ? (
              <p className="empty-text">Loading orders...</p>
            ) : filteredOrders.length ? (
              <div className="table-wrap">
                <table className="terminal-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Mode</th>
                      <th>Symbol</th>
                      <th>Side</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={order._id || `${order.symbol}-${index}`}>
                        <td>{order.time || order.createdAt || "-"}</td>
                        <td>{order.mode || "-"}</td>
                        <td>{order.symbol || "-"}</td>
                        <td>
                          <span className={normalizeText(order.side) === "buy" ? "side-buy" : "side-sell"}>
                            {normalizeText(order.side) === "buy" ? <TrendingUp size={14} strokeWidth={2} /> : <TrendingDown size={14} strokeWidth={2} />}
                            {order.side || "-"}
                          </span>
                        </td>
                        <td>{order.quantity || "-"}</td>
                        <td>{order.price || "-"}</td>
                        <td>
                          <span className={`status-pill status-${normalizeText(order.status) || "unknown"}`}>{order.status || "-"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-text">No orders found.</p>
            )}
          </div>
        </section>
      </div>

      <style>{`
        .orders-page{width:100%;min-height:calc(100vh - 68px);padding:34px;background:radial-gradient(circle at top center,rgba(0,255,136,.06),transparent 42%),var(--br30-bg);}
        .orders-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:24px;}
        .orders-head h1{margin:0 0 8px;font-size:clamp(28px,3vw,38px);font-weight:750;letter-spacing:-.035em;color:var(--br30-text);}
        .orders-head p{margin:0;color:var(--br30-muted);font-size:clamp(14px,1.25vw,17px);line-height:1.55;}
        .orders-refresh{height:42px;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:999px;padding:0 16px;display:inline-flex;align-items:center;gap:8px;font-weight:700;cursor:pointer;}
        .orders-refresh:disabled{opacity:.55;cursor:not-allowed;}
        .orders-alert{border-radius:15px;padding:12px 14px;font-size:14px;font-weight:650;line-height:1.45;margin-bottom:14px;}
        .orders-alert.error{border:1px solid rgba(255,77,79,.35);background:rgba(255,77,79,.08);color:#ff8c8e;}
        .orders-alert.success{border:1px solid rgba(0,255,136,.32);background:var(--br30-primary-soft);color:var(--br30-primary);}
        .orders-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-bottom:18px;}
        .orders-card{border:1px solid var(--br30-border);background:var(--br30-card);box-shadow:var(--br30-shadow);border-radius:22px;padding:24px;color:var(--br30-text);}
        .stat-card span{display:block;color:var(--br30-muted);font-size:14px;font-weight:650;margin-bottom:8px;}
        .stat-card strong{display:block;color:var(--br30-text);font-size:28px;font-weight:750;letter-spacing:-.025em;}
        .pnl-positive{color:var(--br30-primary)!important;}
        .pnl-negative{color:#ff8c8e!important;}
        .section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px;}
        .section-head h3{margin:0 0 6px;font-size:22px;font-weight:750;letter-spacing:-.03em;color:var(--br30-text);}
        .section-head p{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.55;}
        .section-head svg{color:var(--br30-primary);flex-shrink:0;}
        .filter-card{margin-bottom:18px;}
        .filter-grid{display:grid;grid-template-columns:minmax(260px,1fr) 170px 170px 150px;gap:14px;align-items:end;}
        .filter-grid label{display:grid;gap:8px;color:var(--br30-text);font-size:14px;font-weight:650;}
        .filter-grid input,.filter-grid select{width:100%;height:48px;border:1px solid var(--br30-border);background:var(--br30-surface);color:var(--br30-text);border-radius:15px;padding:0 14px;outline:0;}
        .filter-grid input:focus,.filter-grid select:focus{border-color:var(--br30-primary);box-shadow:0 0 0 4px var(--br30-primary-soft);}
        .search-field{position:relative;}
        .search-field svg{position:absolute;left:14px;bottom:15px;color:var(--br30-muted);}
        .search-field input{padding-left:42px;}
        .orders-layout{display:grid;grid-template-columns:1fr 1.2fr;gap:18px;}
        .side-buy,.side-sell{display:inline-flex;align-items:center;gap:5px;font-weight:750;text-transform:capitalize;}
        .side-buy{color:var(--br30-primary);}
        .side-sell{color:#ff8c8e;}
        .status-pill{display:inline-flex;align-items:center;padding:5px 10px;border-radius:999px;font-size:12px;font-weight:750;background:var(--br30-surface-2);border:1px solid var(--br30-border);text-transform:capitalize;}
        .status-filled{color:var(--br30-primary);border-color:rgba(0,255,136,.3);background:var(--br30-primary-soft);}
        .status-pending{color:#ffb020;border-color:rgba(255,176,32,.3);background:rgba(255,176,32,.08);}
        .status-rejected,.status-cancelled{color:#ff8c8e;border-color:rgba(255,77,79,.3);background:rgba(255,77,79,.08);}
        .table-wrap{width:100%;overflow:auto;border:1px solid var(--br30-border);border-radius:16px;}
        .terminal-table{width:100%;border-collapse:collapse;min-width:720px;background:var(--br30-surface);color:var(--br30-text);}
        .terminal-table th,.terminal-table td{padding:13px 14px;text-align:left;border-bottom:1px solid var(--br30-border);font-size:14px;white-space:nowrap;}
        .terminal-table th{color:var(--br30-muted);font-weight:750;background:var(--br30-surface-2);}
        .terminal-table td{color:var(--br30-text);font-weight:550;}
        .terminal-table tr:last-child td{border-bottom:0;}
        .empty-text{margin:0;color:var(--br30-muted);font-size:15px;line-height:1.6;}
        [data-theme="light"] .orders-page{background:radial-gradient(circle at top center,rgba(176,32,240,.085),transparent 42%),#fbf8ff;}
        [data-theme="light"] .section-head svg,[data-theme="light"] .pnl-positive,[data-theme="light"] .side-buy,[data-theme="light"] .status-filled{color:#a020f0!important;}
        [data-theme="light"] .orders-alert.success,[data-theme="light"] .status-filled{background:linear-gradient(135deg,rgba(255,43,214,.15),rgba(123,44,255,.15));border-color:rgba(160,32,240,.28);}
        [data-theme="light"] .orders-card{border-color:rgba(160,32,240,.14);box-shadow:0 18px 45px rgba(160,32,240,.075);}
        [data-theme="light"] .filter-grid input:focus,[data-theme="light"] .filter-grid select:focus{border-color:#a020f0;box-shadow:0 0 0 4px rgba(160,32,240,.12);}
        [data-theme="light"] .orders-refresh{color:#101014;background:#ffffff;}
        [data-theme="dark"] .orders-refresh{color:#ffffff;}
        @media(max-width:1180px){.orders-summary{grid-template-columns:repeat(2,minmax(0,1fr));}.orders-layout{grid-template-columns:1fr;}.filter-grid{grid-template-columns:1fr 1fr;}}
        @media(max-width:860px){.orders-page{padding:22px;}.orders-head{flex-direction:column;align-items:stretch;}.orders-refresh{justify-content:center;width:100%;}.filter-grid{grid-template-columns:1fr;}.orders-card{padding:20px;border-radius:20px;}}
        @media(max-width:560px){.orders-page{padding:16px;}.orders-head h1{font-size:26px;}.orders-card{padding:16px;border-radius:18px;}.orders-summary{grid-template-columns:1fr;}.section-head h3{font-size:20px;}.terminal-table{min-width:650px;}}
      `}</style>
    </>
  );
}
