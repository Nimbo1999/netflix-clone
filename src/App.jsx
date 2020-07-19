import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMovies } from './redux/movies/movies.selector';
import {
  selectApiBaseUrl,
  selectApiKey,
} from './redux/configuration/configuration.selector';
import { setMovie } from './redux/movies/movies.actions';
import { setGenres } from './redux/genres/genres.actions';
import { setImageMetaData } from './redux/configuration/configuration.actions';

import Header from './components/header';
import Trending from './components/trending-container';
import FilmSlider from './components/film-slider';
import LoadingSpinner from './components/spinner';

import './style.scss';

const { Item } = FilmSlider;

// eslint-disable-next-line react/prop-types
const App = ({
  movies,
  setMovies,
  apiBaseUrl,
  apiKey,
  // eslint-disable-next-line no-shadow
  setImageMetaData,
  // eslint-disable-next-line no-shadow
  setGenres,
}) => {
  useEffect(() => {
    const getInitializeData = async () => {
      await fetch(`${apiBaseUrl}/configuration?api_key=${apiKey}`, {
        method: 'GET',
      })
        .then((resp) => resp.json())
        .then((data) => {
          const {
            // eslint-disable-next-line camelcase
            images: { base_url, poster_sizes, secure_base_url, backdrop_sizes },
          } = data;
          setImageMetaData({
            base_url,
            poster_sizes,
            secure_base_url,
            backdrop_sizes,
          });
        });

      await fetch(
        `${apiBaseUrl}/genre/movie/list?api_key=${apiKey}&language=pt-BR`,
        {
          method: 'GET',
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          const { genres } = data;
          setGenres(genres);
        });

      await fetch(
        `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}&language=pt-BR`,
        {
          method: 'GET',
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          const { results } = data;
          setMovies(results);
        });
    };
    // getInitializeData ends here.

    getInitializeData();
  }, [apiBaseUrl, apiKey]);

  return (
    <div>
      <Header />
      <Trending />

      {movies.length === 0 ? (
        <div className="slider-loading-container">
          <LoadingSpinner />
        </div>
      ) : (
        <FilmSlider categoryType="Nome da Categoria aqui">
          {movies.map((movie) => (
            <Item movie={movie} key={movie.id} />
          ))}
        </FilmSlider>
      )}

      {movies.length === 0 ? (
        <div className="slider-loading-container">
          <LoadingSpinner />
        </div>
      ) : (
        <FilmSlider categoryType="Nome da Categoria aqui">
          {movies.map((movie) => (
            <Item movie={movie} key={movie.id} />
          ))}
        </FilmSlider>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  movies: selectMovies,
  apiBaseUrl: selectApiBaseUrl,
  apiKey: selectApiKey,
});

const mapDispatchToProps = (dispatch) => ({
  setMovies: (movies) => dispatch(setMovie(movies)),
  setImageMetaData: (imageObj) => dispatch(setImageMetaData(imageObj)),
  setGenres: (genres) => dispatch(setGenres(genres)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
