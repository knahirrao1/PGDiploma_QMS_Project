import React, { useState } from "react";

function ToDoList(props) {
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };
  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add to do"
          value={input}
          name="text"
          className="todo-input"
          onChange={handleChange}
        ></input>
        <button>Add To Do</button>
      </form>
    </div>
  );
}

export default ToDoList;
