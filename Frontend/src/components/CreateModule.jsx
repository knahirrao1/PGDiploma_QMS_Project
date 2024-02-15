import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import {
  faEdit,
  faTrash,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function CreateModule() {
  const [modules, setModules] = useState([]);
  const [singleModule, setSingleModule] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/quizhub/modules/")
      .then((response) => setModules(response.data))
      .catch((error) => console.error("Error fetching modules ", error));
  }, []);

  const handleViewQuizzes = () => {};

  const handleModuleDelete = (moduleId) => {
    axios
      .delete(`http://localhost:8080/quizhub/modules/${moduleId}`)
      .then(() => {
        const updateModule = modules.filter((module) => module.id != moduleId);
        setModules(updateModule);
        window.location.reload();
      })
      .catch((error) => console.error("Error fetching module", error));
  };

  const handleModuleEdit = (moduleId) => {
    axios
      .put(`http://localhost:8080/quizhub/modules/${moduleId}`)
      .then((response) => setSingleModule(response.data))
      .catch((error) => console.log("Error fetching module", error));
  };

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
              {modules.map((module) => (
                <tr key={module.module_id}>
                  <td>{module.module_id}</td>
                  <td>{module.title}</td>
                  <td>{module.description}</td>
                  <td className="text-center">{module.numberOfQuizzes}</td>
                  <td>{module.createdOn}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleModuleEdit(module.module_id)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> {/* Edit icon */}
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleModuleDelete(module.module_id)}
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
    </div>
  );

  // return (
  //   <div className="border">
  //     <div className="d-flex justify-content-end">
  //       <Link>
  //         <button className="btn btn-dark">Add Modules</button>
  //       </Link>
  //     </div>
  //     <table className="table">
  //       <thead>
  //         <tr>
  //           <th scope="col">Sr. No.</th>
  //           <th scope="col">Title</th>
  //           <th scope="col">Description</th>
  //           <th scope="col">No. of quizes</th>
  //           <th scope="col">Created on</th>
  //           <th scope="col">Action</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {modules.map((module) => (
  //           <tr key={module.module_id}>
  //             <th>{module.module_id}</th>
  //             <td>{module.title}</td>
  //             <td>{module.description}</td>
  //             <td>{module.numberOfQuizzes}</td>
  //             <td>{module.createdAt}</td>
  //             <td>
  //               {/* delete */}
  //               <button
  //                 className="btn btn-dark"
  //                 onClick={() => handleModuleDelete(module.module_id)}
  //               >
  //                 Delete
  //               </button>
  //               {/* edit */}
  //               <button
  //                 className="btn btn-dark"
  //                 onClick={() => handleModuleEdit(module.module_id)}
  //               >
  //                 Edit
  //               </button>
  //               {/* details */}
  //               <button
  //                 className="btn btn-dark"
  //                 onClick={() => handleModuleDetails(module.module_id)}
  //               >
  //                 Details
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}

export default CreateModule;
