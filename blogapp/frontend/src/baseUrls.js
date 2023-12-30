const baseUrl = process.env.REACT_APP_BASE_URL;

const blogsUrl = `${baseUrl}/api/blogs`;
const usersUrl = `${baseUrl}/api/users`;
const loginUrl = `${baseUrl}/api/login`;

export default {
  blogs: blogsUrl,
  users: usersUrl,
  login: loginUrl,
};
