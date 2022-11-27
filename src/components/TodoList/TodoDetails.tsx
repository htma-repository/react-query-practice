import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Todo } from "../../hooks/useHttp";

import useHttp from "../../hooks/useHttp";

interface TodoData {
  data: Todo;
}

const TodoDetails = () => {
  const { todoId } = useParams<string>();
  const { requestHttp } = useHttp();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todo-detail", todoId],
    queryFn: () => {
      const response = requestHttp({
        method: "GET",
        url: `/${todoId}`,
      });
      return response;
    },
    // initialData: () => {
    //   const todo = queryClient.getQueryData(["todos-data"]);

    //   console.log(todo);

    //   return { data: todo };
    // },
  });

  // console.log(data);

  let todoDetailContent;

  if (isLoading) {
    todoDetailContent = <p>Loading...</p>;
  }
  if (isError && error instanceof Error) {
    todoDetailContent = <p>{error.message}</p>;
  }
  if (data) {
    todoDetailContent = (
      <p>
        {data?.data.id}: {data?.data.todo}
      </p>
    );
  }

  return <section className="mt-16">{todoDetailContent}</section>;
};

export default TodoDetails;
