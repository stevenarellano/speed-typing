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

    // tracking typing
    let text;
    if (!text) {
        text = createTypingText(chars, NUM_WQRDS);
    }

    let [typingInfo, setTypingInfo] = useState(
        new TypingInfo(createTypingText(text, NUM_WQRDS), new Timer())
    );
    console.log("outside");
    console.log(typingInfo);

    useLayoutEffect(() => {
        text = createTypingText(chars, NUM_WQRDS);
        setTypingInfo(
            new TypingInfo(createTypingText(text, NUM_WQRDS), new Timer())
        );
        console.log(text);
        console.log(typingInfo);
    }, [lessonNum]);

    function keyDownE(e) {
        if (includesBadKey(e)) {
            return;
        }
        typingInfo.registerKeydown(e);
        // WE NEEKJFALK;DJFALK;SJFL;DSAFJSAD;LOFJASDL;FJASD;L
        // FALKDSFJKSDA;FJADSLK
        //FASJKFLDSJF;LKASDJFLA;S
        //ASDLKFJDSAL;FJSDAL;FJSDA/
        //ASFDLKJDSFLKSADJ;FLKDSJ;FLAK
        console.log(typingInfo);
        // create brand new class
        let newTypingInfo = returnNewTypingInfo(typingInfo);
        setTypingInfo(newTypingInfo);
        if (typingInfo.toType.length === 0) {
            window.removeEventListener("keydown", keyDownE);
            triggerEnd();
        }
    }

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
    useLayoutEffect(() => {
        window.addEventListener("keydown", keyDownE);

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", keyDownE);
        };
    }, [lessonNum]); // Empty array ensures that effect is only run on mount and unmount

    return (
        <div className="exercise-area">
            {typingBody}
            <div onClick={restartTyping} className="bottom-button">
                RESTART
            </div>
        </div>
    );
}
