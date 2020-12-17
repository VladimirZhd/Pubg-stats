import { getId, getStats, displayStats, getWeapons, displayWeaponStats } from './modules/dataModule.js';
import { qs, parseWeaponName, addSelectElement } from './modules/utilities.js';

const storage = window.sessionStorage;
let weaponArray;
let weaponSummaries;

const showData = async () => {
  try {
    qs('#listElement').innerHTML = ' ';
    qs('.stats-header').innerHTML = ' ';
    qs('.loader').style.display = 'block';
    qs('.error').style.display = 'none';
    const statsSection = qs('.section-stats');
    const weaponNames = qs('#weaponList');
    if (weaponNames) {
      weaponNames.remove();
    }
    const gametag = qs('#gametag');
    const gameMode = qs('#gameMode');
    if (gametag.value === '') {
      gameMode.options[0].selected = 'selected';
      qs('.error').style.display = 'block';
      qs('.loader').style.display = 'none';
      return;
    }
    let user;
    if (gametag.value) {
      storage.username = gametag.value;
      user = gametag.value;
    } else {
      user = storage.username;
    }
    const userId = await getId(user);
    const selectedIndex = gameMode.options.selectedIndex;
    weaponSummaries = await getWeapons(userId);
    weaponArray = parseWeaponName(weaponSummaries);
    addSelectElement(weaponArray);
    const stats = await getStats(userId, gameMode.options[selectedIndex].value);
    const listHtml = await displayStats(stats);
    qs('.section-landing').style.display = 'none';
    qs('.loader').style.display = 'none';
    statsSection.style.display = 'block';
    qs('.stats-header').innerHTML = `Lifetime stats for ${user}`;
    qs('#listElement').innerHTML = listHtml;
  } catch (error) {
    console.log(error);
  }
};

const showWeaponStats = async event => {
  try {
    qs('#listElement').innerHTML = ' ';
    qs('.stats-header').innerHTML = ' ';
    qs('.loader').style.display = 'block';
    const weaponNames = qs('#weaponList');
    const selectedIndex = weaponNames.options.selectedIndex;
    const listHtml = await displayWeaponStats(weaponNames.options[selectedIndex].value, weaponSummaries);
    qs('.stats-header').innerHTML = `Weapon stats for ${weaponNames.options[selectedIndex].value}`;
    qs('.loader').style.display = 'none';
    qs('#listElement').innerHTML = listHtml;
  } catch (error) {
    console.log(error);
  }
};

const selectElement = qs('#gameMode');
selectElement.addEventListener('change', showData);

document.addEventListener('change', e => {
  if (e.target.id === 'weaponList') {
    showWeaponStats(e);
  }
});

window.addEventListener('load', event => {
  storage.removeItem('username');
});
