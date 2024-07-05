let startStopButton = document.getElementById("start-stop");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let display = document.querySelector(".stopwatch__display");
let lapsContainer = document.querySelector(".stopwatch__laps");

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeToString = (time) => {
	let diffInHrs = time / 3600000;
	let hh = Math.floor(diffInHrs);

	let diffInMin = (diffInHrs - hh) * 60;
	let mm = Math.floor(diffInMin);

	let diffInSec = (diffInMin - mm) * 60;
	let ss = Math.floor(diffInSec);

	let diffInMs = (diffInSec - ss) * 1000;
	let ms = Math.floor(diffInMs);

	let formattedHH = hh.toString().padStart(2, "0");
	let formattedMM = mm.toString().padStart(2, "0");
	let formattedSS = ss.toString().padStart(2, "0");
	let formattedMS = ms.toString().padStart(3, "0");

	return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
};

const start = () => {
	startTime = Date.now() - elapsedTime;
	timerInterval = setInterval(function printTime() {
		elapsedTime = Date.now() - startTime;
		display.innerHTML = timeToString(elapsedTime);
	}, 10);
	startStopButton.innerHTML = "Stop";
	isRunning = true;
};

const stop = () => {
	clearInterval(timerInterval);

	startStopButton.innerHTML = "Start";
	isRunning = false;
};

const reset = () => {
	stop();

	elapsedTime = 0;
	display.innerHTML = "00:00:00.000";
	lapsContainer.innerHTML = "";
};

const lap = () => {
	if (!isRunning) return;

	let lapTime = timeToString(elapsedTime);
	let li = document.createElement("li");
	li.innerHTML = lapTime;
	lapsContainer.insertAdjacentElement("afterbegin", li);
};

startStopButton.addEventListener("click", () => {
	isRunning ? stop() : start();
});

resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
