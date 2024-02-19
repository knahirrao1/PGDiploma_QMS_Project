import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";

const ModulesEdit = () => {
  const [moduleData, setModuleData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const moduleId = parseInt(id,10);

  useEffect(() => {
    // Fetch module data when component mounts
    fetchModuleData();
  }, [moduleId]);

  const fetchModuleData = async () => {
    try {
      const response = await axios.get(`${server}/quizhub/modules/${moduleId}`);
      setModuleData(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
      });
    } catch (error) {
      console.error("Error fetching module data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedModuleData = { ...moduleData, ...formData };
      await axios.put(`${server}/quizhub/modules/${moduleId}`, updatedModuleData);
      toast.success("Module updated successfully!");
      navigate('/manage-content');
    } catch (error) {
      toast.error( error.response.data.message);
    }
  };

  return (
    <div>
      {/* <h2>Edit Module</h2> */}
      <div>
        <div className="container mt-5 p-5 rounded border">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h1 className="text-center mb-4">Edit Module</h1>
              <form onSubmit={handleSubmit}>
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
                      value={formData.title}
                      onChange={handleChange}
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
                      value={formData.description}
                      onChange={handleChange}
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
    </div>
  );
};

export default ModulesEdit;
