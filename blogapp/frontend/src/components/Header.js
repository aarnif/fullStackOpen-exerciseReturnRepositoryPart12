import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HeaderDiv, MenuHeader, Navmenu, NavmenuItem, Button } from "../styles";
import { logoutUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const Header = ({ user }) => {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(logoutUser());
    dispatch(setNotification({ message: "logged out", type: "info" }));
  };

  return (
    <HeaderDiv>
      <MenuHeader>blog app</MenuHeader>
      <Navmenu>
        <NavmenuItem>
          <Link to="/blogs">blogs</Link>
        </NavmenuItem>
        <NavmenuItem>
          <Link to="/users">users</Link>
        </NavmenuItem>
        <NavmenuItem>
          {user.name} <i>logged in</i>
        </NavmenuItem>
        <NavmenuItem>
          <Button onClick={logout}>logout</Button>
        </NavmenuItem>
      </Navmenu>
    </HeaderDiv>
  );
};

export default Header;
