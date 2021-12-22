import "./TypingArea.css";

export default function TypingArea() {
    console.log("text");
    let chars = "asdf";

    // function randomIntFromInterval(min, max) {
    //     // min and max included
    //     return Math.floor(Math.random() * (max - min + 1) + min);
    // }

    function cText(chars, numWords) {
        let lst = [];
        console.log("helo");
        let i, j, text;
        for (j = 0; j < numWords; j++) {
            text = "";
            for (i = 0; i < 5; i++) {
                text += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            lst.push(text);
        }

        return lst.join(" ");
    }

    let text = cText(chars, 40);
    return <div className="typing">{text}</div>;
}
