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
//import ModuleCreation from "./ModuleCreation";
import { useSelector } from "react-redux";
//import ModulesEdit from "./ModulesEdit";
import { useNavigate } from "react-router-dom";
const ModulesTable = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [modules, setModules] = useState(new Map());
  //const [showQuiz, setShowQuiz] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  // const [showEditForm, setShowEditForm] = useState(false);
  //const [editModuleId, setEditModuleId] = useState(null);
  //const [id, setId] = useState(0);
  const scrollDown = useRef();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  // const [edits, setEdits] = useState({
  //   title:'rahul' ,
  //   description: '',
  // });

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // const handleEditChange = (e)=>{
  //   setEdits({ ...edits, [e.target.name]: e.target.value });
  // }

  //console.log(edits);
  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    const creationTime = new Date().toISOString();
    const noOfQuizzes = 0;
    console.log(`time: ${creationTime}, noOfQuizzes: ${noOfQuizzes}`);
    const requestData = {
      ...inputs,
      username: currentUser.username,
    };
    console.log(requestData);
    await axios
      .post(`${server}/quizhub/modules`, requestData)
      .then((response) => {
        //window.location.reload();
        handleModule(response.data);
        setShowModuleForm(false);
        console.log(`response from server ${response.data}`);
        toast.success("module added successfully!");
      })
      .catch((error) => {
        console.log(`Error sending data ${error}`);
        toast.error(error.response.data.message);
      });
  };

  const handleAddModule = () => {
    // Logic for adding a new module goes here
    setShowModuleForm(true);
  };
  const handleModule = (newModule) => {
    setModules([...modules, newModule]);
    setShowModuleForm(false); // Assuming you want to hide the module form after adding
  };

  // const EditModule = (newModule) =>{
  //   //setModules([...modules, newModule]);
  //   setShowEditForm(false);
  //   //setModules([...modules]);
  // }

  const handleEditModule = (moduleId) => {
    // Logic for editing module at the given index goes here
    //setEditModuleId(moduleId);
    navigate(`/edit-module/${moduleId}`);
  };

  // const handleEditSubmit = async(e)=>{
  //   setShowEditForm(false);
  //   e.preventDefault();
  //   console.log(edits);
  //   const requestData ={
  //     ...edits,
  //     username : currentUser.username,
  //   }
  //   console.log(requestData);
  //   await axios.put(`${server}/quizhub/modules/${editModuleId}`,requestData)
  //   .then((res)=>{
  //     //EditModule(res.data);
  //       setShowEditForm(false);
  //       console.log(`response from server ${res.data}`);
  //     console.log(res.data);
  //   })
  //   .catch((error)=>{
  //     console.log(error.response.data.message);
  //   })
  // };

  const handleDeleteModule = async (moduleId) => {
    // Logic for deleting module at the given index goes here
    await axios
      .delete(`${server}/quizhub/modules/${moduleId}`)
      .then(() => {
        const updateModule = modules.filter(
          (module) => module.module_id !== moduleId
        );
        setModules(updateModule);
        toast.success();
        //window.location.reload();
      })
      .catch((error) => console.log("Error deleting module " + error));
  };

  const handleViewQuizzes = (module_id) => {
    // Logic for viewing quizzes goes here
    //setId(module_id);
    // setShowQuiz(true);
    navigate(`/quiz-table/${module_id}`);
  };

  //scrolling down to view form to add modules
  useEffect(() => {
    scrollDown.current?.lastElementChild?.scrollIntoView();
  });
  useEffect(() => {
    // alert("in modules table");
    // console.log(props.table);
    // setModules(props.table);
    console.log(`username is : ${currentUser.username}`);
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/modules/users/${currentUser.username}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            // const moduleMap = new Map();
            // res.data.forEach(item => {
            //   moduleMap.set(item.module_id,item)
            // });
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
              {Array.from(modules.values()).map((module, index) => (
                <tr key={module.module_id}>
                  <td>{index + 1}</td>
                  <td>{module.title}</td>
                  <td>{module.description}</td>
                  <td className="text-center">{module.numberOfQuizzes}</td>
                  <td>{module.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditModule(module.module_id)}
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
      <div ref={scrollDown}>
        {showModuleForm && (
          <div>
            <div className="container mt-5 p-5 rounded border">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <h1 className="text-center mb-4">Create New Module</h1>
                  <form onSubmit={handleModuleSubmit}>
                    <div className="form-group row">
                      <label
                        htmlFor="titleInput"
                        className="col-sm-3 col-form-label"
                      >
                        Title
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="titleInput"
                          name="title"
                          value={inputs.title}
                          onChange={handleInputChange}
                          placeholder="Example: Physics"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="descriptionInput"
                        className="col-sm-3 col-form-label"
                      >
                        Description
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-control"
                          id="descriptionInput"
                          name="description"
                          value={inputs.description}
                          onChange={handleInputChange}
                          placeholder="Physics module has quizzes on circular motion, quantum mechanics, electromagnetism etc."
                          rows="4"
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row justify-content-end">
                      <div className="col-sm-9">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulesTable;
