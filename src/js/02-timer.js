// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dataInput: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

refs.startBtn.addEventListener('click', onClick);

let btnState = (refs.startBtn.disabled = true); // Кнопка неактивна, допоки користувач не вибере дату у майбутньому
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      return;
    }
    btnState = refs.startBtn.disabled = false;
    const currentDateToMs = new Date().getTime();
    const timeDiffMs = selectedDates[0].getTime() - currentDateToMs;
    const { days, hours, minutes, seconds } = convertMs(timeDiffMs);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
    addLeadingZero();
  },
};

function onClick() {
  clearInterval(countdownInterval);

  const selectedDateToMs = new Date(refs.dataInput.value).getTime();
  const currentDateToMs = new Date().getTime();
  let timeDiffMs = selectedDateToMs - currentDateToMs;

  countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDiffMs);

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;

    addLeadingZero();

    timeDiffMs -= 1000;
    if (timeDiffMs < 0) {
      clearInterval(countdownInterval);
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

function addLeadingZero() {
  refs.days.textContent = refs.days.textContent.padStart(2, '0');
  refs.hours.textContent = refs.hours.textContent.padStart(2, '0');
  refs.minutes.textContent = refs.minutes.textContent.padStart(2, '0');
  refs.seconds.textContent = refs.seconds.textContent.padStart(2, '0');
}

flatpickr(refs.dataInput, options);
