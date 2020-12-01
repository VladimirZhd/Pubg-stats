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

export const parseWeaponName = list => {
  const weaponNames = [];
  Object.entries(list).forEach(([key, value]) => {
    weaponNames.push(key.split('_')[2]);
  });
  return weaponNames;
};

export const addSelectElement = names => {
  const select = document.createElement('select');
  select.classList.add('select-css');
  select.id = 'weaponList';
  const firstOption = '<option value="">Choose an element</option>';
  const options = names.map(x => `<option value='${x}'>${x}</option>`);
  select.innerHTML = firstOption + options.join('');
  qs('.section-stats').prepend(select);
};
