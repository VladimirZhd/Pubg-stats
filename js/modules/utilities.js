// query selector
const qs = selector => document.querySelector(selector);

// Click handle function
const clickHandle = (selector, callBack) => {
  qs(selector).addEventListener('touchend', event => {
    event.preventDefault();
    callBack();
  });
  qs(selector).addEventListener('click', callBack);
};
