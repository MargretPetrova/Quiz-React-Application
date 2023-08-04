import React, { useContext, useEffect, useState } from "react";
import styles from "./Start.module.css";
import startScreenBackground from "../../assets/images/billionareStart.jpg";
import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";
import { requester } from "../../service/requester";

import { QuestionsContext } from "../../context/QuestionsContext";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";


function Start(props) {
  const { questions, addQuestions, decrementResults } =useContext(QuestionsContext);
  const allCategoriesFromApi = useRouteLoaderData("root")["trivia_categories"];

  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
 

  const navigate = useNavigate();
  
  useEffect(() => {
    decrementResults();
  }, [decrementResults]);

  async function onFormSubmitHandler(e) {
    e.preventDefault();
    if (category.trim()!== '' &&  difficulty.trim()!== '') {
      let data = await requester(category, difficulty);
      addQuestions(data);
  
      navigate("/questions");
    } else{
      toast.error('Please select category and difficulty!')
    }
 
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
            {/* {unvalidForm.difficulty && <label className={styles.unvalid}>Please, select category!</label>} */}
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
            {/* {unvalidForm.difficulty && <label className={styles.unvalid}>Please, select difficulty!</label>} */}
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

        <Button type="submit" name="Start" link=''></Button>
    
      </Form>
    </div>
  );
}

export default Start;
