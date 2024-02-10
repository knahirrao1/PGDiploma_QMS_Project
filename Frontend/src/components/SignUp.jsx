import React from "react";
import "./signUp.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { server } from "../server";
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userUname, setUserUname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState("");

  //const { isAuthenticated } = useSelector((state) => state.user);
  //const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    const validationError = {};
    const newForm = new FormData();

    newForm.append("userName", userName);
    newForm.append("userUname", userUname);
    newForm.append("userEmail", userEmail);
    newForm.append("password", password);
    newForm.append("rePassword", rePassword);

    if (password !== rePassword) {
      validationError.confirmPassword = "Password not matched";
    }
    setError(validationError);

    if (Object.keys(validationError).length === 0) {
      axios
        .post(`${server}/sign-up`, newForm, config)
        .then((res) => {
          toast.success(res.data.message);
          setUserName("");
          setUserUname("");
          setUserEmail("");
          setPassword("");
          setRePassword("");
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    } else {
      toast.error(error.confirmPassword);
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                {/* We have a wonderful offer!*/} <br />
                <span style={{ color: " hsl(218, 81%, 90%)" }}>
                  Now you can join us as a creator!
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                Creators can generate modules, create custom quizzes, and much
                more...Please consider joining us as creator, if you want to
                administer wonderful quizzes.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-outline mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="name"
                            required
                            id="name"
                            name="name"
                            value={userName}
                            onChange={(event) => {
                              setUserName(event.target.value);
                            }}
                          />
                          <label className="form-label" htmlFor="name">
                            Name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control"
                          required
                          id="uname"
                          name="uname"
                          value={userUname}
                          onChange={(event) => {
                            setUserUname(event.target.value);
                          }}
                        />
                        <label className="form-label" htmlFor="name">
                          {" "}
                          User Name
                        </label>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control"
                        required
                        id="email"
                        name="email"
                        value={userEmail}
                        onChange={(event) => {
                          setUserEmail(event.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="email">
                        Email address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type={visible ? "text" : "password"}
                        className="form-control"
                        required
                        minLength={6}
                        id="pass"
                        name="pass"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />

                      {visible ? (
                        <AiOutlineEye
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(false)}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(true)}
                        />
                      )}
                      <label className="form-label" htmlFor="pass">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type={visible ? "text" : "password"}
                        className="form-control"
                        required
                        minLength={6}
                        id="repass"
                        name="repass"
                        value={rePassword}
                        onChange={(event) => setRePassword(event.target.value)}
                      />
                      {visible ? (
                        <AiOutlineEye
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(false)}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="absolute right-2 top-2 cursor-pointer"
                          size={25}
                          onClick={() => setVisible(true)}
                        />
                      )}
                      <label className="form-label" htmlFor="repass">
                        Re-enter password
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example33"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example33"
                      >
                        I want to be a creator!
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>

                    {/* <div>
                  <label className="form-check-label" htmlFor="form2Example33">
                      Already have an account? 
                    </label>
                  </div> */}

                    {/* <div className="text-center">
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-facebook-f"></i>
                    </button>
    
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-google"></i>
                    </button>
    
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </button>
    
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-github"></i>
                    </button>
                  </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
