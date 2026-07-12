import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 15000,
});


api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {

    if (error.code === "ECONNABORTED") {
      toast.error("Internet slow hai, please try again");
    }

    else if (!error.response) {
      toast.error("Network error. Check your internet connection");
    }

    else if (error.response.status >= 500) {
      toast.error("Server problem. Please try again later");
    }

    return Promise.reject(error);
  }
);


export default api;