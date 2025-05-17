import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import "../index.css";
import { useGetLiveScoreQuery } from "../api/WebSocketQuery.jsx";
import { useViewerScoreCardQuery } from "../api/QuickMatchQuery.jsx";

import { data } from "react-router-dom";
import {
  calculatePlayerRolesFromMatrix,
  calCulatedRankPlayers,
} from "../utils/calculatePlayerFormats.jsx";
import ballLogo from "../assets/ballImg.svg";
import batLogo from "../assets/batImg.svg";
import Positions from "./Positions.jsx";
import Bowler from "./Bowler.jsx";
import "../assets/animation.css";
import FourAnimation from "./FourAnimation.jsx";
import SixAnimation from "./SixAnimation.jsx";
import { useSelector } from "react-redux";
import Profile from "./Profile.jsx";

// const balls = [
//   { label: "1", color: "bg-[#2E2A45]" },
//   { label: "WD", color: "bg-[#2E2A45]" },
//   { label: "0", color: "bg-[#2E2A45]" },
//   { label: "4", color: "bg-[#0E215F]" },
//   { label: "WD", color: "bg-[#2E2A45]" },
//   { label: "6", color: "bg-[#F67A4B80]" },
//   { label: "Bold", color: "bg-[#F5000099] font-bold" },
//   { label: "NB", color: "bg-[#2E2A45]" },
//   { label: "NB6", color: "bg-[#2E2A45]" },
// ];

