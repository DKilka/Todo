import Button from "@components/Button/Button";
import Checkbox from "@components/Checkbox/Checkbox";
import Input from "@components/Input/Input";
import { useEffect, useState } from "react";

const Todo = () => {
  const [input, setInput] = useState<string>("");
  const [todoList, setTodoList] = useState<
    {
      id: string;
      description: string;
      complete: boolean;
    }[]
  >([]);

  const submitNewTask = () => {
    const newTodo = {
      id: crypto.randomUUID(),
      description: input,
      complete: false,
    };
    try {
      //TODO in Todo.txt
      fetch("#", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      setTodoList((prevTodoList) => {
        return Array.isArray(prevTodoList)
          ? [...prevTodoList, newTodo]
          : [newTodo];
      });
    } catch (error: unknown) {
      if (typeof error) console.error(error);
    }
  };

  const editTodo = (id: string) => {
    fetch(`/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };

  const deleteTodo = (id: string) => {
    fetch(`/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };

  const getTodoList = async () => {
    try {
      const todoList: any = (await fetch("#")).json();
      setTodoList(todoList);
    } catch (error: unknown) {
      if (typeof error) console.error(error);
    }
  };

  const toggleCheckbox = (e: any, id: string) => {
    //TODO
    fetch(`/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complete: e.target.checked }),
    });
    return console.log(e.target.checked);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <div>
        <Input
          labelFor="input"
          type="text"
          onChange={(e) => {
            setInput(e?.target.value);
          }}
          placeholder="Enter a new task..."
        />
        <Button text="+Add" type="submit" onClick={submitNewTask} />
      </div>
      <section>
        <ul>
          {todoList.length &&
            todoList.map((el) => {
              return (
                <li key={crypto.randomUUID()}>
                  <Checkbox
                    labelFor={`checkbox-${el.id}`}
                    isChecked={el.complete}
                    onChange={(e) => toggleCheckbox(e, el.id)}
                  />
                  <label htmlFor={el.id}>
                    <input type="text" id={el.id} />
                  </label>
                  <Button type="button" onClick={() => editTodo(el.id)} />
                  <Button type="button" onClick={() => deleteTodo(el.id)} />
                </li>
              );
            })}
        </ul>
      </section>
    </>
  );
};

export default Todo;
