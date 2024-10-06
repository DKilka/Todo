import { useEffect, useState } from "react";

import "@styles/style.scss";

import Button from "@components/Button/Button";
import Checkbox from "@components/Checkbox/Checkbox";
import Input from "@components/Input/Input";
import todoService from "@service/todoService";

import editIcon from "@images/edit-icon.svg";
import deleteIcon from "@images/delete-icon.svg";
import saveIcon from "@images/save-icon.svg";

import TodoType from "src/types/Todo";

interface TodoProps {
  dataTodo: TodoType[];
}

const Todo = ({ dataTodo }: Required<TodoProps>) => {
  const [input, setInput] = useState<string>("");
  const [editableTodo, setEditableTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [todo, setTodo] = useState<Partial<TodoType>>({
    id: "",
    description: "",
    complete: false,
  });
  const service = todoService();

  useEffect(() => {
    setTodoList(dataTodo);
  }, [dataTodo]);

  const pressEnter = (e: React.KeyboardEvent, operation: () => void) => {
    if (e.key === "Enter") {
      operation();
      setInput("");
    }
  };

  const submitTodo = (): void => {
    if (input !== "") {
      const newTodo: TodoType = {
        id: crypto.randomUUID(),
        description: input,
        complete: false,
      };
      service.createTodo(newTodo);
      setInput("");
      setTodoList((prevTodoList) => {
        return Array.isArray(prevTodoList)
          ? [...prevTodoList, newTodo]
          : [newTodo];
      });
    }
  };

  const updateTodo = (id: string, e: boolean | string) => {
    const todoItem: TodoType | undefined = todoList.find(
      (el: TodoType) => el.id === id
    );
    if (todoItem) {
      const updatedTodo: TodoType = {
        id: todoItem.id,
        description: typeof e === "string" ? e : todoItem.description,
        complete: typeof e === "boolean" ? e : todoItem.complete,
      };
      setTodo(updatedTodo);
      service.updateTodo(updatedTodo, todoItem.id);
    }
  };

  const deleteAllTasks = () => {
    todoList.forEach((el: TodoType) => {
      service.deleteTodo(el.id);
    });
    setTodoList([]);
  };

  const saveTodo = (id: string) => {
    setEditableTodo("");
    service.updateTodo(todo, id);
  };

  return (
    <div className="wrapper">
      <div id="header">
        <Input
          className="new-task"
          placeholder="Enter a new task..."
          labelFor="input"
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
          }}
          onPress={(e: React.KeyboardEvent) => pressEnter(e, submitTodo)}
        />
        <Button
          style={{ backgroundColor: input === "" ? "grey" : "#00ae1c" }}
          text="+Add"
          type="submit"
          className="add-task"
          onClick={submitTodo}
        />
      </div>
      <section id="container">
        <ul className="task-list">
          {todoList.length > 0 &&
            todoList.map((el: TodoType) => {
              const isEditable = editableTodo === el.id;
              return (
                <li key={el.id} className="task">
                  <Checkbox
                    className="complete-task"
                    labelFor={`checkbox-${el.id}`}
                    isChecked={el.complete}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const isChecked: boolean = e.target.checked;
                      updateTodo(el.id, isChecked);
                    }}
                  />
                  <label htmlFor={el.description}>
                    <input
                      type="text"
                      className="task-text"
                      readOnly={!isEditable}
                      id={el.description}
                      style={{
                        textDecoration: el.complete ? "line-through" : "none",
                      }}
                      defaultValue={el.description}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        updateTodo(el.id, e.target.value);
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
                            service.deleteTodo(el.id);
                            setTodoList((prevTodoList) =>
                              prevTodoList.filter(
                                (todo: TodoType) => todo.id !== el.id
                              )
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
