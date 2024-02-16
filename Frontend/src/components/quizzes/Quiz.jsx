import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
//import { useNavigate } from 'react-router-dom';
//import questionData from './questionData.json'; // Importing the question data from JSON file

const Quiz = (props) => {
  const [answers, setAnswers] = useState(new Map());
  const [questions, setQuestions] = useState([]);
  const [idList, setIdList] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  //const navigate = useNavigate();
  //const [marks, setMarks] = useState(0);

  const handleSubmit = async (event) => {
    //converting the keys datatype from string to number
    const properAnswers = new Map();
    for (const [key, value] of answers.entries()) {
      properAnswers.set(parseInt(key, 10), value);
    }
    //assigning X to the questions that are left unattempted
    for (let i = 0; i < idList.length; i++) {
      if (!properAnswers.has(idList[i])) {
        console.log(idList[i]);
        properAnswers.set(idList[i], "X");
      }
    }
    //sorting the responses
    const sortedArray = Array.from(properAnswers).sort(
      ([key1], [key2]) => key1 - key2
    ); //[key1], [key2]: This part is known as parameter destructuring, similar to comparatorin java
    //const sortedAnswers = new Map([...properAnswers.entries()].sort())   not the correct way since it gave inconsistent output
    const sortedAnswers = new Map(sortedArray);
    console.log(sortedAnswers);

    //converting the map to string
    const userResponse = Array.from(sortedAnswers.values()).join("");
    console.log(userResponse);

    //calculating marks
    const correctOptions = questions.map((question) => question.correctOption);
    const userSelectedOptions = Array.from(sortedAnswers.values());
    console.log(correctOptions);
    console.log(userSelectedOptions);
    let userMarks = 0;
    for (let i = 0; i < idList.length; i++) {
      if (
        correctOptions[i].toUpperCase() === userSelectedOptions[i].toUpperCase()
      )
        userMarks++;
    }
    console.log(userMarks);

    const quizData = {
      quizId: props.quizId,
      username: currentUser.username,
      marks: userMarks,
      response: userResponse,
    };

    event.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    await axios
      .post(`${server}/quizhub/responses`, quizData, config)
      .then((res) => {
        console.log(res.data);
        //navigate("/response");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  useEffect(() => {
    //loading the questions
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/questions/quizzes/${props.quizId}`)
        .then((res) => {
          setQuestions(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, [props.quizId]);

  useEffect(() => {
    //storing an array of question_id in a state
    let index = 0;
    questions.map((question) => {
      setIdList((prevIdList) => {
        const newIdList = [...prevIdList];
        newIdList[index++] = question.question_id;
        return newIdList;
      });
      return question;
    });
  }, [questions]);

  const handleOptionChange = (event) => {
    //storing answers in a map in such a way that question_id is key and option selected is value
    const selectedOption = event.target.id;
    const id = event.target.value;
    console.log(id, selectedOption);

    setAnswers((prevAnswers) => {
      const updatedAnswers = new Map([...prevAnswers]);
      updatedAnswers.set(id, selectedOption);
      return updatedAnswers;
    });
  };

  let count = 0;
  return (
    <>
      {/* <h3 className="mb-3">{`Q${}. ${}`}</h3> */}
      {questions.map((question) => (
        <div
          key={question.question_id}
          className="container"
          style={{
            backgroundColor: "#ffffcc",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "20px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          }}
        >
          <div className="question">
            <h3 className="mb-3">{`Q${++count}. ${question.question}`}</h3>
            <div className="form-check">
              <input
                className="form-check-input custom-radio"
                type="radio"
                // checked={isSelected}
                name={`question${question.question_id}`}
                id="A"
                value={question.question_id}
                onChange={(event) => {
                  handleOptionChange(event, question.question_id);
                }}
              />
              <label className="form-check-label">{question.optionA}</label>
              <br></br>
              <input
                className="form-check-input custom-radio"
                type="radio"
                // checked={isSelected}
                name={`question${question.question_id}`}
                id="B"
                value={question.question_id}
                onChange={(event) => {
                  handleOptionChange(event, question.question_id);
                }}
              />
              <label className="form-check-label">{question.optionB}</label>
              <br></br>
              <input
                className="form-check-input custom-radio"
                type="radio"
                // checked={isSelected}
                name={`question${question.question_id}`}
                id="C"
                value={question.question_id}
                onChange={(event) => {
                  handleOptionChange(event, question.question_id);
                }}
              />
              <label className="form-check-label">{question.optionC}</label>
              <br></br>
              <input
                className="form-check-input custom-radio"
                type="radio"
                // checked={isSelected}
                name={`question${question.question_id}`}
                id="D"
                value={question.question_id}
                onChange={(event) => {
                  handleOptionChange(event, question.question_id);
                }}
              />
              <label className="form-check-label">{question.optionD}</label>
              <br></br>
            </div>
          </div>
        </div>
      ))}
      <button type="submit" className="btn btn-success" onClick={handleSubmit}>
        submit
      </button>
    </>
  );
};

export default Quiz;
