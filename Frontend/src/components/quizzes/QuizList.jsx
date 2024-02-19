import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
//import Promt from "./Prompt";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "./Quiz";

const QuizList = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  //const [showPromt, setShowPromt] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [id, setId] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { module_id } = useParams();
  const moduleId = parseInt(module_id);

  const handleViewQuestions = (quizId) => {
    // View quiz logic for the quiz at the specified index
    setId(quizId);
    console.log(quizzes);
    console.log(quizId);
    console.log(currentUser);
    console.log(quizzes.get(quizId).openToGuest);

    if (quizzes.get(quizId).openToGuest === true) {
      if (currentUser === null) {
        //setShowPromt(true);
        navigate(`/prompt/${quizId}`);
      } else {
        //setShowQuiz(true);
        navigate(`/questions/${quizId}/${currentUser.username}`);
      }
    } else {
      if (currentUser === null) {
        toast.warning("To attempt closed quiz, please Sign-In to continue");
        //navigate('/sign-in')
      } else {
        //setShowPromt(true);
        //navigate(`/prompt/${quizId}`)
        navigate(`/questions/${quizId}/${currentUser.username}`);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/quizzes/modules/${moduleId}`)
        .then((res) => {
          if (res.status === 200) {
            const newQuiz = new Map();
            res.data.forEach((quiz) => {
              newQuiz.set(quiz.quizId, quiz);
            });
            setQuizzes(newQuiz);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, [moduleId]);

  let count = 0;
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
                  Quizzes <b>Details</b>
                </h2>
              </div>
              <div className="col-md-4 text-end">
                {/* <button type="button" className="btn btn-info add-new" onClick={handleAddQuiz}>
                                  <FontAwesomeIcon icon={faPlus} /> Add New Quiz
                              </button> */}
              </div>
            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Number of Questions</th>
                <th>Open to Guest</th>
                <th>Number of Attempts</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(quizzes.values()).map((quiz) => (
                <tr key={quiz.quizId}>
                  <td>{++count}</td>
                  <td>{quiz.title}</td>
                  <td className="text-center">{quiz.numberOfQuestions}</td>
                  <td className="text-center">
                    {quiz.openToGuest ? "yes" : "no"}
                  </td>
                  <td className="text-center">{quiz.totalAttempted}</td>
                  <td>{quiz.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleViewQuestions(quiz.quizId)}
                    >
                      {/* <FontAwesomeIcon icon={faEye} /> View icon */}
                      Enter Quiz
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
};

export default QuizList;
