import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useHttp, { Todo, Data } from "../../hooks/useHttp";
import { PaginationContext, UpdateTodoContext } from "../../context/Context";

interface NewData {
  data: Data;
  status: number;
  statusText: string;
}

const TodoInput = () => {
  // const [todoInput, setTodoInput] = useState<string>("");
  const { todo, todoInputHandler, setTodoInput } =
    useContext(UpdateTodoContext);
  const { requestHttp } = useHttp();
  const { paginate } = useContext(PaginationContext);

  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading, isError, error, mutate } = useMutation({
    mutationFn: (todoData: Todo) => {
      return requestHttp({
        method: "POST",
        url: "todo",
        data: todoData,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["todos-data"],
      });
      // queryClient.setQueryData(["todos-data"], (oldQueryData: any) => {
      //   console.log(oldQueryData);
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData, data],
      //   };
      // });
    },
  });

  // console.log(data);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    todoInputHandler(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const todoData: Todo = {
    //   todo: todoInput,
    //   isCompleted: false,
    // };

    mutate(todo);

    setTodoInput({
      todo: "",
      isCompleted: false,
    });
  };

  // console.log(data?.data);

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
          value={todo.todo}
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
