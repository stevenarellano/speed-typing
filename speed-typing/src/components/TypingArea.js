import "./TypingArea.css";

export default function TypingArea() {
    console.log("text");

    function rmStringDuplicates(str) {
        return Array.from(new Set(x)).join("");
    }

    let charBank = {
        1: "asdf",
        2: "jkl;",
        3: charBank[1] + charBank[2],
        4: charBank[3] + "gh",
        5: charBank[4] + "'",
        6: charBank[5] + ':"',
        7: charBank[6] + "qwert",
        8: charBank[7] + "yuiop",
        9: charBank[8] + "zxcvb",
        10: charBank[9] + "nm,.?",
        11: charBank[10] + "12345",
        12: charBank[11] + "67890",
        13: charBank[12] + "!@#$%^&*()_+-=",
        14: charBank[13] + "<>/{}|[]\\",
    };
    let chars = charBank[1];

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
                let upperCase = math.random();
                let newChar = chars.charAt(
                    Math.floor(Math.random() * chars.length)
                );
                text += upperCase ? newChar.toUpperCase : newChar;
            }
            lst.push(text);
        }

        return lst.join(" ");
    }

    let text = cText(chars, 40);
    return <div className="typing">{text}</div>;
}
