import React, { useState, createContext } from "react";

export const PlayersContext = createContext();

export const PlayersProvider = (props) => {
  const [players, setPlayers] = useState([]);
  const [round, setRound] = useState(0);
  const [lobby, setLobby] = useState();
  const [user, setUser] = useState("");
  return (
    <PlayersContext.Provider
      value={{
        playercontext: [players, setPlayers],
        roundcontext: [round, setRound],
        lobbycontext: [lobby, setLobby],
        usercontext: [user, setUser],
      }}
    >
      {props.children}
    </PlayersContext.Provider>
  );
};
