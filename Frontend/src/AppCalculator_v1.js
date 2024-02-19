import { useState } from "react";
import "./App.css";
import InputForm from "./components/Calculator";
import Label from "./components/Label";
function App() {
  const [x, setX] = useState(34);
  const UponChange = (event) => {
    setX({ x: event.target.value });
  };
  return (
    <>
      <Label title="Trivial Calcy" luckyNumber={x} onChange={UponChange} />
      <InputForm />
    </>
  );
}

export default App;
