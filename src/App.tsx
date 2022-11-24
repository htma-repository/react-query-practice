import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import TodoDetails from "./components/TodoList/TodoDetails";

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
      </Route>
    </Routes>
  );
};

export default App;
