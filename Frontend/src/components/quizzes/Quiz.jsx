import React, { useEffect, useState } from "react";
import Question from "../questions/Question";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
//import questionData from './questionData.json'; // Importing the question data from JSON file

const Quiz = (props) => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  // const [selectedOption, setSelectedOption] = useState('');
  // const [isSelected, setIsSelected] = useState(false);

  const handleOptionChange = (event, questionId) => {
    const selectedOption = event.target.value;
    const updatedAnswers = [...answers];
    console.log(updatedAnswers);
    updatedAnswers[questionId] = selectedOption;
    setAnswers(updatedAnswers);
    console.log(updatedAnswers);
  };

  // Handle submission of the quiz
  const handleSubmit = () => {
    // code here
    // console.log("Submitted Answers:", answers);
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/questions/quizzes/${props.quizId}`)
        .then((res) => {
          console.log(res.data);
          setQuestions(res.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, []);

  return (
    // <div>
    //   {/* <h1>Quiz</h1>
    //   Map over the questionData array and render a Question component for each question
    //   {questionData.map(question => (
    //     <Question key={question.id} question={question} />
    //   ))} */}

    //   {/* Add a submit button */}
    //    <button type="button" onClick={handleSubmit}>Submit</button>
    // </div>
    <div
      className="container"
      style={{
        backgroundColor: "#ffffcc",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "20px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      }}
    >
      {/* <h3 className="mb-3">{`Q${}. ${}`}</h3> */}
      {questions.map((question) => (
        <div className="question" key={question.question_id}>
          <h3 className="mb-3">{`Q${question.question_id}. ${question.question}`}</h3>
          <div className="form-check">
            <input
              className="form-check-input custom-radio"
              type="radio"
              name={`question${question.question_id}`}
              id={`optionA${question.question_id}`}
              value="A"
              onChange={(event) =>
                handleOptionChange(event, question.question_id)
              }
            />
            <label className="form-check-label">{question.optionA}</label>
            <br></br>
            <input
              className="form-check-input custom-radio"
              type="radio"
              name={`question${question.question_id}`}
              id={`optionB${question.question_id}`}
              value="B"
              onChange={(event) =>
                handleOptionChange(event, question.question_id)
              }
            />
            <label className="form-check-label">{question.optionB}</label>
            <br></br>
            <input
              className="form-check-input custom-radio"
              type="radio"
              name={`question${question.question_id}`}
              id={`optionC${question.question_id}`}
              value="C"
              onChange={(event) =>
                handleOptionChange(event, question.question_id)
              }
            />
            <label className="form-check-label">{question.optionC}</label>
            <br></br>
            <input
              className="form-check-input custom-radio"
              type="radio"
              name={`question${question.question_id}`}
              id={`optionD${question.question_id}`}
              value="D"
              onChange={(event) =>
                handleOptionChange(event, question.question_id)
              }
            />
            <label className="form-check-label">{question.optionD}</label>
            <br></br>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-success">
        submit
      </button>
    </div>
  );
};

export default Quiz;
