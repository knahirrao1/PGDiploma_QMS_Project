import React, { useState } from "react";

function TextForm(props) {
  const [anyText, setAnyText] = useState("");
  const TextToUpper = () => {
    setAnyText(anyText.toUpperCase());
    props.alert("Upper case enabled", "success");
  };

  const TextToLower = () => {
    setAnyText(anyText.toLowerCase());
    props.alert("Lower case enabled", "success");
  };

  const handleChange = (event) => {
    setAnyText(event.target.value);
  };

  const ClearText = () => {
    setAnyText("");
    props.alert("Text Cleared", "success");
  };
  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <label htmlFor="txt" className="form-label">
            Enter you thoughts
          </label>
          <textarea
            className="form-control"
            value={anyText}
            onChange={handleChange}
            style={{
              background: props.Mode === "light" ? "white" : "black",
              color: props.Mode === "light" ? "black" : "white",
            }}
            id="txt"
            rows="10"
          />
        </div>

        <button className="btn btn-primary mx-3" onClick={TextToUpper}>
          Convert to UPPERCASE
        </button>

        <button className="btn btn-info mx-3" onClick={TextToLower}>
          convert to lowercase
        </button>

        <button className="btn btn-danger" onClick={ClearText}>
          Clear Your Thoughts
        </button>
      </div>
      <div className="container my-3">
        <h1>Text Summary: </h1>
        <p>
          {anyText.split(" ").length} words,{anyText.length} character
        </p>
        <p>
          You will require{" "}
          {anyText === ""
            ? "0"
            : (0.008 * anyText.split(" ").length).toFixed(3)}{" "}
          minutes to read
        </p>
        <h2>Preview</h2>
        <p>{anyText}</p>
      </div>
    </>
  );
}

export default TextForm;
