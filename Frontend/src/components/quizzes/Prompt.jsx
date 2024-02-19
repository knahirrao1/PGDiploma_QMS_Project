import React, { useState } from "react";
//import Quiz from './Quiz'
import axios from "axios";
import { server } from "../../server";
//import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const Prompt = () => {
  //const [showQuestions, setShowQuestions] = useState(false);
  const [username, setUsername] = useState("");
  //const {currentUser} = useSelector(state=>state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const quizId = parseInt(id);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform further actions with the entered username here
    await axios
      .get(`${server}/quizhub/guestresponses/check/${quizId}/${username}`)
      .then((res) => {
        console.log(res.status, res.data.message);
        //setShowQuestions(true);
        navigate(`/questions/${quizId}/${username}`);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.warning(error.response.data.message);
      });
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white">
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h4 className="fw-bold mb-2">Please Enter Your Username</h4>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                  <p>Username must be unique!</p>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>

                  <button
                    className="btn btn-outline-warning btn-lg px-5"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
// <div className="app-container">
//   <div className="form-container">
//     <h1 className="title">Enter Your Username</h1>
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="username" className="label">
//         Username:
//       </label>
//       <input
//         type="text"
//         id="username"
//         className="input"
//         value={username}
//         onChange={handleUsernameChange}
//         required
//       />
//       <button type="submit" className="submit-button">
//         Submit
//       </button>
//     </form>
//   </div>
// </div>
