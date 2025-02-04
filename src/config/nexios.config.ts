import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: "http://localhost:5000/api", // Ensure HTTPS is used here
  withCredentials: true, // Ensures cookies are sent with the request
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
nexiosInstance.interceptors.request.use(
  (config) => {
    // No need to manually extract the token as it's automatically sent with the request
    console.log("Request sent with credentials (cookies)"); // Confirming the credentials will be sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default nexiosInstance;
