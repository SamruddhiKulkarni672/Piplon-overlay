import React from "react";

function TournamentFour() {
    return (
        <div className="flex flex-col items-center">
            {/* Row for 4's */}
            <div className="flex flex-row gap-4 mt-[300px]">
                {/* Label Box */}
                <div className="w-[500px] h-[230px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#0C0A15] border-8 border-yellow-300 rounded-[8px] flex justify-center items-center transform -skew-x-12">
                        <span className="text-yellow-300 font-extrabold text-[40px] transform skew-x-12">
                            tournament 4'S
                        </span>
                    </div>
                </div>

                {/* Value Box */}
                <div className="w-[290px] h-[230px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#0C0A15] border-8 border-yellow-300 rounded-[8px] flex justify-center items-center transform -skew-x-12">
                        <span className="text-yellow-300 font-extrabold text-[40px] transform skew-x-12">
                            45
                        </span>
                    </div>
                </div>
            </div>

            {/* Row for 6's */}
            <div className="flex flex-row gap-4 mt-[30px]">
                {/* Label Box */}
                <div className="w-[500px] h-[230px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#0C0A15] border-8 border-green-300 rounded-[8px] flex justify-center items-center transform -skew-x-12">
                        <span className="text-green-300 font-extrabold text-[40px] transform skew-x-12">
                            tournament 6'S
                        </span>
                    </div>
                </div>

                {/* Value Box */}
                <div className="w-[290px] h-[230px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#0C0A15] border-8 border-green-300 rounded-[8px] flex justify-center items-center transform -skew-x-12">
                        <span className="text-green-300 font-extrabold text-[40px] transform skew-x-12">
                            27
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TournamentFour;
