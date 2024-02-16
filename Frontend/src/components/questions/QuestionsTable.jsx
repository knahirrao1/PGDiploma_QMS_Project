import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import QuestionCreation from "./QuestionCreation";
import QuizzesTable from "../quizzes/QuizzesTable";
import { useNavigate } from "react-router-dom";

const QuestionsTable = (props) => {
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [goBackToQuiz, setGoBackToQuiz] = useState(false);
  const [id, setId] = useState(0);

  const scrollDown = useRef();

  const handleAddQuestion = () => {
    // Add new question logic
    setShowQuestionForm(true);
  };

  const handleEditQuestion = () => {
    // Edit question logic for the question at the specified index
  };

  const handleDeleteQuestion = (questionId) => {
    // Delete question logic for the question at the specified index
    axios
      .delete(`${server}/quizhub/${questionId}`)
      .then(() => {
        const updateQuestions = questions.filter(
          (question) => question.question_id !== questionId
        );
        setQuestions(updateQuestions);
      })
      .catch((error) => console.log(`error deleting question ${error}`));
  };

  //for automatically scrolling down
  useEffect(() => {
    scrollDown.current?.lastElementChild?.scrollIntoView();
  });

  //to get questions per quizzes per id
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/questions/quizzes/${props.quizId}`)
        .then((res) => {
          if (res.status === 200) {
            setQuestions(res.data);
            console.log(res.data);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, []);

  const backToQuiz = () => {
    setId(props.moduleId);
    setGoBackToQuiz(true);
  };

  return goBackToQuiz ? (
    <QuizzesTable moduleId={id} />
  ) : (
    <div
      className="container-lg mt-4"
      style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
    >
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-md-10">
                <h2>
                  Questions <b>Details</b>
                </h2>
              </div>
              <div className="col-md-2 text-end">
                <button
                  type="button"
                  className="btn btn-info add-new"
                  onClick={handleAddQuestion}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Question
                </button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Question</th>
                <th>Option A</th>
                <th>Option B</th>
                <th>Option C</th>
                <th>Option D</th>
                <th>Image</th>
                <th>Answer</th>
                <th>Explanation</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question.question_id}>
                  <td>{index + 1}</td>
                  <td>{question.question}</td>
                  <td>{question.optionA}</td>
                  <td>{question.optionB}</td>
                  <td>{question.optionC}</td>
                  <td>{question.optionD}</td>
                  <td>{question.image}</td>
                  <td>{question.correctOption}</td>
                  <td>{question.explanation}</td>
                  <td>{question.createdOn}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditQuestion(question.question_id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteQuestion(question.question_id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button type="button" className="btn btn-dark" onClick={backToQuiz}>
        <FontAwesomeIcon icon={faArrowLeft} /> Quiz Details
      </button>
      <div ref={scrollDown}>
        {showQuestionForm && <QuestionCreation quizId={props.quizId} />}
      </div>
    </div>
  );
};

export default QuestionsTable;

// const [questions, setQuestions] = useState([
//   {
//     question: "What is the capital of France?",
//     optionA: "London",
//     optionB: "Paris",
//     optionC: "Berlin",
//     optionD: "Rome",
//     image: null,
//     correctOption: "B",
//     explanation: "Paris is the capital of France",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "Which planet is known as the Red Planet?",
//     optionA: "Earth",
//     optionB: "Mars",
//     optionC: "Venus",
//     optionD: "Jupiter",
//     image: null,
//     correctOption: "B",
//     explanation: "Mars is known as the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "Who painted the Mona Lisa?",
//     optionA: "Vincent van Gogh",
//     optionB: "Leonardo da Vinci",
//     optionC: "Pablo Picasso",
//     optionD: "Michelangelo",
//     image: null,
//     correctOption: "B",
//     explanation: "Leonardo da Vinci painted the Mona Lisa.",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "What is the chemical symbol for water?",
//     optionA: "W",
//     optionB: "H2O",
//     optionC: "H",
//     optionD: "HO",
//     image: null,
//     correctOption: "B",
//     explanation: "The chemical symbol for water is H2O, indicating two hydrogen atoms and one oxygen atom.",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "Who wrote 'Romeo and Juliet'?",
//     optionA: "William Shakespeare",
//     optionB: "Jane Austen",
//     optionC: "Charles Dickens",
//     optionD: "Mark Twain",
//     image: null,
//     correctOption: "A",
//     explanation: "William Shakespeare wrote 'Romeo and Juliet'.",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "What is the tallest mammal?",
//     optionA: "Giraffe",
//     optionB: "Elephant",
//     optionC: "Kangaroo",
//     optionD: "Horse",
//     image: null,
//     correctOption: "A",
//     explanation: "The tallest mammal is the Giraffe.",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "What is the chemical symbol for gold?",
//     optionA: "Au",
//     optionB: "Ag",
//     optionC: "Ag",
//     optionD: "Go",
//     image: null,
//     correctOption: "A",
//     explanation: "The chemical symbol for gold is Au.",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "Which planet is closest to the Sun?",
//     optionA: "Earth",
//     optionB: "Mercury",
//     optionC: "Mars",
//     optionD: "Venus",
//     image: null,
//     correctOption: "B",
//     explanation: "Mercury is the planet closest to the Sun.",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "Who is known as the father of modern physics?",
//     optionA: "Isaac Newton",
//     optionB: "Albert Einstein",
//     optionC: "Galileo Galilei",
//     optionD: "Nikola Tesla",
//     image: null,
//     correctOption: "B",
//     explanation: "Albert Einstein is known as the father of modern physics.",
//     createdOn: "2024-02-12"
//   },
//   {
//     question: "What is the largest organ in the human body?",
//     optionA: "Heart",
//     optionB: "Liver",
//     optionC: "Skin",
//     optionD: "Brain",
//     image: null,
//     correctOption: "C",
//     explanation: "The largest organ in the human body is the skin.",
//     createdOn: "2024-02-12"
//   }
// ]);
