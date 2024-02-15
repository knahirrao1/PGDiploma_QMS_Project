import axios from "axios";
import React, { useState } from "react";
import { server } from "../../server";
// import "./QuestionCreation.css";

const QuestionCreation = (props) => {
  const [inputQuestion, setInputQuestion] = useState({
    question: "",
    image: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "",
    explaination: "",
  });

  const handleInputChange = (e) => {
    setInputQuestion({
      ...inputQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionSumbit = async (e) => {
    e.preventDefault();
    try {
      const createdAt = new Date().toISOString();
      const responseData = {
        ...inputQuestion,
        createdAt,
        quizId: props.quizId,
      };
      const response = await axios.post(
        `${server}/quizhub/questions/${props.quizId}`,
        responseData
      );
      console.log(`response from server ${response.data}`);
    } catch (error) {
      console.log(`error occured adding question : ${error}`);
    }
  };

  // Sample input:
  // "quizId": 0,
  // "question": "string",
  // "image": [
  //   "string"
  // ],
  // "optionA": "string",
  // "optionB": "string",
  // "optionC": "string",
  // "optionD": "string",
  // "correctOption": "string",
  // "explanation": "string",
  // "createdAt": "2024-02-15"

  return (
    <div className="container mt-5 p-5 rounded border">
      <div className="row">
        <div className="col-md-20 mx-auto">
          <h1 className="text-center mb-4">Create New Question</h1>
          <form onSubmit={handleQuestionSumbit}>
            <div className="form-group row mb-4">
              {/* Added mb-4 for vertical space */}
              <label htmlFor="question" className="col-sm-3 col-form-label">
                Question
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control"
                  id="question"
                  name="question"
                  placeholder="What is the capital of India?"
                  rows="4"
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="form-group row mb-4">
              <label htmlFor="image" className="col-sm-3 col-form-label">
                Upload Image
              </label>
              <div className="col-sm-9">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    name="image"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row mb-4">
              {/* Added mb-4 for vertical space */}
              <label htmlFor="optionA" className="col-sm-3 col-form-label">
                Option A
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="optionA"
                  name="optionA"
                  placeholder="Dongri"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {/* Added mb-4 for vertical space */}
              <label htmlFor="optionB" className="col-sm-3 col-form-label">
                Option B
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="optionB"
                  name="optionB"
                  placeholder="Delhi"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {/* Added mb-4 for vertical space */}
              <label htmlFor="optionC" className="col-sm-3 col-form-label">
                Option C
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="optionC"
                  name="optionC"
                  placeholder="Bhosri"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {/* Added mb-4 for vertical space */}
              <label htmlFor="optionD" className="col-sm-3 col-form-label">
                Option D
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="optionD"
                  name="optionD"
                  placeholder="Talegaon"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {" "}
              {/* Added mb-4 for vertical space */}
              <label
                htmlFor="correctAnswer"
                className="col-sm-3 col-form-label"
              >
                Correct Answer
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="correctAnswer"
                  name="correctOption"
                  placeholder="Option B"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {/* Added mb-4 for vertical space */}
              <label htmlFor="explanation" className="col-sm-3 col-form-label">
                Explanation
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control"
                  id="explanation"
                  name="explanation"
                  placeholder="Because Delhi is the capital of India"
                  onChange={handleInputChange}
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
  );
};

export default QuestionCreation;
