import "./Guide.css";

export default function Guide({ lessonNum }) {
    let lessonGuide = require("../guides/lesson" + lessonNum + ".gif");
    return <img src={lessonGuide} alt="use whatever" className="guide-image" />;
}
