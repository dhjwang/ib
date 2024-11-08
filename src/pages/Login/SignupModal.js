import React, { useState, useContext } from "react";
import useAuth from "../../useAuth";

import "../Scores/Modal.css";

const SignupModal = ({ show, onHide }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const apiEndpoint = "https://ib-api.onrender.com/api/users/";

  const handleSubmit = async (x) => {
    x.preventDefault();
    if (username.trim() === "") {
      setError("Enter a username");
    } else {
      try {
        setLoading(true);
        const usernameCheck = await fetch(apiEndpoint + username);
        const userCheckStatus = await usernameCheck.status;

        if (userCheckStatus === 200) {
          setError("Username already exists");
        } else if (password !== password2) {
          setError("Passwords do not match");
        } else if (password.trim() === "") {
          setError("Enter a password");
        } else {
          const res = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
          });
          const auth = await fetch("https://ib-api.onrender.com/api/auth/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
          });
          const token = await auth.json();
          login(token);
        }
      } catch (err) {
        setError("An error occured. Please try again.");
      }
    }
    setLoading(false);
  };

  const close = () => {
    setUsername("");
    setPassword("");
    setPassword2("");
    setError("");
    onHide();
  };

  if (!show) return null;
  return (
    <div className="modal_bg">
      <div className="modal_content" id="signup">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="field">
            <div>Username</div>
            <input
              type="text"
              placeholder="Username"
              maxLength="15"
              value={username}
              onChange={(x) => setUsername(x.target.value)}
            ></input>
          </div>
          <div className="field">
            <div>Password</div>
            <input
              type="password"
              placeholder="Password"
              minLength="8"
              value={password}
              onChange={(x) => setPassword(x.target.value)}
            ></input>
          </div>
          <div className="field">
            <div>Confirm Password</div>
            <input
              type="password"
              placeholder="Password"
              minLength="8"
              value={password2}
              onChange={(x) => setPassword2(x.target.value)}
            ></input>
          </div>

          <div
            className="error"
            style={{ visibility: error ? "visible" : "hidden" }}
          >
            {error}
          </div>
          <div className="btn-wrapper">
            <button className="modalbtn" type="button" onClick={close}>
              Close
            </button>
            <button className="modalbtn">Sign Up</button>
          </div>
        </form>
        {loading && <div className="loading"></div>}
      </div>
    </div>
  );
};
export default SignupModal;
