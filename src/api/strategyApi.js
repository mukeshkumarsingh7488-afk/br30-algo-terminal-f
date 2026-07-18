import API from "../services/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const createStrategy = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.STRATEGY.CREATE, payload);
  return data;
};

export const getStrategies = async () => {
  const { data } = await API.get(API_ENDPOINTS.STRATEGY.LIST);
  return data;
};

export const updateStrategy = async (id, payload) => {
  const { data } = await API.put(API_ENDPOINTS.STRATEGY.UPDATE(id), payload);
  return data;
};

export const deleteStrategy = async (id) => {
  const { data } = await API.delete(API_ENDPOINTS.STRATEGY.DELETE(id));
  return data;
};
