import "./TypingArea.css";

// variables
import { charBank } from "../assets/charBank";
import { useState, useEffect, useLayoutEffect } from "react";
import {
    TypingInfo,
    Timer,
    includesBadKey,
    returnNewTypingInfo,
} from "../assets/typing";
import { NUM_WQRDS } from "../assets/typing";

export default function TypingArea({
    lessonState,
    typingInfoState,
    restartState,
}) {
    // imported states
    let [lessonNum, setLessonNum] = lessonState;
    let [typingInfo, setTypingInfo] = typingInfoState;
    let [restartToggle, setRestartToggle] = restartState;

    //  ending control
    let [finished, setFinished] = useState(false);
    function triggerEnd() {
        setFinished(true);
    }
    let typingBody = finished ? (
        <>
            <div className="title"> STATS</div>
            <div className="stats">
                Time Elapsed: {typingInfo.timer.timeElapsed}s<br />
                MISTAKES MADE: {typingInfo.mistakes}
                <br />
                WPM:{" "}
                {Math.round(NUM_WQRDS / (typingInfo.timer.timeElapsed / 60))}
                <br />
                ACCURACY:{" "}
                {Math.round(
                    Math.max(
                        (typingInfo.typed.length - typingInfo.mistakes) /
                            typingInfo.typed.length,
                        0.01
                    ) * 100
                )}
                %
            </div>
        </>
    ) : (
        <>
            <div className="title"> Please Type The Letters Below</div>
            <div id="typing-container" className="">
                <div className="typed typing-content">{typingInfo.typed}</div>
                <div className="toType  typing-content">
                    {typingInfo.toType}
                </div>
            </div>
        </>
    );

    // restarting the texting
    function restartTyping() {
        setRestartToggle(!restartToggle);
        setFinished(0);
    }

    function keyDownE(e) {
        console.log("hi");
    }

    // Add event listeners
    useLayoutEffect(() => {
        keyDownE = function (e) {
            if (includesBadKey(e)) {
                return;
            }
            typingInfo.registerKeydown(e);

            console.log(typingInfo);
            // create brand new class
            let newTypingInfo = returnNewTypingInfo(typingInfo);
            setTypingInfo(newTypingInfo);
            if (typingInfo.toType.length === 0) {
                window.removeEventListener("keydown", keyDownE);
                triggerEnd();
            }
        };
        window.addEventListener("keydown", keyDownE);

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", keyDownE);
        };
    }, [lessonNum, typingInfo]); // Empty array ensures that effect is only run on mount and unmount

    useLayoutEffect(() => {
        setFinished(0);
    }, [lessonNum]);
    return (
        <div id="lesson-area">
            {typingBody}
            <div onClick={restartTyping} className="bottom-button">
                RESTART
            </div>
        </div>
    );
}
