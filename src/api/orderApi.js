import API from "../services/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const startPaperTrading = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.PAPER.START, payload);
  return data;
};

export const stopPaperTrading = async (sessionId) => {
  const { data } = await API.post(API_ENDPOINTS.PAPER.STOP, { sessionId });
  return data;
};

export const getPaperStatus = async () => {
  const { data } = await API.get(API_ENDPOINTS.PAPER.STATUS);
  return data;
};

export const getPaperOrders = async () => {
  const { data } = await API.get(API_ENDPOINTS.PAPER.ORDERS);
  return data;
};

export const getPaperPositions = async () => {
  const { data } = await API.get(API_ENDPOINTS.PAPER.POSITIONS);
  return data;
};

export const getAllOrders = async () => {
  const { data } = await API.get(API_ENDPOINTS.ORDERS.LIST);
  return data;
};

export const getAllPositions = async () => {
  const { data } = await API.get(API_ENDPOINTS.ORDERS.POSITIONS);
  return data;
};

export const getOrdersSummary = async () => {
  const { data } = await API.get(API_ENDPOINTS.ORDERS.SUMMARY);
  return data;
};
