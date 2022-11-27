import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useHttp, { Todo, Data } from "../../hooks/useHttp";
import { PaginationContext } from "../../context/Context";

const TodoList = () => {
  // const [skipNum, setSkipNum] = useState<number>(0);
  const { requestHttp } = useHttp();
  const {
    paginate,
    nextPaginateValue,
    prevPaginateValue,
    firstPaginateValue,
    lastPaginateValue,
  } = useContext(PaginationContext);

  const {
    data: todos,
    isInitialLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["todos-data", paginate],
    queryFn: () => {
      return requestHttp({
        method: "GET",
        url: `?_page=${paginate}&_limit=2`,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
    onSuccess: (data) => {
      // console.table(data.data.todos);
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // const sortTodos = todos?.data.todos.sort((a: Todo, b: Todo) => b.id! - a.id!);

  // console.log(sortTodos);

  const prevTodoHandler = () => {
    if (paginate !== 0) {
      prevPaginateValue();
    }
  };

  const nextTodoHandler = () => {
    if (paginate !== 4) {
      nextPaginateValue();
    }
  };

  const firstTodoHandler = () => {
    firstPaginateValue();
  };

  const lastTodoHandler = () => {
    lastPaginateValue();
  };

  console.log(todos);

  return (
    <section className="mb-12 flex flex-col gap-y-5">
      {isInitialLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error instanceof Error ? error.message : null}</p>
      ) : (
        <>
          <ul className="flex flex-col gap-y-4">
            {todos.map((todo: Todo) => (
              <li
                key={todo.id}
                className={`${todo.isCompleted ? "text-green-600" : ""}`}
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
            paginate === 0 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={firstTodoHandler}
          disabled={paginate === 0}
        >
          First
        </button>
        <button
          className={`btn-primary w-fit rounded py-2 px-4 ${
            paginate === 0 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={prevTodoHandler}
          disabled={paginate === 0}
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
            paginate === 140 &&
            "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={lastTodoHandler}
          disabled={paginate === 140}
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
      {isFetching && <p>Refreshing...</p>}
    </section>
  );
};

export default TodoList;
