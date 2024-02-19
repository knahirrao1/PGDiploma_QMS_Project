import React, { useState } from "react";

function About(props) {
  const [MyStyle, setMyStyle] = useState({
    color: "black",
    backgroundColor: "white",
  });

  const [toggleText, setToggleText] = useState("Light Mode");

  const [TextStyle, setTextStyle] = useState({
    color: "black",
    backgroundColor: "white",
    border: "2px solid black",
  });

  const ToggelMode = () => {
    if (MyStyle.color === "white") {
      setToggleText("Dark Mode");
      setTextStyle({
        color: "white",
        backgroundColor: "black",
        border: "2px solid black",
      });
      setMyStyle({
        color: "black",
        backgroundColor: "white",
      });
    } else if (MyStyle.color === "black") {
      setToggleText("Light Mode");
      setTextStyle({
        color: "black",
        backgroundColor: "white",
        border: "2px solid white",
      });
      setMyStyle({
        color: "white",
        backgroundColor: "black",
      });
    }
  };
  return (
    <div className="container" style={MyStyle}>
      <h1>{props.aboutTitle}</h1>
      <p>
        Hello there! I'm a tech enthusiast with a solid foundation in Java, C#,
        and C++. My database prowess extends to both MySQL and MongoDB, and I'm
        well-versed in the .Net Framework. On the frontend, I wield the power of
        React and JavaScript to create engaging user experiences. Beyond my
        technical skills, my interpersonal skills shine through. I'm an
        organized and punctual individual with a keen eye for observation.
        Decision-making comes naturally to me, and I pride myself on effective
        communication. Tackling multiple tasks simultaneously is a forte, making
        me a reliable and efficient team player.
      </p>
      {/* <button
        className="btn btn-primery"
        style={TextStyle}
        onClick={ToggelMode}
      >
        {toggleText}
      </button> */}
    </div>
  );
}

export default About;
