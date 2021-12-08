'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');


const app = express()

app.use(cors());

const PORT = process.env.PORT


app.get('/test', handleGetTest)
app.get('/weather', handleGetWeather);


function handleGetWeather(req,res){
  res.status(200).send(weatherData);
}

function handleGetTest( request, response){
  response.send('your test worked');
}

app.listen(PORT, () => console.log("server is listening on port", PORT));
