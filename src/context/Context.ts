import React, { createContext } from "react";

export const PaginationContext = createContext({
  paginate: 0,
  nextPaginateValue: () => {},
  prevPaginateValue: () => {},
  firstPaginateValue: () => {},
  lastPaginateValue: (last: number) => {},
});
