import React from 'react'

import logo from './logo-nobg.png';

const ResetPassword = () => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
     
            </div>
          </div>
          <form action="#!">
            <div class="row gy-3 gy-md-4 overflow-hidden">
              <div class="col-12">
                <label for="email" class="form-label">New Password <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                    <path d="M7.5 0a2.5 2.5 0 0 1 5 0v3.5h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h1V0a1.5 1.5 0 0 1 3 0zm-1 4H9V2.5a1.5 1.5 0 1 0-3 0V4z"/>
                  </svg>
                  </span>
                  <input type="password" className="form-control" required
                   name="newPassword" id="newPassword" value={newPassword} onChange={(event)=>{event.target.value}} />
                </div>
              </div>
              <div class="col-12">
                <label for="email" class="form-label">Re-enter Password <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                    <path d="M7.5 0a2.5 2.5 0 0 1 5 0v3.5h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2h1V0a1.5 1.5 0 0 1 3 0zm-1 4H9V2.5a1.5 1.5 0 1 0-3 0V4z"/>
                  </svg>
                  </span>
                  <input type="password" className="form-control" required
                  name='confirmPassword' id='confirmPassword' value={confirmPassword} onChange={(event)=>{event.target.value}}/>
                </div>
              </div>
              <div class="col-12">
                <div class="d-grid">
                  <button class="btn btn-primary" type="submit">Reset Password</button>
                </div>
              </div>
            </div>
          </form>
          <div class="row">
            <div class="col-12">
            <hr className="mt-5 mb-4 border-secondary-subtle" />
              <div class="d-flex gap-4 justify-content-center">
                <a href="#!" class="text-decoration-none" style={{ color: '#33ccff' }}>Log In</a>
                <a href="#!" class="text-decoration-none" style={{ color: '#33ccff' }}>Register</a>
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

export default ResetPassword