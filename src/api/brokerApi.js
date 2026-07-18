import API from "../services/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getBrokerAccounts = async () => {
  const { data } = await API.get(API_ENDPOINTS.BROKER.ACCOUNTS);
  return data;
};

export const connectBroker = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.BROKER.CONNECT, payload);
  return data;
};

export const startBrokerLogin = async (broker) => {
  const { data } = await API.get(API_ENDPOINTS.BROKER.LOGIN(broker));
  return data;
};

export const disconnectBroker = async (brokerId) => {
  const { data } = await API.post(API_ENDPOINTS.BROKER.DISCONNECT, { brokerId });
  return data;
};
