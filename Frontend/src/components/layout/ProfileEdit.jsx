import React from "react";
import { useState } from "react";
import { server } from "../../server";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ProfileEdit = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  const [userInput, setUserInput] = useState({
    name: currentUser.name,
    password: "",
    description: currentUser.description,
  });

  const handleInputChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`${server}/quizhub/users/${currentUser.username}`, userInput)
        .then(() => {
          console.log(`updated profile: ${userInput}`);
          window.location.reload();
        });
    } catch (error) {
      console.log(`error occured submitting: ${error}`);
    }
  };

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const response = await axios.post(
        `${server}/quizhub/images/${currentUser.username}`,
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

  return (
    <div className="col-xs-12 col-sm-9">
      <div className="panel-body text-center">
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Edit Profile Picture</div>
              <div className="card-body text-center">
                {currentUser.profileImg === null ? (
                  <img
                    src="https:bootdey.com/img/Content/avatar/avatar7.png"
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
                  onChange={handleFileChange}
                />
              </div>
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
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
        <button className="btn btn-success" type="submit">
          <FontAwesomeIcon icon={faEdit} />
          Edit
        </button>
      </form>
    </div>
  );
  // const { currentUser } = useSelector((state) => state.user);
  // const [file, setFile] = useState(null);
  // const [userInput, setUserInput] = useState({
  //   name: currentUser.name,
  //   password: "",
  //   description: currentUser.description,
  // });
  // const [visible, setVisible] = useState(false);

  // const handleInputChange = (event) => {
  //   // const { name, value, files } = event.target;
  //   // setUserInput((newState) => ({
  //   //   ...newState,
  //   //   [name]: name === "profileImg" ? files[0] : value,
  //   // }));
  //   setUserInput({ ...userInput, [event.target.name]: event.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   setFile(e.target.files[0]);
  //   e.preventDefault();
  //   const formData = new FormData();
  //   try {
  //     // formData.append("name", userInput.name);
  //     // formData.append("password", userInput.password);
  //     // formData.append("description", userInput.description);
  //     formData.append("profileImg", file);
  //     console.log(`you are in edit ${userInput}`);
  //     const response = await axios.put(
  //       `${server}/quizhub/users/${currentUser.username}`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     // if (response.status === 201) {
  //     console.log("Profile uploaded successfully" + response.data);
  //     // } else {
  //     //   toast.error("Failed to edit profile");
  //     // }
  //   } catch (error) {
  //     toast.error("Error uploading profile", error);
  //   }
  // };

  // return (
  //   <div>
  //     <div className="row">
  //       <div className="col-xs-12 col-sm-9">
  //         <form className="form-horizontal" onSubmit={handleSubmit}>
  //           <div className="panel-body text-center">
  //             <div className="row">
  //               <div className="col-xl-4">
  //                 <div className="card mb-4 mb-xl-0">
  //                   <div className="card-header">Edit Profile Picture</div>
  //                   <div className="card-body text-center">
  //                     {currentUser.profileImg === null ? (
  //                       <img
  //                         src="https://bootdey.com/img/Content/avatar/avatar7.png"
  //                         title=""
  //                         alt=""
  //                         style={{ width: "100px" }}
  //                       />
  //                     ) : (
  //                       <img src={currentUser.profileImg} title="" alt="" />
  //                     )}
  //                   </div>
  //                   <div className="small font-italic text-muted mb-4">
  //                     JPG or PNG no larger than 1 MB
  //                   </div>
  //                   {/* <button className="btn btn-primary" type="button"> */}
  //                   <div>
  //                     <input
  //                       type="file"
  //                       id="imageFile"
  //                       accept="image/*"
  //                       name="profileImg"
  //                       onChange={handleInputChange}
  //                       title="choose image file"
  //                     />
  //                   </div>
  //                   {/* </button> */}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="panel panel-default">
  //             <div className="panel-heading">
  //               <h4 className="panel-title">User info</h4>
  //             </div>
  //             <div className="panel-body">
  //               <div className="form-group">
  //                 <label className="col-sm-2 control-label">Name: </label>
  //                 <div className="col-sm-10">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="name"
  //                     placeholder={currentUser.name}
  //                     onChange={handleInputChange}
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="panel-body">
  //               <div className="form-group">
  //                 <label className="col-sm-2 control-label">
  //                   New Password:{" "}
  //                 </label>

  //                 <div className="col-sm-10">
  //                   <input
  //                     type={visible ? "text" : "password"}
  //                     className="form-control"
  //                     name="password"
  //                     onChange={handleInputChange}
  //                   />
  //                 </div>
  //                 {visible ? (
  //                   <FontAwesomeIcon
  //                     icon={faEye}
  //                     className="absolute right-2 top-2 cursor-pointer"
  //                     onClick={() => setVisible(false)}
  //                   />
  //                 ) : (
  //                   <FontAwesomeIcon
  //                     icon={faEyeSlash}
  //                     className="absolute right-2 top-2 cursor-pointer"
  //                     onClick={() => setVisible(true)}
  //                   />
  //                 )}
  //               </div>
  //             </div>
  //             <div className="panel-body">
  //               <div className="form-group">
  //                 <label className="col-sm-2 control-label">
  //                   Description:{" "}
  //                 </label>
  //                 <div className="col-sm-10">
  //                   <input
  //                     type="text"
  //                     name="description"
  //                     className="form-control"
  //                     placeholder={currentUser.description}
  //                     onChange={handleInputChange}
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <button className="btn btn-success" type="submit">
  //             <FontAwesomeIcon icon={faEdit} />
  //             Edit
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ProfileEdit;
