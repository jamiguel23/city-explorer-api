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


app.get('/weather', (req,res) => {
  res.status(200).send(weatherData);
});


app.get('/*', (req, res) => {
  res.status(404).send('something went wrong');
});



function handleGetTest( request, response){
  response.send('your test worked');
}

app.listen(PORT, () => console.log("server is listening on port", PORT));

// weatherData, weatherData[0] weatherData[1] weatherData[2], data, weather, description 
let threeDayArr = weatherData.map(weatherData => weatherData.data.map(data => data.datetime));
let threeDayDescripArr = weatherData.map(weatherData => weatherData.data.map(data => data.weather.description));

console.log(threeDayArr);
console.log(threeDayDescripArr);

class Forecast {
  constructor(weatherData){
    
    
  }
}

