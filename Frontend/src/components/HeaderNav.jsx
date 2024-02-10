import React from "react";
import logo from "../images/qms_logo.png";
import { Link } from "react-router-dom";
function HeaderNav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid">
        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
        <div className="left" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                {/* <img src={logo} width="30" alt="Logo" /> */}
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="./AboutUs"
              >
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="./ModuleList"
              >
                {/* <button className="btn btn-dark" type="button"> */}
                Module Lists
                {/* </button> */}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="date"
                to="./CreateNew"
              >
                Create new
              </Link>
            </li>
          </ul>
        </div>
        <div className="middle">
          <Link className="nav-link active" aria-current="page" to="/">
            <h4>
              <span style={{ color: "black" }}>Quiz</span>
              <span style={{ color: "rgb(255,165,0)" }}>HUB</span>
            </h4>
          </Link>
        </div>
        <div>
          <Link className="left" aria-current="page" to="./SignIn">
            <button type="button" className="btn btn-dark">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default HeaderNav;
