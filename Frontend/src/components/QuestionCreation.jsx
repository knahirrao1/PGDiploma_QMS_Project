import React from "react";
import "./QuestionCreation.css";

const QuestionCreation = () => {
  return (
    <div className="container mt-5 p-5 rounded border">
      <div className="row">
        <div className="col-md-20 mx-auto">
          <h1 className="text-center mb-4">Create New Question</h1>
          <form>
            <div className="form-group row mb-4">
              {" "}
              {/* Added mb-4 for vertical space */}
              <label htmlFor="question" className="col-sm-3 col-form-label">
                Question
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control"
                  id="question"
                  placeholder="What is the capital of India?"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="form-group row mb-4">
              <label htmlFor="image" className="col-sm-3 col-form-label">
                Upload Image
              </label>
              <div className="col-sm-9">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="image" />
                </div>
              </div>
            </div>

            <div className="form-group row mb-4">
              {" "}
              {/* Added mb-4 for vertical space */}
              <label htmlFor="optionA" className="col-sm-3 col-form-label">
                Option A
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="optionA"
                  placeholder="Dongri"
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {" "}
              {/* Added mb-4 for vertical space */}
              <label htmlFor="optionB" className="col-sm-3 col-form-label">
                Option B
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="optionB"
                  placeholder="Delhi"
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {" "}
              {/* Added mb-4 for vertical space */}
              <label htmlFor="optionC" className="col-sm-3 col-form-label">
                Option C
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="optionC"
                  placeholder="Bhosri"
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {" "}
              {/* Added mb-4 for vertical space */}
              <label htmlFor="optionD" className="col-sm-3 col-form-label">
                Option D
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="optionD"
                  placeholder="Talegaon"
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
                  placeholder="Option B"
                  required
                />
              </div>
            </div>

            <div className="form-group row mb-4">
              {" "}
              {/* Added mb-4 for vertical space */}
              <label htmlFor="explanation" className="col-sm-3 col-form-label">
                Explanation
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control"
                  id="explanation"
                  placeholder="Because Delhi is the capital of India"
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
