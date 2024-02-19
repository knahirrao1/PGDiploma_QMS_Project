import React from "react";
import "./css/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import logo from "./images/logo-nobg.png";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/UserSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
//import OAuth from './OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);

  const { loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //console.log(formData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    // dispatch(signInUser(newForm)).then((result)=>{//if using createAsyncThunk
    //   if(result.payload){
    //     setUserName('');
    //     setPassword('');
    //     console.log(result.data.message);
    //     toast.success(result.data.message);
    //     //navigate("/");
    //   //window.location.reload(true);
    //   }
    // })
    try {
      dispatch(signInStart());
      const res = await axios.post(
        `${server}/quizhub/users/login`,
        formData,
        config
      );
      //toast.success(res.data.message);
      console.log(res.data);
      //  if(res.status===401){
      //   toast.success(res.message);
      //   console.log(res.message);
      //   dispatch(signInFailure(res.message));
      //  }
      if (res.status === 200) {
        dispatch(signInSuccess(res.data));
        toast.success("login successful..!!");
        //window.location.reload();
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(signInFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {/* <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      > */}
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6" style={{ backgroundColor: "gray" }}>
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src={logo}
                        style={{ width: "200px", height: "auto" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1 text-light">Welcome!</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="text-light">Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="name"
                          onChange={handleChange}
                          // placeholder="example_username"
                        />
                        <label
                          className="form-label text-light"
                          htmlFor="form2Example11"
                        >
                          Username
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type={visible ? "text" : "password"}
                          className="form-control"
                          id="password"
                          name="pass"
                          onChange={handleChange}
                        />
                        {visible ? (
                          //   <AiOutlineEye
                          //     className="absolute right-2 top-2 cursor-pointer"
                          //     size={25}
                          //     onClick={() => setVisible(false)}
                          //   />
                          // ) : (
                          //   <AiOutlineEyeInvisible
                          //     className="absolute right-2 top-2 cursor-pointer"
                          //     size={25}
                          //     onClick={() => setVisible(true)}
                          //   />
                          <FontAwesomeIcon
                            className="absolute right-2 top-2 cursor-pointer"
                            icon={faEye}
                            onClick={() => setVisible(false)}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="absolute right-2 top-2 cursor-pointer"
                            icon={faEyeSlash}
                            onClick={() => setVisible(true)}
                          />
                        )}
                        <label
                          className="form-label text-light"
                          htmlFor="form2Example22"
                        >
                          Password
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          {loading ? (
                            <div
                              className="spinner-grow"
                              // style={{width: "3rem", height: "3rem""}}
                              role="status"
                            >
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                        <br></br>
                        {/* <OAuth /> <br></br><br></br> */}
                        <Link to="/forgot-password" className="text-muted">
                          Forgot your password?
                        </Link>
                      </div>

                      <div className="d-flex text-light align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to="/sign-up">
                          <button className="btn btn-warning text-light">
                            Sign Up
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h1 className="mb-4">
                      Quizzes are like mental push-ups. The more you do, the
                      stronger your brain becomes!
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </div>
  );
};

export default SignIn;
