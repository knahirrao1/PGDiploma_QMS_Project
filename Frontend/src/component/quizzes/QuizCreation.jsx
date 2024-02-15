import axios from "axios";
import React, { useState } from "react";
import { server } from "../../server";

const QuizCreation = (props) => {
  //currently whose id we have
  console.log(`module id is: ${props.moduleId}`);

  // for setting up state for input form of Quiz
  const [quizInputs, setQuizInputs] = useState({
    title: "",
    numberOfQuestions: 0,
    openToGuest: "",
  });

  // storing title, number of questions and open to guest to quizInputs object
  const handleInputChange = (e) => {
    setQuizInputs({ ...quizInputs, [e.target.name]: e.target.value });
  };

  // using method post for form submission
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdAt = new Date().toISOString();
      const totalAttempted = 0;
      const requestData = {
        ...quizInputs,
        createdAt,
        totalAttempted,
        moduleId: props.moduleId,
      };
      console.log(requestData);
      const response = await axios.post(
        `${server}/quizhub/quizzes/`,
        requestData
      );
      // .then(() => {
      //   // window.location.reload();
      //   // window.alert(response.data);
      // });
      console.log(`response from server ${response.data}`);
      window.alert(response.data);
    } catch (error) {
      console.log(`submitting quiz failed: ${error}`);
    }
  };

  // return QuizCreation component
  return (
    <div className="container mt-5 p-5 rounded border">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center mb-4">Create New Quiz</h1>
          <form onSubmit={handleQuizSubmit}>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-3 col-form-label">
                Title
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Example: Circular Motion Quiz"
                  onChange={handleInputChange}
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
                  type="number"
                  className="form-control"
                  id="numberOfQuestions"
                  name="numberOfQuestions"
                  placeholder="Example: 10"
                  onChange={handleInputChange}
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
                    name="openToGuest"
                    value="true"
                    onChange={handleInputChange}
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
                    name="openToGuest"
                    value="false"
                    onChange={handleInputChange}
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
