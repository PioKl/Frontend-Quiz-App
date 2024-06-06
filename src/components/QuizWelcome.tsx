import "../style/QuizWelcome.scss";
import "../style/Buttons.scss";
import { QuizData } from "../types/types";

interface QuizWelcomeProps {
  quizzes: QuizData[];
  darkMode: boolean;
  setSelectedSubject: (subject: number) => void;
}

const QuizWelcome: React.FC<QuizWelcomeProps> = ({
  quizzes,
  darkMode,
  setSelectedSubject,
}) => {
  return (
    <>
      <div className={`quizWelcome ${darkMode ? "--darkMode" : ""}`}>
        <h1 className="quizWelcome__heading">
          <span className="quizWelcome__headingOne">Welcome to the</span>
          <span className="quizWelcome__headingTwo">Frontend Quiz!</span>
        </h1>
        <span className="quizWelcome__quickInfo">
          Pick a subject to get started.
        </span>
      </div>
      <div className={`quizSubjects ${darkMode ? "--darkMode" : ""}`}>
        <ul className="quizSubjects__list">
          {quizzes.map((quiz, id) => (
            <li key={id} className="quizSubjects__list-item">
              <button
                data-index={`${id}`}
                type="button"
                className={`button-selection ${
                  darkMode ? "--darkMode" : ""
                } quizSubjects__button --${quiz.title.toLowerCase()}`}
                onClick={(e) =>
                  setSelectedSubject(
                    parseInt(e.currentTarget.dataset.id || `${id}`)
                  )
                }
              >
                {quiz.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuizWelcome;
