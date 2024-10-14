import React from "react";
import "./Home.css";

const Player = ({ name, id, rm }) => {
  return (
    <div className="player">
      <div className="name">{name}</div>
      <div className="removeplayer" onClick={() => rm(id)}></div>
    </div>
  );
};

export default Player;
