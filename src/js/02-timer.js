import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
};

refs.startBtn.addEventListener("click", onStartBtnClick);

// console.log(refs.startBtn);

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    //   const x = options.defaultDate.getTime();
    //   const y = selectedDates[0].getTime();
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future');
    //   refs.startBtn.disabled = true;
    }else refs.startBtn.disabled = false;
  },
};

const fp = flatpickr(refs.input, options);
// const fp = flatpickr("#datetime-picker", {});

function onStartBtnClick(evt) {
    
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(fp);
// console.log(refs.input);
// console.log(options);
console.log(refs.input.value);
console.log("hello");