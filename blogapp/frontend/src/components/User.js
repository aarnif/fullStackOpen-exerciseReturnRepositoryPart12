import React from "react";
import { Ul, Li } from "../styles";

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <Ul>
        {user.blogs.map((blog) => (
          <Li key={blog.id}>{blog.title}</Li>
        ))}
      </Ul>
    </>
  );
};

export default User;
