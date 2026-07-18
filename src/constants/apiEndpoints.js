export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    VERIFY_REGISTER_OTP: "/api/auth/verify-register-otp",
    ME: "/api/auth/me",
    LOGOUT: "/api/auth/logout",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD_OTP: "/api/auth/reset-password-otp",
  },

  NEWSLETTER: {
    SUBSCRIBE: "/api/newsletter/subscribe",
  },

  BROKER: {
    CONNECT: "/api/broker/connect",
    ACCOUNTS: "/api/broker/accounts",
    DISCONNECT: "/api/broker/disconnect",
    STATUS: "/api/broker/status",
    DEFAULT: "/api/broker/default",
    LOGIN: (broker) => `/api/broker/login/${broker}`,
    REFRESH: (brokerId) => `/api/broker/refresh/${brokerId}`,
  },

  STRATEGY: {
    CREATE: "/api/strategy/create",
    LIST: "/api/strategy",
    DETAILS: (id) => `/api/strategy/${id}`,
    UPDATE: (id) => `/api/strategy/${id}`,
    DELETE: (id) => `/api/strategy/${id}`,
  },

  BACKTEST: {
    RUN: "/api/backtest/run",
    REPORTS: "/api/backtest/reports",
    DETAILS: (id) => `/api/backtest/reports/${id}`,
  },

  PAPER: {
    START: "/api/paper/start",
    STOP: "/api/paper/stop",
    STATUS: "/api/paper/status",
    ORDERS: "/api/paper/orders",
    POSITIONS: "/api/paper/positions",
  },

  LIVE: {
    START: "/api/live/start",
    STOP: "/api/live/stop",
    STATUS: "/api/live/status",
    ORDERS: "/api/live/orders",
    POSITIONS: "/api/live/positions",
  },

  ORDERS: {
    LIST: "/api/orders",
    DETAILS: (id) => `/api/orders/${id}`,
    POSITIONS: "/api/orders/positions",
    SUMMARY: "/api/orders/summary",
  },

  RISK: {
    GET: "/api/risk",
    UPDATE: "/api/risk/update",
  },

  REPORTS: {
    SUMMARY: "/api/reports/summary",
    EQUITY_CURVE: "/api/reports/equity-curve",
    TRADE_HISTORY: "/api/reports/trades",
    STRATEGY_PERFORMANCE: "/api/reports/strategy-performance",
  },
};
