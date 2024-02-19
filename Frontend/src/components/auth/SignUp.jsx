import React from "react";
import "./css/signUp.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [visible, setVisible] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  //const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);
  if (isChecked) {
    formData.userType = "A";
  } else {
    formData.userType = "U";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    const validationError = {};

    if (formData.password !== formData.confirmpassword) {
      validationError.confirmPassword = "Passwords not matched";
    }
    setError(validationError);

    console.log(formData);
    setLoading(true);
    console.log(loading);
    if (Object.keys(validationError).length === 0) {
      axios
        .post(`${server}/quizhub/users/signup`, formData, config)
        .then((res) => {
          toast.success(res.data.message);
          setFormData({});
          navigate("/sign-in");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
      setLoading(false);
      console.log(loading);
    } else {
      toast.error(error.confirmPassword);
      setLoading(false);
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
                          <label className="form-label" htmlFor="name">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="name"
                            required
                            id="name"
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="name">
                          {" "}
                          User Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          id="username"
                          name="username"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        id="email"
                        name="email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="pass">
                        Password
                      </label>
                      <input
                        type={visible ? "text" : "password"}
                        className="form-control"
                        required
                        minLength={6}
                        id="password"
                        name="password"
                        onChange={handleChange}
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
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="repass">
                        Re-enter password
                      </label>
                      <input
                        type={visible ? "text" : "password"}
                        className="form-control"
                        required
                        minLength={6}
                        id="confirmpassword"
                        name="confirmpassword"
                        onChange={handleChange}
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
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="userType"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
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
                      disabled={loading}
                    >
                      {loading ? "loading......!" : "Sign Up"}
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
