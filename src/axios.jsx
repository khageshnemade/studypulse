import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;
 
export const makeRequest = axios.create({
  baseURL:apiUrl,
  
});
 
// Add a request interceptor
makeRequest.interceptors.request.use(
  config => {
    const user = localStorage.getItem("user");
    const token = JSON.parse(user)?.token;
 
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    if (config.data instanceof FormData) {
 
      config.headers['Content-Type'] = 'multipart/form-data';
 
    } else {
 
      config.headers['Content-Type'] = 'application/json';
 
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);