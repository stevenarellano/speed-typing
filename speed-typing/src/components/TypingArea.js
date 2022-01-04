import "./TypingArea.css";

// variables
import { charBank } from "../assets/charBank";

export default function TypingArea({ lessonNum }) {
    console.log(lessonNum);

    function rmStringDuplicates(str) {
        return Array.from(new Set(str)).join("");
    }

    let chars = charBank[lessonNum];

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function cText(chars, numWords) {
        let lst = [];
        console.log("helo");
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
    return <div className="typing">{text}</div>;
}
