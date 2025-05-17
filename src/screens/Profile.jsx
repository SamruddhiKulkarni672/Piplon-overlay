import React from "react";
import photo from "../assets/pimg.png";
import profile from "../assets/profilebg.png";
import bg from "../assets/groundbg.jpg";  

function Profile() {
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
             style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="relative w-[900px]   h-[900px] mr-[100px] mt-[0px]">
                {/* <img
                    src={profile}
                    className="absolute top-0 left-[80px] w-full h-full object-cover"
                    alt="Profile Background"
                /> */}

                <img
                    src={photo}
                    className="relative top-0 left-[150px] w-full h-full object-cover"
                    alt="Profile"
                />

                <div className="absolute top-36 left-[800px] p-6 w-[600px]">
                    <div className="text-white bg-[#0C0A15] text-[70px] mb-8 font-bold text-center border-4 border-gray-600 rounded-lg">
                        Rohit Sharma
                    </div>
                    <div className="space-y-5 h-10">
                        {[
                            { game: "GAME 01", score: "100" },
                            { game: "GAME 02", score: "80" },
                            { game: "GAME 03", score: "53" },
                            { game: "GAME 04", score: "08" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between h-14 items-center bg-[#0C0A15]  border-4 border-gray-400 text-white font-bold text-lg px-4 py-2 rounded-lg shadow transition"
                            >
                                <span>{item.game}</span>
                                <span>{item.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
