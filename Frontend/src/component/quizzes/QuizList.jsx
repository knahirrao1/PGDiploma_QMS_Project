import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Quiz from "./Quiz";
// import Font;

const QuizList = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [id, setId] = useState(0);

  const handleViewQuestions = (quizId) => {
    // View quiz logic for the quiz at the specified index
    setId(quizId);
    setShowQuestions(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/quizzes/modules/${props.moduleId}`)
        .then((res) => {
          if (res.status === 200) {
            setQuizzes(res.data);
            console.log(res.data);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, []);

  return showQuestions ? (
    <Quiz quizId={id} />
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
              {quizzes.map((quiz) => (
                <tr key={quiz.quizId}>
                  <td>{quiz.quizId}</td>
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
