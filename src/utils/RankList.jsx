import React, { useState } from 'react';
import AvatarImg from  '../assets/Avatar.webp';
import { Rank_First_1, Rank_Second_2, Rank_Third_3 } from '../assets/Player_Rank';

const PlayerItem = ({ bowler, expanded, index }) => {
  
  const bgColor = 
  index <= 2 
    ? 'bg-[#28511266]' 
    : (bowler?.role === 'RR' ? 'bg-[#D134004D]' : 'bg-black/60');




  let CrownIcon = null;
  if (index === 0) {
    CrownIcon = <Rank_First_1 width={20} height={20} />;
  } else if (index === 1) {
    CrownIcon = <Rank_Second_2 width={20} height={20} />;
  } else if (index === 2) {
    CrownIcon = <Rank_Third_3 width={20} height={20} />;
  }

  return (
    <div className={`flex items-center px-3 py-2 border-b border-gray-700 ${bgColor}`}>
      <span className="text-white font-bold w-10 text-md">{bowler?.playerKey}</span>
      <div className="flex items-center gap-2 flex-1">
        <img
          src={bowler?.profile_image || AvatarImg}
          alt="avatar"
          className="w-6 h-6 rounded"
        />
        <span className="text-white text-xl">{bowler?.full_name}</span>
      </div>
      <div className="flex items-center gap-2">
        {CrownIcon}
        <span className="text-yellow-300 text-lg">{bowler?.total_pts} pts /</span>
        <span className="text-white text-lg">{bowler?.goal_pts} pts</span>
      </div>
    </div>
  );
};



const RankList = ({ playerList, toggleOption, title, RoleIcon,roleHeader }) => {
  const [expanded, setExpanded] = useState(true);

  if (!playerList) {
    return (
      <div className="flex justify-center items-center min-h-[100px] bg-gray-900">
        <span className="text-white text-sm">Loading match data...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-950/80 border border-gray-700 rounded-2xl w-full  p-2  ">
      {/* <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <RoleIcon width={16} height={16} />
          <span className="text-white font-bold text-sm">{title}</span>
        </div>
        
      </div> */}
      <div className="bg-indigo-600/50 text-white   font-bold flex justify-between px-3 py-2 rounded-t-lg text-base">
        <div className="flex gap-10 text-base">
          <span className='text-base'>Rank</span>
          <span> {roleHeader}</span>
        </div>
        <span>Current Pts & Goal</span>
      </div>
      <div>
        {(  playerList  ).map((bowler, index) => (
          <PlayerItem key={bowler?.playerKey} bowler={bowler} expanded={expanded} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RankList;
