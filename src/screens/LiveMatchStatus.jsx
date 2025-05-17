import React from "react";

function LiveMatchStatus({ team = " akshat", runsNeeded = 42, ballsLeft = 24 }) {
    return (
        // <div className="w-full max-w-xl mx-auto bg-gradient-to-r from-blue-900 to-indigo-800 text-white rounded-2xl shadow-lg p-6 mt-[300px] text-center">
        //     <div className="text-2xl font-bold mb-2">Live Match</div>
        //     <div className="text-lg tracking-wide mb-4">
        //         {team} needs{" "}
        //         <span className="text-yellow-300 font-extrabold text-2xl">{runsNeeded} runs</span>
        //         {" "}in <span className="text-green-300 font-extrabold text-2xl">{ballsLeft} balls</span>
        //     </div>
        //     <div className="text-sm text-gray-300">Keep watching for live updates!</div>
        // </div>

        
           <div className="flex flex-row w-full justify-center items-center gap-4 mt-[300px]">
            <div className="flex items-center justify-center">
                <div className="relative w-[290px] h-[230px] bg-[#0C0A15] border-8 border-yellow-300 rounded-[8px] transform -skew-x-12 flex justify-center items-center">
                    <span className="text-yellow-300 font-extrabold text-[40px] transform skew-x-12">
                        {runsNeeded} Points
                    </span>
                </div>
            </div>

            <span className="text-[#0C0A15] text-center font-extrabold text-[40px]">
                In
            </span>

            <div className="flex items-center justify-center">
                <div className="relative w-[290px] h-[230px] bg-[#0C0A15] border-8 border-green-300 rounded-[8px] transform -skew-x-12 flex justify-center items-center">
                    <span className="text-green-300 font-extrabold text-[40px] transform skew-x-12">
                        {ballsLeft} balls
                    </span>
                </div>
            </div>
        </div>
        
    );
}

export default LiveMatchStatus;
