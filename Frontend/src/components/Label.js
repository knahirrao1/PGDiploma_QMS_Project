import React from "react";

function Label(props) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col align-self-end">
          <h1>{props.title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Label;
