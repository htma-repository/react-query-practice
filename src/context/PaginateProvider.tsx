import React, { useState } from "react";
import { PaginationContext } from "./Context";

interface Props {
  children: React.ReactNode;
}

const PaginateProvider = ({ children }: Props) => {
  const [paginate, setPaginate] = useState<number>(1);

  const nextPaginateHandler = () => {
    setPaginate((prevState) => prevState + 1);
  };

  const prevPaginateHandler = () => {
    if (paginate > 0) {
      setPaginate((prevState) => prevState - 1);
    }
  };

  const firstPaginateHandler = () => setPaginate(0);
  const lastPaginateHandler = () => setPaginate(140);
  const value = {
    paginate,
    nextPaginateValue: nextPaginateHandler,
    prevPaginateValue: prevPaginateHandler,
    firstPaginateValue: firstPaginateHandler,
    lastPaginateValue: lastPaginateHandler,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginateProvider;
