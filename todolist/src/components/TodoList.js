import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import TodoService from "../services/TodoService";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState();
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    TodoService.get()
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const setTodoContent = (e) => {
    setNewTodo(e.target.value);
  };

  const createTodo = () => {
    const data = {
      content: newTodo,
      status: "DONE",
    };
    TodoService.createTodo(data)
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data])
        setNewTodo("")
      });
  };

  return (
    <div className="containerDiv">
      <h3>TodoList</h3>
      <div className="inputContainer">
      <Input
        id="standard-basic"
        label="Text a ToDo"
        variant="standard"
        fullWidth
        value={newTodo}
        onChange={setTodoContent}
      />
      <Button className="addButton" variant="contained" onClick={createTodo}>
        Add
      </Button>
      </div>
      {todos && <Todo todos={todos} setTodos={setTodos} />}
    </div>
  );
}

export default TodoList;
