import React, { useState } from "react";
import ToDoForm from "./ToDoForm";
function ToDo({ todos, completeToDo, removeToDo, updateToDo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  //   const submitUpdate = (value) => {
  //     updateToDo(edit.id, value);
  //     setEdit({
  //       id: null,
  //       value: "",
  //     });
  //   };

  //   if (edit.id) {
  //     return <ToDoForm edit={edit} onSubmit={submitUpdate} />;
  //   }

  return todos.map((todo, index) => {
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      console.log("inside todo");
      <div key={todo.id} onClick={() => completeToDo(todo.id)}>
        {todo.text}
      </div>
      <div>
        <div>Edit | Delete</div>
      </div>
    </div>;
  });
}

export default ToDo;
