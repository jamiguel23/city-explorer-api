'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const axios = require('axios');

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

function handleGetWeather(req, res) {
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}&units=I`
  console.log(req.query)
  axios.get(url)
    .then(results => {
      let weatherDescriptions = results.data.data.map(day => new Forecast(day));
      console.log(weatherDescriptions);
      res.status(200).send(weatherDescriptions);
    })
    .catch(error => {
      console.error(error.message);
      res.status(500).send('server error')
    });

}

function handleGetMovie(req, res) {
  const url = `https://api.themoviedb.org/3/keyword/{seattle}/movies?api_key=${process.env.MOVIE_API_KEY}&language=en-US&include_adult=false`
  console.log(req.query);

}



function handleGetTest(request, response) {
  response.send('your test is working');
}

    
class Forecast {
  constructor(obj) {

    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}

app.listen(PORT, () => console.log(`server is listening on port, ${PORT}`));
