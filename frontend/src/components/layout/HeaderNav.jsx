import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { faAnchor } from "@fortawesome/free-solid-svg-icons";
// import profilePic from "../creator/creator_profile_pic.jpg";
// import CircularImage from "../../images/CircularImage";

function HeaderNav() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showManageUser, setShoManageUser] = useState(false);

  //-------------------------------------
  // const base64ToBlob = (base64String, contentType) => {
  //   const byteCharacters = atob(base64String);
  //   const byteArrays = [];

  //   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
  //     const slice = byteCharacters.slice(offset, offset + 512);

  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   return new Blob(byteArrays, { type: contentType });
  // };

  if (currentUser !== null) {
    // Convert base64 to blob
    //const blob = base64ToBlob(currentUser.profileImg, "image/png");
    // Convert blob to URL
    //const imgUrl = URL.createObjectURL(blob);
  } else {
    //const imgUrl = "https://bootdey.com/img/Content/avatar/avatar7.png";
  }
  //-------------------------------------

  useEffect(()=>{
    if(currentUser!==null){
      if(currentUser.userType==='A'){
        setShowContent(true);
      }
      else if(currentUser.userType==='S'){
        setShoManageUser(true);
      }
      else{
        setShowContent(false);
        setShoManageUser(false);
      }
    }
    else{
      setShowContent(false);
      setShoManageUser(false);
    }
      
  },[currentUser])

  const handleManageContentClick=()=>{
      navigate('/manage-content');
  }

  const handleManageUserClick =()=>{
    navigate('/manage-user');
  }

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
            <li className="nav-item">
              {showContent &&
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={handleManageContentClick}
                >
                  <span>
                    Manage Content &nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>}
              </li>
              <li className="nav-item">
              {showManageUser &&
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={handleManageUserClick}
                >
                  <span>
                    Manage User &nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>}
              </li>
          </ul>
        </div>
        {/* <div className="middle">
          <Link className="nav-link active" aria-current="page" to="/">
            <h4>
              <span style={{ color: "black" }}>Quiz</span>
              <span style={{ color: "rgb(255,165,0)" }}>HUB</span>
            </h4>
          </Link>
        </div> */}
        <div
          className="middle text-center"
          style={{ marginLeft: "", marginRight: "13%" }}
        >
          <Link className="nav-link active" aria-current="page" to="/">
            <h4>
              <span style={{ color: "black", fontSize: "35px" }}>Quiz</span>
              <span style={{ color: "rgb(255,165,0)", fontSize: "35px" }}>
                HUB
              </span>
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
                  {/* {currentUser.profileImg === null ? (
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      title={currentUser.name}
                      alt=""
                      style={{
                        height: "40px",
                      }}
                    />
                  ) : (
                    // <img src={currentUser.profileImg} title="" alt="" />
                    <img
                      src={currentUser.profileImg}
                      title=""
                      alt=""
                      style={{ width: "30px" }}
                    />
                  )}
                  &nbsp; */}
                  <span>{currentUser.username}</span>
                </button>
              </Link>
            </div>
          ) : (
            <div>
              {/* {currentUser.profileImg} */}
              <Link to="/admin-dashboard">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  title="Click to show profile"
                >
                  {/* {currentUser.profileImg === null ? (
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
                  )} */}

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
