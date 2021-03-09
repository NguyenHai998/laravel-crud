import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "http://localhost/api/auth/login";
    return axiosClient.post(url, data);
  },
};

export default userApi;
