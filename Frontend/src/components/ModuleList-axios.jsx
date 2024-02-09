import React from "react";
import JavaLogo from "../images/java-logo.png";
import axios from "axios";
import { useState, useEffect } from "react";

const ModuleList = () => {
  const [modules, setModule] = useState([]);
  useEffect(() => {
    axios
      .get("#")
      .then((response) => setModule(response.data))
      .catch((error) => console.error("Error fetching modules ", error));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Module List</h1>
      </div>
      {modules.map((module) => (
        <div className="d-flex justify-content-around">
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            <div className="col">
              <div className="card">
                <img src={JavaLogo} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{module.title}</h5>
                  <p className="card-text">{module.description}</p>
                  <a href="#" className="btn btn-primary">
                    {module.title}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
