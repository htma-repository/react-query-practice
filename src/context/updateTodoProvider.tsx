import React, { useState } from "react";

const updateTodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todoInput, setTodoInput] = useState<string>("");

  // const todoInputHandler = (todoData: string) => {
  //   setTodoInput((prevState) => ({ ...prevState, todo: todoData }));
  // };
  console.log({ todoInput });

  const value = {
    todo: todoInput,
    setTodoInput,
  };

  return <></>;
};

export default updateTodoProvider;
