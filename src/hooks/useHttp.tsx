import { useCallback } from "react";
import axios, { AxiosResponse } from "axios";

export interface Todo {
  id?: number;
  todo: string | null;
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
  baseURL: "http://localhost:4000/",
});

const useHttp = () => {
  const requestHttp = useCallback(async (configHttp: ConfigHttp) => {
    const { method, url, data } = configHttp;
    const response = await todosAPI({
      method,
      url,
      data,
    });

    if (response.status > 300) {
      throw new Error("Failed get todo data");
    }

    return response;
  }, []);

  return { requestHttp };
};

export default useHttp;
