import React, { useState, useContext, useEffect } from "react";
import { PlayersContext, useAuthorizedContext } from "../PlayersContext.js";
import { useNavigate } from "react-router-dom";
import "./Home/Home.css";
import Player from "./Home/Player.js";
import AddPlayerModal from "./Home/AddPlayerModal.js";
import RulesModal from "./Home/RulesModal.js";
import Menu from "./Home/Menu.js";
import Button from "../button.js";
import "../App.css";

const Home = () => {
  const { playercontext, roundcontext, lobbycontext } =
    useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [round, setRound] = roundcontext;
  const [lobby, setLobby] = lobbycontext;
  const [show, setShow] = useState(false);
  const [rulesShow, setRulesShow] = useState(false);
  const navigate = useNavigate();
  const [isAuthorized, setAuthorized] = useAuthorizedContext();
  const [isLoading, setLoading] = useState(true);

  const apiEndpoint = "https://ib-api.onrender.com/api/scores/";

  useEffect(() => {
    if (isAuthorized === false) {
      let tmp = sessionStorage.getItem("sessionplayers");
      let tmpround = sessionStorage.getItem("round");
      if (tmp) {
        setPlayers(JSON.parse(tmp));
        setRound(Number(tmpround));
      }
    } else if (isAuthorized === true && !lobby) {
      navigate("/lobbies");
    }
    setLoading(false);
  }, [isAuthorized]);

  const removePlayer = async (id) => {
    setPlayers(players.filter((user) => user.score_id !== id));
    if (isAuthorized) {
      await fetch(apiEndpoint + id, { method: "DELETE" });
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
    if (isAuthorized) {
      await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player_name: name, lobby_id: lobby }),
      });
      const res = await fetch(apiEndpoint + lobby);
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
            <Button
              onclick={() => setShow(true)}
              name="Add more players to start!"
            />
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
