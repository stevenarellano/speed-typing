class TypingInfo {
    constructor(toType, timer) {
        this.toType = toType;
        this.timer = timer;
        this.typed = "";
        this.mistakes = 0;
        this.currentWrong = false;
    }

    _getNextToType() {
        let nextToType;
        if (this.toType.length > 0) {
            nextToType = this.toType.substring(1);
        } else {
            nextToType = "";
        }
        this.toType = nextToType;
        return nextToType;
    }

    _timerControl(toType) {
        if (this.typed.length == 0) {
            this.timer.startTimer();
        } else if (toType.length == 0) {
            this.timer.endTimer();
        }
    }

    _addWrongClass() {
        let typingAreaClasses =
            document.getElementById("typing-container").classList;
        if (!typingAreaClasses.contains("wrong-keydown")) {
            typingAreaClasses.add("wrong-keydown");
            console.log(typingAreaClasses);
        }
    }

    _removeWrongClass() {
        let typingAreaClasses =
            document.getElementById("typing-container").classList;
        if (typingAreaClasses.contains("wrong-keydown")) {
            typingAreaClasses.remove("wrong-keydown");
        }
    }

    registerKeydown(e) {
        let firstChar = this.toType.charAt(0);
        if (e.key === firstChar) {
            if (this.currentWrong) {
                this.currentWrong = false;
                this._removeWrongClass();
            }
            let nextToType = this._getNextToType();
            this._timerControl(nextToType);

            this.typed = this.typed + firstChar;
        } else {
            this.mistakes++;
            this.currentWrong = true;
            this._addWrongClass();
        }
    }
}

class Timer {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.timeElapsed = 0;
    }

    startTimer() {
        this.startTime = new Date();
    }

    _secondsElapsed(time1, time2) {
        return Math.abs(time1 - time2) / 1000;
    }

    endTimer() {
        this.endTime = new Date();
        this.timeElapsed = this._secondsElapsed(this.startTime, this.endTime);
    }
}

const noInputKeys = [
    "Shift",
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
    "Control",
    "Alt",
    "Meta",
    "Escape",
    "CapsLock",
    "Backspace",
];

function includesBadKey(e) {
    if (noInputKeys.includes(e.key)) {
        return true;
    }
    return false;
}

export { TypingInfo, Timer, includesBadKey };
