import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Todo } from "../../hooks/useHttp";

import useHttp from "../../hooks/useHttp";
import { PaginationContext } from "../../context/Context";

// interface TodoData {
//   data: Todo;
// }

const TodoDetails = () => {
  const { todoId } = useParams<string>();
  const { requestHttp } = useHttp();
  const { paginate } = useContext(PaginationContext);

  const queryClient = useQueryClient();

  const {
    data: todoDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "todo-detail",
      typeof todoId === "string" ? Number(todoId) : null,
    ],
    queryFn: () => {
      return requestHttp({
        method: "GET",
        url: `todo/${todoId}`,
      });
    },
    // initialData: () => {
    //   const todo: Todo[] | undefined = queryClient.getQueryData([
    //     "todos-data",
    //     paginate,
    //   ]);

    //   const initTodo = todo?.find((todo) => todo.id === todoId);

    //   if (initTodo) {
    //     return initTodo;
    //   } else {
    //     return undefined;
    //   }
    // },
  });

  let todoDetailContent;

  if (isLoading) {
    todoDetailContent = <p>Loading...</p>;
  }
  if (isError && error instanceof Error) {
    todoDetailContent = <p>{error.message}</p>;
  }
  if (todoDetail) {
    todoDetailContent = (
      <p>
        {todoDetail.id}: {todoDetail.todo}
      </p>
    );
  }

  return <section className="mt-16">{todoDetailContent}</section>;
};

export default TodoDetails;
