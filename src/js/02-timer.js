import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
        refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

const fp = flatpickr(refs.input, options);

const timer = {
  idInterval: null,

  calculateData(time) {
    refs.startBtn.disabled = true;
    refs.input.disabled = true;

    const deltaTime = new Date(time) - Date.now();
    
    if (deltaTime > 0) {
      const convertTime = convertMs(deltaTime);
      onTimerChange(convertTime);
    } else {
      this.stop();
      
      refs.startBtn.disabled = false;
      refs.input.disabled = false;
    }
  },

  start(time) {
    this.idInterval = setInterval(() => {
      this.calculateData(time);
    }, 1000);
  },

  stop() {
    clearInterval(this.idInterval);
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start(refs.input.value);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function onTimerChange({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
