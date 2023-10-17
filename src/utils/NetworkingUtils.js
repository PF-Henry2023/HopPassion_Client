import axios from "axios";
import { logout } from "../redux/actions/actions";
import store from "../redux/store/store";
import { navigate } from "./NavigationUtils";

const HopPassionClient = axios.create({
<<<<<<< HEAD
<<<<<<< HEAD
  baseURL: "http://localhost:3001",
=======
  baseURL: "http://localhost:3001/"
>>>>>>> userReviews
=======
  baseURL: "http://localhost:3001",
>>>>>>> d23955b286fea72e05cacf2e95e9b16097c47516
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
      navigate("/");
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default HopPassionClient;
