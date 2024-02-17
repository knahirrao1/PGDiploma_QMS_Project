import React, { useEffect, useState } from "react";
import JavaLogo from "./images/java-logo.png";
import axios from "axios";
import { server } from "../../server";
import QuizList from "../quizzes/QuizList";

function ModuleList() {
  const [modules, setModules] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [id, setId] = useState(0);

  const showAllQuizzes = (module_id) => {
    // Logic for viewing quizzes goes here
    setId(module_id);
    setShowQuiz(true);
  };

  useEffect(() => {
    // console.log(props.table);
    // setModules(props.table);
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/modules`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setModules(res.data);
          }
        })
        .catch((error) => {
          console.log("fetching modules failed ", error);
          // toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, []);
  return showQuiz ? (
    <QuizList moduleId={id} />
  ) : (
    <div>
      <hr className="border border-dark border-2 opacity-50"></hr>
      <div className="d-flex justify-content-center">
        <h2>Module List</h2>
      </div>
      <hr className="border border-dark border-2 opacity-50"></hr>
      <div className="d-flex justify-content-around">
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {modules.map((module) => (
            <div className="card" key={module.module_id}>
              {/* <img src={JavaLogo} className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">{module.title}</h5>
                <p className="card-text">{module.description}</p>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => showAllQuizzes(module.module_id)}
                >
                  show Quizzes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModuleList;
