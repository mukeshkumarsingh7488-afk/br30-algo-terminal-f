export const MARKET_TYPES = [
  { value: "nse_equity", label: "NSE Equity" },
  { value: "nse_futures", label: "NSE Futures" },
  { value: "nse_options", label: "NSE Options" },
  { value: "crypto", label: "Crypto" },
  { value: "forex", label: "Forex" },
  { value: "commodity", label: "Commodity" },
];

export const TIMEFRAMES = [
  { value: "1m", label: "1 Minute" },
  { value: "3m", label: "3 Minutes" },
  { value: "5m", label: "5 Minutes" },
  { value: "15m", label: "15 Minutes" },
  { value: "30m", label: "30 Minutes" },
  { value: "1h", label: "1 Hour" },
  { value: "1d", label: "1 Day" },
];

export const ENTRY_RULES = [
  { value: "ema_crossover", label: "EMA Crossover" },
  { value: "supertrend_buy", label: "Supertrend Buy/Sell" },
  { value: "rsi_breakout", label: "RSI Breakout" },
  { value: "macd_crossover", label: "MACD Crossover" },
  { value: "orb_breakout", label: "ORB Breakout" },
  { value: "vwap_pullback", label: "VWAP Pullback" },
  { value: "volume_breakout", label: "Volume Breakout" },
  { value: "price_breakout", label: "Price Breakout" },
];

export const EXIT_RULES = [
  { value: "fixed_rr", label: "Fixed Risk Reward" },
  { value: "fixed_points", label: "Fixed Points" },
  { value: "trailing_sl", label: "Trailing Stop Loss" },
  { value: "indicator_reverse", label: "Indicator Reverse" },
  { value: "time_exit", label: "Time Based Exit" },
  { value: "eod_exit", label: "End Of Day Exit" },
];

export const ORDER_TYPES = [
  { value: "market", label: "Market Order" },
  { value: "limit", label: "Limit Order" },
];

export const PRODUCT_TYPES = [
  { value: "intraday", label: "Intraday" },
  { value: "delivery", label: "Delivery" },
];

export const STRATEGY_MODES = [
  { value: "paper", label: "Paper Trading" },
  { value: "live", label: "Live Trading" },
  { value: "backtest", label: "Backtest" },
];

export const DEFAULT_STRATEGY_FORM = {
  name: "",
  description: "",
  market: "nse_equity",
  symbol: "",
  timeframe: "5m",
  mode: "paper",

  entryRule: "ema_crossover",
  exitRule: "fixed_rr",

  fastEma: 9,
  slowEma: 15,
  rsiPeriod: 14,
  rsiLevel: 60,
  supertrendPeriod: 10,
  supertrendMultiplier: 3,

  orderType: "market",
  productType: "intraday",
  quantity: 1,

  riskPerTrade: 1,
  stopLossType: "percent",
  stopLossValue: 1,
  targetType: "rr",
  targetValue: 2,
  trailingEnabled: false,
  trailingValue: 0.5,

  maxTradesPerDay: 5,
  maxDailyLoss: 2,
  startTime: "09:20",
  endTime: "15:10",
  isActive: false,
};
