import React, { useContext, useState } from "react";
import { PlayersContext } from "../../PlayersContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../../useAuth";

const Menu = ({ setRulesShow }) => {
  const { playercontext, usercontext } = useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [user, setUser] = usercontext;
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <button
      className="menuBtn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (show) {
            setShow(false);
          } else {
            setShow(true);
          }
        }
      }}
    >
      Menu
      {user ? (
        <ul className="menu" style={{ display: show ? "flex" : "none" }}>
          <li
            onClick={() => {
              setShow(false);
              setRulesShow(true);
            }}
          >
            Rules
          </li>
          <li
            onClick={() => {
              navigate("/lobbies");
            }}
          >
            Lobbies
          </li>
          <li
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </li>
        </ul>
      ) : (
        <ul className="menu" style={{ display: show ? "flex" : "none" }}>
          <li
            onClick={() => {
              setShow(false);
              setRulesShow(true);
            }}
          >
            Rules
          </li>
          <li
            onClick={() => {
              setPlayers([]);
              navigate("/");
            }}
          >
            Login
          </li>
        </ul>
      )}
    </button>
  );
};

export default Menu;
