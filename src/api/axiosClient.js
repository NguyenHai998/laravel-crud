import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost/api/",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

//Interceptors

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("ERROR RESPONSE", error.response);
    const { config, status, data } = error.response;

    if (config.url === "/customers" && status === 400) {
      const errorList = data.message;
      // const firstError = errorList.length > 0 ? errorList[0] : {};
      const errorEmail = errorList.email;
      console.log(errorEmail);
      throw new Error(errorEmail);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
