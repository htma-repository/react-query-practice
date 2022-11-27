import React, { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useHttp, { Todo, Data } from "../../hooks/useHttp";
import { PaginationContext } from "../../context/Context";

interface NewData {
  data: Data;
  status: number;
  statusText: string;
}

const TodoInput = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const { requestHttp } = useHttp();
  const { paginate } = useContext(PaginationContext);

  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading, isError, error, mutate } = useMutation({
    mutationFn: (todoData: Todo) => {
      return requestHttp({
        method: "POST",
        url: "/",
        data: todoData,
      });
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["todos-data"],
      // });
      queryClient.setQueryData(
        ["todos-data", paginate],
        (oldQueryData: any) => {
          console.log(oldQueryData);
          // return {
          //   ...oldQueryData,
          //   data: [...oldQueryData.data, data.data],
          // };
        }
      );
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
      todo: todoInput,
      isCompleted: false,
    };

    mutate(todoData);

    setTodoInput("");
  };

  // console.log(data?.data);

  return (
    <section>
      {isLoading && <p>Send Todo...</p>}
      {isSuccess && <p>Add Todo Successfully</p>}
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
