import React, { useState } from "react";

function AboutMy() {
  const [MyStyle, setMyStyle] = useState({
    color: "white",
    backgroundColor: "black",
  });
  const ToggleMode = () => {
    if (MyStyle.color === "white") {
      setMyStyle({
        color: "black",
        backgroundColor: "white",
      });
    } else if (MyStyle.color === "black") {
      setMyStyle({
        color: "white",
        backgroundColor: "black",
      });
    }
  };
  const DarkMode = () => {
    if (MyStyle.color === "black") {
      setMyStyle({
        color: "white",
        backgroundColor: "black",
      });
    } else {
      window.alert("Already In Dark Mode, use Toggle or Light Mode");
    }
  };
  const LightMode = () => {
    if (MyStyle.color === "white") {
      setMyStyle({
        color: "black",
        backgroundColor: "white",
      });
    } else {
      window.alert("Already In Light Mode, use Toggle or Dark Mode");
    }
  };
  return (
    <div className="container" style={MyStyle}>
      <h1>AboutMy Us</h1>
      <p>My name is Abhishek and this is my website</p>
      <div className="container">
        <button type="button" className="btn btn-dark my-3" onClick={DarkMode}>
          Enable Dark Mode
        </button>
        <button
          type="button"
          className="btn btn-light my-3"
          onClick={LightMode}
        >
          Enable Light Mode
        </button>
        <button type="button" className="btn btn-info" onClick={ToggleMode}>
          Toggle Mode
        </button>
      </div>
    </div>
  );
}

export default AboutMy;
