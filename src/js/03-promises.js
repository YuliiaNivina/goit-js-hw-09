import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onClickCreatePromiseBtn);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onClickCreatePromiseBtn(evt) {
  evt.preventDefault();

  const delayValue = Number(evt.currentTarget.delay.value);
  const stepValue = Number(evt.currentTarget.step.value);
  const amountValue = Number(evt.currentTarget.amount.value);

  for (let i = 0; i < amountValue; i += 1) {
    const delay = i * stepValue + delayValue;
    const position = i + 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    evt.currentTarget.reset();
  }
}
