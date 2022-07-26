function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector("body")
const btnStart = document.querySelector("button[data-start]")
const btnStop = document.querySelector("button[data-stop]")

let timerId = null;

btnStart.addEventListener("click", onBtnStartClick);
btnStop.addEventListener("click", onBtnStopClick);

function onBtnStartClick() {
    btnStart.setAttribute("disabled", "");
    timerId = setInterval(changeBodyColor, 1000)
}

function onBtnStopClick() {
    btnStart.removeAttribute("disabled");
    clearInterval(timerId);
}

function changeBodyColor() {
    body.style.backgroundColor = `${getRandomHexColor()}`;
}
