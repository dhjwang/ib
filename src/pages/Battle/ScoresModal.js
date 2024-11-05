import React, { useContext } from "react";
import { PlayersContext } from "../../PlayersContext";
import "../Scores/Modal.css";

const ScoresModal = ({ show, onHide }) => {
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

  if (!show) return null;
  return (
    <div className="modal_bg" onClick={onHide}>
      <div className="modal_content" id="scores">
        <div className="modal_title">Scores</div>
        <div className="modal_active_scores">
          {players
            .slice()
            .filter((plyr) => !bench.includes(plyr.score_id))
            .sort(sorter)
            .map((x) => {
              return (
                <div key={x.score_id} className="calloutcontent">
                  <div className="name">{x.player_name}</div>{" "}
                  <div className="score">{x.player_score}</div>
                </div>
              );
            })}
          {players
            .slice()
            .filter((plyr) => bench.includes(plyr.score_id))
            .sort(sorter)
            .map((x) => {
              return (
                <div
                  key={x.score_id}
                  className="calloutcontent"
                  style={{
                    backgroundColor: "rgb(100, 100, 120) ",
                  }}
                >
                  <div className="name">{x.player_name}</div>{" "}
                  <div className="score">{x.player_score}</div>
                </div>
              );
            })}
        </div>
        <div className="modalbtn" onClick={onHide}>
          Back
        </div>
      </div>
    </div>
  );
};

export default ScoresModal;
