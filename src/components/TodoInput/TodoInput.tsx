import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useHttp, { Todo, Data } from "../../hooks/useHttp";

interface NewData {
  data: Data;
  status: number;
  statusText: string;
}

const TodoInput = () => {
  const [todoInput, setTodoInput] = useState<string>("");

  const { requestHttp } = useHttp();

  const queryClient = useQueryClient();

  const { isSuccess, isLoading, isError, error, mutate } = useMutation({
    mutationFn: (todoData: Todo) => {
      return requestHttp({
        method: "POST",
        url: "todo",
        data: todoData,
      });
    },
    // onSuccess: (data) => {
    //
    // * Query Invalidation Start
    // queryClient.invalidateQueries({ queryKey: ["todos-data"] });
    // * Query Invalidation End
    //
    //
    // * Handling Mutation Response Start
    // queryClient.setQueryData(["todos-data"], (oldQueryData: any) => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data],
    //   };
    //  });
    // * Handling Mutation Response End
    // },
    //
    //
    // * Optimistic Update Start
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos-data"] });
      const previousTodoData = queryClient.getQueryData(["todos-data"]);
      queryClient.setQueryData(["todos-data"], (oldQueryData: any) => {
        console.log(oldQueryData);
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, newTodo],
        };
      });
      return { previousTodoData };
    },
    onError: (error, _newTodo, context) => {
      queryClient.setQueryData(["todos-data"], context?.previousTodoData);
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos-data"] });
    },
    // * Optimistic Update End
  });

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTodoInput(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      todo: todoInput,
      isCompleted: false,
    };

    mutate(newTodo);

    setTodoInput("");
  };

  return (
    <section>
      {isLoading && <p>Send Todo...</p>}
      {isSuccess && <p>Add Todo Successfully</p>}
      {isError && <p>{error instanceof Error ? error.message : null}</p>}
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
