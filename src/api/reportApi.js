import API from "../services/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getReportSummary = async () => {
  const { data } = await API.get(API_ENDPOINTS.REPORTS.SUMMARY);
  return data;
};

export const getEquityCurve = async () => {
  const { data } = await API.get(API_ENDPOINTS.REPORTS.EQUITY_CURVE);
  return data;
};

export const getTradeHistory = async () => {
  const { data } = await API.get(API_ENDPOINTS.REPORTS.TRADE_HISTORY);
  return data;
};

export const getStrategyPerformance = async () => {
  const { data } = await API.get(API_ENDPOINTS.REPORTS.STRATEGY_PERFORMANCE);
  return data;
};
