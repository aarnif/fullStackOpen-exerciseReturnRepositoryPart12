import { useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import { Routes, Route, useMatch, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./reducers/userReducer";
import { inialitizeBlogs } from "./reducers/blogsReducer";
import { inialitizeUsers } from "./reducers/usersReducer";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import Header from "./components/Header";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogs = [...useSelector((state) => state.blogs)];
  const users = [...useSelector((state) => state.users)];
  const info = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const matchUser = useMatch("/users/:id");
  const findUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const findBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(inialitizeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(inialitizeUsers());
  }, [dispatch]);

  if (!user) {
    return (
      <>
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <Header user={user} />
      <Notification info={info} />
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />}></Route>
        <Route path="/blogs" element={<Blogs blogs={blogs} />}></Route>
        <Route path="/blogs/:id" element={<Blog blog={findBlog} />}></Route>
        <Route path="/users" element={<Users users={users} />}></Route>
        <Route path="/users/:id" element={<User user={findUser} />}></Route>
      </Routes>
    </>
  );
};

export default App;
