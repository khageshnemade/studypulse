import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

// Create Axios instance
export const makeRequest = axios.create({
  baseURL: apiUrl,
});

// Refresh Token function
export const refreshToken = async () => {
  try {
    const { data } = await axios.post('http://localhost:5000/web/api/refresh-token', {}, { withCredentials: true });
    return data.token; // Assuming the server sends the new token in the response
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw new Error("Failed to refresh token");
  }
};

// Request Interceptor to add Authorization header
makeRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = config.data instanceof FormData ? 'multipart/form-data' : 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token refresh on 401 Unauthorized
makeRequest.interceptors.response.use(
  (response) => response, // If the response is successful, return it as is
  async (error) => {
    const { config: originalRequest, response } = error;

    // Check for a 401 Unauthorized error and ensure we haven't already retried this request
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call the refreshToken method to get a new token
        const newToken = await refreshToken(); // Assuming refreshToken method returns the new token

        // If refreshToken() is successful, update the Authorization header with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Update localStorage with the new token
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          storedUser.token = newToken; // Update the token in the stored user object
          localStorage.setItem('user', JSON.stringify(storedUser)); // Save the updated user object back to localStorage
        }

        // Retry the original request with the new token
        return makeRequest(originalRequest);
      } catch (err) {
        // If token refresh fails, handle it gracefully
        console.error('Token refresh failed:', err);

        // Instead of redirecting directly, consider using a navigation method that doesn't reload the page.
        window.location.replace("/login"); // This method will replace the current URL with the login page without causing a full page reload
      }
    }

    // If not a 401 error or refresh fails, reject the error
    return Promise.reject(error);
  }
);

export default makeRequest;
