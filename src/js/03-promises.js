const refs = {
form: document.querySelector(".form"),
};

refs.form.addEventListener("submit", onClickCreatePromiseBtn),

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {

  });
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

function onClickCreatePromiseBtn(evt) {
  evt.preventDefault();

  const delay = evt.currentTarget.delay;
  console.log(delay);
}
onClickCreatePromiseBtn();
console.log("hello");