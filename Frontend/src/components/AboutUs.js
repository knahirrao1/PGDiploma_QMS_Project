import React from "react";
import about from "../images/about_us.jpg";

function StaticHomePage() {
  return (
    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading fw-normal lh-1">About us...</h2>
        <p class="lead">
          We thrilled to present to you a revolutionary tool designed to enhance
          your preparation for the CCEE examination: the Quiz Management System.
          As we all know, the CCEE, or Comprehensive Examination for Entrance to
          College, is a pivotal step in your academic journey. It evaluates your
          proficiency in key subjects and plays a significant role in
          determining your admission to esteemed educational institutions.
        </p>
      </div>
      <div class="col-md-5">
        {/* <svg
          class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
          width="500"
          height="500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 500x500"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#eee" />
          <text x="50%" y="50%" fill="#aaa" dy=".3em">
            500x500
          </text>
        </svg> */}
        <img src={about} alt="Logo" />
      </div>
    </div>
  );
}

export default StaticHomePage;
