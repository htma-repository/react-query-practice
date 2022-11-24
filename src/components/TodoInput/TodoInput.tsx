import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import useHttp, { Todo } from "../../hooks/useHttp";

const TodoInput = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const { requestHttp } = useHttp();

  const { data, isLoading, isError, error, mutate } = useMutation({
    mutationFn: (todoData: Todo) => {
      return requestHttp({
        method: "POST",
        url: "/add",
        data: todoData,
      });
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTodoInput(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todoData: Todo = {
      userId: 10,
      todo: todoInput,
      completed: false,
    };

    mutate(todoData);

    setTodoInput("");
  };

  console.log(data?.data);

  return (
    <section>
      {isLoading && <p>Send Todo...</p>}
      {isError && <p>{error.message}</p>}
      <form
        className="form-control m-auto flex w-full flex-col gap-y-4 md:w-1/2"
        onSubmit={onSubmitHandler}
      >
        <textarea
          className="textarea-bordered textarea h-24 rounded"
          placeholder="Bio"
          onChange={inputChangeHandler}
          value={todoInput}
        ></textarea>
        <button
          type="submit"
          className="btn-primary mx-auto w-1/2 rounded py-2"
        >
          Submit
        </button>
      </form>
    </section>
  );
};
export default TodoInput;
