import React, { useContext } from "react";
import { PlayersContext } from "../../PlayersContext";
import "../Scores/Modal.css";

const ScoresModal = ({ show, onHide }) => {
  const { playercontext } = useContext(PlayersContext);
  const [players, setPlayers] = playercontext;

  function sorter(x, y) {
    if (x.player_score < y.player_score) {
      return 1;
    } else if (x.player_score > y.player_score) {
      return -1;
    }
    return 0;
  }

  if (!show) return null;
  return (
    <div className="modal_bg" onClick={onHide}>
      <div className="modal_content" id="scores">
        <div className="modal_title">Scores</div>
        <div className="modal_active_scores">
          {players
            .slice()
            .sort(sorter)
            .map((x) => {
              return (
                <div key={x.score_id} className="calloutcontent">
                  <div className="name">{x.player_name}</div>{" "}
                  <div className="score">{x.player_score}</div>
                </div>
              );
            })}{" "}
        </div>
        <div className="modalbtn" onClick={onHide}>
          Back
        </div>
      </div>
    </div>
  );
};

export default ScoresModal;
