import { useContext } from "react";
import { PlayersContext } from "./PlayersContext";

export default function useAuth() {
  const { playercontext, lobbycontext, usercontext } =
    useContext(PlayersContext);
  const [players, setPlayers] = playercontext;
  const [lobby, setLobby] = lobbycontext;
  const [user, setUser] = usercontext;

  const login = (token) => {
    const expiresAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    setUser(token.user.username);
    sessionStorage.setItem("token", token.token);
    sessionStorage.setItem("expiresAt", JSON.stringify(expiresAt));
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiresAt");
    setUser("");
    setPlayers([]);
    setLobby();
  };

  return { login, logout };
}
