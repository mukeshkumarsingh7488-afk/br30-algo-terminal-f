import API from "../services/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// ===============================
// Live Engine
// ===============================

export const getLiveStatus = async () => {
  const { data } = await API.get(API_ENDPOINTS.LIVE.STATUS);
  return data;
};

export const startLiveAlgo = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.LIVE.START, payload);
  return data;
};

export const stopLiveAlgo = async (sessionId) => {
  const { data } = await API.post(API_ENDPOINTS.LIVE.STOP, {
    sessionId,
  });

  return data;
};

// ===============================
// Orders & Positions
// ===============================

export const getLiveOrders = async () => {
  const { data } = await API.get(API_ENDPOINTS.LIVE.ORDERS);
  return data;
};

export const getLivePositions = async () => {
  const { data } = await API.get(API_ENDPOINTS.LIVE.POSITIONS);
  return data;
};

// ===============================
// Engine Refresh
// ===============================

export const refreshLiveStatus = async () => {
  const { data } = await API.get(API_ENDPOINTS.LIVE.STATUS);
  return data;
};

// ===============================
// Health Check
// ===============================

export const pingLiveEngine = async () => {
  const { data } = await API.get("/api/live/ping");
  return data;
};

// ===============================
// Emergency Stop
// ===============================

export const emergencyStop = async () => {
  const { data } = await API.post("/api/live/emergency-stop");
  return data;
};
