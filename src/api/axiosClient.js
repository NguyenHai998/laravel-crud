import axios from "axios";
import DomainKeys from "../constants/Domain-key";

const axiosClient = axios.create({
  baseURL: `http://${DomainKeys.DOMAIN}/api/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "X-Requested-With": "XMLHttpRequest",
  },
});
//Interceptors

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("ERROR RESPONSE", error.response);
    const { status, data } = error.response;

    if (status === 400) {
      const errorList = data.message;
      const errorEmail = errorList.email;
      console.log(errorEmail);
      throw new Error(errorEmail);
    }

    if (status === 401 && data.message === "Unauthenticated.") {
      console.log("Coi Loi roi 401 token het han");
      axiosClient
        .post("auth/refresh-token", {
          refresh_token: localStorage.getItem("refresh_token"),
        })
        .then(function (response) {
          localStorage.setItem("access_token", response.access_token);
          window.location.reload();
        })
        .catch(function (response) {
          if (status === 401 && data.message === "Unauthenticated.") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.reload();
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
