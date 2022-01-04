import "./Options.css";

export default function Options() {
    function generateLesson(lessonNum) {
        console.log(lessonNum);
    }

    function buildLessonList(numOfLessons) {
        let lessonList = [...Array(numOfLessons).keys()];
        return lessonList.map((val) => {
            let lessonNum = val + 1;
            return (
                <div key={lessonNum} onClick={() => generateLesson(lessonNum)}>
                    Lesson {lessonNum}
                </div>
            );
        });
    }

    return (
        <div className="option-container">
            <div>SELECT A LESSON</div>
            {buildLessonList(14)}
        </div>
    );
}
