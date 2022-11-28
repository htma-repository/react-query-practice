import React, { useState } from "react";
import { UpdateTodoContext } from "./Context";
import { Todo } from "../hooks/useHttp";

type Props = {
  children: React.ReactNode;
};

const updateTodoProvider = ({ children }: Props) => {
  const [todoInput, setTodoInput] = useState<Todo>({
    todo: "",
    isCompleted: false,
  });

  const todoInputHandler = (todoData: string) => {
    setTodoInput((prevState) => ({ ...prevState, todo: todoData }));
  };

  const value = {
    todo: todoInput,
    setTodoInput,
    todoInputHandler,
  };

  return (
    <UpdateTodoContext.Provider value={value}>
      {children}
    </UpdateTodoContext.Provider>
  );
};

export default updateTodoProvider;
