import React from "react";
import "./Lobby.css";

const Lobby = ({ name, id, load, rm, round, players }) => {
  return (
    <div className="lobby-wrapper">
      <div className="lobby" onClick={() => load(id, round, name)}>
        <div className="lobby-name">{name}</div>
        <div className="rounds">
          <div>Players: {players}</div>
          <div>Rounds: {round}</div>
        </div>
      </div>
      <div className="removeplayer" onClick={() => rm(id)}></div>
    </div>
  );
};

export default Lobby;
