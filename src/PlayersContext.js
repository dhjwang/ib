import React, { useState, createContext, useContext, useEffect } from "react";

export const PlayersContext = createContext();

export const PlayersProvider = (props) => {
  const [players, setPlayers] = useState([]);
  const [round, setRound] = useState(0);
  const [isAuthorized, setAuthorized] = useState(null);
  const [lobby, setLobby] = useState();
  return (
    <PlayersContext.Provider
      value={{
        playercontext: [players, setPlayers],
        roundcontext: [round, setRound],
        authorizedcontext: [isAuthorized, setAuthorized],
        lobbycontext: [lobby, setLobby],
      }}
    >
      {props.children}
    </PlayersContext.Provider>
  );
};

const auth = "https://ib-api.onrender.com/api/auth/status";

export const useAuthorizedContext = () => {
  const { authorizedcontext } = useContext(PlayersContext);
  const [isAuthorized, setAuthorized] = authorizedcontext;

  const checkAuth = async () => {
    console.log("called");
    const res = await fetch(auth, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.status;
    if (data === 200) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  };

  useEffect(() => {
    if (isAuthorized === null) {
      checkAuth();
    }
  }, []);

  return authorizedcontext;
};
