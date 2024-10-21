import React, { useState, useContext } from "react";
import { PlayersContext } from "../../PlayersContext";
import "../Scores/Modal.css";

const AddPlayerModal = ({ show, onHide, added, lobbies }) => {
  const { playercontext } = useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const updateSearch = (x) => {
    setSearch(x.target.value);
  };

  const addPlayer = (x) => {
    x.preventDefault();
    if (search.trim() === "") {
      lobbies ? setError("Enter a lobby.") : setError("Enter a user.");
    } else {
      if (lobbies) {
        if (
          lobbies.some(
            (user) => user.lobby_name === search.replace(/\s{2,}/g, " ").trim()
          )
        ) {
          setError(`Lobby ${search} already exists. Enter another name.`);
        } else {
          added(search.replace(/\s{2,}/g, " ").trim());
          setSearch("");
          setError("");
          onHide();
        }
      } else {
        if (
          players.some(
            (user) => user.player_name === search.replace(/\s{2,}/g, " ").trim()
          )
        ) {
          setError(`Player ${search} is already in lobby. Enter another name.`);
        } else {
          added(search.replace(/\s{2,}/g, " ").trim());
          setSearch("");
          setError("");
          onHide();
        }
      }
    }
  };

  const close = () => {
    setSearch("");
    setError("");
    onHide();
  };

  if (!show) return null;
  return (
    <div className="modal_bg">
      <div className="modal_content" id="add">
        <form onSubmit={addPlayer}>
          <input
            type="text"
            placeholder={lobbies ? "Enter Lobby" : "Enter Player"}
            maxLength="15"
            value={search}
            onChange={updateSearch}
            autoFocus
          ></input>
          <div
            className="error"
            style={{ visibility: error ? "visible" : "hidden" }}
          >
            {error}
          </div>
          <div className="btn-wrapper">
            <button className="modalbtn" type="button" onClick={close}>
              Close
            </button>
            <button className="modalbtn">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayerModal;
