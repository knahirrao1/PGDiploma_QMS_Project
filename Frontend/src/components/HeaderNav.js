import React from "react";
import logo from "../images/qms_logo.png";
import { Link } from "react-router-dom";
function HeaderNav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
        <div className="left" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <img src={logo} width="30" alt="Logo" />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="./AboutUs.js"
              >
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="./ModuleList.js"
              >
                {/* <button className="btn btn-dark" type="button"> */}
                Module Lists
                {/* </button> */}
              </Link>
            </li>
          </ul>
        </div>
        <div className="middle">
          <h1>
            <Link className="nav-link active" aria-current="page" to="/">
              Quiz Hub
            </Link>
          </h1>
        </div>
        <div>
          <Link className="left" aria-current="page" to="./SignIn.js">
            <button type="button" class="btn btn-dark">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default HeaderNav;
