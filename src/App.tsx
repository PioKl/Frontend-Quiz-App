import React, { useState } from "react";
import "./style/App.scss";
import data from "./data/data.json";
import { QuizData } from "./types/types";
import Header from "./components/Header";
import QuizWelcome from "./components/QuizWelcome";
import Quiz from "./components/Quiz";
import QuizSummary from "./components/QuizSummary";

function App() {
  const quizzes: QuizData[] = data.quizzes;

  const [selectedSubject, setSelectedSubject] = React.useState<null | number>(
    null
  );
  const [darkMode, setDarkMode] = useState(false);

  const [quizScore, setQuizScore] = React.useState<number>(0);

  const [showQuizSummary, setShowQuizSummary] = useState(false);

  return (
    <>
      <div className={`pattern ${darkMode ? "--darkMode" : ""}`}></div>
      <Header
        quizzes={quizzes}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        selectedSubject={selectedSubject}
      />
      <main className="main wrapper">
        {selectedSubject === null && showQuizSummary === false && (
          <QuizWelcome
            quizzes={quizzes}
            darkMode={darkMode}
            setSelectedSubject={setSelectedSubject}
          />
        )}
        {selectedSubject !== null && showQuizSummary === false && (
          <Quiz
            quizzes={quizzes}
            darkMode={darkMode}
            selectedSubject={selectedSubject}
            setQuizScore={setQuizScore}
            setShowQuizSummary={setShowQuizSummary}
          />
        )}

        {selectedSubject !== null && showQuizSummary === true && (
          <QuizSummary
            quizzes={quizzes}
            darkMode={darkMode}
            quizScore={quizScore}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            setQuizScore={setQuizScore}
            setShowQuizSummary={setShowQuizSummary}
          />
        )}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
