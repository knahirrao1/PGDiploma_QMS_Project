import React from "react";

function Alert(props) {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.typ} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{props.alert.message}</strong>
        <button
          type="button"
          className="btn-close"
          btn-bs-dismiss="alert"
          aria-label="close"
        ></button>
      </div>
    )
  );
}

export default Alert;
