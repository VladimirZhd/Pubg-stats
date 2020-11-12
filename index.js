const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const http = require('http');
const config = require('config');
const app = express();

const PORT = process.env.PORT || 3000;

const headers = {
  Authorization: `Bearer ${config.get('pubgAPI')}`,
  'Content-Type': 'application/vnd.api+json',
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
    const data = await response.toJSON();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, () => console.log(`API is running on localhost:${PORT}`));
