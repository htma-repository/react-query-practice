import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import TodoDetails from "./components/TodoList/TodoDetails";
import InfiniteQueriesTodos from "./components/InfiniteQueriesTodos/InfiniteQueriesTodos";
import TodoListPaginate from "./components/TodoListPaginate/TodoListPaginate";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <>
              <TodoInput />
              <TodoList />
            </>
          }
        />
        <Route path="/:todoId" element={<TodoDetails />} />
        <Route path="infinite" element={<InfiniteQueriesTodos />} />
        <Route path="paginate" element={<TodoListPaginate />} />
      </Route>
    </Routes>
  );
};

export default App;
