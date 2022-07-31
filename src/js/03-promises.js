import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.5.min.css";

const form = document.querySelector('form')
const inputDelay = document.querySelector('input[name = delay]');
const inputStep = document.querySelector('input[name = step]');
const inputAmount = document.querySelector('input[name = amount]');
const btnSubmit = document.querySelector('button');

let firstDelayId = null;
let timerId = null;
let options = {};
let quantityСounter = 0;
let pos = 0;
let finalDelay = 0;
let promise = null;
let onceTimeTimer = null;

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  options = {
    delay: Number(inputDelay.value),
    step: Number(inputStep.value),
    amount: Number(inputAmount.value)
  };
  const { delay, step } = options;

  finalDelay = delay;
  console.log(finalDelay)

  firstDelayId = setTimeout(() => {
    if (step > delay) {
      onceTimeTimer = setTimeout(createPromise, delay, pos, finalDelay)
      timerId = setInterval(createPromise, step, pos, finalDelay);
    } else {
      timerId = setInterval(createPromise, step, pos, finalDelay)
    }
  }, delay)
}

function createPromise(position, delai) {
  const { step, amount } = options;
  quantityСounter += 1;
  pos += 1;

  console.log(finalDelay)

  if (quantityСounter === amount) {
    clearInterval(timerId);
  }
  const shouldResolve = Math.random() > 0.3;
  promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve();
    } else {
      reject();
  }
  })

  promise.then(success => Notiflix.Notify.success(`✅ Fulfilled promise ${pos} in ${finalDelay}ms`)).catch(error => Notiflix.Notify.failure(`❌ Rejected promise ${pos} in ${finalDelay}ms`));

  if (quantityСounter !== 1) {
    return finalDelay += step;;
  } else {
    return; 
  }
}
