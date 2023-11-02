import React, { useState, useEffect, useRef } from 'react'
import ReactSlider from 'react-slider'
import 'react-circular-progressbar/dist/styles.css'
import Unicorn from './Unicorn'
import ScoreBoard from './ScoreBoard'
import { useNavigate } from 'react-router-dom'
import unicornAnswer from '../unicornAnswer.json'

export default function QuizZ(props) {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState(null);
  const [score, setScore] = useState(0);
  const [randomQuestion, setRandomQuestion] = useState("");
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [volumeValue, setVolumeValue] = useState(40);
  const bgMusic = useRef(new Audio(process.env.PUBLIC_URL + "/music/quizCombatMusic.mp3"));
  const gameENDsfx = useRef(new Audio(process.env.PUBLIC_URL + "/music/gameENDsfx.mp3"));
  const answerOKsfx = useRef(new Audio(process.env.PUBLIC_URL + "/music/answerOKsfx.mp3"));
  const answerFAILsfx = useRef(new Audio(process.env.PUBLIC_URL + "/music/answerFAILsfx.mp3"));
  const [sfxIsEnabled, setSfxIsEnabled] = useState(false);
  const [startGameButtonPressed, setStartGameButtonPressed ] = useState(false);
  const [ifAnswerButtonPressed,setIfAnswerButtonPressed] = useState(null);
  const [answerIsOk,setAnsewerIsOk] = useState(190);
  const [answerIsNotOk, setAnswerIsNotOk] = useState(190);
  const [hintText, setHintText] = useState("");
  const [isFirstGame, setIsFirstGame] = useState(false);
  const [lives, setLives] = useState(3); 

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
    if(lives === 0) {
        if(sfxIsEnabled) {
            gameENDsfx.current.play();
        }
        setStartGameButtonPressed(false);
        setGameStarted(false);
        setLives(3);
        return
    }
  }, [lives, sfxIsEnabled])

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
    if(props.difficulty === "default"){
      const randNum = Math.floor(Math.random() * (data.length-1));
      return data[randNum];
    }else if(props.difficulty === "easy"){
      let result = data.filter(question => question.Difficulty <= 5);
      const randNum = Math.floor(Math.random() * (result.length - 1));
      return result[randNum];
    }else if(props.difficulty === "normal"){
      let result = data.filter(question => question.Difficulty > 5 && question.Difficulty <= 10);
      const randNum = Math.floor(Math.random() * (result.length - 1));
      return result[randNum];
    }else if(props.difficulty === "hard"){
      let result = data.filter(question => question.Difficulty > 10);
      const randNum = Math.floor(Math.random() * (result.length - 1));
      return result[randNum];
    }
    const randNum = Math.floor(Math.random() * (data.length-1));
    return data[randNum];
  }

  useEffect(() => {
    const interval = setInterval(() => {
        const randNum = Math.floor(Math.random() * (unicornAnswer.length - 1));
        setHintText(unicornAnswer[randNum]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
        setLives(lives - 1)
        setAnsewerIsOk(145);
      }
      setTimeout(() => {
        setGameStarted(true);
        setIfAnswerButtonPressed(null); 
        toggleSwitch === true ? setToggleSwitch(false) : setToggleSwitch(true);
        setAnsewerIsOk(190);
        setAnswerIsNotOk(190);
      }, 2000);
    }, 2000);
  }

  const handlerVolume = (e) => {
    setVolumeValue(e);
  }

  const handleStartGameBtn = (status) =>{
    startGameButtonPressed === false ? setStartGameButtonPressed(true) : setStartGameButtonPressed(false);
    setScore(0);
    setIsFirstGame(true);
    fetchingData();
    setTimeout(() => {
      setGameStarted(status);
    }, 1000);    
  }

  const handlerBackToMainMenu = () => {
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
                  <span className='scoreSpanNormal'>{score}</span><span className='scoreSpanSomething'>{answerIsOk === 250 ? "+5" : undefined}</span>
                </div>
            </div>
            <div className="questionContainer">
              <span>{randomQuestion.Question}</span>
            </div>
            <div className='timerContainer'>
                <div className='liveContainer'>
                    <span className='liveLabel'>LIVES</span>
                    <br />
                    <span className='liveNumber'>{lives}</span>
                </div>
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
          <ScoreBoard score={score} user={props.user} game="QuizZ" gamemode={props.difficulty}/>
        </div>
      </>
      }
    </>
  )
}
