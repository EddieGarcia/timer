
let targetTimeM = 20;
let serviceInH = 23;
let serviceInM = 7;

const toPaddedStr = (num) => num.toString().padStart(2, '0');
const trimToRangeCyclic = (value, upperBound) => (value + upperBound) % upperBound;

const diffTime = (dateFuture, date) => {
    var diffSeconds = (dateFuture - date) / 1000;
    return {
        hours: Math.floor((diffSeconds / 3600) % 24),
        minutes: Math.floor((diffSeconds / 60) % 60),
        seconds: Math.floor(diffSeconds % 60)
    }
};

const adjustServiceInH = (step) => {
    serviceInH = trimToRangeCyclic(serviceInH + step, 24);
    render();
}

const adjustServiceInM = (step) => {
    serviceInM = trimToRangeCyclic(serviceInM + step, 60);
    render();
}

const adjustTargetTime = (step) => {
    targetTimeM = trimToRangeCyclic(targetTimeM + step, 100);
    render();
};

const render = () => {
    // current time
    const ct = new Date();
    const cthours = toPaddedStr(ct.getHours());
    const ctminutes = toPaddedStr(ct.getMinutes());
    const ctseconds = toPaddedStr(ct.getSeconds());
    document.getElementById("current-time").innerHTML = `${cthours}:${ctminutes}:${ctseconds}`;

    //service in
    const serviceIn = new Date(ct.getTime());
    serviceIn.setHours(serviceInH, serviceInM, 0);
    document.getElementById("service-in").innerHTML = `${toPaddedStr(serviceInH)}:${toPaddedStr(serviceInM)}`;

    // target time
    document.getElementById("target-time").innerHTML = `${toPaddedStr(targetTimeM)}`;

    //servcie out
    const serviceOut = new Date(ct.getTime());
    serviceOut.setHours(serviceInH, serviceInM + targetTimeM, 0);
    document.getElementById("service-out").innerHTML = `${toPaddedStr(serviceOut.getHours())}:${toPaddedStr(serviceOut.getMinutes())}`;

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