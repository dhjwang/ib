import React from "react";
import Home from "./pages/Home.js";
import Scores from "./pages/Scores.js";
import Battle from "./pages/Battle.js";
import Login from "./pages/Login.js";
import Lobbies from "./pages/Lobbies.js";

import { PlayersProvider } from "./PlayersContext";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="test">
      <PlayersProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/lobbies" element={<Lobbies />} />
          </Routes>
        </Router>
      </PlayersProvider>
    </div>
  );
}

export default App;
