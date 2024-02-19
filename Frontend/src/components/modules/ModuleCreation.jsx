import axios from "axios";
import React, { useState } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";

const ModuleCreation = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    try {
      const creationTime = new Date().toISOString();
      const noOfQuizes = 0;
      console.log(`time: ${creationTime}, noOfQuizes: ${noOfQuizes}`);
      console.log(inputs);
      const requestData = {
        ...inputs,
        creationTime,
        noOfQuizes,
        username: currentUser.username,
      };
      const response = await axios
        .post(`${server}/quizhub/modules/`, requestData)
        .then(() => {
          window.location.reload();
        });
      console.log(`response from server ${response.data}`);
    } catch (error) {
      console.log(`Error sending data ${error}`);
    }
  };

  return (
    <div>
      <div className="container mt-5 p-5 rounded border">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="text-center mb-4">Create New Module</h1>
            <form onSubmit={handleModuleSubmit}>
              <div className="form-group row">
                <label htmlFor="titleInput" className="col-sm-3 col-form-label">
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
  );
};

export default ModuleCreation;
