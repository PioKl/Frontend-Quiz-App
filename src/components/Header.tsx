import { useRef } from "react";
import "../style/Header.scss";
import IconSunDark from "../assets/icon-sun-dark.svg";
import IconMoonDark from "../assets/icon-moon-dark.svg";
import IconSunLight from "../assets/icon-sun-light.svg";
import IconMoonLight from "../assets/icon-moon-light.svg";
import { QuizData } from "../types/types";

interface HeaderProps {
  quizzes: QuizData[];
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSubject: number | null;
}

const Header: React.FC<HeaderProps> = ({
  quizzes,
  darkMode,
  setDarkMode,
  selectedSubject,
}) => {
  const btnChangeMode = useRef<HTMLButtonElement>(null);
  const handleChangeMode = () => {
    setDarkMode(!darkMode);
    btnChangeMode.current &&
      btnChangeMode.current.setAttribute(
        "aria-expanded",
        btnChangeMode.current.getAttribute("aria-expanded") !== "true"
          ? "true"
          : "false"
      );
  };

  return (
    <div className={`header wrapper ${darkMode ? "--darkMode" : ""}`}>
      <nav className="nav">
        {selectedSubject !== null && (
          <h3
            className={`nav__title --${quizzes[
              selectedSubject
            ].title.toLowerCase()}`}
          >
            {quizzes[selectedSubject].title}
          </h3>
        )}
        <div className="nav__modeContainer">
          <img
            src={darkMode ? IconSunLight : IconSunDark}
            width="24"
            height="24"
            alt=""
          />
          <button
            className="nav__button"
            aria-expanded="false"
            type="button"
            onClick={handleChangeMode}
            ref={btnChangeMode}
          ></button>
          <img
            src={darkMode ? IconMoonLight : IconMoonDark}
            width="24"
            height="24"
            alt=""
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
