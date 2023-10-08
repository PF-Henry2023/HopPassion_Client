import axios from "axios";

const HopPassionClient = axios.create({
  baseURL: "https://hoppassionserver-production.up.railway.app",
});

//otra forma mas corta seria:
//axios.defaults.BaseURL = "https://hoppassionserver-production.up.railway.app";

HopPassionClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HopPassionClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // handle logout logic
    }
    return Promise.reject(error);
  }
);

export default HopPassionClient;
