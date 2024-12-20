//src\services\notes.js
import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

//READ
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

//CREATE
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

//UPDATE
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  // getAll: getAll,
  getAll,
  create,
  update,
};
