import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.5.min.css";

const form = document.querySelector('form')
const inputDelay = document.querySelector('input[name = delay]');
const inputStep = document.querySelector('input[name = step]');
const inputAmount = document.querySelector('input[name = amount]');
const btnSubmit = document.querySelector('button');

let timerId = null;
let options = {};
let quantityСounter = 0;
let pos = 0;
let finalDelay = 0;

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

  const firstDelayId = setTimeout(() => {
    timerId = setInterval(createPromise, step, pos, finalDelay);
  }, delay)
}

function createPromise(position, delay) {
  const { step, amount } = options;
  quantityСounter += 1;
  pos += 1;

  if (quantityСounter === amount) {
    clearInterval(timerId);
  }
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve();
    } else {
      reject();
  }
  })

  promise.then(success => Notiflix.Notify.success(`✅ Fulfilled promise ${pos} in ${finalDelay}ms`)).catch(error => Notiflix.Notify.failure(`❌ Rejected promise ${pos} in ${finalDelay}ms`));

  if (quantityСounter !== 1) {
    finalDelay += step;
  }
}
