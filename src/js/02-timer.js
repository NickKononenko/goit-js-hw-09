// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  input: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  d: document.querySelector('.value[data-days]'),
  h: document.querySelector('.value[data-hours]'),
  m: document.querySelector('.value[data-minutes]'),
  s: document.querySelector('.value[data-seconds]'),
};

const { input, startBtn, d, h, m, s } = refs; // Деструктурую refs
let selectedDateValue = null;

startBtn.addEventListener('click', onStartBtnClick);

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      selectedDateValue = selectedDates[0];
    }
  },
};

flatpickr(input, options);

function onStartBtnClick() {
  let countdown = setInterval(() => {
    const currentDate = new Date();
    const timeLeft = selectedDateValue - currentDate;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      Notiflix.Notify.info('Time is up, let`s try again');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      d.textContent = addLeadingZero(days);
      h.textContent = addLeadingZero(hours);
      m.textContent = addLeadingZero(minutes);
      s.textContent = addLeadingZero(seconds);
    }
  }, 1000);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
