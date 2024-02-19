import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
// import QuestionCreation from "./QuestionCreation";
// import QuizzesTable from "../quizzes/QuizzesTable";
import { useLocation } from "react-router-dom";

const QuestionsTable = () => {
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  //const [goBackToQuiz, setGoBackToQuiz] = useState(false);
  //const [id, setId] = useState(0);
  // const{module_Id,quiz_Id} = useParams();
  // const moduleId = parseInt(module_Id);
  // const quizId = parseInt(quiz_Id);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const moduleId = parseInt(searchParams.get("moduleId"));
  const quizId = parseInt(searchParams.get("quizId"));

  const scrollDown = useRef();
  const [inputQuestion, setInputQuestion] = useState({
    question: "",
    image: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "",
    explanation: "",
  });

  const handleInputChange = (e) => {
    setInputQuestion({
      ...inputQuestion,
      [e.target.name]: e.target.value,
    });
    console.log(inputQuestion);
  };

  const handleQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setShowQuestionForm(false); // Assuming you want to hide the module form after adding
  };

  const handleQuestionSumbit = async (e) => {
    e.preventDefault();
    try {
      const createdAt = new Date().toISOString();
      const responseData = {
        ...inputQuestion,
        createdAt,
        quizId: quizId,
      };
      const response = await axios.post(
        `${server}/quizhub/questions/${quizId}`,
        responseData
      );
      handleQuestion(response.data);
      toast.success('Question added successfully!');
      console.log(response.data);
    } catch (error) {
      console.log(`Error occured adding question : ${error}`);
    }
  };

  const handleAddQuestion = () => {
    // Add new question logic
    setShowQuestionForm(true);
  };

  // const handleEditQuestion = () => {
  //   // Edit question logic for the question at the specified index
  // };

  // const handleDeleteQuestion = (questionId) => {
  //   // Delete question logic for the question at the specified index
  //   axios
  //     .delete(`${server}/quizhub/${questionId}`)
  //     .then(() => {
  //       const updateQuestions = questions.filter(
  //         (question) => question.question_id !== questionId
  //       );
  //       setQuestions(updateQuestions);
  //     })
  //     .catch((error) => console.log(`error deleting question ${error}`));
  // };

  //for automatically scrolling down
  // useEffect(() => {
  //   scrollDown.current.scrollIntoView();
  // });

  //to get questions per quizzes per id
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/questions/quizzes/${quizId}`)
        .then((res) => {
          if (res.status === 200) {
            setQuestions(res.data);
            console.log(res.data);
          }
        })
        .catch((error) => {
          //toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, [quizId]);

  // const backToQuiz = () => {
  //   setId(moduleId);
  //   setGoBackToQuiz(true);
  // };

  return (
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
                {/* <th>Image</th> */}
                <th>Answer</th>
                <th>Explanation</th>
                <th>Date</th>
                {/* <th>Actions</th> */}
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
                  {/* <td>{question.image}</td> */}
                  <td>{question.correctOption}</td>
                  <td>{question.explanation}</td>
                  <td>{question.createdAt}</td>
                  {/* <td>
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <button type="button" className="btn btn-dark" onClick={backToQuiz}>
        <FontAwesomeIcon icon={faArrowLeft} /> Quiz Details
      </button> */}
      <div ref={scrollDown}>
      {/* <div> */}
        {showQuestionForm && (
          <div className="container mt-5 p-5 rounded border">
            <div className="row">
              <div className="col-md-20 mx-auto">
                <h1 className="text-center mb-4">Create New Question</h1>
                <form onSubmit={handleQuestionSumbit}>
                  <div className="form-group row mb-4">
                    {/* Added mb-4 for vertical space */}
                    <label
                      htmlFor="question"
                      className="col-sm-3 col-form-label"
                    >
                      Question
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        id="question"
                        name="question"
                        placeholder="What is the capital of India?"
                        rows="4"
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>

                  {/* <div className="form-group row mb-4">
                    <label htmlFor="image" className="col-sm-3 col-form-label">
                      Upload Image
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="image"
                          name="image"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div> */}

                  <div className="form-group row mb-4">
                    {/* Added mb-4 for vertical space */}
                    <label
                      htmlFor="optionA"
                      className="col-sm-3 col-form-label"
                    >
                      Option A
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="optionA"
                        name="optionA"
                        placeholder="Dongri"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-4">
                    {/* Added mb-4 for vertical space */}
                    <label
                      htmlFor="optionB"
                      className="col-sm-3 col-form-label"
                    >
                      Option B
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="optionB"
                        name="optionB"
                        placeholder="Delhi"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-4">
                    {/* Added mb-4 for vertical space */}
                    <label
                      htmlFor="optionC"
                      className="col-sm-3 col-form-label"
                    >
                      Option C
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="optionC"
                        name="optionC"
                        placeholder="Bhosri"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-4">
                    {/* Added mb-4 for vertical space */}
                    <label
                      htmlFor="optionD"
                      className="col-sm-3 col-form-label"
                    >
                      Option D
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="optionD"
                        name="optionD"
                        placeholder="Talegaon"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-4">
                    {" "}
                    {/* Added mb-4 for vertical space */}
                    <label
                      htmlFor="correctAnswer"
                      className="col-sm-3 col-form-label"
                    >
                      Correct Answer
                    </label>
                    <div className="form-check mr-4">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="correctAnswer"
                        name="correctOption"
                        value="A"
                        onChange={handleInputChange}
                        required
                      />
                      <label
                        className="form-check-label mr-3"
                        htmlFor="guestAccessYes"
                      >
                        A
                      </label>
                      </div>
                      <div className="form-check mr-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="correctAnswer"
                          name="correctOption"
                          value="B"
                          onChange={handleInputChange}
                          required
                        />
                        <label
                          className="form-check-label mr-3"
                          htmlFor="guestAccessYes"
                        >
                          B
                        </label>
                      </div>
                      <div className="form-check mr-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="correctAnswer"
                          name="correctOption"
                          value="C"
                          onChange={handleInputChange}
                          required
                        />
                        <label
                          className="form-check-label mr-3"
                          htmlFor="guestAccessYes"
                        >
                          C
                        </label>
                      </div>

                      <div className="form-check mr-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="correctAnswer"
                          name="correctOption"
                          value="D"
                          onChange={handleInputChange}
                          required
                        />
                        <label
                          className="form-check-label mr-3"
                          htmlFor="guestAccessYes"
                        >
                          D
                        </label>
                      </div>
                    </div>

                  <div className="form-group row mb-4">
                    {/* Added mb-4 for vertical space */}
                    <label
                      htmlFor="explanation"
                      className="col-sm-3 col-form-label"
                    >
                      Explanation
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        id="explanation"
                        name="explanation"
                        placeholder="Because Delhi is the capital of India"
                        onChange={handleInputChange}
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
        )}
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
