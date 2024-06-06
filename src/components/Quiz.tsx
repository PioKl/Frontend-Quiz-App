import React, { useState, useRef } from "react";
import "../style/Quiz.scss";
import "../style/Buttons.scss";
import { QuizData } from "../types/types";

interface QuizProps {
  quizzes: QuizData[];
  darkMode: boolean;
  selectedSubject: number;
  setQuizScore: (value: number | ((prevState: number) => number)) => void;
  setShowQuizSummary: React.Dispatch<React.SetStateAction<boolean>>;
}

const Quiz: React.FC<QuizProps> = ({
  quizzes,
  darkMode,
  selectedSubject,
  setQuizScore,
  setShowQuizSummary,
}) => {
  const quizItemRefs = useRef<Record<number, HTMLLIElement | null>>({});
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [activeAnswerButton, setActiveAnswerButton] = React.useState<
    null | number
  >(null);

  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [submitClickedOnce, setSubmitClickedOnce] = useState<boolean>(false);
  const [lockButtons, setLockButtons] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  const handleButtonAnswerClick = (id: number) => {
    setActiveAnswerButton(id);
    setSubmitError(false);
  };

  const handleSubmit = () => {
    if (typeof activeAnswerButton !== "number") {
      setSubmitError(true);
    } else {
      //Zmienna do warunku, sprawdzającego czy została wybrana prawidłowa odpowiedź
      const checkIfChoosedCorrectAnswer =
        quizzes[selectedSubject].questions[questionNumber].options[
          activeAnswerButton
        ] === quizzes[selectedSubject].questions[questionNumber].answer;

      //Index prawidłowej odpowiedź z pytań znajdujących się w quizAnswers__list
      const correctAnswerItemIndex = quizzes[selectedSubject].questions[
        questionNumber
      ].options.findIndex(
        (option) =>
          option === quizzes[selectedSubject].questions[questionNumber].answer
      );

      if (!submitClickedOnce) {
        //Submit kliknięty pierwszy raz
        setSubmitClickedOnce(true);
        submitButtonRef.current &&
          (submitButtonRef.current.innerHTML = "Next Question");

        if (checkIfChoosedCorrectAnswer) {
          quizItemRefs.current[activeAnswerButton]?.classList.add("--correct");
          setQuizScore((prevState) => prevState + 1); //dodanie punktu za prawidłową odpowiedź
        } else {
          quizItemRefs.current[activeAnswerButton]?.classList.add("--wrong");
          quizItemRefs.current[correctAnswerItemIndex]?.classList.add(
            "--correct"
          );
        }
        setLockButtons(true);
      } else {
        //Drugie kliknięcie w submit
        setQuestionNumber((prevState) => prevState + 1);
        submitButtonRef.current &&
          (submitButtonRef.current.innerHTML = "Submit Answer");
        setSubmitClickedOnce(false);
        setActiveAnswerButton(null);

        // Usunięcie modyfikatorów klas correct i wrong
        Object.values(quizItemRefs.current).forEach((ref) => {
          ref?.classList.remove("--correct");
          ref?.classList.remove("--wrong");
        });
        setLockButtons(false);

        //Dodanie długości do questionBar (w css będzie pomnożone)
        document.documentElement.style.setProperty(
          "--questionBar-width",
          (questionNumber + 2).toString()
        );

        //Jeśli pytanie jest ostatnie
        quizzes[selectedSubject].questions.length === questionNumber + 1 &&
          setShowQuizSummary(true);
      }
    }
  };

  return (
    <>
      <div className={`quizQuestion ${darkMode ? "--darkMode" : ""}`}>
        <span className="quizQuestion__questionNumber">
          Question {questionNumber + 1} of{" "}
          {quizzes[selectedSubject].questions.length}
        </span>
        <h1 className="quizQuestion__heading">
          {quizzes[selectedSubject].questions[questionNumber].question}
        </h1>
        <span className="quizQuestion__questionBar"></span>
      </div>
      <div className="quizAnswers">
        <ul className="quizAnswers__list">
          {quizzes[selectedSubject].questions[questionNumber].options.map(
            (option, id) => (
              <li
                key={id}
                className="quizAnswers__list-item"
                data-id={`${id}`}
                ref={(element) => (quizItemRefs.current[id] = element)}
              >
                <button
                  type="button"
                  data-id={`${id}`}
                  disabled={lockButtons}
                  className={`button-selection quizAnswers__button --${id} ${
                    darkMode ? "--darkMode" : ""
                  } ${activeAnswerButton === id ? "--active" : ""}`}
                  onClick={(e) =>
                    handleButtonAnswerClick(
                      parseInt(e.currentTarget.dataset.id || `${id}`)
                    )
                  }
                >
                  <span>{option}</span>
                </button>
              </li>
            )
          )}
        </ul>
        <button
          ref={submitButtonRef}
          type="button"
          className="quizAnswers__submit buttonSubmit"
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
        <span
          className={`quizAnswers__noAnswer ${
            submitError ? "--active" : "--hidden"
          }`}
        >
          Please select an answer
        </span>
      </div>
    </>
  );
};

export default Quiz;
