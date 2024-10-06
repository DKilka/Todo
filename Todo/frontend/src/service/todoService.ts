import axiosInstance from "./interceptor";

import TodoType from "src/types/Todo";

const todoService = () => {
  const getTodoList = async (): Promise<TodoType[] | void> => {
    try {
      const response = await axiosInstance.get<TodoType[]>(
        `${import.meta.env.VITE_TODO_URL}`
      );
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error instanceof Error) {
        console.error(error);
      }
    }
  };

  const createTodo = (newTodo: TodoType) => {
    try {
      axiosInstance.post(`${import.meta.env.VITE_TODO_URL}`, newTodo);
    } catch (error: unknown) {
      if (typeof error === "object" && error instanceof Error) {
        console.error(error);
      }
    }
  };

  const updateTodo = (updatedTodo: Partial<TodoType>, id: string) => {
    try {
      axiosInstance.patch(`${import.meta.env.VITE_TODO_URL}${id}`, updatedTodo);
    } catch (error: unknown) {
      if (typeof error === "object" && error instanceof Error) {
        console.error(error);
      }
    }
  };

  const deleteTodo = (id: string) => {
    try {
      axiosInstance.delete(`${import.meta.env.VITE_TODO_URL}${id}`);
    } catch (error: unknown) {
      if (typeof error === "object" && error instanceof Error) {
        console.error(error);
      }
    }
  };

  return { getTodoList, createTodo, updateTodo, deleteTodo };
};

export default todoService;
