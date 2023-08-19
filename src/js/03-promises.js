import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelayInput: document.querySelector('input[name=delay]'),
  delayStepInput: document.querySelector('input[name=step]'),
  amountInput: document.querySelector('input[name=amount]'),
};

const { form, firstDelayInput, delayStepInput, amountInput } = refs;

console.log(firstDelayInput);

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  let firstDelay = Number(firstDelayInput.value);
  let delayStep = Number(delayStepInput.value);
  let amount = Number(amountInput.value);
  let position = 0;

  for (let i = 1; i <= amount; i += 1) {
    position = i;
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    firstDelay += delayStep;
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
