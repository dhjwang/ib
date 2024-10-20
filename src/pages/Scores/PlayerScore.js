import React, { useState } from "react";
import Modal from "./Modal";
import "./Scores.css";

const PlayerScore = ({ name, score, id, updateScore }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="user">
      <div className="usercontent" onClick={() => setShow(true)}>
        <div className="name">{name}</div>
        <div className="score">{score}</div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        id={id}
        updateScore={updateScore}
      ></Modal>
    </div>
  );
};

export default PlayerScore;
