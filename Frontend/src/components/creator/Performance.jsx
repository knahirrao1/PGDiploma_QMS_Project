import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Performance() {
  const { currentUser } = useSelector((state) => state.user);
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${server}/quizhub/responses/users/${currentUser.username}`)
        .then((response) => {
          console.log("Response Data:", response.data);
          setResponseData(response.data);
        })
        .catch((error) => {
          console.error("Error received:", error);
          toast.error(`Error received: ${error.message}`);
        });
    } catch (error) {
      console.error("Error received:", error);
      toast.error(`Error received: ${error.message}`);
    }
  }, []);

  return (
    <div>
      {responseData.map((response) => (
        <div key={response.quizId}>
          <h1>{response.quizTitle}</h1>
          <ul className="list-group">
            <li className="list-group-item">Marks: {response.marks}</li>
            <li className="list-group-item">
              Attempt No: {response.attemptNumber}
            </li>
            <li className="list-group-item">
              Creation date: {response.createdAt}
            </li>
          </ul>
          {/* <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-label="Animated striped example"
              aria-valuenow={response.marks}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: response.marks + "%" }}
            >
              {response.marks}
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default Performance;
