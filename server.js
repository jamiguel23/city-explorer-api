'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const { response } = require('express');


const app = express()

app.use(cors());

const PORT = process.env.PORT


app.get('/test', handleGetTest)


app.get('/weather', (req, res) => {

  let forecastArray = [];
  let cityName = req.query.searchQuery;
  let lat = req.query.lat;
  let lon = req.query.lon;

  try {
    weatherData.find(obj => {
      if (obj.city_name === cityName) {
        forecastArr.push(new Forecast(obj.data));
      }
    });
    res.send(forecastArray);
  } catch (error){
    res.send('Cannot find city')
  };

  });


app.get('/*', (req, res) => {
  res.status(404).send('something went wrong');
});



function handleGetTest(request, response) {
  response.send('your test worked');
}

app.listen(PORT, () => console.log("server is listening on port", PORT));

// weatherData, weatherData[0] weatherData[1] weatherData[2], data, weather, description 
let threeDayArr = weatherData.map(weatherData => weatherData.data.map(data => data.datetime));
let threeDayDescripArr = weatherData.map(weatherData => weatherData.data.map(data => data.weather.description));

console.log(threeDayArr);
console.log(threeDayDescripArr);

class Forecast {
  constructor(weatherData) {

    this.threeDayArr = weatherData.map(weatherData => weatherData.data.map(data => data.datetime));
    this.threeDayDescripArr = weatherData.map(weatherData => weatherData.data.map(data => data.weather.description));
  }
}

