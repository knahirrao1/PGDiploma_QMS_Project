import React from "react";
import about from "../../images/about_us.jpg";

function DynamicHomePage() {
  return (
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
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={about} className="rounded mx-auto d-block" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Sign up to us</h5>
            {/* <a href="/SignUp" className="btn btn-dark">
              Sign-up
            </a> */}
            <p>Some interesting quizes waiting for you</p>
          </div>
        </div>
        <div className="carousel-item">
          ``
          <img src={about} className="rounded mx-auto d-block" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Or try on Free</h5>
            <p>You can try it out free</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={about} className="rounded mx-auto d-block" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default DynamicHomePage;
