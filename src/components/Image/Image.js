import React from 'react';
import styles from './Image.module.css'

import startScreenBackground from "../../assets/images/billionareStart.jpg";
import questionsScreenBackground from "../../assets/images/quiz.jpg";
import endScreenBackground from "../../assets/images/back2.png";

const backgroundImages ={
    start: startScreenBackground,
    questions:questionsScreenBackground,
    end: endScreenBackground
}
function Image({screen}) {
    return (
        <img className={styles.backgroundImg} src={backgroundImages[screen]} alt="back"></img>
    );
}

export default Image;