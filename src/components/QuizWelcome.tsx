import "../style/Typography.scss";
import "../style/QuizIcon.scss";
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
      <div
        className={`quizHeading quizWelcome ${darkMode ? "--darkMode" : ""}`}
      >
        <h1 className="quizHeading__heading quizWelcome__heading">
          <span className="quizHeading__headingOne quizWelcome__headingOne">
            Welcome to the
          </span>
          <span className="quizHeading__headingTwo quizWelcome__headingTwo">
            Frontend Quiz!
          </span>
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
                } quizIcon quizSubjects__button --${quiz.title.toLowerCase()}`}
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
