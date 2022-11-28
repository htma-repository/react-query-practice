import React, { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import useHttp, { Todo } from "../../hooks/useHttp";

const InfiniteQueriesTodos = () => {
  const { requestHttp } = useHttp();

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
    queryFn: ({ pageParam = 0 }) => {
      // console.log({ pageParam });
      return requestHttp({
        method: "GET",
        url: `todo?_page=${pageParam}&_limit=2`,
      });
    },
    getNextPageParam: (lastPage, pages) => {
      // console.log(pages);
      console.log({ lastPage, pages });
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    refetchOnWindowFocus: false,
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
          {data.pages.map((group, index) => {
            return (
              <Fragment key={index}>
                {group.map((todo: Todo) => {
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
