// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";


const startButton = document.querySelector("button");
const inputDate = document.querySelector("input#datetime-picker");


const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");


let userSelectedDate; 
let timerRunning = false;

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

        const currentDate = new Date();

        if (userSelectedDate <= currentDate ) {

            iziToast.show({
                message: "Please choose a date in the future"
            });
            startButton.disabled = true;// старт не була активною
        } else {
            startButton.disabled = false;// старт стає активною
        }
      }
    },
  };

flatpickr("input#datetime-picker", options);


startButton.addEventListener("click", () => {

  if (!timerRunning) { 
    console.log("відлік почався");
    startButton.disabled = true;
    inputDate.disabled = true; 
   }

    const intervalId = setInterval(() => {
    const currentDate = new Date();
    const ms = userSelectedDate - currentDate;
    
     
    if (ms <= 0) {
        clearInterval(intervalId);
        startButton.disabled = true;
        inputDate.disabled = false; ''
        console.log("відлік закінчився");
          return;
        }
    
    const { days, hours, minutes, seconds } = convertMs(ms);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
      }, 1000);
      
});
    
 
   
