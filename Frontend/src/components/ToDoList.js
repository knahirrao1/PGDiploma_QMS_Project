import React, { useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
function ToDoList() {
  const [todos, setToDos] = useState([]);

  const addToDo = (todo) => {
    if (!todo.text || /^\s*$/.text) {
      return;
    }
    const newToDos = [todo, ...todos];
    setToDos(newToDos);
    console.log(...todos);
  };
  
  const completeToDo = (id) => {
    let updatedToDos = todos.map((todo) => {
      if (todo.id == id) {
        todo.isComplete = !todo.isComplete;
        return todo;
      }
    });
    setToDos(updatedToDos);
  };
  return (
    <div>
      <h1>Whats Gooing on ??</h1>
      <ToDoForm onSubmit={addToDo} />
      <ToDo todos={todos} completeToDo={completeToDo} />
    </div>
  );
}

export default ToDoList;
