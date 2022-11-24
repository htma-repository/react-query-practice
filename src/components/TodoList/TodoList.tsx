import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useHttp, { Todo } from "../../hooks/useHttp";

const TodoList = () => {
  const [skipNum, setSkipNum] = useState<number>(0);
  const { requestHttp } = useHttp();

  const {
    data: todos,
    isInitialLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["todos-data", skipNum],
    queryFn: () => {
      return requestHttp({
        method: "GET",
        url: `?limit=10&skip=${skipNum}`,
      });
    },
    onError: (err: { message: string }) => {
      console.error(err.message);
    },
    onSuccess: (data) => {
      console.table(data.data.todos);
    },
    refetchOnWindowFocus: false,
  });

  const prevTodoHandler = () => {
    if (skipNum !== 0) {
      setSkipNum((prevState) => prevState - 10);
    }
  };

  const nextTodoHandler = () => {
    if (skipNum !== 140) {
      setSkipNum((prevState) => prevState + 10);
    }
  };

  const firstTodoHandler = () => {
    setSkipNum(0);
  };

  const lastTodoHandler = () => {
    setSkipNum(140);
  };

  console.log(todos?.data.todos);

  return (
    <section className="mb-12 flex flex-col gap-y-5">
      {isInitialLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <>
          {isFetching && <p>Refreshing...</p>}
          <ul className="flex flex-col gap-y-4">
            {todos?.data.todos.map((todo: Todo) => (
              <li
                key={todo.id}
                className={`${todo.completed ? "text-green-600" : ""}`}
              >
                <Link to={`/${todo.id}`}>
                  {todo.id}: {todo.todo}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="flex flex-row gap-x-4">
        <button
          className={`btn-primary w-fit rounded py-2 px-4 ${
            skipNum === 0 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={firstTodoHandler}
          disabled={skipNum === 0}
        >
          First
        </button>
        <button
          className={`btn-primary w-fit rounded py-2 px-4 ${
            skipNum === 0 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={prevTodoHandler}
          disabled={skipNum === 0}
        >
          Prev Todo
        </button>
        <button
          className="btn-primary w-fit rounded py-2 px-4"
          onClick={nextTodoHandler}
        >
          Next Todo
        </button>
        <button
          className={`btn-primary w-fit rounded py-2 px-4 ${
            skipNum === 140 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={lastTodoHandler}
          disabled={skipNum === 140}
        >
          Last
        </button>
      </div>
      <button
        className="btn-primary w-fit rounded py-2 px-4"
        onClick={() => refetch()}
      >
        Refetch
      </button>
    </section>
  );
};

export default TodoList;
