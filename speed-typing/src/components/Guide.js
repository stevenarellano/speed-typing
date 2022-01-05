import "./Guide.css";

export default function Guide({ lessonNum }) {
    let lessonGuide = require("../guides/lesson" + lessonNum + ".gif");
    return (
        <div id="guide-container">
            <div id="guide-title">Use The Following Keys</div>
            <img src={lessonGuide} alt="use whatever" className="guide-image" />
        </div>
    );
}
