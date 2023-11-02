import React, { useState, useEffect } from 'react'

export default function ScoreBoard({score, user, game, gamemode}) {

  const [userStats, setUserStats] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(game === "TimeAttack") {
          const loginnedUserData = {user : user, points : score};
          await fetch('http://localhost:3001/api/scoreboard/timeattack/' + gamemode + '', {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginnedUserData),
          })
        } else {
          const loginnedUserData = {user : user, points : score};
          await fetch('http://localhost:3001/api/scoreboard/quizz/' + gamemode + '', {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginnedUserData),
          })
        }

      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const getUserStats = async () => {
      try{
        if(game === "TimeAttack") {
          const getResponse = await fetch('http://localhost:3001/api/leaderboard/timeattack/' + gamemode + '');
          const getStats = await getResponse.json();
          setUserStats(getStats);
        } else {
          const getResponse = await fetch('http://localhost:3001/api/leaderboard/quizz/' + gamemode + '');
          const getStats = await getResponse.json();
          setUserStats(getStats);
        }
      }catch (err){console.log(err)}
    }
    getUserStats();
  }, []);

  useEffect(() => {
    if(userStats !== null){
      userStats.sort((a, b) => Number(b.Points) - Number(a.Points))
    }
    setResult(userStats);
  }, [userStats]);


  return (  
    (userStats !== null) &&
    <div className='scoreBoardContainer'>
        <div className='leaderBoard'><span>LEADERBOARD</span></div>
        <div className="displayScore">Your Score: {score}</div>
            {result && result.map((obj, id) => {
                return(
                <div className='playerScoreDiv' key={'SBDiv_'+id}>
                    <span className='SB_rank' key={'rank_'+id}>{'#'+ (id+1)}</span>
                    <span className='SB_player' key={'player_'+id}><div className='avatar' key={'avatar_'+id}></div>{obj.PlayerName}</span>
                    <span className='SB_score' key={'score_'+id}>{obj.Points}</span>     
                </div>)
            })}       
    </div>
  )
}
