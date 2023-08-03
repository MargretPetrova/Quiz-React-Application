import React, { useEffect, useState } from "react";


import styles from "./Dummy.module.css";

import background from '../../assets/images/billionarequiz2.jpg'
import volume from '../../assets/images/volume.svg';
import muteVolume from '../../assets/images/mute.svg'
import soundtrack from '../../assets/audio/soundtrack.mp3'
import useSound from 'use-sound';

function Dummy(props) {
    const [play, {stop}] = useSound(soundtrack);
    const [mute, setMute] = useState(false);


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
          <p>What name did Tom Hanks give to his volleyball companion in the film `Cast Away`?</p>
        </div>
        <div className={styles.answers}>
          <ul className={styles.answersList}>
           
              <li className={styles.listItem}>first</li>
              <li className={styles.listItem}>first</li>
              <li className={styles.listItem}>first</li>
              <li className={styles.listItem}>first</li>
          
          </ul>
        </div>
       
      </div>
      <div className={styles.btnNext}>
          <button > NEXT </button>
        </div>
    </div>
  );
}

export default Dummy;