import React from 'react';
import profilePic from './user_profile_pic.jfif'; // Importing profile picture


const UserDashboard = () => {

const userName = "E. Norma Stits"; // Replace with user's name

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white">
              <img src={profilePic} className="rounded-circle me-2" alt="Profile" height="30" />
              <span className="fs-5 d-none d-sm-inline">{userName}</span>
            </div>
            {/* Sidebar Navigation */}
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Profile</span>
                </a>
              </li>
              <li>
                <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Performance</span>
                </a>
                <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                  <li className="w-100">
                    <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Settings</span></a>
                  </li>
                  <li>
                    <a href="/sign-out" className="nav-link px-0"> <span className="d-none d-sm-inline">Logout</span></a>
                  </li>
                </ul>
              </li>
            </ul>
            {/* End Sidebar Navigation */}
          </div>
        </div>
        {/* End Sidebar */}

        {/* Main Content Area */}
        <div className="col py-3">
          CONTENT AREA          
        </div>
        {/* End Main Content Area */}
      </div>
    </div>
  );
}

export default UserDashboard;
