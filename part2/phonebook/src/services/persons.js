import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (objectId) => {
  const request = axios.delete(`${baseUrl}/${objectId}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log('=== error persons.js [19] ===', error);
    });
};

const update = (objectId, newObject) => {
    const request = axios.put(`${baseUrl}/${objectId}`, newObject);
    return request.then(response => response.data)
};

export default { getAll, create, remove, update };
