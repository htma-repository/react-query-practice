import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useHttp from "../../hooks/useHttp";

const TodoDetails = () => {
  const { todoId } = useParams<string>();
  const { requestHttp } = useHttp();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todo-detail", todoId],
    queryFn: () => {
      return requestHttp({
        method: "GET",
        url: `/${todoId}`,
      });
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });

  console.log(isLoading);

  let todoDetailContent;

  if (isLoading) {
    todoDetailContent = <p>Loading...</p>;
  }
  if (isError) {
    todoDetailContent = <p>{error.message}</p>;
  }
  if (data?.data) {
    todoDetailContent = (
      <p>
        {data?.data.id}: {data?.data.todo}
      </p>
    );
  }

  return <section className="mt-16">{todoDetailContent}</section>;
};

export default TodoDetails;
