import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";

const QuizEdit = () => {
  const { id } = useParams();
  const quizId = parseInt(id);
  const navigate = useNavigate();
  const [moduleId, setModuleId] = useState("");
  const [quizData, setQuizData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    openToGuest: false,
  });

  useEffect(() => {
    // Fetch module data when component mounts
    fetchQuizData();
  }, [quizId]);

  const fetchQuizData = async () => {
    try {
      const res = await axios.get(`${server}/quizhub/quizzes/${quizId}`);
      setQuizData(res.data);
      console.log(res.data);
      console.log(res.data.title);
      console.log(res.data.openToGuest);
      console.log(res.data.moduleId);
      setFormData({
        title: res.data.title,
        openToGuest: res.data.openToGuest,
      });
      setModuleId(res.data.moduleId);
    } catch (error) {
      console.error("Error fetching module data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedQuizData = { ...quizData, ...formData };
      await axios.put(`${server}/quizhub/quizzes/${quizId}`, updatedQuizData);
      toast.success("Module updated successfully!");
      navigate(`/quiz-table/${moduleId}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5 p-5 rounded border">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center mb-4">Edit Quiz</h1>
          <form onSubmit={handleQuizSubmit}>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-3 col-form-label">
                Title
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  placeholder="Example: Circular Motion Quiz"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row align-items-center">
              <label htmlFor="quizAccess" className="col-sm-3 col-form-label">
                Is your quiz open to guests?
              </label>
              <div className="col-sm-9 d-flex">
                <div className="form-check mr-4">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="guestAccessYes"
                    name="openToGuest"
                    checked={formData.openToGuest}
                    value="true"
                    onChange={handleInputChange}
                  />
                  <label
                    className="form-check-label mr-3"
                    htmlFor="guestAccessYes"
                  >
                    Yes
                  </label>
                </div>

                <div className="form-check mr-4">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="guestAccessNo"
                    checked={!formData.openToGuest}
                    name="openToGuest"
                    value="false"
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="guestAccessNo">
                    No
                  </label>
                </div>
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
  );
};

export default QuizEdit;
