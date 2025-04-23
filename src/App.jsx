import React from "react";
import ScoreBar from "./screens/ScoreBar";
import Positions from "./screens/Positions";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
 


import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import "./index.css";
import Bowler from "./screens/Bowler";

const App = () => {
    return (
      <HashRouter>
      <Routes>
        <Route path="/scorebar/:matchId" element={<ScoreBar/>}/>
        <Route path="/player/:matchId" element={<Positions/>}/>
        <Route path="/bowler/:matchId" element={<Bowler/>}/>


      </Routes>
      </HashRouter>




        // <div className="position-relative">
        //      <div className="position-fixed top-0 end-40 mt-3   ">
        //         <Positions />
        //     </div>

        //      <div className="position-fixed bottom-0 start-0 end-0">
        //         <ScoreBar />
        //     </div>
        // </div>
    );
};

export default App;
