import React, { useState } from 'react';
import profilePic from './creator_profile_pic.jpg'; // Importing profile picture
import ModulesTable from '../modules/ModulesTable'; // Importing ModulesTable component
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';

const CreatorDashboard = () => {
  const  {currentUser} = useSelector(state=>state.user);
  const userName = currentUser.username; // Replace with user's name
  const [showModulesTable, setShowModulesTable] = useState(false); // State to track if ModulesTable should be shown
  //const [tableData,setTableData] = useState([]);

  const handleManageContentClick = async () => {
    setShowModulesTable(true); // Set showModulesTable to true when "Manage Content" is clicked
    // await axios.get(`http://localhost:8080/quizhub/modules`)
    // .then(res=>{
    //   if(res.status === 200){
    //     console.log(res.data);
    //     setTableData(res.data);
    //   }
    // })
    // .catch((error)=>{
    //   console.log(error);
    //   toast.error(error.response.data.message);
    // });
  };

  
    
  

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
              <li className="nav-item">
                {/* Attach onClick handler to handle click event */}
                <a href="#" className="nav-link align-middle px-0" onClick={handleManageContentClick}>
                  <i className="fs-4 bi-journal"></i> <span className="ms-1 d-none d-sm-inline">Manage Content</span>
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
          {/* Render ModulesTable if showModulesTable is true */}
          {showModulesTable && <ModulesTable/>}
          {/* Otherwise, render default content */}
          {!showModulesTable && <div>DEFAULT CONTENT AREA</div>}
        </div>
        {/* End Main Content Area */}
      </div>
    </div>
  )
}

export default CreatorDashboard;
