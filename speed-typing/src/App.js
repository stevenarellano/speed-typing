// component
import TypingArea from "./components/TypingArea";
import Options from "./components/Options";
import Start from "./components/Start";
import Guide from "./components/Guide";

import { useEffect, useLayoutEffect, useState } from "react";
import { removeActive, addActive } from "./assets/classManipulation";
import { cText, NUM_WQRDS, TypingInfo, Timer } from "./assets/typing";
import "./App.css";
import { charBank } from "./assets/charBank";

function App() {
    let [lessonNum, setLessonNum] = useState(1);
    let [testToggle, setTestToggle] = useState(0);
    let lessonText = cText(charBank[lessonNum], NUM_WQRDS);
    let [typingInfo, setTypingInfo] = useState(
        new TypingInfo(lessonText, new Timer())
    );
    useLayoutEffect(() => {
        
        setTypingInfo(new TypingInfo(lessonText, new Timer()));
    }, [lessonNum]);

    return (
        <div className="App">
            <Options
                testToggleState={[testToggle, setTestToggle]}
                lessonState={[lessonNum, setLessonNum]}
            />
            <Guide lessonNum={lessonNum} />
            <TypingArea
                typingInfoState={[typingInfo, setTypingInfo]}
                lessonState={[lessonNum, setLessonNum]}
            />
        </div>
    );
}

export default App;
