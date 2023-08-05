import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QuestionsContext } from "../../context/QuestionsContext";

import styles from "./EndScreen.module.css";
import { points } from "../../utilities/tableInfo";
import Image from "../../components/Image/Image";

function EndScreen(props) {
  const { results } = useContext(QuestionsContext);

  return (
    <div className={styles.endSection}>
      <Image screen={'end'} />
      <div className={styles.title}>
        <h3>End of the game!</h3>
        <h4>Submited wrong answer or timed out</h4>
        <p>Answered questions: {results}</p>
      </div>
      {results === 15 && (
        <div className={styles.title}>
          <h3>CONGRATULATIONS YOU WON 100,000lv.</h3>
        </div>
      )}
      <div className={styles.tablePoint}>
        <ul className={styles.tableList}>
          {Object.entries(points).map((el, index) => (
            <li
              key={el[0]}
              className={`${styles.tableItems} 
    ${index === results - 1 ? styles.selected : ""}
     
     `}
            >
              {el[0]}: {el[1]}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btn}>
          <Link className={styles.link} to="/">
            Try again
          </Link>
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
