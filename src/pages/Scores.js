import React, { useContext, useEffect, useState } from "react";
import { PlayersContext } from "../PlayersContext.js";
import PlayerScore from "./Scores/PlayerScore.js";
import { useNavigate } from "react-router-dom";
import "./Scores/Scores.css";
import Button from "../button.js";
import "../App.css";
import { isAuthorized } from "../utils.js";
import Menu from "./Home/Menu.js";
import RulesModal from "./Home/RulesModal.js";

const Scores = () => {
  const { playercontext, roundcontext, lobbycontext, benchcontext } =
    useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [bench, setBench] = benchcontext;
  const [round, setRound] = roundcontext;
  const [lobby, setLobby] = lobbycontext;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isManagingBench, setManagingBench] = useState(false);
  const [rulesShow, setRulesShow] = useState(false);

  const apiEndpoint = "https://ib-api.onrender.com/api/scores/";
  const token = sessionStorage.getItem("token");

  const resetScores = async (x) => {
    if (players.length) {
      players.forEach((user) => {
        user.player_score = 0;
      });
      setPlayers([...players]);
      setRound(0);
      if (isAuthorized()) {
        setLoading(true);
        await fetch(apiEndpoint + `?lobby=${lobby.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            player_score: 0,
          }),
        });
        await fetch("https://ib-api.onrender.com/api/lobbies/" + lobby.id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            lobby_round: 0,
          }),
        });
        setLoading(false);
      } else {
        sessionStorage.setItem("sessionplayers", JSON.stringify(players));
        sessionStorage.setItem("round", 0);
      }
    }
  };

  const sorter = (x, y) => {
    if (x.player_score < y.player_score) {
      return 1;
    } else if (x.player_score > y.player_score) {
      return -1;
    }
    return 0;
  };

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
  }, []);

  const updateScore = async (id, add) => {
    if (add) {
      players.find((user) => user.score_id === id).player_score++;
    } else {
      players.find((user) => user.score_id === id).player_score--;
    }
    setPlayers([...players]);
    if (isAuthorized()) {
      setLoading(true);
      await fetch(apiEndpoint + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          player_score: players.find((user) => user.score_id === id)
            .player_score,
        }),
      });
      setLoading(false);
    } else {
      sessionStorage.setItem("sessionplayers", JSON.stringify(players));
    }
  };

  const manageBench = (id) => {
    if (bench.includes(id)) {
      setBench(bench.filter((playerId) => playerId !== id));
    } else {
      setBench([...bench, id]);
    }
  };

  return (
    <div className="wrapper">
      <div
        className="home"
        style={{
          backgroundColor: isManagingBench
            ? "rgba(255, 255, 255,0.75) "
            : "white",
        }}
      >
        <div className="logo"></div>
        <div className="body">
          <div className="title">
            {isManagingBench ? (
              <div>Select Players To Bench </div>
            ) : round < 1 ? (
              <div>Scores</div>
            ) : (
              <div>Round {round} Scores</div>
            )}
          </div>
          <div className="playerscore">
            {!!players.length &&
              players
                .slice()
                .filter((plyr) => !bench.includes(plyr.score_id))
                .sort(sorter)
                .map((x) => {
                  return (
                    <PlayerScore
                      key={x.score_id}
                      name={x.player_name}
                      score={x.player_score}
                      id={x.score_id}
                      updateScore={updateScore}
                      isManagingBench={isManagingBench}
                      manageBench={manageBench}
                    ></PlayerScore>
                  );
                })}
            {!!bench.length &&
              players
                .slice()
                .filter((plyr) => bench.includes(plyr.score_id))
                .sort(sorter)
                .map((x) => {
                  return (
                    <PlayerScore
                      key={x.score_id}
                      name={x.player_name}
                      score={x.player_score}
                      id={x.score_id}
                      updateScore={updateScore}
                      isManagingBench={isManagingBench}
                      manageBench={manageBench}
                      benched={true}
                    ></PlayerScore>
                  );
                })}
          </div>
        </div>
        {loading && <div className="loading"></div>}

        <div className="footer">
          {isManagingBench ? (
            <Button onclick={() => setManagingBench(false)} name="Done" />
          ) : (
            <Menu
              setRulesShow={setRulesShow}
              setManagingBench={setManagingBench}
              resetScores={resetScores}
            />
          )}
          <RulesModal
            show={rulesShow}
            onHide={() => setRulesShow(false)}
          ></RulesModal>
          {players.length - bench.length > 1 ? (
            <Button onclick={() => navigate("/battle")} name="Next Round" />
          ) : (
            <Button
              onclick={() => navigate("/home")}
              name="Add more players!"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Scores;
