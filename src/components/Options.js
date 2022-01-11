import "./Options.css";
import { FaBars } from "react-icons/fa";

export default function Options({ lessonState, testToggleState }) {
    // imported states
    let [currentLessonNum, setLessonNum] = lessonState;

    function generateLesson(e) {
        let newLessonNum = e.target.id.split("n")[1];
        if (newLessonNum == currentLessonNum) {
            return;
        }
        setLessonNum(newLessonNum);
    }

    function buildLessonList(numOfLessons) {
        let lessonList = [...Array(numOfLessons).keys()];
        return lessonList.map((val) => {
            let lessonNum = val + 1;
            let classes =
                currentLessonNum == lessonNum
                    ? "lesson-item active-lesson"
                    : "lesson-item";
            return (
                <div
                    id={"lesson" + String(lessonNum)}
                    className={classes}
                    key={lessonNum}
                    onClick={(e) => generateLesson(e)}
                >
                    Lesson {lessonNum}
                </div>
            );
        });
    }

    // css tings
    function toggleLessonMenu() {
        let optionsMenu = document.getElementById("lessons-container");
        if (optionsMenu.classList.contains("lessons-open")) {
            optionsMenu.classList.remove("lessons-open");
            console.log(optionsMenu.classList);
        } else {
            optionsMenu.classList.add("lessons-open");
            console.log(optionsMenu.classList);
        }
    }

    return (
        <div id="option-container">
            <div className="options-title">
                <FaBars className="title-bars" onClick={toggleLessonMenu} />{" "}
                <div className="title-text">SELECT A LESSON</div>
            </div>
            <div id="lessons-container">{buildLessonList(14)}</div>
        </div>
    );
}
