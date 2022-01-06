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

export default function TypingArea({ lessonState, typingInfoState }) {
    // imported states
    let [lessonNum, setLessonNum] = lessonState;
    let [typingInfo, setTypingInfo] = typingInfoState;

    //  ending control
    let [finished, setFinished] = useState(false);
    function triggerEnd() {
        setFinished(true);
    }
    let typingBody = finished ? (
        <>
            <div className="stats">
                YOU FINISHED IN {typingInfo.timer.timeElapsed} SECONDS WITH{" "}
                {typingInfo.mistakes} MISTAKES <br />
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
        window.location.reload(false);
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

    return (
        <div id="lesson-area">
            {typingBody}
            <div onClick={restartTyping} className="bottom-button">
                RESTART
            </div>
        </div>
    );
}
