// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stateInput = form.elements.state;

  const delay = parseInt(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput.value === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    (value) => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    },
    (reason) => {
      iziToast.error({
        message: `❌ Rejected promise in ${reason}ms`,
      });
    }
  );
});
