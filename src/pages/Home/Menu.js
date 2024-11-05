import React, { useContext, useState } from "react";
import { PlayersContext } from "../../PlayersContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../../useAuth";

const Menu = ({ setRulesShow, setManagingBench, resetScores }) => {
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
      <ul className="menu" style={{ display: show ? "flex" : "none" }}>
        {!!resetScores && (
          <>
            <li
              onClick={() => {
                setShow(false);
                resetScores();
              }}
            >
              Reset
            </li>
            <li
              onClick={() => {
                setShow(false);
                setManagingBench(true);
              }}
            >
              Bench
            </li>
            <li
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </li>
          </>
        )}

        {user ? (
          <>
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
          </>
        ) : (
          <li
            onClick={() => {
              setPlayers([]);
              navigate("/");
            }}
          >
            Login
          </li>
        )}
        <li
          onClick={() => {
            setShow(false);
            setRulesShow(true);
          }}
        >
          Rules
        </li>
      </ul>
    </button>
  );
};

export default Menu;
