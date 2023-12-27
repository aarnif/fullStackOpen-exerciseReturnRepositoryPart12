import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("Todo component displays right info", async () => {
  const todoInfo = {
    text: "Write code",
    done: true,
  };
  render(
    <Todo todo={todoInfo} onClickComplete={() => {}} onClickDelete={() => {}} />
  );
  screen.getByText(/Write code/);
  screen.getByText(/This todo is done/);
});
