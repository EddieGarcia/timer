
let targetTimeM = 20;

const toPaddedStr = (num) => num.toString().padStart(2, '0');

const diffTime = (dateFuture, date) => {
    var diffSeconds = (dateFuture - date) / 1000;
    return {
        hours: Math.floor((diffSeconds / 3600) % 24),
        minutes: Math.floor((diffSeconds / 60) % 60),
        seconds: Math.floor(diffSeconds % 60)
    }
};

const increment = () => {
    targetTimeM >= 99 ? 99 : ++targetTimeM;
    render();
};

const decrement = () => {
    targetTimeM <= 0 ? 0 : --targetTimeM;
    render();
};

const render = () => {
    // current time
    const ct = new Date();
    const cthours = toPaddedStr(ct.getHours());
    const ctminutes = toPaddedStr(ct.getMinutes());
    const ctseconds = toPaddedStr(ct.getSeconds());
    document.getElementById("live-time").innerHTML = `${cthours}:${ctminutes}:${ctseconds}`;

    //service in
    const serviceInH = 23;
    const serviceInM = 7;
    const serviceIn = new Date(ct.getTime());
    serviceIn.setHours(serviceInH, serviceInM, 0);
    const sinH = toPaddedStr(serviceIn.getHours());
    const sinM = toPaddedStr(serviceIn.getMinutes());
    document.getElementById("service-in").innerHTML = `${sinH}:${sinM}`;

    // target time
    document.getElementById("target-time").innerHTML = `${targetTimeM}`;

    //servcie out
    const serviceOut = new Date(ct.getTime());
    serviceOut.setHours(serviceInH, serviceInM + targetTimeM, 0);
    const soH = toPaddedStr(serviceOut.getHours());
    const soM = toPaddedStr(serviceOut.getMinutes());
    document.getElementById("service-out").innerHTML = `${soH}:${soM}`;

    //countdown
    let delta;
    let color = "green";
    if (ct < serviceIn) {
        delta = diffTime(serviceOut, serviceIn);
    } else {
        if (serviceOut <= ct) {
            delta = diffTime(ct, serviceOut);
            color = "red";
        } else {
            delta = diffTime(serviceOut, ct);
        }
    }

    const dhours = toPaddedStr(delta.hours);
    const dminutes = toPaddedStr(delta.minutes);
    const dseconds = toPaddedStr(delta.seconds);
    document.getElementById("countdown").innerHTML = `${dhours}:${dminutes}:${dseconds}`;
    document.getElementById("countdown").style.color = color;
};

render();
setInterval(() => render(), 1000);