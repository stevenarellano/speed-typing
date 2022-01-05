import "./Options.css";
import { FontAwesome } from "react-icons/fa";

export default function Options({ lessonState, testToggleState }) {
    // imported states
    let [currentLessonNum, setLessonNum] = lessonState;
    let [testToggle, setTestToggle] = testToggleState;

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

    return (
        <div className="option-container">
            <div className="options-title">
                <div>SELECT A LESSON</div>
            </div>
            {buildLessonList(14)}
        </div>
    );
}
