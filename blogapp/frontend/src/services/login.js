import axios from "axios";
import baseUrls from "../baseUrls";

const login = async (credentials) => {
  const response = await axios.post(baseUrls.login, credentials);
  return response.data;
};

export default { login };
