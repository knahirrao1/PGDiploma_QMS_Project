import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';

import about from "../../images/about_us.jpg";
import welcome from "../../images/welcome_slide.jpg"
import testimonial from "../../images/testimonial.jpg"
import { useSelector } from "react-redux";

function DynamicHomePage() {
  const {currentUser} = useSelector(state=>state.user);
  const [showSignUp, setShowSignUp] = useState(false);
  useEffect(()=>{
    if(currentUser===null){
      setShowSignUp(true);
    }
    else{
      setShowSignUp(false);
    }
  },[])
  return (
    <div className="mt-5 mb-5">
      <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        {showSignUp && <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>}
        
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={welcome} className="rounded mx-auto d-block img-fluid" style={{ width: "66%", height: "auto" }} alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h1>Welcome to QuizHUB!</h1>
            {/* <a href="/SignUp" className="btn btn-dark">
              Sign-up
            </a> */}
            <p>Explore interactive quizzes, engaging content, and seamless experiences</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={testimonial} className="rounded mx-auto d-block img-fluid" style={{ width: "66%", height: "auto" }} alt="..." />
          <div className="carousel-caption d-none d-md-block" >
            <h1>Customer Testimonial</h1>
            <p>"I find this platform a must have for students" - Smita</p>
          </div>
        </div>
        { showSignUp && <div className="carousel-item">
          <img src={about} className="rounded mx-auto d-block img-fluid" style={{ width: "66%", height: "auto" }} alt="..." />
          <div className="carousel-caption d-none d-md-block" >
            <h1>Try QuizHUB Today!</h1>
            <p>Sign up now to start creating and taking interactive quizzes</p>
            <Link to="/sign-up" className="btn btn-dark">
              Sign Up
              </Link>
          </div>
        </div>}
        
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" style={{color: 'black'}}></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" style={{color: 'black'}}></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  );
}

export default DynamicHomePage;
