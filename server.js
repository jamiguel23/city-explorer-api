'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const axios = require('axios');
const handleGetWeather = require('./routeHandlers/weather.js')
const handleGetMovie = require('./routeHandlers/movies')

const { response } = require('express');
const app = express()
const PORT = process.env.PORT

app.use(cors());
app.get('/test', handleGetTest)
app.get('/weather', handleGetWeather);
app.get('/movie', handleGetMovie)

app.get('/*', (req, res) => {
  res.status(404).send('something went wrong');
});

function handleGetTest(request, response) {
  response.send('your test is working');
}

app.listen(PORT, () => console.log(`server is listening on port, ${PORT}`));
