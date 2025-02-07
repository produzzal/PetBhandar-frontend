import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: "http://localhost:5000/api", // Ensure HTTPS is used here
  withCredentials: true, // Ensures cookies are sent with the request
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // You can log headers for debugging purposes:
});

export default nexiosInstance;
