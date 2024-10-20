import React, { useState, useContext, useEffect } from "react";
import { PlayersContext } from "../PlayersContext.js";
import { useNavigate } from "react-router-dom";
import "./Home/Home.css";
import Player from "./Home/Player.js";
import AddPlayerModal from "./Home/AddPlayerModal.js";
import RulesModal from "./Home/RulesModal.js";
import Menu from "./Home/Menu.js";
import Button from "../button.js";
import "../App.css";
import { isAuthorized } from "../utils.js";

const Home = () => {
  const { playercontext, roundcontext, lobbycontext } =
    useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [round, setRound] = roundcontext;
  const [lobby, setLobby] = lobbycontext;
  const [show, setShow] = useState(false);
  const [rulesShow, setRulesShow] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  const apiEndpoint = "https://ib-api.onrender.com/api/scores/";
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!isAuthorized()) {
      let tmp = sessionStorage.getItem("sessionplayers");
      let tmpround = sessionStorage.getItem("round");
      if (tmp) {
        setPlayers(JSON.parse(tmp));
        setRound(Number(tmpround));
      }
    } else {
      if (!lobby) {
        navigate("/lobbies");
      }
    }
    setLoading(false);
  }, []);

  const removePlayer = async (id) => {
    setPlayers(players.filter((user) => user.score_id !== id));
    if (isAuthorized()) {
      await fetch(apiEndpoint + id, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
    } else {
      sessionStorage.setItem(
        "sessionplayers",
        JSON.stringify(players.filter((user) => user.score_id !== id))
      );
    }
  };

  const addPlayer = async (name) => {
    let data;
    setLoading(true);
    if (isAuthorized()) {
      await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ player_name: name, lobby_id: lobby.id }),
      });
      const res = await fetch(apiEndpoint + lobby.id, {
        headers: {
          Authorization: token,
        },
      });
      data = await res.json();
    } else {
      const ids = new Date();
      data = players.concat([
        { player_name: name, player_score: 0, score_id: ids.getTime() },
      ]);
      sessionStorage.setItem("sessionplayers", JSON.stringify(data));
    }
    setPlayers(data);
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <div className="home">
        <div className="logo"></div>
        <div className="body" id="playertable">
          <div className="title">{lobby ? lobby.name : "Guest"}</div>
          <div className="players">
            {!!players.length &&
              players.map((x, index) => {
                return (
                  <Player
                    key={index}
                    name={x.player_name}
                    id={x.score_id}
                    rm={removePlayer}
                  />
                );
              })}
            {isLoading && <>Loading...</>}
          </div>
          <div className="addplayer" onClick={() => setShow(true)}></div>
        </div>
        <div className="footer">
          <Menu />
          <RulesModal
            show={rulesShow}
            onHide={() => setRulesShow(false)}
            data-backdrop="static"
          ></RulesModal>

          {players.length > 1 ? (
            <Button onclick={() => navigate("/scores")} name="Play!" />
          ) : (
            <Button onclick={() => setShow(true)} name="Add more players!" />
          )}
        </div>
        <AddPlayerModal
          show={show}
          onHide={() => setShow(false)}
          added={addPlayer}
          data-backdrop="static"
        ></AddPlayerModal>
      </div>
    </div>
  );
};

export default Home;
