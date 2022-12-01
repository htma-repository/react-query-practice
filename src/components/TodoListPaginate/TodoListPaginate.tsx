import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useHttp, { Todo } from "../../hooks/useHttp";
import { PaginationContext } from "../../context/Context";

const TodoListPaginate = () => {
  const { requestHttp } = useHttp();
  const queryClient = useQueryClient();

  const {
    paginate,
    nextPaginateValue,
    prevPaginateValue,
    firstPaginateValue,
    lastPaginateValue,
  } = useContext(PaginationContext);

  const {
    data: todos,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["todos-data", paginate],
    queryFn: () => {
      return requestHttp({
        method: "GET",
        url: `todo?_page=${paginate}&_limit=4`,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
    keepPreviousData: true,
  });

  const prevTodoHandler = () => {
    if (paginate !== 0) {
      prevPaginateValue();
    }
  };

  const nextTodoHandler = () => {
    if (paginate !== 5) {
      nextPaginateValue();
    }
  };

  const firstTodoHandler = () => {
    firstPaginateValue();
  };

  const lastTodoHandler = () => {
    lastPaginateValue(5);
  };

  const {
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    mutate,
  } = useMutation({
    mutationFn: (id: number) => {
      return requestHttp({
        method: "DELETE",
        url: `todo/${id}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos-data"]);
    },
  });

  const todoDeleteHandler = (id: number) => {
    mutate(id);
  };

  const todoEditHandler = (todo: string) => {};

  console.log(todos);

  return (
    <section className="mb-12 flex flex-col gap-y-5">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error instanceof Error ? error.message : null}</p>
      ) : (
        <>
          <ul className="flex flex-col gap-y-4">
            {todos?.data.map((todo: Todo) => (
              <li
                key={todo.id}
                className={`flex items-center gap-x-4 ${
                  todo.isCompleted ? "text-green-600" : ""
                }`}
              >
                <Link to={`/${todo.id}`}>
                  {todo.id}: {todo.todo}
                </Link>
                <button
                  className="btn-error rounded py-2 px-4"
                  onClick={todoDeleteHandler.bind(null, todo.id!)}
                >
                  delete
                </button>
                {isDeleteLoading && <p>Deleting...</p>}
                {isDeleteError && <p>Delete failed</p>}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="flex flex-row gap-x-4">
        <button
          className={`btn-primary w-fit rounded py-2 px-4 ${
            paginate === 1 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={firstTodoHandler}
          disabled={paginate === 1}
        >
          First
        </button>
        <button
          className={`btn-primary w-fit rounded py-2 px-4 ${
            paginate === 1 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={prevTodoHandler}
          disabled={paginate === 1}
        >
          Prev Todo
        </button>
        <button
          className={`btn-primary w-fit rounded py-2 px-4 ${
            paginate === 5 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={nextTodoHandler}
          disabled={paginate === 5}
        >
          Next Todo
        </button>
        <button
          className={`btn-primary w-fit rounded py-2 px-4 ${
            paginate === 5 && "disabled:cursor-not-allowed disabled:opacity-70"
          }`}
          onClick={lastTodoHandler}
          disabled={paginate === 5}
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

export default TodoListPaginate;
