export const DEFAULT_LIVE_FORM = {
  strategyId: "",
  brokerAccountId: "",
  maxDailyLoss: 2,
  maxTrades: 5,
  confirmationChecked: false,
};

export const LIVE_STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  STOPPED: "stopped",
  BLOCKED: "blocked",
  PAUSED: "paused",
  ERROR: "error",
};

export const LIVE_SAFETY_RULES = ["A broker account must be connected.", "The strategy must be verified through paper trading or backtesting.", "A maximum daily loss limit must be configured.", "A maximum trade limit must be configured.", "Verify your broker session and authentication before market hours.", "Once the Trade Engine is started, it can place real orders through your connected broker account."];

export const LIVE_ENGINE_MODES = {
  PAPER: "paper",
  LIVE: "live",
};

export const LIVE_MARKET_STATUS = {
  PRE_OPEN: "pre_open",
  OPEN: "open",
  CLOSED: "closed",
  HOLIDAY: "holiday",
};

export const LIVE_RISK_PRESETS = [
  {
    id: "safe",
    name: "Safe",
    maxDailyLoss: 1,
    maxTrades: 3,
    description: "Low risk daily execution.",
  },
  {
    id: "balanced",
    name: "Balanced",
    maxDailyLoss: 2,
    maxTrades: 5,
    description: "Default BR30 recommended mode.",
  },
  {
    id: "aggressive",
    name: "Aggressive",
    maxDailyLoss: 3,
    maxTrades: 8,
    description: "High activity mode for experienced users.",
  },
];
