import axiosClient from "./axiosClient";

const customersApi = {
  getAll() {
    const url = "/customers";
    return axiosClient.get(url);
  },

  get(id) {
    const url = `/customers/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/customers";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/customers/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/customers/${id}`;
    return axiosClient.delete(url);
  },
};

export default customersApi;
