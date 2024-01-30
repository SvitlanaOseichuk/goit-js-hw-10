// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";


const startBtn = document.querySelector("button");

const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

const currentDate = new Date();

let userSelectedDate; 


function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
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
  };

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

      if (selectedDates) {

        userSelectedDate = selectedDates[0];

        if (userSelectedDate < currentDate ) {

            iziToast.show({
                message: "Please choose a date in the future"
            });

            startBtn.disabled = true;// старт не була активною
        } else {
            startBtn.disabled = false;// старт стає активною
        }
      }
    },
  };

  flatpickr("input#datetime-picker", options);


  startBtn.addEventListener("click", () => {

console.log("відлік почався")

    startBtn.disabled = true;

    const intervalId = setInterval(() => {
    const currentDate = new Date();
    const ms = userSelectedDate - currentDate;
    
     // Перевірка чи час ще не вийшов
    if (ms <= 0) {
        clearInterval(intervalId);
        startBtn.disabled = true;
          return;
        }
    
        const { days, hours, minutes, seconds } = convertMs(ms);

        daysElement.textContent = addLeadingZero(days);
        hoursElement.textContent = addLeadingZero(hours);
        minutesElement.textContent = addLeadingZero(minutes);
        secondsElement.textContent = addLeadingZero(seconds);
      }, 1000);
    
      setTimeout(() => {
        clearInterval(intervalId);
        startBtn.disabled = true;
      }, userSelectedDate - new Date());
    });
    
 
   




// startBtn.addEventListener("click", () => {
//   // Перевірка, чи обрано дату
//   if (!userSelectedDate) {
//     iziToast.show({
//       message: "Please choose a date first",
//     });
//     return;
//   }


//   const intervalId = setInterval(() => {
//     const currentDate = new Date();
//     const ms = userSelectedDate - currentDate;

    // // Перевірка, чи час ще не вийшов
    
    // if (ms <= 0) {
    //   clearInterval(intervalId);
    //   startBtn.disabled = true;
    //   return;
    // }

//     const { days, hours, minutes, seconds } = convertMs(ms);

//     
//     daysElement.textContent = padWithZero(days);
//     hoursElement.textContent = padWithZero(hours);
//     minutesElement.textContent = padWithZero(minutes);
//     secondsElement.textContent = padWithZero(seconds);
//   }, 1000);


//   setTimeout(() => {
//     clearInterval(intervalId);
//     startBtn.disabled = true;
//   }, userSelectedDate - new Date());
// });


