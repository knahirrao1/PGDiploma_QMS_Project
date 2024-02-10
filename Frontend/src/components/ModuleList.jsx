import React from "react";
import JavaLogo from "../images/java-logo.png";

function ModuleList() {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Module List</h1>
      </div>
      <div className="d-flex justify-content-around">
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          <div className="col">
            <div className="card">
              <img src={JavaLogo} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">module1</p>

                <a href={"/QuizList/"} className="btn btn-primary">
                  module1 link
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src={JavaLogo} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">module1</p>
                <a href="/CreateNew/" className="btn btn-primary">
                  module1 link
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src={JavaLogo} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">module1</p>
                <a href="#" className="btn btn-primary">
                  module1 link
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleList;
