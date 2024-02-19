import React, { useState } from "react";

function Calculator() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState(0);
  const Number1Setter = (event) => {
    console.log(`Number 1 is ${number1}`);
    setNumber1(parseInt(event.target.value));
  };
  const Number2Setter = (event) => {
    setNumber2(parseInt(event.target.value));
  };

  const handleAddition = () => {
    setResult(number1 + number2);
  };
  const handleDiff = () => {
    setResult(number1 - number2);
  };
  const handleProduct = () => {
    setResult(number1 * number2);
  };
  const handleDivision = () => {
    setResult((number1 / number2).toFixed(2));
  };
  return (
    <div className="container">
      <table className="table table-dark">
        <thead>
          <tr>
            <td>
              <label htmlFor="num1">Number 1: </label>
            </td>
            <td>
              <input
                type="number"
                id="num1"
                name="num1"
                placeholder="enter first number"
                value={number1}
                onChange={Number1Setter}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="num2">Number 2: </label>
            </td>
            <td>
              <input
                type="number"
                id="num2"
                name="num2"
                placeholder="enter second number"
                value={number2}
                onChange={Number2Setter}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="result">Result</label>
            </td>
            <td>
              <input
                type="number"
                id="result"
                value={result}
                onChange={handleAddition}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={handleAddition}>Addition</button>
            </td>
            <td>
              <button onClick={handleDiff}>Difference</button>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={handleProduct}>Product</button>
            </td>
            <td>
              <button onClick={handleDivision}>Division</button>
            </td>
          </tr>
        </thead>
      </table>
      {/* <h4>
        Number 1= {number1}, Number 2= {number2} and result = {result}
        {console.log(`addition is : ${result}`)}
      </h4> */}
    </div>
  );
}

export default Calculator;
