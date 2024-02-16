import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";
import profilePic from "../creator/creator_profile_pic.jpg";
import CircularImage from "../../images/CircularImage";

function HeaderNav() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid">
        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
        <div className="left" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="./about-us"
              >
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="./module-list"
              >
                {/* <button className="btn btn-dark" type="button"> */}
                Module Lists
                {/* </button> */}
              </Link>
            </li>
          </ul>
        </div>
        <div className="middle">
          <Link className="nav-link active" aria-current="page" to="/">
            <h4>
              <span style={{ color: "black" }}>Quiz</span>
              <span style={{ color: "rgb(255,165,0)" }}>HUB</span>
            </h4>
          </Link>
        </div>

        {/* start----------------top right login side operations----------------------*/}
        {currentUser ? (
          currentUser.userType === "U" ? (
            <div>
              <Link to="/user-dashboard">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  title="Click to show profile"
                >
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
                  &nbsp;
                  <span>{currentUser.username}</span>
                </button>
              </Link>
            </div>
          ) : (
            <div>
              {currentUser.profileImg}
              <Link to="/admin-dashboard">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  title="Click to show profile"
                >
                  {currentUser.profileImg === null ? (
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      title={currentUser.name}
                      alt=""
                      style={{
                        height: "30px",
                      }}
                    />
                  ) : (
                    <img src={currentUser.profileImg} title="" alt="" />
                  )}

                  {currentUser.username}
                  {/* Click to toggle popover */}
                </button>
              </Link>
            </div>
          )
        ) : (
          <div>
            <Link className="left" aria-current="page" to="/sign-in">
              <button type="button" className="btn btn-dark">
                Login
              </button>
            </Link>
          </div>
        )}

        {/* end----------------top right login side operations----------------------*/}
      </div>
    </nav>
  );
}

export default HeaderNav;

// {currentUser ? (
//   currentUser.userType === "U" ? (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "#f0f0f0",
//         padding: "20px",
//       }}
//     >
//       <select
//         style={{
//           padding: "10px",
//           fontSize: "16px",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//         }}
//       >
//         {/*change as per the json recieved from the backend */}
//         <option>{currentUser.profileImg}</option>
//         <option>{currentUser.username}</option>
//         <option>{currentUser.email}</option>
//         <option>{currentUser.userType}</option>
//       </select>
//       <Link className="left" aria-current="page" to="/user-dashboard">
//         <button type="button" className="btn btn-dark">
//           view profile
//         </button>
//       </Link>
//     </div>
//   ) : (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "#f0f0f0",
//         padding: "20px",
//       }}
//     >
//       <select
//         style={{
//           padding: "10px",
//           fontSize: "16px",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//         }}
//       >
//         <option>{currentUser.profileImg}</option>
//         {/*change as per the json recieved from the backend */}
//         <option>{currentUser.username}</option>
//         <option>{currentUser.email}</option>
//         <option>{currentUser.userType}</option>
//       </select>
//       <Link className="left" aria-current="page" to="/admin-dashboard">
//         <button type="button" className="btn btn-dark">
//           view profile
//         </button>
//       </Link>
//     </div>
//   )
// ) : (
// link of normal login
// )}
