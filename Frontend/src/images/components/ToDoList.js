import React, { useEffect, useState } from "react";
function ToDoList() {
  return (
    <div>
      <h3 align="center">List Added</h3>
      <table align="center" className="table table-striped">
        <thead>
          <tr>
            <td>Task Name</td>
            <td>Duration</td>
          </tr>
        </thead>
        <tbody>
          {/* {list.map((l) => {
            <tr>
              <td>{l.task_name}</td>
              <td>{l.task_dur}</td>
            </tr>;
          })} */}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoList;
