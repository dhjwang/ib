import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login/Login.css";
import SignupModal from "./Login/SignupModal.js";
import Button from "../button.js";
import "../App.css";
import { PlayersContext } from "../PlayersContext";
import { isAuthorized } from "../utils.js";
import useAuth from "../useAuth.js";

const Login = () => {
  const { usercontext } = useContext(PlayersContext);
  const [user, setUser] = usercontext;
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const apiEndpoint = "https://ib-api.onrender.com/api/auth/";
  useEffect(() => {
    if (isAuthorized()) {
      navigate("/lobbies");
    }
  }, [user]);

  const checkLogin = async () => {
    if (username && password) {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await res.status;
      if (data === 200) {
        const token = await res.json();
        login(token);
      } else if (data === 404 || 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please restart the page.");
      }
    } else {
      setError("Enter a username and password");
    }
  };

  return (
    <div className="wrapper">
      <div className="home">
        <div className="logo"></div>
        <div className="body" id="form-wrapper">
          <form className="login" onSubmit={checkLogin}>
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

            <div
              className="error"
              style={{ visibility: error ? "visible" : "hidden" }}
            >
              {error}
            </div>
            <button className="modalbtn" type="button">
              Login
            </button>
          </form>
        </div>
        <div className="footer">
          <Button onclick={() => setShow(true)} name="Sign up" />
          <Button
            onclick={() => {
              navigate("/home");
            }}
            name="Guest"
          />
          <SignupModal
            show={show}
            onHide={() => setShow(false)}
            data-backdrop="static"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
