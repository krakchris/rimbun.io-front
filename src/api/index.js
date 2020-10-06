import axios from "axios";
import endPoints from "./endPoints";

const axiosMethods = resourceURL => {
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

const callServer = url  => {
  const baseURLApi = process.env.REACT_APP_BASE_URL_API;
  const resourceURL = `${baseURLApi}/${url}`;
  return axiosMethods(resourceURL);
};

const awsApi = url => {
  const baseURLApiAws = process.env.REACT_APP_BASE_URL_AWS_API;
  const resourceURL = `${baseURLApiAws}/${url}`;
  return axiosMethods(resourceURL);
};

export default callServer;
export { endPoints, awsApi };
