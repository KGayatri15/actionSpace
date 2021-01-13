function timespan(start, end) {
    if (typeof end === "undefined") {
        end = start;
        start = Date.now();
    }

    if (start !== null && typeof start === "object" && start.getTime) {
        start = start.getTime();
    }

    if (end !== null && typeof end === "object" && end.getTime) {
        end = end.getTime();
    }

    start = +start;
    end = +end;

    if (isNaN(start) || isNaN(end))
        throw new Error("Cannot convert arguments into numbers");

    var t = Math.abs(end - start);

    return {
        milliseconds: ((t % 1000) / 100) | 0,
        seconds: ((t / 1000) % 60) | 0,
        minutes: ((t / 60000) % 60) | 0,
        hours: ((t / 360000) % 24) | 0,
        toString: function () {
            var h = "0" + this.hours, m = "0" + this.minutes, s = "0" + this.seconds;
            var ms = "00" + this.milliseconds;
            return h.substr(-2) + ":" + m.substr(-2) + ":" + s.substr(-2) + "." + ms.substr(-3);
        }
    }
}