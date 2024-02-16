import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProfileEdit from "../layout/ProfileEdit";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [editProfile, setEditProfile] = useState(false);
  console.log(currentUser);

  const showEditProfile = () => {
    setEditProfile(true);
  };

  return editProfile ? (
    <ProfileEdit />
  ) : (
    <div className="container">
      <div className="row align-items-center flex-row-reverse">
        <div className="col-lg-6">
          <div className="about-text go-to">
            <h3 className="dark-color">
              About Me &nbsp;
              <button
                className="btn btn-outline-primary"
                onClick={showEditProfile}
              >
                <FontAwesomeIcon icon={faEdit} /> &nbsp;Edit
              </button>
            </h3>
            <p>{currentUser.description}</p>
            <div className="row about-list">
              <div className="col-md-6">
                <div className="media">
                  <label>Name</label>
                  <p>{currentUser.name}</p>
                </div>
                <div className="media">
                  <label>Created At</label>
                  <p>{currentUser.createdAt}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="media">
                  <label>E-mail</label>
                  <p>{currentUser.email}</p>
                </div>
                <div className="media">
                  <label>Designation</label>
                  <p>{currentUser.userType === "U" ? "User" : "Admin"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-avatar">
            {currentUser.profileImg === null ? (
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                title=""
                alt=""
              />
            ) : (
              <img src={currentUser.profileImg} title="" alt="" />
            )}
          </div>
        </div>
      </div>
      {currentUser.userType === "A" ? (
        <div className="border border-dark border-5">
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="count-data text-center">
                <h6 className="count h2">500</h6>
                <p className="m-0px font-w-600">Modules</p>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="count-data text-center">
                <h6 className="count h2">150</h6>
                <p className="m-0px font-w-600">Quizzes</p>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="count-data text-center">
                <h6 className="count h2">850</h6>
                <p className="m-0px font-w-600">Questions</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
