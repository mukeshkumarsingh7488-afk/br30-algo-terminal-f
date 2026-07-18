export const BROKERS = [
  {
    id: "upstox",
    name: "Upstox",
    status: "available",
    description: "Connect Upstox account for live algo execution.",

    authType: "oauth",
    supportsPaper: true,
    supportsLive: true,

    fields: {
      apiKey: true,
      apiSecret: true,
      clientId: true,
      redirectUrl: false,
    },
  },

  {
    id: "zerodha",
    name: "Zerodha Kite",
    status: "available",
    description: "Kite Connect support for Indian market algo trading.",

    authType: "oauth",
    supportsPaper: true,
    supportsLive: true,

    fields: {
      apiKey: true,
      apiSecret: true,
      clientId: false,
      redirectUrl: false,
    },
  },

  {
    id: "dhan",
    name: "Dhan",
    status: "available",
    description: "Dhan broker API integration for fast execution.",

    authType: "manual",
    supportsPaper: true,
    supportsLive: true,

    fields: {
      apiKey: false,
      apiSecret: false,
      clientId: true,
      redirectUrl: false,
    },
  },

  {
    id: "angelone",
    name: "Angel One",
    status: "available",
    description: "SmartAPI based trading account connection.",

    authType: "manual",

    supportsPaper: true,
    supportsLive: true,

    fields: {
      apiKey: true,
      apiSecret: true,
      clientId: true,
      redirectUrl: false,
    },
  },

  {
    id: "fyers",
    name: "Fyers",
    status: "available",
    description: "Fyers API support for algo execution.",

    authType: "oauth",

    supportsPaper: true,
    supportsLive: true,

    fields: {
      apiKey: true,
      apiSecret: true,
      clientId: false,
      redirectUrl: false,
    },
  },
];
