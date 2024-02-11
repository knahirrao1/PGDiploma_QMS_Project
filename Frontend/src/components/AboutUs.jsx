import React from "react";
import about from "../images/about_us.jpg";

function StaticHomePage() {
  return (
    <div>
      <hr className="border border-dark border-2 opacity-50"></hr>
      <div className="d-flex justify-content-center">
        <h2>About Us</h2>
      </div>
      <hr className="border border-dark border-2 opacity-50"></hr>
      <img src={about} className="rounded mx-auto d-block w-50" alt="..." />
      <div className="rounded mx-auto d-block w-50">
        We thrilled to present to you a revolutionary tool designed to enhance
        your preparation for the CCEE examination: the Quiz Management System.
        As we all know, the CCEE, or Comprehensive Examination for Entrance to
        College, is a pivotal step in your academic journey. It evaluates your
        proficiency in key subjects and plays a significant role in determining
        your admission to esteemed educational institutions.
      </div>
    </div>
  );
}

export default StaticHomePage;
