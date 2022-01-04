// component
import TypingArea from "./components/TypingArea";
import Options from "./components/Options";
import Start from "./components/Start";
import Guide from "./components/Guide";

import { useState } from "react";
import { removeActive, addActive } from "./assets/classManipulation";

import "./App.css";

function App() {
    let [lessonNum, setLessonNum] = useState(1);
    let [testToggle, setTestToggle] = useState(0);
    return (
        <div className="App">
            <Options
                testToggleState={[testToggle, setTestToggle]}
                lessonState={[lessonNum, setLessonNum]}
            />
            <Guide lessonNum={lessonNum} />
            <TypingArea lessonNum={lessonNum} />
        </div>
    );
}

export default App;
