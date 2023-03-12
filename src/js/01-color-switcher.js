function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

refs.stopBtn.disabled = true;

function onStartBtnClick(evt) {
   timerId = setInterval(() => {
       refs.body.style.backgroundColor = getRandomHexColor();
       refs.startBtn.disabled = true;
       refs.stopBtn.disabled = false;
   }, 1000);
};

function onStopBtnClick(evt) {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}
