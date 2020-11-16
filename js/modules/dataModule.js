import { convertToJson, qs, clickHandle } from './modules/utilities.js';

export const getId = async name => {
  const data = await fetch(`http://localhost:3000/player/RickySpan1shh`).then(convertToJson);
  console.log(data.playerId.data[0].id);
  return data.playerId.data[0].id;
};
