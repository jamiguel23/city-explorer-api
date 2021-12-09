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

async function handleGetMovie(req, res) {

  try {
    const city_name = req.query.city_name
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city_name}&page=1&include_adult=false`
    const movieRes = await axios.get(url);
    const cleanedMovies = movieRes.data.results.map(movie => new Movies(movie));
    console.log(req.query);
    res.status(200).send(cleanedMovies)

  } catch (e) {
    console.log(e.message);
    res.status(500).send('server error')

  }

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

class Movies {
  constructor(obj) {

    this.title = obj.title;
    this.overview = obj.overview;
    this.vote_average = obj.vote_average;
    this.vote_count = obj.vote_count;
    this.image_url = obj.poster_path ? `https://image.tmdb.org/t/p/w500${obj.poster_path}` : `https://www.reelviews.net/resources/img/default_poster.jpg`;
    this.popularity = obj.popularity;
    this.release_date = obj.release_date;
  }
}

// https://image.tmdb.org/t/p/w500
app.listen(PORT, () => console.log(`server is listening on port, ${PORT}`));
