import "../style/Typography.scss";
import "../style/QuizIcon.scss";
import "../style/QuizSummary.scss";
import "../style/Buttons.scss";
import { QuizData } from "../types/types";

interface QuizSummaryProps {
  quizzes: QuizData[];
  darkMode: boolean;
  quizScore: number;
  selectedSubject: number;
  setSelectedSubject: (subject: null | number) => void;
  setQuizScore: (value: number | ((prevState: number) => number)) => void;
  setShowQuizSummary: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizSummary: React.FC<QuizSummaryProps> = ({
  quizzes,
  darkMode,
  quizScore,
  selectedSubject,
  setSelectedSubject,
  setQuizScore,
  setShowQuizSummary,
}) => {
  const handlePlayAgainClick = () => {
    setSelectedSubject(null);
    setQuizScore(0);
    setShowQuizSummary(false);
    document.documentElement.style.setProperty("--questionBar-width", "1");
  };
  return (
    <>
      <div
        className={`quizHeading quizCompleted ${darkMode ? "--darkMode" : ""}`}
      >
        <h1 className="quizHeading__heading quizCompleted__heading">
          <span className="quizHeading__headingOne quizCompleted__headingOne">
            Quiz completed
          </span>
          <span className="quizHeading__headingTwo quizCompleted__headingTwo">
            You scored...
          </span>
        </h1>
      </div>
      <div className={`quizSummary ${darkMode ? "--darkMode" : ""}`}>
        <div className="quizSummary__pointsContainer">
          {" "}
          <h3
            className={`quizIcon quizSummary__subject --${quizzes[
              selectedSubject
            ].title.toLowerCase()}`}
          >
            {quizzes[selectedSubject].title}
          </h3>
          <span className="quizSummary__score">{quizScore}</span>
          <span className="quizSummary__numberOfQuestions">
            out of {quizzes[selectedSubject].questions.length}
          </span>
        </div>

        <button
          type="button"
          className="buttonSubmit"
          onClick={handlePlayAgainClick}
        >
          Play Again
        </button>
      </div>
    </>
  );
};

export default QuizSummary;
