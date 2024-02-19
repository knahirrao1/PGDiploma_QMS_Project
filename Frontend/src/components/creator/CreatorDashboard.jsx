import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Profile from "../layout/Profile";
import Performance from "./Performance";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/UserSlice";
import ModuleTable from "../modules/ModulesTable";

const CreatorDashboard = () => {
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
  const [performance, setPerformance] = useState(false);

  const handleManageContentClick = async () => {
    setShowModulesTable(true);
    setShowUserDetails(false);
    setPerformance(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SignMeOut = () => {
    // navigate("/sign-out");

    // Implement sign-out logic here
    // For example, clear user session, remove tokens, etc.
    // Then redirect the user to the sign-in page or any other appropriate pag
    navigate("/");
    window.location.reload(true);
    dispatch(signOutSuccess());
    toast.success("Log out successful");
  };
  const [showUserDetails, setShowUserDetails] = useState(true);
  const showProfile = () => {
    setShowUserDetails(true);
    setShowModulesTable(false);
    setPerformance(false);
  };
  const showPerformance = () => {
    setPerformance(true);
    setShowUserDetails(false);
    setShowModulesTable(false);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="shadow col-auto col-md-3 col-xl-2 px-sm-3 px-0 bg-warning bg-opacity-75 border border-start-0 rounded">
          <div className="d-flex flex-column align-items-sm-start px-10 pt-3 text-dark min-vh-100">
            <div
              className="d-flex align-items-center"
              title={`Hello ${userName}`}
            >
              {/* <div className="rounded-circle border border-dark p-1">
                <img
                  src={imageUrl}
                  className="rounded-circle img-fluid"
                  alt="Rounded"
                />
              </div> */}
              <div className="d-flex justify-content-start">
                <span className="fs-5 d-none d-sm-inline">
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
                    <img
                      src={imgUrl}
                      className="rounded-circle img-fluid"
                      alt="Rounded"
                      style={{
                        width: "20px",
                        height: "20px",
                        overflow: "clip",
                      }}
                    />
                  )}
                  <div>{userName}</div>
                </span>
              </div>
              <div className="ms-3">
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={SignMeOut}
                >
                  Logout
                </button>
              </div>
            </div>
            <hr />
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
        </div>
        {/* End Sidebar */}

        {/* Main Content Area */}
        <div className="col py-3">
          {/* Render ModulesTable if showModulesTable is true */}
          {showModulesTable && <ModuleTable />}
          {/* Otherwise, render default content */}
          {showUserDetails && <Profile />}
          {performance && <Performance />}
        </div>
        {/* End Main Content Area */}
      </div>
    </div>
  );
};

export default CreatorDashboard;
