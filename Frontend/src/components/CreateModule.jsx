import React, { useState } from "react";

function CreateModule() {
  const [buttonText, setButtonText] = useState("Select Module");

  const selectModule = () => {
    setButtonText("Select Module");
  };
  const addModule = () => {
    setButtonText("Add Module");
  };

  return (
    <div>
      <form>
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelectGrid"
                onClick={selectModule}
              >
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
              <input
                type="text"
                className="form-control"
                id="floatingInputGrid"
                placeholder="Enter module name"
                onClick={addModule}
              />
              <label htmlFor="floatingInputGrid">Add new module</label>
            </div>
          </div>
          {/* <button className="btn btn-dark" id="moduleButton" type="submit">
            {buttonText}
          </button> */}
          <a href="/ModuleCreation" className="btn btn-dark" type="button">
            {buttonText}
          </a>
        </div>
      </form>
    </div>
  );
}

export default CreateModule;
