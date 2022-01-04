class TypingInfo {
    constructor(toType, timer) {
        this.toType = toType;
        this.timer = timer;
        this.typed = "";
        this.charsRight = 0;
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

    registerKeydown(e) {
        let firstChar = this.toType.charAt(0);
        if (e.key === firstChar) {
            let nextToType = this._getNextToType();
            this._timerControl(nextToType);

            this.typed = this.typed + firstChar;
            this.charsRight++;
        } else {
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
