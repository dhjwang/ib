import React, { useContext, useEffect } from "react";
import { PlayersContext, useAuthorizedContext } from "../PlayersContext.js";
import PlayerScore from "./Scores/PlayerScore.js";
import { useNavigate } from "react-router-dom";
import "./Scores/Scores.css";
import Button from "../button.js";
import "../App.css";

const Scores = () => {
  const { playercontext, roundcontext, lobbycontext } =
    useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [round, setRound] = roundcontext;
  const [isAuthorized, setAuthorized] = useAuthorizedContext();
  const [lobby, setLobby] = lobbycontext;
  const navigate = useNavigate();

  const apiEndpoint = "/api/scores/";

  const resetScores = async (x) => {
    if (players.length) {
      players.forEach((user) => {
        user.player_score = 0;
      });
      setPlayers([...players]);
      setRound(0);
      if (isAuthorized) {
        await fetch(apiEndpoint + `?lobby=${lobby}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            player_score: 0,
          }),
        });
        await fetch("/api/lobbies/" + lobby, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lobby_round: 0,
          }),
        });
      } else {
        sessionStorage.setItem("sessionplayers", JSON.stringify(players));
        sessionStorage.setItem("round", 0);
      }
    }
  };

  function sorter(x, y) {
    if (x.player_score < y.player_score) {
      return 1;
    } else if (x.player_score > y.player_score) {
      return -1;
    }
    return 0;
  }

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
  }, [isAuthorized]);

  const updateScore = async (id, add) => {
    if (add) {
      players.find((user) => user.score_id === id).player_score++;
    } else {
      players.find((user) => user.score_id === id).player_score--;
    }
    setPlayers([...players]);
    if (isAuthorized) {
      await fetch(apiEndpoint + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_score: players.find((user) => user.score_id === id)
            .player_score,
        }),
      });
    } else {
      sessionStorage.setItem("sessionplayers", JSON.stringify(players));
    }
  };

  return (
    <div className="wrapper">
      <div className="home">
        <div className="logo"></div>
        <div className="body">
          <div className="rounded">
            {round < 1 ? (
              <div className="roundHeader">Scores</div>
            ) : (
              <div className="roundHeader">Round {round} Scores</div>
            )}
            <div className="reset" onClick={resetScores}>
              Reset
            </div>
          </div>
          <div className="playerscore">
            {!!players.length &&
              players
                .slice()
                .sort(sorter)
                .map((x) => {
                  return (
                    <PlayerScore
                      key={x.score_id}
                      name={x.player_name}
                      score={x.player_score}
                      id={x.score_id}
                      updateScore={updateScore}
                    ></PlayerScore>
                  );
                })}
          </div>
        </div>
        <div className="footer">
          <Button onclick={() => navigate("/home")} name="Home" />
          {players.length > 1 ? (
            <Button onclick={() => navigate("/battle")} name="Next Round" />
          ) : (
            <Button
              onclick={() => navigate("/home")}
              name="Add more players to start!"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Scores;
