import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/UserSlice";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Implement sign-out logic here
    // For example, clear user session, remove tokens, etc.
    // Then redirect the user to the sign-in page or any other appropriate pag
    navigate("/");
    window.location.reload(true);
    dispatch(signOutSuccess());
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Sign Out Confirmation</h2>
        <p>Are you sure you want to sign out?</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={handleSignOut}
            style={{
              padding: "10px 20px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Yes, Sign Out
          </button>
          <Link
            to="/"
            style={{
              padding: "10px 20px",
              background: "#ccc",
              color: "#333",
              border: "none",
              borderRadius: "5px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            No, Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
