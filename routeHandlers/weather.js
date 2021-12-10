'use strict';


const axios = require('axios');



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
      res.status(500).send('weather server error')
    });

}

class Forecast {
  constructor(obj) {

    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}


module.exports = handleGetWeather;
