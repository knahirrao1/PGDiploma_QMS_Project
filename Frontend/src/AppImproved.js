import { useState } from "react";
import "./App.css";
import InputFormImpoved from "./components/CalculatorImproved";
import Label from "./components/Label";
function App() {
  return (
    <>
      <Label title="A Little Advanced Calcy" />
      <InputFormImpoved />
    </>
  );
}

export default App;
