import React, { useState } from "react";
import { useAuthorizedContext } from "../../PlayersContext";

import "../Scores/Modal.css";

const SignupModal = ({ show, onHide }) => {
  const [isAuthorized, setAuthorized] = useAuthorizedContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const apiEndpoint = "https://ib-api.onrender.com/api/users/";

  const handleSubmit = async () => {
    const usernameCheck = await fetch(apiEndpoint + username);
    const userCheckStatus = await usernameCheck.status;
    if (username.trim() === "") {
      setError("Enter a username");
    } else if (userCheckStatus === 200) {
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
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      setAuthorized(true);
    }
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
        <form>
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
              maxLength="15"
              value={password}
              onChange={(x) => setPassword(x.target.value)}
            ></input>
          </div>
          <div className="field">
            <div>Confirm Password</div>
            <input
              type="password"
              placeholder="Password"
              maxLength="15"
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
          <button className="modalbtn" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <button className="modalbtn" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
};
export default SignupModal;
