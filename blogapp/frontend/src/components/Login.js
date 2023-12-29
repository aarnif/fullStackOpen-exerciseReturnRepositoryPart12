import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  LoginHeader,
  Button,
  Label,
  Input,
  Loginform,
  Ul,
  Li,
} from "../styles";
import Notification from "./Notification";

const LoginForm = () => {
  const info = useSelector((state) => state.notification);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(username, password));
      dispatch(setNotification({ message: "welcome!", type: "info" }));
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: "error",
        })
      );
    }
  };

  return (
    <Loginform onSubmit={handleSubmit}>
      <Ul>
        <Li>
          <LoginHeader>log in to application</LoginHeader>
        </Li>
        <Li>
          <Notification info={info} />
        </Li>
      </Ul>
      <Ul>
        <Li>
          <Label>username</Label>
        </Li>
        <Li>
          <Input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Li>
      </Ul>
      <Ul>
        <Li>
          <Label>password </Label>
        </Li>
        <Li>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Li>
      </Ul>
      <Ul>
        <Li>
          <Button id="login-button" type="submit">
            login
          </Button>
        </Li>
      </Ul>
    </Loginform>
  );
};

export default LoginForm;
