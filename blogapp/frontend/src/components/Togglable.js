import { useState, useImperativeHandle, forwardRef } from "react";
import { Button, Container } from "../styles";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Container>
      <Container style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Container>
      <Container style={showWhenVisible}>{props.children}</Container>
    </Container>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
