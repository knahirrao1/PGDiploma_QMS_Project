import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  const handleDeleteUser = (username) => {
     axios
      .delete(`${server}/quizhub/users/${username}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.message);
        const updateUsers = users.filter(
            (user) => user.username !== username
          );
          setUsers(updateUsers);
        //window.location.reload(true);
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      await axios
        .get(`${server}/quizhub/users`)
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="table-responsive">
      <div className="table-wrapper">
        {/* <div className="table-title">
          <div className="row">
            <div className="col-md-8">
              <h2>
                Modules <b>Details</b>
              </h2>
            </div>
            <div className="col-md-4 text-end">
              <button
                type="button"
                className="btn btn-info add-new"
                onClick={handleAddModule}
              >
                <FontAwesomeIcon icon={faPlus} /> Add New Module
              </button>
            </div>
          </div>
        </div> */}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>{user.createdAt}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDeleteUser(user.username)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> {/* Trash icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
