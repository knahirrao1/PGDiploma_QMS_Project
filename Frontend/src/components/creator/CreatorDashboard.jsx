import React, { useState } from "react";
import profilePic from "./creator_profile_pic.jpg"; // Importing profile picture
import ModulesTable from "../modules/ModulesTable"; // Importing ModulesTable component
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Profile from "../layout/Profile";

const CreatorDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userName = currentUser.username; // Replace with user's name
  const [showModulesTable, setShowModulesTable] = useState(false); // State to track if ModulesTable should be shown
  //const [tableData,setTableData] = useState([]);

  const handleManageContentClick = async () => {
    setShowModulesTable(true);
    setShowUserDetails(false);
  };
  const navigate = useNavigate();
  const SignMeOut = () => {
    navigate("/sign-out");
  };
  const [showUserDetails, setShowUserDetails] = useState(false);
  const showProfile = () => {
    setShowUserDetails(true);
    setShowModulesTable(false);
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
                  <img src={currentUser.profileImg} title="" alt="" />
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
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={handleManageContentClick}
                >
                  <span>
                    Manage Content &nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>
              </li>
              <li>
                <button type="button" className="btn btn-outline-dark">
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
          {/* Render ModulesTable if showModulesTable is true */}
          {showModulesTable && <ModulesTable />}
          {/* Otherwise, render default content */}
          {showUserDetails && <Profile />}
        </div>
        {/* End Main Content Area */}
      </div>
    </div>
  );
};

export default CreatorDashboard;
