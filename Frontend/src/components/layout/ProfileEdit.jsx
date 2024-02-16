import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [userInput, setUserInput] = useState({
    name: "",
    description: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");

  const handleInputChange = async (e) => {
    setFile(e.target.files[0]);
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const response = await axios.put(
        `http://localhost:7070/quizhub/images/admin1`,
        formData
      );

      if (response.status === 201) {
        console.log("Image uploaded successfully");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleSubmit = () => {};
  const handleUsernameChange = () => {};
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            <form className="form-horizontal">
              <div className="panel-body text-center">
                <div className="row">
                  <div className="col-xl-4">
                    <div className="card mb-4 mb-xl-0">
                      <div className="card-header">Edit Profile Picture</div>
                      <div className="card-body text-center">
                        {currentUser.profileImg === null ? (
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            title=""
                            alt=""
                            style={{ width: "100px" }}
                          />
                        ) : (
                          <img src={currentUser.profileImg} title="" alt="" />
                        )}
                      </div>
                      <div className="small font-italic text-muted mb-4">
                        JPG or PNG no larger than 1 MB
                      </div>
                      {/* <button className="btn btn-primary" type="button"> */}
                      <div>
                        <input
                          type="file"
                          id="imageFile"
                          accept="image/*"
                          name="profileImg"
                          onChange={handleInputChange}
                          title="choose image file"
                        />
                      </div>
                      {/* </button> */}
                    </div>
                  </div>
                </div>
              </div>

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
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">
                      New Password:{" "}
                    </label>

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
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">
                      Description:{" "}
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
