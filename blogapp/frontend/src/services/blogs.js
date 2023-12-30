import axios from "axios";
import storageService from "../services/storage";
import baseUrls from "../baseUrls";

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

const getAll = async () => {
  const request = await axios.get(baseUrls.blogs);
  return request.data;
};

const create = async (object) => {
  const request = await axios.post(baseUrls.blogs, object, { headers });
  return request.data;
};

const update = async (object) => {
  const request = await axios.put(`${baseUrls.blogs}/${object.id}`, object, {
    headers,
  });
  return request.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrls.blogs}/${id}`, { headers });
};

const addComment = async (id, object) => {
  const request = await axios.post(`${baseUrls.blogs}/${id}/comments`, object);
  return request.data;
};

export default { getAll, create, update, remove, addComment };
