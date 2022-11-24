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
    queryFn: async (): Promise<Todo> => {
      const response = await requestHttp({
        method: "GET",
        url: `/${todoId}`,
      });
      return response.data;
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
    // initialData: () => {
    //   const todo = queryClient
    //     .getQueryData(["todos-data", "todo-detail"])
    //     ?.find((todo: any) => todo.id === todoId);

    //   return todo;
    // },
  });

  // console.log(isLoading);

  let todoDetailContent;

  if (isLoading) {
    todoDetailContent = <p>Loading...</p>;
  }
  if (isError) {
    todoDetailContent = <p>{error.message}</p>;
  }
  if (data) {
    todoDetailContent = (
      <p>
        {data?.id}: {data?.todo}
      </p>
    );
  }

  return <section className="mt-16">{todoDetailContent}</section>;
};

export default TodoDetails;
