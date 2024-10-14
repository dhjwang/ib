import React, { useContext } from "react";
import { PlayersContext } from "../../PlayersContext";
import "./Modal.css";

const Modal = ({ show, onHide, id, updateScore }) => {
  const { playercontext } = useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  let userloc = players.findIndex((user) => user.score_id === id);

  if (!show) return null;
  return (
    <div className="modal_bg">
      <div className="modal_content">
        <div>{players[userloc].player_name}</div>
        <div className="update_score">
          <button className="modalbtn" onClick={() => updateScore(id, false)}>
            -
          </button>{" "}
          {players[userloc].player_score}{" "}
          <button className="modalbtn" onClick={() => updateScore(id, true)}>
            +
          </button>
        </div>
        <button className="modalbtn" onClick={onHide}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
