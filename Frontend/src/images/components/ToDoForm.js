import React, { useState } from "react";
import ToDoList from "./ToDoList";
function ToDoFrom(props) {
  const [list, setList] = useState("");
  const handleChange = (event) => {
    setList(event.list.value);
  };
  const handleSubmit = (event) => {
    // event.preventDefault();
    // props.onSubmit({
    //   id: Math.floor(Math.random() * 10000),
    //   text: list,
    // });
    setList("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table align="center">
          <tr>
            <td>
              <label htmlFor="tnm">Task Name: </label>
            </td>
            <td>
              <input
                type="text"
                id="tnm"
                placeholder="To do List"
                autoFocus
                value={list}
                onChange={handleChange}
              />
            </td>
            <td>
              <label htmlFor="dur">Duration: </label>
            </td>
            <td>
              <input type="text" id="dur" />
            </td>
            <td>
              <button type="submit">Add List</button>
            </td>
          </tr>
        </table>
      </form>
      <ToDoList />
    </div>
  );
}

export default ToDoFrom;
