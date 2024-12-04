// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// Описанный в документации
import iziToast from 'izitoast';
// Дополнительный импорт стилей
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
});

const datetimePicker = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
let userSelectedDate = '';

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      btn.disabled = false;
      userSelectedDate = selectedDates[0] - Date.now();
    } else {
      btn.disabled = true;
      iziToast.error({ message: 'Please choose a date in the future' });
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btn.addEventListener('click', addLeadingZero);
function addLeadingZero(value) {
  datetimePicker.disabled = true;
  btn.disabled = true;
  const interval = setInterval(() => {
    if (userSelectedDate > 1000) {
      userSelectedDate -= 1000;
      const { days, hours, minutes, seconds } = convertMs(userSelectedDate);
      dataDays.textContent = `${days}`.padStart(2, '0');
      dataHours.textContent = `${hours}`.padStart(2, '0');
      dataMinutes.textContent = `${minutes}`.padStart(2, '0');
      dataSeconds.textContent = `${seconds}`.padStart(2, '0');
    } else {
      clearInterval(interval);
      datetimePicker.disabled = false;
    }
  }, 1000);
}
