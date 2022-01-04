import "./TypingArea.css";

// variables
import { charBank } from "../assets/charBank";
import { useState, useEffect } from "react";
import { TypingInfo, Timer, includesBadKey } from "../assets/typing";

export default function TypingArea({ lessonNum }) {
    // constants
    const NUM_WQRDS = 1;

    // creating the text area
    function rmStringDuplicates(str) {
        return Array.from(new Set(str)).join("");
    }
    let chars = charBank[lessonNum];
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function cText(chars, numWords) {
        let lst = [];
        let i, j, text;
        for (j = 0; j < numWords; j++) {
            text = "";
            for (i = 0; i < randomInt(3, 5); i++) {
                let upperCase = Math.random() > 0.5 ? 1 : 0;
                let newChar = chars.charAt(
                    Math.floor(Math.random() * chars.length)
                );

                text += upperCase ? newChar.toUpperCase() : newChar;
            }
            lst.push(text);
        }

        return lst.join(" ");
    }

    function createTypingText(chars, numWords) {
        return cText(chars, numWords);
    }
    let text = createTypingText(chars, NUM_WQRDS);

    // tracking typing

    let [typingInfo, setTypingInfo] = useState(
        new TypingInfo(text, new Timer())
    );

    function keyDownE(e) {
        if (includesBadKey(e)) {
            return;
        }
        typingInfo.registerKeydown(e);
        setTypingInfo({ ...typingInfo });
        if (typingInfo.toType.length === 0) {
            window.removeEventListener("keydown", keyDownE);
            triggerEnd();
        }
    }

    //  ending control
    let [finished, setFinished] = useState(false);
    function triggerEnd() {
        setFinished(true);
        console.log("all done");
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
            <div className="title"> please type what you see below</div>
            <div id="typing-container" className="typing">
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

    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", keyDownE);

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", keyDownE);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return (
        <div className="exercise-area">
            {typingBody}
            <div onClick={restartTyping} className="bottom-button">
                RESTART
            </div>
        </div>
    );
}
