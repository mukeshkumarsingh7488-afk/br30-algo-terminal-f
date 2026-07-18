import API from "../services/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const subscribeNewsletter = async (payload) => {
  const { data } = await API.post(API_ENDPOINTS.NEWSLETTER.SUBSCRIBE, payload);
  return data;
};
