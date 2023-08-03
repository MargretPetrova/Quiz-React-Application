import React, { useContext, useEffect, useState } from "react";

import { QuestionsContext } from "../../context/QuestionsContext";
import styles from "./Question.module.css";
import { useNavigate } from "react-router-dom";
import background from '../../assets/images/billionarequiz2.jpg';
import volume from '../../assets/images/volume.svg';
import muteVolume from '../../assets/images/mute.svg'
import soundtrack from '../../assets/audio/soundtrack.mp3'
import useSound from 'use-sound';

function Question(props) {
  const { questions, addQuestions, incrementResult } =
    useContext(QuestionsContext);
  const navigate = useNavigate();
  console.log(questions)
  const [play, {stop}] = useSound(soundtrack);
  const [mute, setMute] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState({
    all: [],
    correct: "",
    wrong: [],
  });
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const correct = questions[activeQuestion]["correct_answer"];
    const incorrect = questions[activeQuestion]["incorrect_answers"];

    let arr = incorrect.slice(0);
    arr.push(correct);
    let sorted = arr.sort();

    setAllAnswers({ all: sorted, correct: correct, wrong: incorrect });
  }, [activeQuestion]);


  const onNextClickHandler = () => {
    if (answer === true) {
      if (activeQuestion >= 15) {
        navigate("/end");
      } else {
        setActiveQuestion((index) => index + 1);
        incrementResult();
      }
    } else {
      navigate("/end");
    }
  };


  const onAnswerHandler = (ans) => {
    if (ans === allAnswers.correct) {
      setAnswer(true);
      console.log("right");
    } else {
      setAnswer(false);
      console.log("wrong");
    }
  };
//   {
//     "category": "Entertainment: Film",
//     "type": "multiple",
//     "difficulty": "easy",
//     "question": "What name did Tom Hanks give to his volleyball companion in the film `Cast Away`?",
//     "correct_answer": "Wilson",
//     "incorrect_answers": [
//         "Friday",
//         "Jones",
//         "Billy"
//     ]
// }
  return (
    <div className={styles.questionsSection}>
        <img src={background}></img>
        <div className={styles.soundtrackIcon}>
        <button onClick={()=>{
           
            mute? play(): stop()
            setMute(!mute)}}>
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
            {allAnswers.all.map((ans) => (
              <li
                className={styles.listItem}
                onClick={() => onAnswerHandler(ans)}
              >
                {ans}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.btnNext}>
          <button onClick={onNextClickHandler}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Question;
