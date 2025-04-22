// utils/calculateRanksFromMatrix.js
export const calculatePlayerRolesFromMatrix = ({ battingMatrix, bowlerMatrix, battingList, bowlingList, over }) => {
    const validOvr = over ?? 0;
  
    const batsmen = battingMatrix?.map(row => {
      const playerKey = row[0];
      const role = row[validOvr] ?? null;
      return { playerKey, ...battingList[playerKey], role };
    });
  
    const bowlers = bowlerMatrix?.map(row => {
      const playerKey = row[0];
      const role = row[validOvr] ?? null;
      return { playerKey, ...bowlingList[playerKey], role };
    });
  
    const onGroundPlayer = [...batsmen, ...bowlers].filter(player => player.role !== 'RR');
  
    const active_batsman = batsmen?.find(p => p.role === 'BT') ?? {};
    const active_bowler = bowlers?.find(p => p.role === 'BW') ?? {};
  
    return {
      battinSideRank: batsmen,
      bowlingSideRank: bowlers,
      active_batsman,
      active_bowler,
      onGroundPlayer
    };
  };

  // export  const calCulatedRankPlayers = (playersData = []) => {
  //   const sortedData = [...playersData].sort((a, b) => b.total_pts - a.total_pts);
  //   const highestPoints = sortedData[0]?.total_pts || 0;
  //   return sortedData?.map((player, index) => ({
  //     playerKey: player.playerKey,
  //     full_name: player.full_name,
  //     playing_role: player.playing_role,
  //     profile_image: player.profile_image,
  //     ovr_evt_pts: player.ovr_evt_pts,
  //     role: player.role,
  //     total_pts: player.total_pts,
  //     goal_pts: index === 0 ? 0 : (highestPoints - player.total_pts) + 1
  //   }));
  // };

  export const calCulatedRankPlayers = (playersData = []) => {
    const sortedData = [...playersData].sort((a, b) => b.total_pts - a.total_pts);
    return sortedData.map((player, index) => {
      const goal_pts = index === 0 ? 0 : (sortedData[index - 1].total_pts - player.total_pts) + 1;
      return {
        ...player,
        goal_pts,
      };
    });
  };

  export const showCurretOverBatsmenAndBowler = ({ battingMatrix, bowlerMatrix, battingList, bowlingList, over }) => {
    const validOvr = over ?? 0;
  
    const batsmen = battingMatrix?.map(row => {
      const playerKey = row[0];
      const role = row[validOvr] ?? null;
      return { playerKey, ...battingList[playerKey], role };
    });
  
    const bowlers = bowlerMatrix?.map(row => {
      const playerKey = row[0];
      const role = row[validOvr] ?? null;
      return { playerKey, ...bowlingList[playerKey], role };
    });  
    const active_batsman = batsmen?.find(p => p.role === 'BT') ?? {};
    const active_bowler = bowlers?.find(p => p.role === 'BW') ?? {};
  
    return {
      active_batsman,
      active_bowler,
    };
  };