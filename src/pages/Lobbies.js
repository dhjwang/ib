import React, { useContext, useState, useEffect } from "react";
import { PlayersContext } from "../PlayersContext";
import { useNavigate } from "react-router-dom";
import AddPlayerModal from "./Home/AddPlayerModal.js";
import Lobby from "./Lobbies/Lobby.js";
import Button from "../button.js";
import "../App.css";
import { isAuthorized } from "../utils.js";
import useAuth from "../useAuth.js";

const Lobbies = () => {
  const { playercontext, lobbycontext, roundcontext, usercontext } =
    useContext(PlayersContext);
  const [user, setUser] = usercontext;
  const [players, setPlayers] = playercontext;
  const [lobby, setLobby] = lobbycontext;
  const [lobbies, setLobbies] = useState([]);
  const [round, setRound] = roundcontext;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const apiEndpoint = "https://ib-api.onrender.com/api/lobbies/";
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (isAuthorized()) {
      const getdata = async () => {
        setLoading(true);
        try {
          const res = await fetch(apiEndpoint, {
            headers: { Authorization: token },
          });
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          const data = await res.json();
          setLoading(false);
          setUser(data.username);
          setLobbies(data.lobbies);
        } catch (err) {
          setLoading(false);
          console.log("error");
          console.log(err.message);
          // navigate("/");
        }
      };
      getdata();
    } else {
      navigate("/");
    }
  }, [user]);

  const addlobby = async (name) => {
    setLoading(true);
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ lobby_name: name }),
    });
    const data = await res.json();
    setLoading(false);
    setLobbies(data.lobbies);
  };

  const loadLobby = async (id, lobby_round, lobby_name) => {
    const scores = "https://ib-api.onrender.com/api/scores/";
    try {
      setLoading(true);
      const res = await fetch(scores + id, {
        headers: {
          Authorization: token,
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();

      setLobby({ id: id, name: lobby_name });
      setRound(lobby_round);
      setPlayers(data);
      navigate("/home");
    } catch (err) {
      console.log(err.message);
      navigate("/");
    }
  };

  const removeLobby = async (id) => {
    setLoading(true);
    setLobbies(lobbies.filter((lobby) => lobby.lobby_id !== id));
    await fetch(apiEndpoint + id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <div className="home">
        <div className="logo"></div>
        <div className="body">
          <div className="title">{user} Lobbies</div>
          <div id="lobbies">
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
            {loading && <>Loading...</>}
            {loading && <div className="loading"></div>}

            {!loading && !lobbies.length && (
              <div className="note">Add a lobby to get started.</div>
            )}
          </div>
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
            onclick={() => {
              logout();
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
