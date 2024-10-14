import React, { useContext, useState, useEffect } from "react";
import { PlayersContext, useAuthorizedContext } from "../PlayersContext";
import { useNavigate } from "react-router-dom";
import AddPlayerModal from "./Home/AddPlayerModal.js";
import Lobby from "./Lobbies/Lobby.js";
import Button from "../button.js";
import "../App.css";

const Lobbies = () => {
  const { playercontext, lobbycontext, roundcontext } =
    useContext(PlayersContext);
  const [isAuthorized, setAuthorized] = useAuthorizedContext();
  const [players, setPlayers] = playercontext;
  const [lobby, setLobby] = lobbycontext;
  const [lobbies, setLobbies] = useState([]);
  const [round, setRound] = roundcontext;
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiEndpoint = "https://ib-api.onrender.com/api/lobbies/";
  const logoutEndpoint = "https://ib-api.onrender.com/api/auth/logout";

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

  useEffect(() => {
    if (isAuthorized !== false) {
      const getdata = async () => {
        try {
          const res = await fetch(apiEndpoint, {
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          const data = await res.json();
          setLobbies(data);
          setLoading(false);
        } catch (err) {
          console.log("error");
          console.log(err.message);
          // setAuthorized(false);
          // navigate("/");
        }
      };
      getdata();
    } else {
      navigate("/");
    }
  }, [isAuthorized]);

  const addlobby = async (name) => {
    setLoading(true);
    await fetch(apiEndpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lobby_name: name }),
    });
    const res = await fetch(apiEndpoint, {
      credentials: "include",
    });
    const data = await res.json();
    setLobbies(data);
    setLoading(false);
  };

  const loadLobby = async (id, lobby_round) => {
    const scores = "https://ib-api.onrender.com/api/scores/";
    try {
      const res = await fetch(scores + id, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setLobby(id);
      setRound(lobby_round);
      setPlayers(data);
      navigate("/home");
    } catch (err) {
      console.log(err.message);
      setAuthorized(false);
      navigate("/");
    }
  };

  const removeLobby = async (id) => {
    setLobbies(lobbies.filter((lobby) => lobby.lobby_id !== id));
    await fetch(apiEndpoint + id, { method: "DELETE", credentials: "include" });
  };

  return (
    <div className="wrapper">
      <div className="home">
        <div className="logo"></div>
        <div className="body" id="lobbies">
          {!!lobbies.length &&
            lobbies.map((x, index) => {
              return (
                <Lobby
                  key={index}
                  name={x.lobby_name}
                  id={x.lobby_id}
                  rm={removeLobby}
                  round={x.lobby_round}
                  players={x.players}
                  load={loadLobby}
                />
              );
            })}
          {isLoading && <>Loading...</>}
        </div>

        <AddPlayerModal
          show={show}
          onHide={() => setShow(false)}
          added={addlobby}
          lobbies={lobbies}
          data-backdrop="static"
        ></AddPlayerModal>

        <div className="footer">
          <Button
            onclick={async () => {
              await logoutSession();
              await setAuthorized(false);
              await setPlayers([]);
              await setLobby();
            }}
            name="Log out"
          />
          <Button onclick={() => setShow(true)} name="Add Lobby" />
        </div>
      </div>
    </div>
  );
};

export default Lobbies;
