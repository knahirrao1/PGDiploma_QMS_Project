import React from "react";

import "./ModuleCreation.css";

const ModuleCreation = () => {
  return (
    <div>
      <div className="container mt-5 p-5 rounded border">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="text-center mb-4">Create New Module</h1>
            <form>
              <div className="form-group row">
                <label htmlFor="title" className="col-sm-3 col-form-label">
                  Title
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Example: Physics"
                    style={{ color: "lightgray" }} // Change placeholder color
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="description"
                  className="col-sm-3 col-form-label"
                >
                  Description
                </label>
                <div className="col-sm-9">
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Physics module has quizzes on circular motion, quantum mechanics, electromagnetism etc."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row justify-content-end">
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCreation;
