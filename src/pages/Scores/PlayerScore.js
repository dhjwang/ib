import React, { useState } from "react";
import Modal from "./Modal";
import "./Scores.css";

const PlayerScore = ({
  name,
  score,
  id,
  updateScore,
  isManagingBench,
  manageBench,
  benched = false,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="user"
      style={{
        backgroundColor: benched ? "rgb(70, 70, 70) " : "rgb(51, 47, 47)",
        boxShadow: benched
          ? "none"
          : "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div
        className="usercontent"
        onClick={() => (isManagingBench ? manageBench(id) : setShow(true))}
      >
        <div className="name">{name}</div>
        <div className="score">{score}</div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        id={id}
        updateScore={updateScore}
        benched={benched}
      ></Modal>
    </div>
  );
};

export default PlayerScore;
