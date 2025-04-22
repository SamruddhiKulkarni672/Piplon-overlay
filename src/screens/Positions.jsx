// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Positions = () => {
//     const [players, setPlayers] = useState([
//         { id: 1, points: 0 },
//         { id: 2, points: 0 },
//         { id: 3, points: 0 },
//         { id: 4, points: 0 },
//         { id: 5, points: 0 },
//         { id: 6, points: 0 },
//         { id: 7, points: 0 },
//         { id: 8, points: 0 },
//     ]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setPlayers((prevPlayers) => {
//                 const updatedPlayers = prevPlayers.map((player) => ({
//                     ...player,
//                     points: player.points + Math.floor(Math.random() * 100),
//                 }));

//                 return [...updatedPlayers].sort((a, b) => b.points - a.points);
//             });
//         }, 3000);

//         return () => clearInterval(interval);
//     }, []);

//     const getColor = (index) => {
//         if (index < 3) return "bg-[#3CB371] border-green-600";
//         if (index < 6) return "bg-[#DAA520] border-yellow-600";
//         return "bg-[#FF6347] border-red-600";
//     };

//     return (
//         <div className="relative right-0 flex flex-col items-center justify-center p-1 pt-32 pb-10 w-[100px] text-center">
//             <span className="ml-[150px] mb-[50px] flex items-center justify-center text-[24px] w-[250px] h-[50px]  text-white font-bold rounded-full bg-[#e68a60e1] border-[4px] border-[#bd95458a] shadow-md shadow-zinc-600">
//                 Batter
//             </span>
//             {players.map((player, index) => (
//                 <div
//                     key={player.id}
//                     className="absolute left-0 right-0 transition-transform duration-500 ease-in-out"
//                     style={{
//                         transform: `translateY(${index * 60 + 40}px)`,
//                     }}
//                 >
//                     <span
//                         className={`flex items-center justify-center text-[16px] w-[250px] h-[50px] text-white font-bold rounded-full border-[4px] shadow-md shadow-zinc-600 ${getColor(
//                             index
//                         )}`}
//                     >
//                         {player.points} pts to {index + 1} position
//                     </span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Positions;

import React, { useMemo, useState, useEffect } from "react";
import RankList from "../utils/RankList";
import BatSvg from "../assets/Bat.jsx";
import { useParams } from "react-router-dom";

import Test from "../utils/RankList.jsx";
import { useGetLiveScoreQuery } from "../api/WebSocketQuery.jsx";
import { useViewerScoreCardQuery } from "../api/QuickMatchQuery.jsx";
import {
    calculatePlayerRolesFromMatrix,
    calCulatedRankPlayers,
} from "../utils/calculatePlayerFormats.jsx";

const dummyList = [
    {
        playerKey: "1",
        full_name: "John Doe",
        profile_image: "https://example.com/avatar1.webp", // Optional: You can replace it with your AvatarImg
        total_pts: 150,
        role: "Batter",
        batting_avg: 45.6, // Additional fields to simulate a more realistic scenario
        strike_rate: 130.5,
    },
    {
        playerKey: "2",
        full_name: "James Smith",
        profile_image: "https://example.com/avatar2.webp",
        total_pts: 120,
        role: "Batter",
        batting_avg: 38.2,
        strike_rate: 125.3,
    },
    {
        playerKey: "3",
        full_name: "Robert Johnson",
        profile_image: "https://example.com/avatar3.webp",
        total_pts: 100,
        role: "Batter",
        batting_avg: 42.0,
        strike_rate: 128.7,
    },
    {
        playerKey: "4",
        full_name: "Michael Brown",
        profile_image: "https://example.com/avatar4.webp",
        total_pts: 90,
        role: "Batter",
        batting_avg: 40.5,
        strike_rate: 122.4,
    },
    {
        playerKey: "5",
        full_name: "William Taylor",
        profile_image: "https://example.com/avatar5.webp",
        total_pts: 80,
        role: "Batter",
        batting_avg: 37.1,
        strike_rate: 118.2,
    },
    {
        playerKey: "6",
        full_name: "David White",
        profile_image: "https://example.com/avatar6.webp",
        total_pts: 70,
        role: "RR",
        batting_avg: 41.3,
        strike_rate: 130.0,
    },
];

