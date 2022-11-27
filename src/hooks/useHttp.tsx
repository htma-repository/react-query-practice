import { useCallback } from "react";
import axios, { AxiosResponse } from "axios";

export interface Todo {
  id?: number;
  todo: string;
  isCompleted: boolean;
}
interface ConfigHttp {
  method: string;
  url: string;
  data?: Todo;
}

export interface Data {
  todos: Todo[];
}

const todosAPI = axios.create({
  baseURL: "http://localhost:4000/todo",
});

const useHttp = () => {
  const requestHttp = useCallback(async (configHttp: ConfigHttp) => {
    const { method, url, data } = configHttp;
    const response = await todosAPI({
      method,
      url,
      data,
    });

    if (response.status !== 200) {
      throw new Error("Failed get todo data");
    }

    return response.data;
  }, []);

  return { requestHttp };
};

export default useHttp;
