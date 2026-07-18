import API from "../services/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const runBacktest = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.BACKTEST.RUN, payload);
  return data;
};

export const getBacktestReports = async () => {
  const { data } = await API.get(API_ENDPOINTS.BACKTEST.REPORTS);
  return data;
};

export const getBacktestReportDetails = async (id) => {
  const { data } = await API.get(API_ENDPOINTS.BACKTEST.DETAILS(id));
  return data;
};
