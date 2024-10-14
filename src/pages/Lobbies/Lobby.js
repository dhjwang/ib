import React from "react";
import "./Lobby.css";

const Lobby = ({ name, id, load, rm, round, players }) => {
  return (
    <div className="lobby-wrapper">
      <div className="lobby" onClick={() => load(id, round)}>
        <div className="lobby-name">{name}</div>
        <div className="rounds">
          <div>Players: {players}</div>
          <div>Rds played: {round}</div>
        </div>
      </div>
      <div className="removeplayer" onClick={() => rm(id)}></div>
    </div>
  );
};

export default Lobby;
