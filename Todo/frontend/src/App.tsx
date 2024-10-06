import { useEffect, useState } from "react";

import Todo from "./features/Todo/Todo";
import NotFound from "./pages/NotFound";
import TodoType from "./types/Todo";

import todoService from "./service/todoService";

function App() {
  const [dataTodo, setDataTodo] = useState<TodoType[]>();
  const service = todoService();

  const getTodo = async () => {
    const todo: TodoType[] | void = await service.getTodoList();
    if (todo) {
      setDataTodo(todo);
    }
  };

  useEffect(() => {
    getTodo();
  });

  return dataTodo ? <Todo dataTodo={dataTodo} /> : <NotFound />;
}

export default App;
