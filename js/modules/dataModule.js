import { convertToJson, qs, clickHandle } from './utilities.js';

export const getId = async name => {
  const data = await fetch(`http://localhost:3000/player/${name}`).then(convertToJson);
  return data.playerId.data[0].id;
};

export const getStats = async (id, gameMode) => {
  const data = await fetch(`http://localhost:3000/player/${id}/stats/${gameMode}`).then(convertToJson);
  return data.data.data[0].attributes.gameModeStats[gameMode];
};

export const displayStats = stats => {
  const listArray = [];
  Object.entries(stats).map(([key, value]) => {
    switch (key) {
      case 'assist':
        listArray.push(`<li>Assists: <span>${value}</span></li>`);
        break;
      case 'boosts':
        listArray.push(`<li>Boosts used: <span>${value}</span></li>`);
        break;
      case 'dBNOs':
        listArray.push(`<li>Enemies knocked: <span>${value}</span></li>`);
        break;
      case 'dailyKills':
        listArray.push(`<li>Daily kills: <span>${value}</span></li>`);
        break;
      case 'dailyWins':
        listArray.push(`<li>Daily wins: <span>${value}</span></li>`);
        break;
      case 'damageDealt':
        listArray.push(`<li>Total damage dealt: <span>${Math.floor(value)} HP</span></li>`);
        break;
      case 'headshotKills':
        listArray.push(`<li>Headshots: <span>${value}</span></li>`);
        break;
      case 'heals':
        listArray.push(`<li>Healings used: <span>${value}</span></li>`);
        break;
      case 'kills':
        listArray.push(`<li>Total kills: <span>${value}</span></li>`);
        break;
      case 'longestKill':
        console.log(value);
        listArray.push(`<li>Longest kill: <span>${(value * 0.000621371).toFixed(2)} miles</span></li>`);
        break;
      case 'longestTimeSurvived':
        const longestminutes = Math.floor(value / 60);
        const longestSeconds = Math.floor(value % 60);
        listArray.push(`<li>Longest time survived: <span>${longestminutes} min ${longestSeconds} seconds</span></li>`);
        break;
      case 'looses':
        listArray.push(`<li>Maches lost: <span>${value}</span></li>`);
        break;
      case 'maxKillStreaks':
        listArray.push(`<li>Max Kill Streak: <span>${value}</span></li>`);
        break;
      case 'revives':
        listArray.push(`<li>Revived teammates: <span>${value}</span></li>`);
        break;
      case 'rideDistance':
        listArray.push(`<li>Drove: <span>${(value * 0.000621371).toFixed(2)} miles</span></li>`);
        break;
      case 'roadKills':
        listArray.push(`<li>Vehicle kills: <span>${value}</span></li>`);
        break;
      case 'roundsPlayed':
        listArray.push(`<li>Total matches: <span>${value}</span></li>`);
        break;
      case 'suicides':
        listArray.push(`<li>Suicides: <span>${value}</span></li>`);
        break;
      case 'swimDistance':
        listArray.push(`<li>Swim distance: <span>${(value * 0.000621371).toFixed(2)} miles</span></li>`);
        break;
      case 'teamKills':
        listArray.push(`<li>Team kills: <span>${value}</span></li>`);
        break;
      case 'timeSurvived':
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        listArray.push(`<li>Total time survived: <span>${minutes} minutes ${seconds} seconds</span></li>`);
        break;
      case 'top10s':
        listArray.push(`<li>Top 10s: <span>${value}</span></li>`);
        break;
      case 'vehicleDestroys':
        listArray.push(`<li>Vehicle destroyed: <span>${value}</span></li>`);
        break;
      case 'walkDistance':
        listArray.push(`<li>Total walked: <span>${(value * 0.000621371).toFixed(2)} miles</span></li>`);
        break;
      case 'weaponsAcquired ':
        listArray.push(`<li>Weapon picked up: <span>${value}</span></li>`);
        break;
      case 'weeklyKills':
        listArray.push(`<li>Weekly kills: <span>${value}</span></li>`);
        break;
      case 'weeklyWins':
        listArray.push(`<li>Weekly wins: <span>${value}</span></li>`);
        break;
      case 'wins':
        listArray.push(`<li>Total wins: <span>${value}</span></li>`);
        break;
      default:
    }
  });
  return listArray.join('');
};
