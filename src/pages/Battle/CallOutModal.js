import React, { useContext } from "react";
import { PlayersContext } from "../../PlayersContext";
import "../Scores/Modal.css";
import { Link } from "react-router-dom";

const CallOutModal = ({ show, onHide, id, chooseB }) => {
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
    <div className="modal_bg">
      <div className="modal_content" id="scores">
        <div className="modal_title">
          {players.find((user) => user.score_id == id).player_name} calls out
        </div>
        <div className="modal_active_scores">
          {players
            .filter((user) => user.score_id != id)
            .slice()
            .sort(sorter)
            .map((x) => {
              return (
                <div
                  key={x.score_id}
                  className="calloutcontent"
                  onClick={() => chooseB(x.score_id)}
                >
                  <div className="name">{x.player_name}</div>{" "}
                  <div>{x.player_score}</div>
                </div>
              );
            })}{" "}
        </div>
        <Link className="modalbtn" to="/scores" onClick={onHide}>
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default CallOutModal;
