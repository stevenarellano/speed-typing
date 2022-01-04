import "./TypingArea.css";

// variables
import { charBank } from "../assets/charBank";
import { useState, useEffect } from "react";
import { timerKeydown } from "../assets/typing";

export default function TypingArea({ lessonNum }) {
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
    let text = cText(chars, 40);

    // tracking typing
    let keyDown = "";
    let [timer, setTimer] = useState({
        startTime: 0,
        endTime: 0,
        timeElapsed: 0,
    });

    function timerEvent(e) {
        setTimer(timerKeydown(e, timer));
    }

    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", timerEvent);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", timerEvent);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return <div className="typing">{text}</div>;
}
