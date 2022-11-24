import { useCallback } from "react";
import axios from "axios";

export interface Todo {
  id?: number;
  userId: number;
  todo: string;
  completed: boolean;
}
interface ConfigHttp {
  method: string;
  url: string;
  data?: Todo;
}

const todosAPI = axios.create({
  baseURL: "https://dummyjson.com/todos",
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

    return response;
  }, []);

  return { requestHttp };
};

export default useHttp;
