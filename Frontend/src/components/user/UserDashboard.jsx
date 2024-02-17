import React from "react";
import profilePic from "./user_profile_pic.jfif"; // Importing profile picture
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Profile from "../layout/Profile";
import Performance from "../creator/Performance";

const UserDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  //----------------------------------------
  const base64ToBlob = (base64String, contentType) => {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  // Convert base64 to blob
  const blob = base64ToBlob(currentUser.profileImg, "image/png");

  // Convert blob to URL
  const imgUrl = URL.createObjectURL(blob);
  //----------------------------------------

  const userName = currentUser.username; // Replace with user's name
  const [showModulesTable, setShowModulesTable] = useState(false); // State to track if ModulesTable should be shown
  //const [tableData,setTableData] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [performance, setPerformance] = useState(false);

  const navigate = useNavigate();
  const SignMeOut = () => {
    navigate("/sign-out");
  };
  const showProfile = () => {
    setShowUserDetails(true);
    setPerformance(false);
  };
  const showPerformance = () => {
    setShowUserDetails(false);
    setPerformance(true);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-3 px-0 bg-warning border border-danger border-5 border-start-0 rounded">
          <div className="d-flex flex-column align-items-sm-start px-10 pt-3 text-dark min-vh-100">
            <div
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark"
              title={`Hello ${userName}`}
            >
              <div className="about-avatar">
                {currentUser.profileImg === null ? (
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    title={currentUser.name}
                    alt=""
                    style={{
                      height: "40px",
                    }}
                  />
                ) : (
                  <img src={imgUrl} title="" alt="" style={{ width: "30px" }} />
                )}
              </div>
              <span className="fs-5 d-none d-sm-inline">{userName}</span>
            </div>
            {/* Sidebar Navigation */}
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={showProfile}
                >
                  <span>
                    Profile &nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={showPerformance}
                >
                  <span>
                    Quiz Performance&nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>
              </li>
            </ul>
            {/* End Sidebar Navigation */}
          </div>
          <div className="middle">
            <button
              className="btn btn-outline-dark"
              type="button"
              onClick={SignMeOut}
            >
              Logout
            </button>
          </div>
        </div>
        {/* End Sidebar */}

        {/* Main Content Area */}
        <div className="col py-3">
          {/* Otherwise, render default content */}
          {showUserDetails && <Profile />}
          {performance && <Performance />}
        </div>
        {/* End Main Content Area */}
      </div>
    </div>
  );
};

export default UserDashboard;