const Positions = ({}) => {
    //   const rankWiseBatsmenList = useMemo(() => (
    //     calCulatedRankPlayers(battingSideTokenWiseWithPointsList)
    //   ), [battingSideTokenWiseWithPointsList]);

   // const matchId = 18;
    const { matchId } = useParams();

    const [activeBatsmen, setActiveBatsmen] = useState(null);
    const [activeBowler, setActiveBowler] = useState(null);
    const [rankWiseBatsmenList, setRankWiseBatsmenList] = useState([]);
    const [rankWiseBowlerList, setRankWiseBowlersList] = useState([]);
    const [battinSideRank, setBattinSideRank] = useState([]);
    const [bowlingSideRank, setBowlingSideRank] = useState([]);
    console.log("activebat", activeBatsmen);
    console.log("activebawl", activeBowler);
    console.log("rankWiseBatsmenList", rankWiseBatsmenList);
    console.log("rankWiseBowlerList", rankWiseBowlerList);
    console.log("battinSideRank", battinSideRank);
    console.log("bowlingSideRank", bowlingSideRank);

    const {
        data: liveScore,
        isLoading: scoreLoading,
        isError: scoreError,
    } = useGetLiveScoreQuery(matchId, {
        skip: !matchId,
    });
    const { data, isLoading, isError } = useViewerScoreCardQuery(matchId, {
        skip: !matchId,
    });

    console.log("data..........", data);
    console.log("data@@@@@@@@@@.", liveScore);

    // Helper function for safe object property access
    const getSafeValue = (obj, path, defaultValue = null) => {
        return path
            .split(".")
            .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue), obj);
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
        const total_overs = batting_matrix[0]?.length ? batting_matrix[0]?.length - 1 : 0;

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
        setBattinSideRank(ranks?.battinSideRank || []);
        setBowlingSideRank(ranks?.bowlingSideRank || []);
    }, [validOvr, battingMatrix, bowlerMatrix, battingList, bowlingList]);

    // Live score processing
    useEffect(() => {
        if (!liveScore?.players || !battinSideRank || !bowlingSideRank) return;

        const battingStats = getSafeValue(liveScore, "players.batsmen", {});
        const bowlingStats = getSafeValue(liveScore, "players.bowlers", {});
        const bowEvent = getSafeValue(liveScore, "ball_event", []);

        // Process bowling side data
        const bowlingSideMergeData = bowlingSideRank.map((player) => {
            const key = player.playerKey;
            const stats = bowlingStats[key] || {};
            return {
                ...player,
                fld_pts: stats.fld_pts ?? 0,
                role_pts: stats.role_pts ?? 0,
                total_pts: stats.total_pts ?? 0,
                ovr_evt_pts: stats.ovr_evt_pts ?? {},
            };
        });

        // Process batting side data
        const battingSideMergeData = battinSideRank.map((player) => {
            const key = player.playerKey;
            const stats = battingStats[key] || {};
            return {
                ...player,
                fld_pts: stats.fld_pts ?? 0,
                role_pts: stats.role_pts ?? 0,
                total_pts: stats.total_pts ?? 0,
                ovr_evt_pts: stats.ovr_evt_pts ?? {},
            };
        });

        // Sort and update state
        setRankWiseBowlersList(calCulatedRankPlayers(bowlingSideMergeData));
        setRankWiseBatsmenList(calCulatedRankPlayers(battingSideMergeData));
    }, [liveScore, battinSideRank, bowlingSideRank, totalOvers]);

    return (
        <div className="min-h-screen   text-white p-6">
            <div className="max-w-lg">
                <RankList
                    playerList={rankWiseBatsmenList}
                    toggleOption={true}
                    title="Rank wise batters"
                    RoleIcon={BatSvg}
                />
            </div>
        </div>

        //     <div className="min-h-screen flex justify-end text-white p-6">
        //     <div className="w-[500px]">
        //       <RankList
        //         playerList={dummyList}
        //         toggleOption={true}
        //         title="Rank wise batters"
        //         RoleIcon={BatSvg}
        //       />
        //     </div>
        //   </div>




        // <div className="min-h-screen flex justify-end text-white p-6">
        //     <div className="max-w-lg w-full">
        //         <RankList
        //             playerList={dummyList}
        //             toggleOption={true}
        //             title="Rank wise batters"
        //             RoleIcon={BatSvg}
        //         />
        //     </div>
        // </div>

        
    );
};

export default Positions;
