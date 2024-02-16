import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './images/logo-nobg.png';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { server } from '../../server';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleSubmit =async (event)=>{
    event.preventDefault();
    await axios
      .post(
        `${server}/forgot-password`,email)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });

  }

  return (
    <div>
<div class="bg-light py-3 py-md-5">
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
        <div class="p-4 p-md-5 rounded shadow-sm" style={{ backgroundColor: 'gray' }}>
          <div class="row gy-3 mb-5">
            <div class="col-12">
              <div class="text-center">
                <a href="#!">
                <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} />
                </a>
              </div>
            </div>
            <div class="col-12">
              <h2 class="fs-6 fw-normal text-center m-0 px-md-5" style={{ color: 'black' }}>Provide the email address associated with your account to recover your password.</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="row gy-3 gy-md-4 overflow-hidden">
              <div class="col-12">
                <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </span>
                  <input type="email" className="form-control" required
                   name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div class="col-12">
                <div class="d-grid">
                  <button class="btn btn-primary" type="submit">Get Link To Reset Password</button>
                </div>
              </div>
            </div>
          </form>
          <div class="row">
            <div class="col-12">
            <hr className="mt-5 mb-4 border-secondary-subtle" />
              <div class="d-flex gap-4 justify-content-center">
                <Link to='/' class="text-decoration-none" style={{ color: '#33ccff' }}>Sign In</Link>
                <Link to='/sign-up' class="text-decoration-none" style={{ color: '#33ccff' }}>Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default ForgotPassword