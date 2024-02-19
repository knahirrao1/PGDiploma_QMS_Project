import React, { useEffect } from "react";
import { useState } from "react";
import { server } from "../../server";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faEdit,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    password: "",
    description: "",
  });
  const [userProfile, setUserProfile] = useState({});

  const userName = currentUser.username;

  //fetch user profile data
  useEffect(() => {
    fetchUserProfile();
  }, [userName]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${server}/quizhub/users/${userName}`);
      setUserProfile(response.data);
      console.log(
        `name: ${response.data.name}, description: ${response.data.name}`
      );
      setUserInput({
        name: response.data.name,
        description: response.data.description,
      });
    } catch (error) {
      toast.log(`Error fetching user data: ${error}`);
    }
  };

  // const handleInputChange

  //--------------------------------------------
  console.log(
    `userdetails: ${currentUser}, username: ${currentUser.username} and description: ${currentUser.description}`
  );

  const handleInputChange = (event) => {
    // setUserInput({ ...userInput, [event.target.name]: event.target.value });
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  //handle submit of profile management
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { ...userProfile, ...userInput };
      await axios
        .put(`${server}/quizhub/users/${currentUser.username}`, updatedProfile)
        .then(() => {
          window.location.reload();
          toast.success("User information updated successfully");
        });
      // Optionally, you can perform additional actions upon successful update
    } catch (error) {
      toast.error("Error updating user information:", error);
      // Handle error: display error message, log, etc.
    }
  };

  // handle on change for profile image
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    toast.success("Profile image can be only changed once");
  };

  const handleFileSubmit = async (e) => {
    // toast.success("Profile image can be only changed once");
    console.log("Profile image can be only changed once");
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", file);
    try {
      const response = await axios.post(
        `${server}/quizhub/images/${currentUser.username}`,
        formData
      );
      if (response.status === 201) {
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      toast.error("Error uploading image", error);
    }
  };

  //------------------------------------
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
  // -----------------------------------

  // const navigate = useNavigate();
  // const backToProfile = () => {
  //   console.log("usertype is : " + currentUser.userType);
  //   const userType = currentUser.userType;
  //   if (userType === "U") {
  //     navigate("/user-dashboard");
  //   } else if (userType === "A") {
  //     navigate("/admin-dashboard");
  //   }
  // };

  return (
    <div className="col-xs-12 col-sm-9">
      {/* <hr className="border border-light" /> */}
      {/* <div className="d-flex justify-content-center bg-warning shadow">
        <h3 className="text-dark ">Edit your profile</h3>
      </div>
      <hr className="border border-light" /> */}
      <div className="panel-body text-center">
        {/* <div className="d-flex justify-content-end">
          <button className="btn btn-dark" onClick={backToProfile}>
            <FontAwesomeIcon icon={faArrowCircleLeft} />
            &nbsp; show profile
          </button>
        </div> */}
        <div className="d-flex justify-content-center">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">
                Upload Profile Picture
                <br />
                <span className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 10 Kb
                </span>
                {/* </p> */}
              </div>
              <div className="card-body text-center">
                {currentUser.profileImg === null ? (
                  <img
                    src="https:bootdey.com/img/Content/avatar/avatar7.png"
                    title=""
                    alt=""
                    style={{ width: "100px" }}
                  />
                ) : (
                  <img src={imgUrl} title="" alt="" style={{ width: "70px" }} />
                )}
                <hr />
                {/* image submission */}
                <div className="middle">
                  <form onSubmit={handleFileSubmit}>
                    <input
                      style={{ width: "120px", overflow: "hidden" }}
                      className="btn btn-dark"
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <hr></hr>
                    <button className="btn btn-outline-success border border-5 border-outline-dark">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">User info</h4>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label className="col-sm-2 control-label">Name: </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder={currentUser.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="panel-body">
            <div className="form-group">
              <label className="col-sm-2 control-label">New Password: </label>

              <div className="col-sm-10">
                <input
                  type={visible ? "text" : "password"}
                  className="form-control"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              {visible ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label className="col-sm-2 control-label">Description: </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder={currentUser.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-success border border-5 border-outline-dark"
            type="submit"
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
