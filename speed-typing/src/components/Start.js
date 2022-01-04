import "./Start.css";

// variables

export default function Start({ testToggleState }) {
    let [testToggle, setTestToggle] = testToggleState;

    function toggle(testToggle) {
        console.log("hleo");
        testToggle ? setTestToggle(0) : setTestToggle(1);
    }
    return (
        <div onClick={() => toggle(testToggle)} className="start-button">
            Start Now
        </div>
    );
}
