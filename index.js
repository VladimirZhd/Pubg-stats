const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const http = require('http');
const config = require('config');
const app = express();

const PORT = process.env.PORT || 3000;

const headers = {
  Authorization: `Bearer ${config.get('pubgAPI')}`,
  Accept: 'application/vnd.api+json',
};

const base = 'https://api.pubg.com/shards/steam';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/player/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const apiURl = `${base}/players?filter[playerNames]=${name}`;
    const response = await axios.get(apiURl, {
      headers: headers,
    });
    res.status(200).json({
      playerId: response.data,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get('/player/:id/stats/:gameMode', async (req, res) => {
  try {
    const id = req.params.id;
    const gameMode = req.params.gameMode;
    const apiURL = `${base}/seasons/lifetime/gameMode/${gameMode}/players?filter[playerIds]=${id}`;
    const response = await axios.get(apiURL, { headers: headers });

    if (response.status === 200) {
      return res.status(200).json({
        data: response.data,
      });
    }
    res.status(response.status).json({
      message: response.statusText,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get('/player/:id/weapon_mastery', async (req, res) => {
  try {
    const id = req.params.id;
    const apiUrl = `${base}/players/${id}/weapon_mastery`;
    const response = await axios.get(apiUrl, { headers: headers });

    if (response.status === 200) {
      return res.status(200).json({
        data: response.data,
      });
    }
    res.status(response.status).json({
      message: response.statusText,
    });
  } catch (error) {
    console.log(error);
  }
});

app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, () => console.log(`API is running on localhost:${PORT}`));
