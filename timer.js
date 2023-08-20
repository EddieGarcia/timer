
let targetTimeM = 20;
const currentTime = new Date();
let serviceInH = currentTime.getHours();
let serviceInM = currentTime.getMinutes();

const currentTimeDiv = document.getElementById("current-time");
const serviceInDiv = document.getElementById("service-in");
const targetTimeDiv = document.getElementById("target-time");
const serviceOutDiv = document.getElementById("service-out");
const countdownDiv = document.getElementById("countdown");

const toPaddedStr = (num) => num.toString().padStart(2, '0');
const trimToRangeCyclic = (value, upperBound) => (value + upperBound) % upperBound;

const diffTime = (dateFuture, date) => {
    var diffSeconds = (dateFuture - date) / 1000;
    return {
        hours: Math.floor((diffSeconds / 3600) % 24),
        minutes: Math.floor((diffSeconds / 60) % 60),
        seconds: Math.floor(diffSeconds % 60)
    };
};

const adjustServiceInH = (step) => {
    serviceInH = trimToRangeCyclic(serviceInH + step, 24);
    render();
};

const adjustServiceInM = (step) => {
    serviceInM = trimToRangeCyclic(serviceInM + step, 60);
    render();
};

const adjustTargetTime = (step) => {
    targetTimeM = trimToRangeCyclic(targetTimeM + step, 100);
    render();
};

const render = () => {
    // current time
    const currentTime = new Date();
    currentTimeDiv.innerHTML = `${toPaddedStr(currentTime.getHours())}:${toPaddedStr(currentTime.getMinutes())}:${toPaddedStr(currentTime.getSeconds())}`;

    //service in
    const serviceIn = new Date(currentTime.getTime());
    serviceIn.setHours(serviceInH, serviceInM, 0);
    serviceInDiv.innerHTML = `${toPaddedStr(serviceInH)}:${toPaddedStr(serviceInM)}`;

    // target time
    targetTimeDiv.innerHTML = `${toPaddedStr(targetTimeM)}`;

    //servcie out
    const serviceOut = new Date(currentTime.getTime());
    serviceOut.setHours(serviceInH, serviceInM + targetTimeM, 0);
    serviceOutDiv.innerHTML = `${toPaddedStr(serviceOut.getHours())}:${toPaddedStr(serviceOut.getMinutes())}`;

    //countdown
    let delta;
    let color = "black";
    if (currentTime < serviceIn) {
        delta = diffTime(serviceOut, serviceIn);
    } else {
        if (serviceOut <= currentTime) {
            delta = diffTime(currentTime, serviceOut);
            color = "red";
        } else {
            delta = diffTime(serviceOut, currentTime);
        }
    }
    countdownDiv.innerHTML = `${toPaddedStr(delta.hours)}:${toPaddedStr(delta.minutes)}:${toPaddedStr(delta.seconds)}`;
    countdownDiv.style.color = color;
};

render();
setInterval(() => render(), 1000);
