import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "./SignIn.css";
import { server } from "../server";
import logo from "../components/logo-nobg.png";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };

    const newForm = new FormData();
    newForm.append("userName", userName);
    newForm.append("password", password);

    axios
      .post(`${server}`, newForm, config)
      // .post("")
      .then((res) => {
        navigate("/");
        //window.location.reload(true);
        toast.success(res.data.message);
        setUserName("");
        setPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-10">
              <div class="card rounded-3 text-black">
                <div class="row g-0">
                  <div class="col-lg-6" style={{ backgroundColor: "gray" }}>
                    <div class="card-body p-md-5 mx-md-4">
                      <div class="text-center">
                        <img
                          src={logo}
                          style={{ width: "200px", height: "auto" }}
                          alt="logo"
                        />
                        <h4 class="mt-1 mb-5 pb-1">Welcome!</h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <p>Please login to your account</p>

                        <div class="form-outline mb-4">
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            value={userName}
                            onChange={(event) => {
                              setUserName(event.target.value);
                            }}
                            // placeholder="example_username"
                          />
                          <label class="form-label" for="form2Example11">
                            Username
                          </label>
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            class="form-control"
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
                          <label class="form-label" for="form2Example22">
                            Password
                          </label>
                        </div>

                        <div class="text-center pt-1 mb-5 pb-1">
                          <button
                            class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Log in
                          </button>
                          <br></br>
                          <Link to="/ForgotPassword" className="text-muted">
                            Forgot your password?
                          </Link>
                        </div>

                        <div class="d-flex align-items-center justify-content-center pb-4">
                          <p class="mb-0 me-2">Don't have an account?</p>
                          <Link to="/SignUp" className="text-yellow-600 pl-2">
                            Sign Up
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h1 class="mb-4">
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
      </section>
    </div>
  );
};

export default SignIn;
