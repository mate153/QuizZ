import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TimeAttack from './TimeAttack';
import QuizZ from './QuizZ';

export default function Game(props) {
  const navigate = useNavigate();
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const [timeAttackLimit, setTimeAttackLimit] = useState(null);
  const [musicSettings, seMusicSettings] = useState(null);
  const [sfxSettings, setSfxSettings] = useState(null);
  const [timeAttackDifficulty, setTimeAttackDifficulty] = useState(null);
  const [backToMainMenu, setBackToMainMenu] = useState(false);
  const [isTimeAttack, setIsTimeAttack] = useState(false);
  const [isNormal, setIsNormal] = useState(false);
  const [mainTileDisplay, setmainTileDisplay] = useState(true);


  const handleStart = () => {
    if(selectedGameMode === "TimeAttack" && timeAttackLimit !== null && musicSettings !== null && sfxSettings !== null){
      setIsTimeAttack(true);
      setmainTileDisplay(false);
    }
    if(selectedGameMode === "Normal" && musicSettings !== null && sfxSettings !== null && timeAttackDifficulty !== null){
      setIsNormal(true);
      setmainTileDisplay(false);
    } 
  }

  const handlerGameMode = (mode) => {
    setSelectedGameMode(mode)
  }

  const handlerTimeAttackLimit = (limit) => {
    setTimeAttackLimit(limit)
  }

  const handlerMusicSettings = (bool) => {
    seMusicSettings(bool)
  }

  const handlerSfxSettings = (bool) => {
    setSfxSettings(bool)
  }

  const handlerTimeAttackDifficulty = (difficulty) => {
    setTimeAttackDifficulty(difficulty)
  }

  const handlerBackToMainMenu = () => {
    setBackToMainMenu(true)
    setTimeout(() => {
      navigate(-1)
    }, 500)

  }

  return (    
      <div className={backToMainMenu === true ? "gameSettingsContainerHide" : isTimeAttack === true || isNormal === true ? "gameSettingsContainerDark" : "gameSettingsContainer"}>
        <div className={backToMainMenu === true ? "mainTileHide" : isTimeAttack === true || isNormal === true ? "mainTileScale" : "mainTile"}>
          {mainTileDisplay === true ?
            <>
              <div className="backToMainMenu" onClick={handlerBackToMainMenu}><i className="fa-solid fa-xmark"></i></div>
              <span className='gameSettingsContainerTitle'>Prepare your game</span>
              <div className="gameModeContainer">
                <div className={selectedGameMode === "TimeAttack" ? "timeAttackModeActive" : "timeAttackMode"} onClick={() => handlerGameMode("TimeAttack")}><i className="fa-solid fa-stopwatch fa-shake"></i> Time Attack</div>
                <div className={selectedGameMode === "Normal" ? "normalModeActive" : "normalMode"} onClick={() => handlerGameMode("Normal")}><i className="fa-solid fa-glasses fa-fade"></i> QuizZ</div>
                <div className={selectedGameMode === "Hardcore" ? "hardcoreModeActive" : "hardcoreMode"} onClick={() => handlerGameMode("Hardcore")}><i className="fa-solid fa-globe fa-bounce"></i> Multiplayer</div>
                <span className="gameModeSelector">Select Game Mode</span>
              </div>
              { selectedGameMode === "TimeAttack" ? 
                <>
                  <div className="timeAttackModeContainer">
                    <div className={timeAttackLimit === 30 ? "timeAttackLimitActive" : "timeAttackLimit"} onClick={() => handlerTimeAttackLimit(30)}>0:30</div>
                    <div className={timeAttackLimit === 60 ? "timeAttackLimitActive" : "timeAttackLimit"} onClick={() => handlerTimeAttackLimit(60)}>1:00</div>
                    <div className={timeAttackLimit === 90 ? "timeAttackLimitActive" : "timeAttackLimit"} onClick={() => handlerTimeAttackLimit(90)}>1:30</div>
                    <div className={timeAttackLimit === 120 ? "timeAttackLimitActive" : "timeAttackLimit"} onClick={() => handlerTimeAttackLimit(120)}>2:00</div>
                    <div className={timeAttackLimit === 150 ? "timeAttackLimitActive" : "timeAttackLimit"} onClick={() => handlerTimeAttackLimit(150)}>2:30</div>
                    <div className={timeAttackLimit === 180 ? "timeAttackLimitActive" : "timeAttackLimit"} onClick={() => handlerTimeAttackLimit(180)}>3:00</div>
                  </div>
                  <div className="musicAndSFXContainer">
                    <div className="musicContainer">
                      <div className={musicSettings === true ? "musicONActive" : "musicON"} onClick={() => handlerMusicSettings(true)}>Music ON</div>
                      <div className={musicSettings === false ? "musicOFFActive" : "musicOFF"} onClick={() => handlerMusicSettings(false)}>Music OFF</div>
                    </div>
                    <div className="sfxContainer">
                      <div className={sfxSettings === true ? "sfxONActive" : "sfxON"} onClick={() => handlerSfxSettings(true)}>SFX ON</div>
                      <div className={sfxSettings === false ? "sfxOFFActive" : "sfxOFF"} onClick={() => handlerSfxSettings(false)}>SFX OFF</div>
                    </div>
                    <span className="gameModeSelector">Music & SFX Settings</span>
                  </div>
                  <div className="startGameContainer">
                    <div className="startGameBtn" onClick={handleStart}><button>QUIZ TIME</button></div>
                  </div>
                </>
                : undefined
              }
              { selectedGameMode === "Normal" ?
                <>
                  <div className="timeAttackDifficultyContainer">
                    <div className={timeAttackDifficulty === "default" ? "timeAttackDifficultyActive" : "timeAttackDifficulty"} onClick={() => handlerTimeAttackDifficulty("default")}>Default</div>
                    <div className={timeAttackDifficulty === "easy" ? "timeAttackDifficultyActive" : "timeAttackDifficulty"} onClick={() => handlerTimeAttackDifficulty("easy")}>Easy</div>
                    <div className={timeAttackDifficulty === "normal" ? "timeAttackDifficultyActive" : "timeAttackDifficulty"} onClick={() => handlerTimeAttackDifficulty("normal")}>Normal</div>
                    <div className={timeAttackDifficulty === "hard" ? "timeAttackDifficultyActive" : "timeAttackDifficulty"} onClick={() => handlerTimeAttackDifficulty("hard")}>Hard</div>
                  </div>
                  <div className="musicAndSFXContainer">
                    <div className="musicContainer">
                      <div className={musicSettings === true ? "musicONActive" : "musicON"} onClick={() => handlerMusicSettings(true)}>Music ON</div>
                      <div className={musicSettings === false ? "musicOFFActive" : "musicOFF"} onClick={() => handlerMusicSettings(false)}>Music OFF</div>
                    </div>
                    <div className="sfxContainer">
                      <div className={sfxSettings === true ? "sfxONActive" : "sfxON"} onClick={() => handlerSfxSettings(true)}>SFX ON</div>
                      <div className={sfxSettings === false ? "sfxOFFActive" : "sfxOFF"} onClick={() => handlerSfxSettings(false)}>SFX OFF</div>
                    </div>
                    <span className="gameModeSelector">Music & SFX Settings</span>
                  </div>
                  <div className="startGameContainer">
                    <div className="startGameBtn" onClick={handleStart}><button>QUIZ TIME</button></div>
                  </div>
                </>
                : undefined
              }
              { selectedGameMode === "Hardcore" ?
                <div className="hardcoreModeContainer">
                  <span>This mode is <b>Unavailable</b> at the moment !</span>
                </div>
                : undefined
              }
            </>
          :
          selectedGameMode === 'TimeAttack' && isTimeAttack === true && timeAttackLimit !== null && musicSettings !== null && sfxSettings !== null?
            <TimeAttack limit={timeAttackLimit} music={musicSettings} sfx={sfxSettings} display={mainTileDisplay} user={props.user}/>
          :
          selectedGameMode === 'Normal' && isNormal === true && timeAttackDifficulty !== null && musicSettings !== null && sfxSettings !== null?
            <QuizZ difficulty={timeAttackDifficulty} music={musicSettings} sfx={sfxSettings} display={mainTileDisplay} user={props.user}/>
          : undefined
          }   
        </div>
      </div>
    
  )
}
