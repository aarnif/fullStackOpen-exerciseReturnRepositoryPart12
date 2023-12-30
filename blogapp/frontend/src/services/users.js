import axios from "axios";
import baseUrls from "../baseUrls";

const getAll = async () => {
  const request = await axios.get(baseUrls.users);
  return request.data;
};

export default { getAll };
