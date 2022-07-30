import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";
import "notiflix/dist/notiflix-3.2.5.min.css";

const datepicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector("button[data-start]");
const daysCounter = document.querySelector('span[data-days]');
const hoursCounter = document.querySelector('span[data-hours]');
const minutesCounter = document.querySelector('span[data-minutes]');
const secondsCounter = document.querySelector('span[data-seconds]');

let result = 0;
const counter = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      console.log(options.defaultDate)
      if (selectedDates[0] <= options.defaultDate) {
          btnStart.setAttribute('disabled', '')
          Notiflix.Notify.failure("Please choose a date in the future");
      } else {
          btnStart.removeAttribute('disabled');
          return result = selectedDates[0].getTime() - options.defaultDate.getTime();
      }
  },
};

flatpickr(datepicker, options);

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
    const timerId = setInterval(onCalculateRemainingTime, 1000);

    function onCalculateRemainingTime() {
        result = result - counter;

        if (result < 0) {
            return clearInterval(timerId);
        } 

        const difference = convertMs(result);
        const { days, hours, minutes, seconds } = difference;

        daysCounter.textContent = `${addLeadingZero(days)}`;
        hoursCounter.textContent = `${addLeadingZero(hours)}`;
        minutesCounter.textContent = `${addLeadingZero(minutes)}`
        secondsCounter.textContent = `${addLeadingZero(seconds)}`;
    }
    
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

function addLeadingZero(val) {
    return String(val).padStart(2, '0');
}