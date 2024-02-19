import React from "react";

import "./Question.css";

const Question = ({ question }) => {
  const { id, text, options } = question;

  return (
    <div>
      <div
        className="container"
        style={{
          backgroundColor: "#ffffcc",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <div className="question">
          <h3 className="mb-3">{`Q${id}. ${text}`}</h3>
          {options.map((option) => (
            <div className="form-check" key={option.id}>
              <input
                className="form-check-input custom-radio"
                type="radio"
                name={`question${id}`}
                id={`option${option.id}`}
                value={`option${option.id}`}
              />
              <label
                className="form-check-label"
                htmlFor={`option${option.id}`}
              >
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
