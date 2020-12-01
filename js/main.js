import { getId, getStats, displayStats, getWeapons, displayWeaponStats } from './modules/dataModule.js';
import { qs, clickHandle, parseWeaponName, addSelectElement } from './modules/utilities.js';

const storage = window.sessionStorage;
let weaponArray;
let weaponSummaries;

const showData = async () => {
  qs('#listElement').innerHTML = ' ';
  qs('.stats-header').innerHTML = ' ';
  const statsSection = qs('.section-stats');
  const weaponNames = qs('#weaponList');
  if (weaponNames) {
    weaponNames.remove();
  }
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
  weaponSummaries = await getWeapons(userId);
  weaponArray = parseWeaponName(weaponSummaries);
  addSelectElement(weaponArray);
  const stats = await getStats(userId, gameMode.options[selectedIndex].value);
  const listHtml = await displayStats(stats);
  qs('.section-landing').style.display = 'none';
  statsSection.style.display = 'block';
  qs('.stats-header').innerHTML = `Lifetime stats for ${user}`;
  qs('#listElement').innerHTML = listHtml;
};

const showWeaponStats = async (event) => {
  qs('#listElement').innerHTML = ' ';
  qs('.stats-header').innerHTML = ' ';
  const weaponNames = qs('#weaponList');
  const selectedIndex = weaponNames.options.selectedIndex;
  const listHtml = await displayWeaponStats(weaponNames.options[selectedIndex].value, weaponSummaries);
  qs('.stats-header').innerHTML = `Weapon stats for ${weaponNames.options[selectedIndex].value}`;
  qs('#listElement').innerHTML = listHtml;
}

const selectElement = qs('#gameMode');
selectElement.addEventListener('change', showData);

document.addEventListener('change', e => {
  if (e.target.id === 'weaponList') {
    showWeaponStats(e);
  }
})

