import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faPlus,
  faAnchor,
  fa0,
  faAdjust,
  faAlignLeft,
  faAngleLeft,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import QuestionsTable from "../questions/QuestionsTable";
import QuizCreation from "./QuizCreation";
import ModulesTable from "../modules/ModulesTable";

const QuizzesTable = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [id, setId] = useState(0);
  const [goBackToModules, setGoBackToModule] = useState(false);

  const scrollDown = useRef();

  const handleAddQuiz = () => {
    // Add new quiz logic
    setShowQuiz(true);
  };
  useEffect(() => {
    scrollDown.current?.lastElementChild?.scrollIntoView();
  });

  const handleEditQuiz = () => {
    // Edit quiz logic for the quiz at the specified index
  };

  const handleDeleteQuiz = (quizId) => {
    // Delete quiz logic for the quiz at the specified index
    axios
      .delete(`${server}/quizhub/quizzes/${quizId}`)
      .then(() => {
        const updateQuizzes = quizzes.filter((quiz) => quiz.quizId !== quizId);
        setQuizzes(updateQuizzes);
      })
      .catch((error) => {
        console.log("failed deleating quiz " + error);
      });
  };

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

  const backToModule = () => {
    setGoBackToModule(true);
  };

  return showQuestions ? (
    <QuestionsTable quizId={id} />
  ) : goBackToModules ? (
    <ModulesTable />
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
                <button
                  type="button"
                  className="btn btn-info add-new"
                  onClick={handleAddQuiz}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Quiz
                </button>
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
                      className="btn btn-primary me-2"
                      onClick={() => handleEditQuiz()}
                    >
                      <FontAwesomeIcon icon={faEdit} /> {/* Edit icon */}
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteQuiz(quiz.quizId)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleViewQuestions(quiz.quizId)}
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
      <button type="button" className="btn btn-dark" onClick={backToModule}>
        <FontAwesomeIcon icon={faArrowLeft} /> Module Details
      </button>
      <div ref={scrollDown}>
        {showQuiz && <QuizCreation moduleId={props.moduleId} />}
      </div>
    </div>
  );
  // return showQuestions ? (
  //   <QuestionsTable quizId={id} />
  // ) : (
  //   <div
  //     className="container-lg mt-4"
  //     style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
  //   >
  //     <div className="table-responsive">
  //       <div className="table-wrapper">
  //         <div className="table-title">
  //           <div className="row">
  //             <div className="col-md-8">
  //               <h2>
  //                 Quizzes <b>Details</b>
  //               </h2>
  //             </div>
  //             <div className="col-md-4 text-end">
  //               <button
  //                 type="button"
  //                 className="btn btn-info add-new"
  //                 onClick={handleAddQuiz}
  //               >
  //                 <FontAwesomeIcon icon={faPlus} /> Add New Quiz
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //         <table className="table table-striped table-bordered">
  //           <thead>
  //             <tr>
  //               <th>No.</th>
  //               <th>Title</th>
  //               <th>Number of Questions</th>
  //               <th>Open to Guest</th>
  //               <th>Number of Attempts</th>
  //               <th>Created On</th>
  //               <th>Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {quizzes.map((quiz) => (
  //               <tr key={quiz.quizId}>
  //                 <td>{quiz.quizId}</td>
  //                 <td>{quiz.title}</td>
  //                 <td className="text-center">{quiz.numberOfQuestions}</td>
  //                 <td className="text-center">
  //                   {quiz.openToGuest ? "yes" : "no"}
  //                 </td>
  //                 <td className="text-center">{quiz.totalAttempted}</td>
  //                 <td>{quiz.createdAt}</td>
  //                 <td>
  //                   <button
  //                     className="btn btn-primary me-2"
  //                     onClick={() => handleEditQuiz()}
  //                   >
  //                     <FontAwesomeIcon icon={faEdit} /> {/* Edit icon */}
  //                   </button>
  //                   <button
  //                     className="btn btn-danger me-2"
  //                     onClick={() => handleDeleteQuiz(quiz.quizId)}
  //                   >
  //                     <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
  //                   </button>
  //                   <button
  //                     className="btn btn-success"
  //                     onClick={() => handleViewQuestions(quiz.quizId)}
  //                   >
  //                     <FontAwesomeIcon icon={faEye} /> {/* View icon */}
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //     <button type="button" className="btn btn-dark" onClick={backToModule}>
  //       <FontAwesomeIcon icon={faAnchor} /> Go back to module
  //     </button>
  //     <div ref={scrollDown}>
  //       {showQuiz && <QuizCreation moduleId={props.moduleId} />}
  //     </div>
  //   </div>
  // );
};

export default QuizzesTable;

// const [quizzes, setQuizzes] = useState([
//   {
//     title: "Circular Motion",
//     numberOfQuestions: "13",
//     openToGuest: "Yes",
//     numberOfAttempts: "2",
//     createdOn: "2022-02-12"
//   },
//   {
//     title: "Newton's Laws of Motion",
//     numberOfQuestions: "15",
//     openToGuest: "No",
//     numberOfAttempts: "3",
//     createdOn: "2022-02-13"
//   },
//   {
//     title: "Electricity and Magnetism",
//     numberOfQuestions: "10",
//     openToGuest: "Yes",
//     numberOfAttempts: "1",
//     createdOn: "2022-02-14"
//   },
//   {
//     title: "Thermodynamics",
//     numberOfQuestions: "20",
//     openToGuest: "Yes",
//     numberOfAttempts: "2",
//     createdOn: "2022-02-15"
//   },
//   {
//     title: "Optics and Light",
//     numberOfQuestions: "18",
//     openToGuest: "No",
//     numberOfAttempts: "3",
//     createdOn: "2022-02-16"
//   },
//   {
//     title: "Quantum Mechanics",
//     numberOfQuestions: "25",
//     openToGuest: "Yes",
//     numberOfAttempts: "1",
//     createdOn: "2022-02-17"
//   },
//   {
//     title: "Special Theory of Relativity",
//     numberOfQuestions: "12",
//     openToGuest: "Yes",
//     numberOfAttempts: "2",
//     createdOn: "2022-02-18"
//   },
//   {
//     title: "Waves and Oscillations",
//     numberOfQuestions: "16",
//     openToGuest: "No",
//     numberOfAttempts: "3",
//     createdOn: "2022-02-19"
//   },
//   {
//     title: "Nuclear Physics",
//     numberOfQuestions: "20",
//     openToGuest: "Yes",
//     numberOfAttempts: "1",
//     createdOn: "2022-02-20"
//   },
//   {
//     title: "Astrophysics",
//     numberOfQuestions: "22",
//     openToGuest: "Yes",
//     numberOfAttempts: "2",
//     createdOn: "2022-02-21"
//   }
// ]);
