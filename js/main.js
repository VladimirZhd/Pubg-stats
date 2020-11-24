import { getId, getStats, displayStats } from './modules/dataModule.js';
import { qs, clickHandle } from './modules/utilities.js';

clickHandle('#get-stats', async () => {
  const gametag = qs('#gametag');
  const id = await getId(gametag.value);
  const gameMode = qs('#gameMode');
  const selectedIndex = gameMode.options.selectedIndex;
  const stats = await getStats(id, gameMode.options[selectedIndex].value);
  const listHtml = await displayStats(stats);
  qs('.section-landing').style.display = 'none';
  qs('#listElement').innerHTML = listHtml;
});
