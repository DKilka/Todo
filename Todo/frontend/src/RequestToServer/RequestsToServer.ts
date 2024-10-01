const getTodoList = async () => {
  let todoList: any;

  try {
    todoList = (await fetch("http://localhost:4200/todo/")).json();
    return todoList;
  } catch (error: unknown) {
    if (typeof error) console.error(error);
  }
};

const createNewTask = (newTodo: object) => {
  try {
    fetch("http://localhost:4200/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  } catch (error: unknown) {
    if (typeof error) console.error(error);
  }
};

const updateTodo = (updatedTodo: object, id: string) => {
  try {
    fetch(`http://localhost:4200/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
  } catch (error: unknown) {
    if (typeof error) console.error(error);
  }
};

const deleteTodo = (id: string) => {
  try {
    fetch(`http://localhost:4200/todo/${id}`, {
      method: "DELETE",
    });
  } catch (error: unknown) {
    if (typeof error) console.error(error);
  }
};

export { getTodoList, createNewTask, updateTodo, deleteTodo };
