import DomainKeys from "../constants/Domain-key";
import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = `http://${DomainKeys.DOMAIN}/api/auth/login`;
    return axiosClient.post(url, data);
  },
};

export default userApi;
