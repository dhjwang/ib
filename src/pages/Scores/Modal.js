import React, { useContext } from "react";
import { PlayersContext } from "../../PlayersContext";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

const Modal = ({ show, onHide, id, updateScore, benched }) => {
  const { playercontext } = useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const navigate = useNavigate();
  let userloc = players.findIndex((user) => user.score_id === id);

  const playFirst = () => {
    players[userloc].priority = true;
    navigate("/battle");
  };

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
        <div className="btn-wrapper">
          <button className="modalbtn" onClick={onHide}>
            Close
          </button>
          {!benched && (
            <button className="modalbtn" onClick={playFirst}>
              Play
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
