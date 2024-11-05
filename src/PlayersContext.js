import React, { useState, createContext } from "react";

export const PlayersContext = createContext();

export const PlayersProvider = (props) => {
  const [players, setPlayers] = useState([]);
  const [round, setRound] = useState(0);
  const [lobby, setLobby] = useState();
  const [user, setUser] = useState("");
  const [bench, setBench] = useState([]);
  return (
    <PlayersContext.Provider
      value={{
        playercontext: [players, setPlayers],
        roundcontext: [round, setRound],
        lobbycontext: [lobby, setLobby],
        usercontext: [user, setUser],
        benchcontext: [bench, setBench],
      }}
    >
      {props.children}
    </PlayersContext.Provider>
  );
};
