import axios from "axios";

// Your API base URL
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const makeRequest = axios.create({
  baseURL: apiUrl,
});





const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`); // Parsing the cookie value
  if (parts.length === 2) return parts.pop().split(';').shift();
}
 
// Refresh Token Function
export const refreshToken = async () => {
  try {
    const refreshToken = getCookie('refreshToken'); // Retrieve from cookie
 
    // Request to refresh the access token
    const response = await axios.post('https://api.studypulse.live/web/api/refresh-token', {
      refreshToken,
    }, {
      withCredentials: true, // Ensure cookies are sent with the request
    });
 
    const newAccessToken = response.data.token; // Extract new token
    console.log("Response in RefreshToken: ", response);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw new Error("Failed to refresh token");
  }
};
 


// Add a request interceptor to add the Authorization header
makeRequest.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to catch expired tokens and refresh them
makeRequest.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration (401 Unauthorized)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop

      try {
        // Try refreshing the token
        const newToken = await refreshToken();

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return makeRequest(originalRequest); // Retry the original request
      } catch (refreshError) {
        // If refreshing the token fails, handle the logout or session expiration
        console.error("Token refresh failed", refreshError);
        window.location.href = "/login"; // Redirect to login page or handle accordingly
      }
    }

    // If the error is not due to token expiration, reject the promise
    return Promise.reject(error);
  }
);

export default makeRequest;



