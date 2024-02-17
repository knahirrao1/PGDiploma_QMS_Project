import React from "react";
import about from "../../images/about.jpg";

function StaticHomePage() {
  return (
    <div>
      {/* <hr className="border border-dark border-2 opacity-50"></hr> */}
      <hr></hr>
      <div className="d-flex justify-content-center">
        <h4>About Us</h4>
      </div>
      {/* <hr className="border border-dark border-2 opacity-50"></hr> */}
      <hr></hr>
      <img src={about} className="rounded mx-auto d-block w-50" alt="..." />
      <div className="rounded mx-auto d-block w-50">
        <p></p>
        <p>
          Developed by a dedicated team of six developers -{" "}
          <b>Abhishek, Avishkar, Kunal, Piyush, Pranav, and Rahul</b> - the Quiz
          Management System reflects our collective passion for empowering
          students on their academic journey. With diverse backgrounds and
          extensive experience in education, technology, and assessment, our
          team has meticulously crafted this system to provide comprehensive
          support tailored to your needs.
        </p>
      </div>
    </div>
  );
}

export default StaticHomePage;
