import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;
export const makeRequest = axios.create({
  baseURL: apiUrl,
});

// Helper function to get cookie value by name
const getCookie = (name) => document.cookie.split(`; ${name}=`)?.[1]?.split(';')[0];

// Refresh Token function
export const refreshToken = async () => {
  try {
    const refreshToken = getCookie('refreshToken');
    console.log("refresh token",refreshToken);
    const { data } = await axios.post('https://api.studypulse.live/web/api/refresh-token',{ withCredentials: true });
    return data.token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw new Error("Failed to refresh token");
  }
};

// Request Interceptor to add Authorization header
makeRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = config.data instanceof FormData ? 'multipart/form-data' : 'application/json';
    return config;
  },
  Promise.reject
);

// Response Interceptor to handle token refresh on 401 Unauthorized
makeRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest, response } = error;
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return makeRequest(originalRequest);
      } catch {
        window.location.href = "/login"; // Redirect on failure
      }
    }
    return Promise.reject(error);
  }
);

export default makeRequest;




