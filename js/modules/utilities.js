// query selector
export const qs = selector => document.querySelector(selector);

// Click handle function
export const clickHandle = (selector, callBack) => {
  qs(selector).addEventListener('touchend', event => {
    event.preventDefault();
    callBack();
  });
  qs(selector).addEventListener('click', callBack);
};

export const convertToJson = res => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};
