'use strict';

const axios = require('axios');





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
    res.status(500).send('movie server error')

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

module.exports=handleGetMovie
