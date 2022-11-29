import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useHttp, { Todo } from "../../hooks/useHttp";

const TodoList = () => {
  const { requestHttp } = useHttp();
  const queryClient = useQueryClient();

  const {
    data: todos,
    isInitialLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["todos-data"],
    queryFn: () => {
      return requestHttp({
        method: "GET",
        url: `todo`,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
    keepPreviousData: true,
  });

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

  return (
    <section className="mb-12 flex flex-col gap-y-5">
      {isInitialLoading ? (
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
