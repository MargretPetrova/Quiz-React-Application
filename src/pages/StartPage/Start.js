import React, { useContext, useEffect, useState } from "react";
import styles from "./Start.module.css";
import startScreenBackground from "../../assets/images/billionareStart.jpg";
import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";
import { requester } from "../../service/requester";

import { QuestionsContext } from "../../context/QuestionsContext";

function Start(props) {
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();

  const { questions, addQuestions } = useContext(QuestionsContext);

  const navigate = useNavigate();
  const allCategoriesFromApi = useRouteLoaderData("root")["trivia_categories"];
  useEffect(()=>{
    
  },[questions])

  async function onFormSubmitHandler(e) {
    e.preventDefault();
    let data = await requester(category, difficulty);
    addQuestions(data);

    navigate("/questions");
  }
  return (
    <div className={styles.background}>
      <img src={startScreenBackground} alt="back"></img>
      <Form
        className={styles.contain}
        method="get"
        onSubmit={onFormSubmitHandler}
      >
        <div className={styles.dropdowns}>
          <div className={styles.dropdown}>
            <label> Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="any">Any Category</option>
              {allCategoriesFromApi.map((el) => (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.dropdown}>
            <label> Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.btn} type="submit">
            Start
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Start;
