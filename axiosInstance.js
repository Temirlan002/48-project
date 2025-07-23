import axios from "axios";
import { useAuthStore } from "./src/features/auth/model/useAuthStore";


export const API = axios.create({
  baseURL: 'http://34.30.198.185/api', 
  withCredentials: true
})


API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await API.post('/auth/refresh');
        const newToken = res.data.token.accessToken;
        useAuthStore.getState().setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest)
      } catch (err) {
        useAuthStore.getState().logout();
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

