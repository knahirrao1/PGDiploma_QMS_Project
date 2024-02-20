import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";

const QuizPerformance = () => {
  const [responses, setResponses] = useState([]);
  const [guestResponses, setGuestResponses] = useState([]);
  const { openToGuest, id } = useParams();
  const open = Boolean(openToGuest);
  const quizId = parseInt(id, 10);
  console.log(quizId);
  console.log(open);

  useEffect(() => {
    const fetchResponses = async (e) => {
      await axios
        .get(`${server}/quizhub/responses/quizzes/${quizId}`)
        .then((res) => {
          setResponses(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    };
    fetchResponses();
  }, [quizId]);

  console.log(responses);
  useEffect(() => {
    const fetchResponses = async (e) => {
      await axios
        .get(`${server}/quizhub/guestresponses/${quizId}`)
        .then((res) => {
          console.log(res.data);
          setGuestResponses(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    };
    fetchResponses();
  }, [quizId]);

  console.log(guestResponses);

  return (
    <>
      <div className="container mt-4">
  <div className="row">
    <div className="col-md-6">
      <div className="table-responsive">
        <h2>Registered Users</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Username</th>
              <th>Marks</th>
              <th>Attempt No.</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((res, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{res.username}</td>
                <td>{res.marks}</td>
                <td>{res.attemptNumber}</td>
                <td>{res.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="col-md-6">
      <div className="table-responsive">
        <h2>Guest Users</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Username</th>
              <th>Marks</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {guestResponses.map((res, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{res.key.username}</td>
                <td>{res.score}</td>
                <td>{res.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default QuizPerformance;
