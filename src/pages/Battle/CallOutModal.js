import React, { useContext } from "react";
import { PlayersContext } from "../../PlayersContext";
import "../Scores/Modal.css";

const CallOutModal = ({ show, onHide, id, chooseB }) => {
  const { playercontext, benchcontext } = useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [bench, setBench] = benchcontext;

  function sorter(x, y) {
    if (x.player_score < y.player_score) {
      return 1;
    } else if (x.player_score > y.player_score) {
      return -1;
    }
    return 0;
  }

  let nonbenchedPlayers = players
    .slice()
    .filter((plyr) => !bench.includes(plyr.score_id));

  if (!show) return null;
  return (
    <div className="modal_bg">
      <div className="modal_content" id="scores">
        <div className="modal_title">
          {nonbenchedPlayers.find((user) => user.score_id == id).player_name}{" "}
          calls out
        </div>
        <div className="modal_active_scores">
          {nonbenchedPlayers
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
                  <div className="score">{x.player_score}</div>
                </div>
              );
            })}{" "}
        </div>
        <button className="modalbtn" onClick={onHide}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CallOutModal;
