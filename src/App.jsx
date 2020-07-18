import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMovies } from './redux/movies/movies.selector';
import {
  selectApiBaseUrl,
  selectApiKey,
} from './redux/configuration/configuration.selector';
import { setMovie } from './redux/movies/movies.actions';
import { setImageMetaData } from './redux/configuration/configuration.actions';

import Header from './components/header';
import Trending from './components/trending-container';
import FilmSlider from './components/film-slider';
import LoadingSpinner from './components/spinner';

const { Item } = FilmSlider;

// eslint-disable-next-line react/prop-types
const App = ({ movies, setMovies, apiBaseUrl, apiKey, setImageMetaData }) => {
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

    getInitializeData();
  }, [apiBaseUrl, apiKey]);

  return (
    <div>
      <Header />
      <Trending />
      {movies.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <FilmSlider categoryType="Nome da Categoria aqui">
          {movies.map((movie) => (
            <Item movie={movie} />
          ))}
        </FilmSlider>
      )}
      {movies.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <FilmSlider categoryType="Nome da Categoria aqui">
          {movies.map((movie) => (
            <Item movie={movie} />
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
});

App.propTypes = {
  apiBaseUrl: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  movies: PropTypes.oneOf([
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
