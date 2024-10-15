import React, { useContext, useState } from "react";
import RulesModal from "./RulesModal";
import { PlayersContext, useAuthorizedContext } from "../../PlayersContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { playercontext, lobbycontext } = useContext(PlayersContext);
  const [isAuthorized, setAuthorized] = useAuthorizedContext();
  const [players, setPlayers] = playercontext;
  const [lobby, setLobby] = lobbycontext;
  const [show, setShow] = useState(false);
  const [rulesShow, setRulesShow] = useState(false);
  const navigate = useNavigate();

  const logoutEndpoint =
    "https://ib-api.onrender.com/api/proxy/api/auth/logout";

  const logoutSession = async () => {
    const res = await fetch(logoutEndpoint, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div
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
      {isAuthorized ? (
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
            onClick={async () => {
              await logoutSession();
              await setAuthorized(false);
              await navigate("/");
              await setPlayers([]);
              await setLobby();
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
          {/* <li
            onClick={() => {
              setPlayers([]);
              navigate("/");
            }}
          >
            Login
          </li> */}
        </ul>
      )}
      <RulesModal
        show={rulesShow}
        onHide={() => {
          setRulesShow(false);
          setShow(false);
        }}
        data-backdrop="static"
      ></RulesModal>
    </div>
  );
};

export default Menu;
