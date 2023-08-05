import React, { useContext, useEffect, useState } from "react";
import styles from "./Start.module.css";
import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";
import { requester } from "../../service/requester";
import { toast } from "react-toastify";
import { QuestionsContext } from "../../context/QuestionsContext";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";
import { difficultyOptions } from "../../utilities/tableInfo";

function Start(props) {
  const { questions, addQuestions, decrementResults } =
    useContext(QuestionsContext);
  const allCategoriesFromApi = useRouteLoaderData("root")["trivia_categories"];

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    decrementResults();
  }, [decrementResults]);

  async function onFormSubmitHandler(e) {
    e.preventDefault();
    if (category.trim() !== "" && difficulty.trim() !== "") {
      let data = await requester(category, difficulty);
      addQuestions(data);

      navigate("/questions");
    } else {
      toast.error("Please select category and difficulty!");
    }
  }
  return (
    <div className={styles.background}>
      <Image screen="start"></Image>

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
              {difficultyOptions.map(({ name, value }) => (
                <option value={value}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" name="Start" ></Button>
      </Form>
    </div>
  );
}

export default Start;
