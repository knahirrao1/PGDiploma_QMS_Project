import React, { useEffect, useState } from "react";
//import JavaLogo from "./images/java-logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
//import QuizList from "../quizzes/QuizList";
import { useNavigate } from "react-router-dom";

function ModuleList() {
  const [modules, setModules] = useState([]);
  //const [showQuiz, setShowQuiz] = useState(false);
  //const [id, setId] = useState(0);
  const navigate = useNavigate();

  const showAllQuizzes = (module_id) => {
    // Logic for viewing quizzes goes here
    //setId(module_id);
    //setShowQuiz(true);
    navigate(`/quiz-list/${module_id}`);
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
          console.log(error);
          toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <hr className="border border-light" />
      <div className="d-flex justify-content-center bg-warning shadow">
        <h3 className="text-dark">Module List</h3>
      </div>
      <hr className="border border-light" />
      {/* start modules list */}
      <div className="d-flex justify-content-around">
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {modules.map((module) => (
            <div className="m-4 card" key={module.module_id}>
              <div className="fs-4 card-header">
                {module.title}
                <p className="fs-6 card-text">Created by : {module.username}</p>
              </div>
              <div className="card-body">
                <p className="card-text">{module.description}</p>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => showAllQuizzes(module.module_id)}
                >
                  Show Quizzes
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
