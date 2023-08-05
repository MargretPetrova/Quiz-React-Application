import React, { useContext, useEffect, useState } from "react";

import { QuestionsContext } from "../../context/QuestionsContext";
import styles from "./Question.module.css";
import { useNavigate } from "react-router-dom";

import volume from "../../assets/images/volume.svg";
import muteVolume from "../../assets/images/mute.svg";
import soundtrack from "../../assets/audio/audio.mp3";
import useSound from "use-sound";
import Image from "../../components/Image/Image";

function Question(props) {
  const { questions,addQuestions, incrementResult, results} =useContext(QuestionsContext);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(60)
  const [play, { stop }] = useSound(soundtrack);
  const [mute, setMute] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [selectedIndex, setSelectedIndex] = useState({i:null, value:''})
  const [allAnswers, setAllAnswers] = useState({
    all: [],
    correct: "",
    wrong: [],
  });
 

  useEffect(() => {
    
    const correct = questions[activeQuestion]["correct_answer"];
    const incorrect = questions[activeQuestion]["incorrect_answers"];

    let arr = incorrect.slice(0);
    arr.push(correct);
    let sorted = arr.sort();

    setAllAnswers({ all: sorted, correct: correct, wrong: incorrect });
    if(counter>0){
      const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
    }else{
      
      navigate('/end')
    }
    
  }, [activeQuestion, counter]);


  const onAnswerHandler = (ans,index) => {
    
    if (ans === allAnswers.correct) {
        setAnswer(true);
        console.log("right");
      } else {
        setAnswer(false);
        setTimeout(() => {
            navigate('/end')
          }, 3000)
        console.log("wrong");
      }
  };

  const onNextClickHandler = () => {
   
    if (answer === true) {
        setActiveQuestion((index) => index + 1);
        setCounter(60)
        incrementResult();
        setSelectedIndex({i:null, value:''})
        setAnswer('')
    } 
  };
  
  return (
    <div className={styles.questionsSection}>
     <Image screen='questions'/>
      <div className={styles.counter}>{counter}</div>
      <div className={styles.soundtrackIcon}>
        <button
          onClick={() => {
            mute ? play() : stop();
            setMute(!mute);
          }}
        >
          {!mute && <img src={volume} alt="volumeIcon"></img>}
          {mute && <img src={muteVolume} alt="volumeIcon"></img>}
        </button>
      </div>
      <div className={styles.questionCard}>
        <div className={styles.questionTitle}>
          <p>{questions[activeQuestion].question}</p>
        </div>
        <div className={styles.answers}>
          <ul className={styles.answersList}>
            {allAnswers.all.map((ans,index) => (
              <li key={index}
            
                className={`${styles.liItem} 
                 ${
                    selectedIndex.value === ans &&
                    ans === allAnswers.correct
                      ? styles.correct
                      : ''
                  } ${
                    selectedIndex.value === ans &&
                    ans !== allAnswers.correct
                      ? styles.incorrect
                      : ''
                  }
                  ${
                    selectedIndex.i !== null && selectedIndex.i !==index &&
                    ans === allAnswers.correct
                      ? styles.correct
                      : ''
                  }
                 `}
                onClick={() => {
                    setSelectedIndex({i:index, value:ans})
                    onAnswerHandler(ans,index)}}
              >
                {index===0 && `A: ${ans}`}
                {index===1 && `B: ${ans}`}
                {index===2 && `C: ${ans}`}
                {index===3 && `D: ${ans}`}
              </li>
            ))}
          </ul>
        </div>
         <div className={styles.btnNext}>
         {answer===true && <button onClick={onNextClickHandler}>Next</button>}
        </div>
      </div>
    </div>
  );
}

export default Question;
