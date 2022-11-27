import React, { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import axios, { AxiosResponse } from "axios";
interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
}

interface Todos {
  todo: Todo[];
}

const InfiniteQueriesTodos = () => {
  // const { requestHttp } = useHttp();

  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite-todos"],
    queryFn: async ({ pageParam = 0 }) => {
      // console.log({ pageParam });
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/todo?_page=${pageParam}`,
      });
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      // console.log(pages);
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
      // console.log({ lastPage, pages });
    },
  });

  let infiniteTodoContent;

  if (isLoading) {
    infiniteTodoContent = <p>Loading</p>;
  }

  if (isError && error instanceof Error) {
    infiniteTodoContent = <p>{error.message}</p>;
  }

  if (data?.pages) {
    infiniteTodoContent = (
      <>
        <ul>
          {data.pages.map((group: AxiosResponse<Todos>, index) => {
            return (
              <Fragment key={index}>
                {group.data.todo.map((todo) => {
                  return (
                    <li key={todo.id}>
                      {todo.id}: {todo.todo}
                    </li>
                  );
                })}
              </Fragment>
            );
          })}
        </ul>
        <button
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}
          className="btn-primary py-2 px-4 disabled:cursor-not-allowed"
        >
          Load More
        </button>
        {isFetching && !isFetchingNextPage ? <p>Fetching...</p> : null}
      </>
    );
  }

  return <section>{infiniteTodoContent}</section>;
};

export default InfiniteQueriesTodos;
