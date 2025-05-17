import React from "react";
import ScoreBar from "./screens/ScoreBar";
import Positions from "./screens/Positions";
import Bowler from "./screens/Bowler";
import Controller from "./screens/Controller";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Layout from "./components/layout/Layout";
import Profile from "./screens/Profile";
import LiveMatchStatus from "./screens/LiveMatchStatus";
import TournamentFour from "./screens/tournamentFour";

const App = () => {
  console.log("App component rendering");

  return (
    <div className="min-h-screen bg-transparent">
      <BrowserRouter>
        {/* Always show the Controller at the top of every page */}

        <Routes>
          <Route path="/Piplon-overlay/controller" element={<Layout />} />
          <Route path="/Piplon-overlay/scorebar" element={<ScoreBar />} />
          <Route
            path="/Piplon-overlay/scorebar/:matchId"
            element={<ScoreBar />}
          />
          <Route
            path="/Piplon-overlay/player/:matchId"
            element={<Positions />}
          />
          <Route path="/Piplon-overlay/bowler/:matchId" element={<Bowler />} />
          <Route
            path="/Piplon-overlay/profile"
            element={<Profile />}
          />
          <Route
            path="/Piplon-overlay/livematch-status"
            element={< LiveMatchStatus />}
          />
          <Route
            path="/Piplon-overlay/tournament-four"
            element={<TournamentFour/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
