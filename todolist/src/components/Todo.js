import React from "react";
import TodoService from "../services/TodoService";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

function Todo({ todos, setTodos }) {
  const deleteTodo = (id) => {
    TodoService.deleteTodo(id)
      .then((response) => response.json())
      .then((data) => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  const handleDone = (e,value) => {
    const data = {
      id: value.id,
      content: value.content,
      done:e.target.checked === true ? true : false,
    };
    TodoService.editTodo(data)
    .then((response) => response.json())
    .then((data) =>
      setTodos(
        todos.map((todo) => {
          if (todo.id === value.id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        })
      )
    );

  };
  return (
    <List className="todoList" sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo}`;

        return (
          <ListItem
          className="todoList__item"
            key={todo.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => deleteTodo(todo.id)}
              >
                <Tooltip title="Delete" placement="top-end">
                <DeleteIcon sx={{ color: "#E91E63" }} />
                </Tooltip>
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.done}
                  onChange={(e)=> handleDone(e,todo)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                style={
                  todo.done === true ? { textDecoration: "line-through" } : null
                }
                id={labelId}
                primary={`${todo.content}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default Todo;
