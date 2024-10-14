import React, { useContext } from "react";
import { PlayersContext, useAuthorizedContext } from "../../PlayersContext.js";
import "./Battle.css";
import { Link } from "react-router-dom";

const Active = ({ id, handleWord, icelevel, score, opp }) => {
  const { playercontext, roundcontext, lobbycontext } =
    useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [round, setRound] = roundcontext;
  const [isAuthorized, setAuthorized] = useAuthorizedContext();
  const [lobby, setLobby] = lobbycontext;

  const apiEndpoint = "https://ib-api.onrender.com/api/scores/";

  const ice = "ICE";

  const updateRound = async () => {
    await fetch("https://ib-api.onrender.com/api/lobbies/" + lobby, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lobby_round: round + 1,
      }),
    });
  };

  const updatePoints = (x) => {
    if (score < 3) {
      handleWord(id);
    } else {
      id.forEach(async (i) => {
        let userloc = players.findIndex((user) => user.score_id === i);
        players[userloc].player_score = players[userloc].player_score + 1;
        if (isAuthorized) {
          await fetch(apiEndpoint + i, {
            method: "PUT",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              player_score: players[userloc].player_score,
            }),
          });
        }
      });
      setPlayers([...players]);
      setRound(round + 1);
      if (!isAuthorized) {
        sessionStorage.setItem("sessionplayers", JSON.stringify(players));
        sessionStorage.setItem("round", round + 1);
      } else {
        updateRound();
      }
    }
  };

  const updateWord = async (x) => {
    if (opp) {
      id.forEach(async (i) => {
        let userloc = players.findIndex((user) => user.score_id === i);
        players[userloc].player_score = players[userloc].player_score + 1;
        if (isAuthorized) {
          await fetch(apiEndpoint + i, {
            method: "PUT",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              player_score: players[userloc].player_score,
            }),
          });
        }
      });
      let opploc = players.findIndex((user) => user.score_id === opp[0]);
      players[opploc].player_score = players[opploc].player_score - 1;
      if (isAuthorized) {
        await fetch(apiEndpoint + opp[0], {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            player_score: players[opploc].player_score,
          }),
        });
      }
      setPlayers([...players]);
      setRound(round + 1);

      if (!isAuthorized) {
        sessionStorage.setItem("sessionplayers", JSON.stringify(players));
        sessionStorage.setItem("round", round + 1);
      } else {
        updateRound();
      }
    } else if (icelevel.length < ice.length - 1) {
      handleWord(ice.slice(0, icelevel.length + 1));
    } else {
      id.forEach(async (i) => {
        let userloc = players.findIndex((user) => user.score_id === i);
        players[userloc].player_score = players[userloc].player_score + 1;
        if (isAuthorized) {
          await fetch(apiEndpoint + i, {
            method: "PUT",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              player_score: players[userloc].player_score,
            }),
          });
        }
      });
      setPlayers([...players]);
      setRound(round + 1);

      if (!isAuthorized) {
        sessionStorage.setItem("sessionplayers", JSON.stringify(players));
        sessionStorage.setItem("round", round + 1);
      } else {
        updateRound();
      }
    }
  };

  let side = "";

  if (id) {
    side = id
      .map((x) => players.find((user) => user.score_id == x).player_name)
      .join("\n");
  }

  if (!players.length) {
    return (
      <div>
        <Link className="sides" to="/home">
          Return to Menu
        </Link>
      </div>
    );
  }
  return (
    <div>
      {score ? (
        score < 3 ? (
          <div className="sides" onClick={updatePoints}>
            <span>{side}</span>
          </div>
        ) : (
          <Link className="sides" to="/scores" onClick={updatePoints}>
            <span>{side}</span>
          </Link>
        )
      ) : icelevel.length < ice.length - 1 ? (
        <div className="sides" onClick={updateWord}>
          <span>{side}</span>
        </div>
      ) : (
        <Link className="sides" to="/scores" onClick={updateWord}>
          <span>{side}</span>
        </Link>
      )}
    </div>
  );
};

export default Active;
