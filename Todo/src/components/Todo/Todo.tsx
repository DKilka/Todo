import { useEffect, useState } from "react";

import "@styles/style.scss";
import Button from "@components/Button/Button";
import Checkbox from "@components/Checkbox/Checkbox";
import Input from "@components/Input/Input";
import {
  createNewTask,
  getTodoList,
  updateTodo,
  deleteTodo,
} from "@components/RequestsToServer/RequestsToServer";

import editIcon from "@images/edit-icon.svg";
import deleteIcon from "@images/delete-icon.svg";
import saveIcon from "@images/save-icon.svg";

type Todo = {
  id: string;
  description: string;
  complete: boolean;
};

const Todo = () => {
  const [input, setInput] = useState<string>("");
  const [editableTodo, setEditableTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Partial<Todo>>({
    id: "",
    description: "",
    complete: false,
  });

  const getTodo = async () => {
    const todo = await getTodoList();
    if (todo) {
      setTodoList(todo);
    }
  };

  const pressEnter = (e: any, operation: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      operation();
      return setInput("");
    }
  };

  const submitNewTask = () => {
    if (input !== "") {
      const newTodo = {
        id: crypto.randomUUID(),
        description: input,
        complete: false,
      };
      createNewTask(newTodo);
      setInput("");
      setTodoList((prevTodoList) => {
        return Array.isArray(prevTodoList)
          ? [...prevTodoList, newTodo]
          : [newTodo];
      });
    }
  };

  const updateTodoItem = (id: string, e: any) => {
    const todoItem = todoList.find((el) => el.id === id);
    if (todoItem) {
      const updatedTodo = {
        id: todoItem.id,
        description: typeof e === "string" ? e : todoItem.description,
        complete: typeof e === "boolean" ? e : todoItem.complete,
      };
      setTodo(updatedTodo);
    }
  };

  const deleteAllTasks = () => {
    todoList.forEach((el) => {
      deleteTodo(el.id);
    });
    setTodoList([]);
  };

  const saveTodo = (id: string) => {
    setEditableTodo("");
    updateTodo(todo, id);
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="wrapper">
      <div id="header">
        <Input
          className="new-task"
          placeholder="Enter a new task..."
          labelFor="input"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onPress={(e) => pressEnter(e, submitNewTask)}
        />
        <Button
          text="+Add"
          type="submit"
          className="add-task"
          onClick={submitNewTask}
        />
      </div>
      <section id="container">
        <ul className="task-list">
          {todoList.length > 0 &&
            todoList.map((el) => {
              const isEditable = editableTodo === el.id;
              return (
                <li key={el.id} className="task">
                  <Checkbox
                    className="complete-task"
                    labelFor={`checkbox-${el.id}`}
                    isChecked={el.complete}
                    onChange={(e) => {
                      updateTodoItem(el.id, e.target.checked);
                      updateTodo(todo, el.id);
                    }}
                  />
                  <label htmlFor={el.description}>
                    <input
                      type="text"
                      className="task-text"
                      readOnly={!isEditable}
                      id={el.description}
                      defaultValue={el.description}
                      onChange={(e: any) => {
                        updateTodoItem(el.id, e.target.value);
                      }}
                    />
                    {isEditable ? (
                      <Button
                        type="button"
                        icon={saveIcon}
                        className="save-button"
                        onClick={() => saveTodo(el.id)}
                      />
                    ) : (
                      <>
                        <Button
                          type="button"
                          icon={editIcon}
                          className="edit-button"
                          imgClass="edit-icon"
                          onClick={() => setEditableTodo(el.id)}
                        />
                        <Button
                          type="button"
                          icon={deleteIcon}
                          className="delete-button"
                          onClick={() => {
                            deleteTodo(el.id);
                            setTodoList((prevTodoList) =>
                              prevTodoList.filter((todo) => todo.id !== el.id)
                            );
                          }}
                        />
                      </>
                    )}
                  </label>
                </li>
              );
            })}
        </ul>
        <Button
          type="button"
          text="delete-all-tasks"
          className="delete-all-tasks"
          onClick={deleteAllTasks}
        />
      </section>
    </div>
  );
};

export default Todo;
