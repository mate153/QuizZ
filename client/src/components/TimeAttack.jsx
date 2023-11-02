import React, { useState, useEffect, useRef } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import ReactSlider from 'react-slider'
import 'react-circular-progressbar/dist/styles.css'
import Unicorn from './Unicorn'
import ScoreBoard from './ScoreBoard'
import { useNavigate } from 'react-router-dom'
import unicornAnswer from '../unicornAnswer.json'

const progressbarColor = '#46BD22';
const progressbarPath = '#AFADAD';
let hintText = "";

export default function TimeAttack(props) {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState(null);
  const [score, setScore] = useState(0);
  const [randomQuestion, setRandomQuestion] = useState("");
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(props.limit);
  const [volumeValue, setVolumeValue] = useState(40);
  const secondsLeftRef = useRef(secondsLeft);
  const percentage = Math.round(secondsLeft / props.limit * 100);
  const bgMusic = useRef(new Audio(process.env.PUBLIC_URL + "/music/quizCombatMusic.mp3"));
  const gameENDsfx = useRef(new Audio(process.env.PUBLIC_URL + "/music/gameENDsfx.mp3"));
  const answerOKsfx = useRef(new Audio(process.env.PUBLIC_URL + "/music/answerOKsfx.mp3"));
  const answerFAILsfx = useRef(new Audio(process.env.PUBLIC_URL + "/music/answerFAILsfx.mp3"));
  const timerTICKsfx = useRef(new Audio(process.env.PUBLIC_URL + "/music/timerTICKsfx.mp3"));
  const [sfxIsEnabled, setSfxIsEnabled] = useState(false);
  const [startGameButtonPressed, setStartGameButtonPressed ] = useState(false);
  const [ifAnswerButtonPressed,setIfAnswerButtonPressed] = useState(null);
  const [answerIsOk,setAnsewerIsOk] = useState(190);
  const [answerIsNotOk, setAnswerIsNotOk] = useState(190);


  const [isFirstGame, setIsFirstGame] = useState(false);

  const tick = () => {
    secondsLeftRef.current--;
    
    if(sfxIsEnabled && secondsLeftRef.current <= 10) {
      timerTICKsfx.current.play();
    }
    setSecondsLeft(secondsLeftRef.current)
  }

  const initTimer = () => {
      if(gameStarted) {
          setSecondsLeft(secondsLeftRef.current)
      } else {
          props.limit > secondsLeftRef.current ? setSecondsLeft(secondsLeftRef.current) : setSecondsLeft(props.limit)
      }
  }

  useEffect(() => {
    if(props.music === true) {
      bgMusic.current.loop = true;
      bgMusic.current.volume = 0.4;
      bgMusic.current.play();
    }
    if(props.sfx === true) {
      setSfxIsEnabled(true);
    }
  }, [props.music,props.sfx ])

  useEffect(() => {
      initTimer();

      const interval = setInterval(() => {
          if(gameStarted === false) {
              return
          } else if (secondsLeftRef.current <= 0) {
            if(sfxIsEnabled) {
              gameENDsfx.current.play();
            }
            setStartGameButtonPressed(false);
            setGameStarted(false);
            return
          } else {
              tick()
          }
      }, 1000)

      return () => clearInterval(interval);
  }, [gameStarted])   

  function FetchData(){
    const refVariable = useRef(true);
    useEffect(()=>{
        if(refVariable.current){
            refVariable.current = false;
            fetchingData();
        }
      },[]);
  }
  FetchData();

  async function fetchingData(){
      try{
          const res = await fetch('http://localhost:3001/api/data');
          const data = await res.json();
          setQuestionData(data);
      }catch(err){
          console.log(err);
      }
  }
  
  const randomGenerator = (data) => {
    const randNum = Math.floor(Math.random() * (data.length-1));
    return data[randNum];
  }

  function unicornHint(){
    const randNum = Math.floor(Math.random() * (unicornAnswer.length - 1));
    if(secondsLeftRef.current % 10 === 1){
      hintText = unicornAnswer[randNum];   
    }         
  }
  unicornHint()

  useEffect(() => {
    if(questionData !== null){    
      setRandomQuestion(randomGenerator(questionData));
    }
  }, [questionData, toggleSwitch]);

  useEffect(() => {
    bgMusic.current.volume = volumeValue / 100;
  }, [volumeValue])
  
  function handleClick(input){
    setIfAnswerButtonPressed(input);
    setGameStarted(false);
    setTimeout(() => {
      if(input === randomQuestion.Answer){
        if(sfxIsEnabled) {
          answerOKsfx.current.play()
        }
        setScore(score + 5);
        setAnsewerIsOk(250);
      }else{
        if(sfxIsEnabled) {
          answerFAILsfx.current.play()
        }
        setAnswerIsNotOk(randomQuestion.Answer);
        setScore(score - 5);
        setAnsewerIsOk(145);
      }

      setTimeout(() => {
        setGameStarted(true);
        setIfAnswerButtonPressed(null); 
        setAnswerIsNotOk(190);
        toggleSwitch === true ? setToggleSwitch(false) : setToggleSwitch(true);
        setAnsewerIsOk(190);
      }, 2000);
    }, 2000);
  }

  const handlerVolume = (e) => {
    setVolumeValue(e);
  }

  const handleStartGameBtn = (status) =>{
    hintText = "";
    startGameButtonPressed === false ? setStartGameButtonPressed(true) : setStartGameButtonPressed(false);
    secondsLeftRef.current = props.limit; 
    setScore(0);
    setIsFirstGame(true);
    fetchingData();
    setTimeout(() => {
      setGameStarted(status);
      setSecondsLeft(props.limit);
    }, 1000);    
  }

  const handlerBackToMainMenu = () => {
    hintText = "";
    setTimeout(() => {
      bgMusic.current.pause();
      bgMusic.current.currentTime = 0;
      navigate(-1);
    }, 500)
  }
    
  return (
   randomQuestion && 
    <>
      {startGameButtonPressed === true ?
      
      <div className='timeAttackBG'>
          <div className='timeAttackTitleContainer'>
            <div className='scoreContainer'>
                <div className='scoreHolder'>
                  <span className='scoreSpanNormal'>{score}</span><span className='scoreSpanSomething'>{answerIsOk === 250 ? "+5" : answerIsOk === 145 ? "-5" : undefined}</span>
                </div>
            </div>
            <div className="questionContainer">
              <span>{randomQuestion.Question}</span>
            </div>
            <div className={gameStarted === true ? 'timerContainer' : 'timerContainerPaused'}>
              <CircularProgressbar
                  value={percentage}
                  text={`${secondsLeft}`}
                  background={true}
                  styles={buildStyles({
                      textColor: secondsLeft > 10 ? '#fff' : '#f00',
                      pathColor: secondsLeft > 10 ? progressbarColor : '#E62626',
                      trailColor: progressbarPath,
                      backgroundColor: '#0F073C',
                      textSize: '24px',
                  })}
              />
            </div>
          </div>
          <div className='answersAndModelContainer'>
              <div className='modelContainer'>
                <Unicorn/>
                {hintText === "" ? undefined : <div className="bubble bubble-bottom-left" >{hintText}</div>}
              </div>
              <div className='answerOptionsContainer'>
                <div  className={gameStarted === false ? 'answerOptionDeactive' : 'answerOption'}
                        onClick={gameStarted === true ? () => {handleClick("A")} : undefined}
                        style={
                          ifAnswerButtonPressed === "A"
                            ? { filter: `hue-rotate(${answerIsOk}deg)` }
                            : {
                                filter: `hue-rotate(${answerIsNotOk === "A" ? 250 : 0}deg)`,
                                animation: answerIsNotOk === "A" ? "blink 0.3s linear infinite" : undefined
                              }
                        }
                      >
                    <span>{randomQuestion.A}</span>
                  </div>
                  <div  className={gameStarted === false ? 'answerOptionDeactive' : 'answerOption'}
                        onClick={gameStarted === true ? () => {handleClick("B")} : undefined}
                        style={
                          ifAnswerButtonPressed === "B"
                            ? { filter: `hue-rotate(${answerIsOk}deg)` }
                            : {
                                filter: `hue-rotate(${answerIsNotOk === "B" ? 250 : 0}deg)`,
                                animation: answerIsNotOk === "B" ? "blink 0.3s linear infinite" : undefined
                              }
                        }
                      >
                    <span>{randomQuestion.B}</span>
                  </div>
                  <div  className={gameStarted === false ? 'answerOptionDeactive' : 'answerOption'}
                        onClick={gameStarted === true ? () => {handleClick("C")} : undefined}
                        style={
                          ifAnswerButtonPressed === "C"
                            ? { filter: `hue-rotate(${answerIsOk}deg)` }
                            : {
                                filter: `hue-rotate(${answerIsNotOk === "C" ? 250 : 0}deg)`,
                                animation: answerIsNotOk === "C" ? "blink 0.3s linear infinite" : undefined
                              }
                        }
                      >
                    <span>{randomQuestion.C}</span>
                  </div>
                  <div  className={gameStarted === false ? 'answerOptionDeactive' : 'answerOption'}
                        onClick={gameStarted === true ? () => {handleClick("D")} : undefined}
                        style={
                          ifAnswerButtonPressed === "D"
                            ? { filter: `hue-rotate(${answerIsOk}deg)` }
                            : {
                                filter: `hue-rotate(${answerIsNotOk === "D" ? 250 : 0}deg)`,
                                animation: answerIsNotOk === "D" ? "blink 0.3s linear infinite" : undefined
                              }
                        }
                      >
                    <span>{randomQuestion.D}</span>
                  </div>
              </div>
          </div>
      </div>      
      : (isFirstGame === false)?    
      <div className='gameAlmostStartedScreen'>
        {
          props.music === true ?
            <div className='volumeSliderContainer'>
              <div className='musicVolumeDiv'><span>Music Volume</span></div>
              <ReactSlider
                className={'volumeSlider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={volumeValue}
                onChange={handlerVolume}
                min={0}
                max={100}
              />
          </div>
          : undefined
        }
        <button className='startGameBtnReal' onClick={() => handleStartGameBtn(true)}>
          <span className='startGameBtnReal-content'>Start Game</span>
        </button>
        <button className='startGameBtnReal' onClick={handlerBackToMainMenu}>
          <span className='startGameBtnReal-content'>Back to Main Menu</span>
        </button>
      </div> :
      <>
        <div className='gameFinishedScreen'>
          <button className='startGameBtnReal' onClick={() => handleStartGameBtn(true)}>
            <span className='startGameBtnReal-content'>Play again</span>
          </button>
          <button className='startGameBtnReal' onClick={handlerBackToMainMenu}>
            <span className='startGameBtnReal-content'>Back to Main Menu</span>
          </button>
        </div> 
        <div>
          <ScoreBoard score={score} user={props.user} game="TimeAttack" gamemode={props.limit}/>
        </div>
      </>
      }
    </>
  )
}

