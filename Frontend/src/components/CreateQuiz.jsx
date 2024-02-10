import React from "react";
// import { Link } from "react-router-dom";

function CreateModule() {
  return (
    <div>
      <form>
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating">
              <select className="form-select" id="floatingSelectGrid">
                <option selected>select any module</option>
                <option value="1">DAC</option>
                <option value="2">DBDA</option>
                <option value="3">EOC</option>
              </select>
              <label htmlFor="floatingSelectGrid">Select module</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <select className="form-select" id="floatingSelectGrid">
                <option selected>select any quiz</option>
                <option value="1">quiz1</option>
                <option value="2">quiz2</option>
                <option value="3">quiz3</option>
              </select>
              <label htmlFor="floatingSelectGrid">Quiz</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInputGrid"
                placeholder="Enter module name"
              />
              <label htmlFor="floatingInputGrid">Add new Quiz</label>
            </div>
          </div>
          {/* <button className="btn btn-dark" type="submit">
            Add quiz
          </button> */}
          <a href="/QuizCreation" className="btn btn-dark" type="submit">
            Add quiz
          </a>
        </div>
      </form>
    </div>
  );
}

export default CreateModule;
