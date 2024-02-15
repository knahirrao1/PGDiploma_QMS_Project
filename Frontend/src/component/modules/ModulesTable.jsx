import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { server } from "../../server";
import QuizzesTable from "../quizzes/QuizzesTable";
import ModuleCreation from "./ModuleCreation";

const ModulesTable = () => {
  const [modules, setModules] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [id, setId] = useState(0);
  console.log(showQuiz);
  const scrollDown = useRef();
  const handleAddModule = () => {
    // Logic for adding a new module goes here
    setShowModuleForm(true);
  };
  const handleEditModule = () => {
    // Logic for editing module at the given index goes here
  };

  const handleDeleteModule = (moduleId) => {
    // Logic for deleting module at the given index goes here
    axios
      .delete(`${server}/quizhub/modules/${moduleId}`)
      .then(() => {
        const updateModule = modules.filter(
          (module) => module.module_id != moduleId
        );
        setModules(updateModule);
        window.location.reload();
      })
      .catch((error) => console.log("Error deleting module " + error));
  };

  const handleViewQuizzes = (module_id) => {
    // Logic for viewing quizzes goes here
    setId(module_id);
    setShowQuiz(true);
  };
  //scrolling down to view form to add modules
  useEffect(() => {
    scrollDown.current?.lastElementChild?.scrollIntoView();
  });
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

  return showQuiz ? (
    <QuizzesTable moduleId={id} />
  ) : (
    <div
      className="container-lg mt-4"
      style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
    >
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-md-8">
                <h2>
                  Modules <b>Details</b>
                </h2>
              </div>
              <div className="col-md-4 text-end">
                <button
                  type="button"
                  className="btn btn-info add-new"
                  onClick={handleAddModule}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Module
                </button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Number of Quizzes</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.module_id}>
                  <td>{module.module_id}</td>
                  <td>{module.title}</td>
                  <td>{module.description}</td>
                  <td className="text-center">{module.numberOfQuizzes}</td>
                  <td>{module.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditModule()}
                    >
                      <FontAwesomeIcon icon={faEdit} /> {/* Edit icon */}
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteModule(module.module_id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Trash icon */}
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleViewQuizzes(module.module_id)}
                    >
                      <FontAwesomeIcon icon={faEye} /> {/* View icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div ref={scrollDown}>{showModuleForm && <ModuleCreation />}</div>
    </div>
  );
};

export default ModulesTable;
