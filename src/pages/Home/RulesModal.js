import React from "react";
import "../Scores/Modal.css";

const RulesModal = ({ show, onHide }) => {
  if (!show) return null;
  return (
    <div className="modal_bg" onClick={onHide}>
      <div className="modal_content" id="rules">
        <h3>Welcome to Ice Breakerz!</h3>
        <p>
          Designate someone to handle the app and add as many players as you
          like to start. Each round's mini game will be randomly chosen, and the
          players who participate will also be randomly selected as well. Follow
          the instructions written! Everyone who isn't battling will vote for
          the mini game winner. Keep playing until someone reaches 10 points (or
          however long you want). Have fun!
        </p>
        <span className="tips">
          Useful tips:
          <ul>
            <li>You can always return home to add last minute players.</li>
            <li>
              If you make a mistake on the score, that's ok! Tap a player's name
              on the scores page to manually adjust their score.
            </li>
          </ul>
        </span>
        <button className="modalbtn" onClick={onHide}>
          Close
        </button>
      </div>
    </div>
  );
};
export default RulesModal;
