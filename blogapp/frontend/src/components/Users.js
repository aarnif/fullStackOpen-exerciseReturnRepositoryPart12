import React from "react";
import { Link } from "react-router-dom";
import { Table, Tr, Th, Td } from "../styles";

const Users = ({ users }) => {
  const sortByNumberOfBlogs = users.sort(
    (a, b) => b.blogs.length - a.blogs.length
  );
  return (
    <>
      <h2>Users</h2>
      <Table>
        <thead>
          <Tr>
            <Th></Th>
            <Th>blogs created</Th>
          </Tr>
        </thead>
        <tbody>
          {sortByNumberOfBlogs.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </Td>
                <Td>{user.blogs.length}</Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