const ScoreBar = () => {
  const { matchId } = useParams();
  console.log("==>", matchId);
  const [showRank, setShowRank] = useState(
    JSON.parse(localStorage.getItem("showRank")) || false
  );
  const [showBowler, setShowBowler] = useState(
    JSON.parse(localStorage.getItem("showBowler")) || false
  );
  const [four, setFour] = useState(
    JSON.parse(localStorage.getItem("fourAnimation")) || false
  );
  const [six, setSix] = useState(
    JSON.parse(localStorage.getItem("sixAnimation")) || false
  );
   const [showProfile, setShowProfile] = useState(
    JSON.parse(localStorage.getItem("showProfile")) || false
  );

  // Inside ScoreBar Component

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "showRank") {
        setShowRank(JSON.parse(event.newValue));
      }
      if (event.key === "showBowler") {
        setShowBowler(JSON.parse(event.newValue));
      }
      if (event.key === "fourAnimation") {
        setFour(JSON.parse(event.newValue));
      }
      if (event.key === "sixAnimation") {
        setSix(JSON.parse(event.newValue));
      }
      if (event.key === "showProfile") {
        setShowProfile(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    let fourTimeout, sixTimeout;

    if (four) {
      fourTimeout = setTimeout(() => {
        setFour(false);
        localStorage.setItem("fourAnimation", JSON.stringify(false));
      }, 4000);
    }

    if (six) {
      sixTimeout = setTimeout(() => {
        setSix(false);
        localStorage.setItem("sixAnimation", JSON.stringify(false));
      }, 4000);
    }

    return () => {
      clearTimeout(fourTimeout);
      clearTimeout(sixTimeout);
    };
  }, [four, six]);

  //const matchId = 4;
  const [score, setScore] = useState({
    runs: 100,
    wickets: 2,
    overs: 15.2,
    batsman: "Sachin Ghuge",
    bowler: "Aniket Wagh",
  });

  // const matchId = 123; // or get it from props, URL, context, etc.

  const [activeBatsmen, setActiveBatsmen] = useState(null);
  const [activeBowler, setActiveBowler] = useState(null);

  const {
    data: liveScore,
    isLoading: isLiveScoreLoading,
    isError: isLiveScoreError,
  } = useGetLiveScoreQuery(matchId, {
    skip: !matchId,
  });

  const { data, isLoading, isError } = useViewerScoreCardQuery(matchId, {
    skip: !matchId,
  });

  useEffect(() => {
    if (liveScore) {
      console.log("Live score update:", liveScore);
      setScore(liveScore);
    }
  }, [liveScore]);

  const getSafeValue = (obj, path, defaultValue = null) => {
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue),
        obj
      );
  };

  const {
    battingMatrix,
    bowlerMatrix,
    battingList,
    bowlingList,
    combinedMatrix,
    fieldCoordinate,
    totalOvers,
  } = useMemo(() => {
    if (!data) return {};

    const batting_matrix = getSafeValue(data, "batting_matrix", []);
    const bowler_matrix = getSafeValue(data, "bowling_matrix", []);
    const batting_list = getSafeValue(data, "batsmen_list", []);
    const bowling_list = getSafeValue(data, "bowler_list", []);
    const field_coordinate = getSafeValue(data, "coordinate_list", []);
    const combined_matrix = batting_matrix.concat(bowler_matrix);
    const total_overs = batting_matrix[0]?.length
      ? batting_matrix[0]?.length - 1
      : 0;

    return {
      battingMatrix: batting_matrix,
      bowlerMatrix: bowler_matrix,
      battingList: batting_list,
      bowlingList: bowling_list,
      combinedMatrix: combined_matrix,
      fieldCoordinate: field_coordinate,
      totalOvers: total_overs,
    };
  }, [data]);

  const bowEvent = liveScore?.ball_event || [];
  const ovr = bowEvent[0] || 0;
  //  (updateBall(bowEvent[1] || 0));
  //  (updateEvtNo(bowEvent[2] || 0));
  //  (updatePerBallAction(bowEvent[3] || 0));
  //  (updatePlayersCurrentOvrPt(bowEvent[4] || 0));

  const validOvr = Math.min(Math.max(ovr || 0, 0), totalOvers || 0);

  useEffect(() => {
    if (!battingMatrix || !bowlerMatrix || validOvr == null) return;

    const ranks = calculatePlayerRolesFromMatrix({
      battingMatrix,
      bowlerMatrix,
      battingList,
      bowlingList,
      over: validOvr,
    });

    setActiveBatsmen(ranks?.active_batsman || null);
    setActiveBowler(ranks?.active_bowler || null);
  }, [validOvr, battingMatrix, bowlerMatrix, battingList, bowlingList]);

  const recentBallsArray = liveScore?.ball_event?.[3] || [];

  const balls = recentBallsArray.map((item) => {
    let color = "bg-[#2E2A45]";

    switch (item) {
      case "4":
        color = "bg-[#0E215F]";
        break;
      case "S":
        color = "bg-[#F67A4B80]";
        break;
      case "Bold":
      case "W":
      case "C":
        color = "bg-[#F5000099] font-bold";
        break;
      case "NB":
      case "WD":
        color = "bg-[#2E2A45]";
        break;
      default:
        color = "bg-[#2E2A45]";
    }

    return {
      label: item,
      color,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevScore) => ({
        ...prevScore,
        runs: prevScore.runs + Math.floor(Math.random() * 10),
        overs: (parseFloat(prevScore.overs) + 0.1).toFixed(1),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const batsmanStats = liveScore?.ball_event?.[4]?.batsman;

  const bowlerStats = liveScore?.ball_event?.[4]?.bowler;

  const currentOver = liveScore?.ball_event?.[0];

  // const toggleRank = () => {
  //   setShowRank((prev) => !prev);
  // };

  // const toggleBowler = () => {
  //   setShowBowler((prev) => !prev);
  // };

  return (
    <>
      {/* <FourAnimation />
      <SixAnimation /> */}

      <div className="bg-transparent">
        <div className="flex align-self-center justify-center ">
          {four && <FourAnimation />}
          <div className={` ${four ? "fade-in" : "fade-out"}`}>
            {/* {four && <FourAnimation />} */}
          </div>

          <div
            className={`transition-container ${six ? "fade-in" : "fade-out"} `}
          >
            {six && <SixAnimation />}
          </div>
        </div>
        <div className="flex justify-between">
          <div
            className={`transition-container ${
              showRank ? "fade-in" : "fade-out"
            }`}
          >
            {showRank && <Positions />}
          </div>
          <div
            className={`transition-container ${
              showBowler ? "fade-in" : "fade-out"
            }`}
          >
            {showBowler && <Bowler />}
          </div>

            <div
            className={`transition-container ${
               showProfile ? "fade-in" : "fade-out"
            }`}
          >
            {showProfile && <Profile />}
          </div>

          


        </div>
      </div>

      {/* 2nd section */}
      <div className="flex flex-column ">
        <div className="flex justify-between bg-transparent items-center fixed bottom-0 left-0 h-[50px] sm:h-[70px] lg:h-[150px] right-0 text-white lg:text-2xl">
          <div
            className="flex  align-middle justify-center w-[10%] h-full bg-[#0C0A15] rounded-[16px]  "
            style={{ border: "3px solid #2E2A45" }}
          >
            <img src={batLogo} className="p-4" />
          </div>
          <div className="flex   w-[80%] h-[80%] bg-[#0C0A15]  ">
            <div className="w-[400px] mx-auto mt-3 bg-transparent text-center text-white font-bold">
              <div className="flex items-center justify-center space-x-2 text-[28px]">
                <span>🏏</span>

                <h1 className="text-white font-bold text-[28px]">
                  {activeBatsmen?.playerKey}-{activeBatsmen?.full_name}{" "}
                </h1>
              </div>

              <hr className="my-0 border-[#2f2c4d]" />

              <div className="flex justify-center space-x-4 text-[20px] font-semibold mb-3">
                <span className="text-[#777584]">
                  This over -{" "}
                  <span className="text-[#ffe678]">{batsmanStats?.op}pts</span>
                </span>
                <span className="text-[#777584]">|</span>
                <span className="text-[#777584]">
                  Total -{" "}
                  <span className="text-[#ffe678]">{batsmanStats?.tp} pts</span>
                </span>
              </div>
            </div>

            <div className="  w-[2px] h-[90px] bg-[#2E2A45] my-3" />

            {/* bowler score  */}
            <div className="w-[400px] mx-auto mt-3 bg-transparent text-center text-white font-bold">
              <div className="flex items-center justify-center space-x-2 text-[28px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-lime-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" className="fill-lime-400" />
                  <path
                    d="M4 12c0-4.418 3.582-8 8-8m8 8c0 4.418-3.582 8-8 8"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
                <h1 className="text-white font-bold text-[28px]">
                  {activeBowler?.playerKey}-{activeBowler?.full_name}{" "}
                </h1>
              </div>

              <hr className="my-0 border-[#2E2A45]" />

              <div className="flex justify-center space-x-4 text-[20px] font-semibold">
                <span className="text-[#777584]">
                  This over -{" "}
                  <span className="text-[#ffe678]">{bowlerStats?.op} pts</span>
                </span>
                <span className="text-[#777584]">|</span>
                <span className="text-[#777584]">
                  Total -{" "}
                  <span className="text-[#ffe678]">{bowlerStats?.tp} pts</span>
                </span>
              </div>
            </div>

            <div className="  w-[2px] h-[110px] bg-[#2E2A45]  " />
            {/* over display  */}
            <div className="w-[100px] h-full flex items-center justify-center text-center  text-white font-bold text-[28px]   mx-auto">
              {currentOver}st Over
            </div>

            <div className="  w-[2px] h-[110px] bg-[#2E2A45] " />

            {/* <div className="w-[400px] mx-auto p-4 bg-transparent text-center text-white font-bold">
                    <div className="flex items-center justify-center space-x-2 text-[28px]">
                        <span>🏏</span>

                        <h1 className="text-white font-bold text-[28px]">A1- Ashok Kumar</h1>
                    </div>

                    <hr className="my-2 border-[#2f2c4d]" />

                    <div className="flex justify-center space-x-4 text-[20px] font-semibold">
                        <span className="text-[#777584]">
                            This over - <span className="text-[#ffe678]">11 pts</span>
                        </span>
                        <span className="text-[#777584]">|</span>
                        <span className="text-[#777584]">
                            Total - <span className="text-[#ffe678]">58 pts</span>
                        </span>
                    </div>
                </div> */}

            <div className="flex flex-wrap gap-3 p-[10px] w-[500px]">
              {balls.map((ball, index) => (
                <div
                  key={index}
                  className={`text-white text-xl w-20 h-10 flex items-center justify-center rounded-full shadow-md ${ball.color}`}
                  style={{ border: "1px solid #59566C" }}
                >
                  {ball.label}
                </div>
              ))}
            </div>
          </div>
          <div
            className="flex  align-middle justify-center w-[10%] h-full bg-[#0C0A15] rounded-[16px]  "
            style={{ border: "3px solid #2E2A45" }}
          >
            <img src={ballLogo} className="p-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBar;
