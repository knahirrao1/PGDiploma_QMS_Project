import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowRight,
  faCircleInfo,
  faClock,
  faColonSign,
  faEdit,
  faEnvelope,
  faEnvelopeOpenText,
  faEquals,
  faInbox,
  faInfo,
  faMagic,
  faShoePrints,
  faSignIn,
  faSignature,
  faUserTie,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import ProfileEdit from "../layout/ProfileEdit";
import { server } from "../../server";
import axios from "axios";

const Profile = () => {
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
  const [editProfile, setEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  console.log(currentUser);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/quizhub/users/${currentUser.username}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setUserDetails(res.data);
          }
        })
        .catch((error) => {
          console.log("fetching modules failed ", error);
          // toast.error(error.response.data.message);
        });
    };
    fetchData();
  }, []);

  const showEditProfile = () => {
    setEditProfile(true);
  };

  return editProfile ? (
    <ProfileEdit />
  ) : (
    <div className="shadow-sm border border-warning border-4 rounded">
      <div className="row align-items-center flex-row-reverse">
        <div className="col-lg-6">
          <div className="about-text go-to">
            <h3 className="dark-color">
              About Me &nbsp;
              <button
                className="btn btn-outline-dark"
                onClick={showEditProfile}
              >
                <FontAwesomeIcon icon={faEdit} /> &nbsp;Edit
              </button>
            </h3>
            <p>{currentUser.description}</p>
            <div className="row about-list">
              <div className="col-md-6">
                <div className="media">
                  <label className="fs-5">
                    {" "}
                    <FontAwesomeIcon icon={faSignature} /> &nbsp; Name
                  </label>
                  <p>{userDetails.name}</p>
                </div>
                <div className="media">
                  <label className="fs-5">
                    <FontAwesomeIcon icon={faCircleInfo} /> &nbsp;Description
                  </label>
                  <p>{userDetails.description}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="media">
                  <label className="fs-5">
                    {" "}
                    <FontAwesomeIcon icon={faEnvelope} />
                    &nbsp; E-mail
                  </label>
                  <p>{currentUser.email}</p>
                </div>
                <div className="media">
                  <label className="fs-5">
                    {" "}
                    <FontAwesomeIcon icon={faUserTie} />
                    &nbsp; Designation
                  </label>
                  <p>{currentUser.userType === "U" ? "User" : "Admin"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          {currentUser.profileImg === null ? (
            <img
              className="shadow-sm p-4"
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              title="Profile photo is not set"
              alt=""
              style={{ width: "300px" }}
            />
          ) : (
            <img
              className="shadow-sm p-4"
              src={imgUrl}
              title=""
              alt=""
              style={{ width: "300px" }}
            />
          )}
        </div>
      </div>
      {/* {currentUser.userType === "A" ? (
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
      )} */}
    </div>
  );
};

export default Profile;
