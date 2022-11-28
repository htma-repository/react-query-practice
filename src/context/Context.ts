import React, { createContext } from "react";
import { Todo } from "../hooks/useHttp";

export const PaginationContext = createContext({
  paginate: 0,
  nextPaginateValue: () => {},
  prevPaginateValue: () => {},
  firstPaginateValue: () => {},
  lastPaginateValue: (last: number) => {},
});

export const UpdateTodoContext = createContext({
  todo: {
    todo: "",
    isCompleted: false,
  },
  setTodoInput: (todo: Todo) => {},
  todoInputHandler: (todoData: string) => {},
});
