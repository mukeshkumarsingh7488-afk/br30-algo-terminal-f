export const DEFAULT_BACKTEST_FORM = {
  strategyId: "",
  symbol: "",
  market: "nse_equity",
  timeframe: "5m",
  startDate: "",
  endDate: "",
  initialCapital: 100000,
  brokeragePerOrder: 20,
  slippagePercent: 0.05,
  quantity: 1,
};

export const BACKTEST_METRICS = [
  { key: "netProfit", label: "Net Profit", prefix: "₹" },
  { key: "totalTrades", label: "Total Trades" },
  { key: "winRate", label: "Win Rate", suffix: "%" },
  { key: "profitFactor", label: "Profit Factor" },
  { key: "maxDrawdown", label: "Max Drawdown", suffix: "%" },
  { key: "avgRR", label: "Avg R:R" },
];
