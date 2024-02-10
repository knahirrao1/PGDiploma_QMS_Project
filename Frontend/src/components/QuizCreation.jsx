import React from "react";
import "./QuizCreation.css";

const QuizCreation = () => {
  return (
    <div className="container mt-5 p-5 rounded border">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center mb-4">Create New Quiz</h1>
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
                  placeholder="Example: Circular Motion Quiz"
                  style={{ color: "lightgray" }} // Change placeholder color
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="numberOfQuestions"
                className="col-sm-3 col-form-label"
              >
                Number of Questions
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="numberOfQuestions"
                  placeholder="Example: 10"
                  style={{ color: "lightgray" }} // Change placeholder color
                />
              </div>
            </div>

            <div className="form-group row align-items-center">
              <label htmlFor="quizAccess" className="col-sm-3 col-form-label">
                Is your quiz open to guests?
              </label>
              <div className="col-sm-9 d-flex">
                <div className="form-check mr-4">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="guestAccessYes"
                    name="quizAccess"
                    value="yes"
                  />
                  <label
                    className="form-check-label mr-3"
                    htmlFor="guestAccessYes"
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check mr-4">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="guestAccessNo"
                    name="quizAccess"
                    value="no"
                  />
                  <label className="form-check-label" htmlFor="guestAccessNo">
                    No
                  </label>
                </div>
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
  );
};

export default QuizCreation;
