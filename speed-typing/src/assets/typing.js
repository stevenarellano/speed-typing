function secondsElapsed(time1, time2) {
    return Math.abs(time1 - time2) / 1000;
}

export function timerKeydown(e, stopwatch) {
    let newStopwatch = stopwatch;
    if (stopwatch.startTime === 0) {
        newStopwatch.startTime = new Date();
    } else if (stopwatch.startTime !== 0 && stopwatch.endTime === 0) {
        newStopwatch.endTime = new Date();
        newStopwatch.timeElapsed = secondsElapsed(
            newStopwatch.startTime,
            newStopwatch.endTime
        );
    }
    console.log(newStopwatch);
    return newStopwatch;
}
