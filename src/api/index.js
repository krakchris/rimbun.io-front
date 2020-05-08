import axios from "axios";
import config from "../config";
import endPoints from "./endPoints";

const callServer = url  => {
  const resourceURL = `${config.baseURLApi}/${url}`;
  return {
    getOne: ({ id }) => axios.get(`${resourceURL}/${id}`),
    get: ({ params = {} }, config = {}) =>
      axios.get(resourceURL, { params }, config),
    post: (data, config = {}) => axios.post(resourceURL, data, config),
    update: (toUpdate, config = {}) =>
      axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate, config),
    patch: ({ id }, toPatch, config = {}) =>
      axios.patch(`${resourceURL}/${id}`, toPatch, config),
    delete: ({ id }, config = {}) =>
      axios.delete(`${resourceURL}/${id}`, config)
  };
};

export default callServer;
export { endPoints };
