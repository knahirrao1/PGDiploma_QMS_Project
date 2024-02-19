import { useState } from "react";
import "./App.css";
// import About from "./components/About";
import NavBar from "./components/NavBar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";

function App() {
  //to access title and AboutMe properties
  const [Mode, setMode] = useState("light");
  const [textMode, setTextMode] = useState("Light");
  const [alert, setAlert] = useState(null);

  const ShowAlert = (message, type) => {
    setAlert({
      message: message,
      typ: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  document.title = "Light Text Utils";
  const toggleMode = () => {
    if (Mode === "light") {
      setMode("dark");
      setTextMode("light");
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      document.title = "Dark Text Utils";
      // setInterval(() => {
      //   window.alert("Install Virus Now!!!");
      // }, 3000);
      ShowAlert("Dark mode has been enabled", "success");
    } else if (Mode === "dark") {
      setMode("light");
      setTextMode("dark");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      document.title = "Light Text Utils";
      ShowAlert("Light mode has been enabled", "success");
    }
  };
  return (
    <>
      <NavBar
        title="Text Utils"
        AboutMe="Check Me Out"
        Mode={Mode}
        TextMode={textMode}
        ToggleMode={toggleMode}
      />
      <Alert alert={alert} Mode={Mode} />
      <div className="container">
        <TextForm heading="Crazy Blogs" Mode={Mode} alert={ShowAlert} />
        {/* <About aboutTitle="About Me" /> */}
      </div>
    </>
  );
}

export default App;
