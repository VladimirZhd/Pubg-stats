import { getId, getStats, displayStats, getWeapons } from './modules/dataModule.js';
import { qs, clickHandle, parseWeaponName, addSelectElement } from './modules/utilities.js';

const storage = window.sessionStorage;
let weaponArray;

const showData = async () => {
  qs('#listElement').innerHTML = ' ';
  const gametag = qs('#gametag');
  let user;
  if (gametag.value) {
    storage.username = gametag.value;
    user = gametag.value;
  } else {
    user = storage.username;
  }
  const userId = await getId(user);
  const gameMode = qs('#gameMode');
  const selectedIndex = gameMode.options.selectedIndex;
  const weapons = await getWeapons(userId);
  weaponArray = parseWeaponName(weapons);
  addSelectElement(weaponArray);
  const stats = await getStats(userId, gameMode.options[selectedIndex].value);
  const listHtml = await displayStats(stats);
  qs('.section-landing').style.display = 'none';
  qs('.section-stats').style.display = 'block';
  qs('#listElement').innerHTML = listHtml;
};

const selectElement = qs('#gameMode');
selectElement.addEventListener('change', showData);
