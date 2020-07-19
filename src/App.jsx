import React, { useEffect, lazy, Suspense } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFirstMovie } from './redux/movies/movies.selector';
import {
  selectApiBaseUrl,
  selectApiKey,
} from './redux/configuration/configuration.selector';
import { setMovie } from './redux/movies/movies.actions';
import { setGenres } from './redux/genres/genres.actions';
import { setImageMetaData } from './redux/configuration/configuration.actions';
import { selectGenres } from './redux/genres/genres.selector';

import Header from './components/header';
import Trending from './components/trending-container';
import LoadingSpinner from './components/spinner';
import Footer from './components/footer';

import './style.scss';

const FilmSlider = lazy(() => import('./components/film-slider'));

const LoadingSections = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '400px',
      }}
    >
      <LoadingSpinner />
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const App = ({
  movie,
  setMovies,
  apiBaseUrl,
  apiKey,
  // eslint-disable-next-line no-shadow
  setImageMetaData,
  // eslint-disable-next-line no-shadow
  setGenres,
  genres,
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
        `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}&language=pt-BR`,
        {
          method: 'GET',
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          // eslint-disable-next-line no-shadow
          const { results } = data;
          setMovies(results);
        });

      await fetch(
        `${apiBaseUrl}/genre/movie/list?api_key=${apiKey}&language=pt-BR`,
        {
          method: 'GET',
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          // eslint-disable-next-line no-shadow
          const { genres } = data;
          setGenres(genres);
        });
    };

    getInitializeData();
  }, [apiBaseUrl, apiKey]);

  if (genres.length === 0)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  return (
    <div>
      <Header />

      {movie ? <Trending movie={movie} /> : <LoadingSections />}

      <div style={{ marginTop: '-100px' }}>
        {genres.map((genre) => {
          return (
            <Suspense fallback={<LoadingSections />} key={genre.id}>
              <FilmSlider genre={genre} apiBaseUrl={apiBaseUrl} apiKey={apiKey} />
            </Suspense>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  movie: selectFirstMovie,
  apiBaseUrl: selectApiBaseUrl,
  apiKey: selectApiKey,
  genres: selectGenres,
});

const mapDispatchToProps = (dispatch) => ({
  setMovies: (movies) => dispatch(setMovie(movies)),
  setImageMetaData: (imageObj) => dispatch(setImageMetaData(imageObj)),
  setGenres: (genres) => dispatch(setGenres(genres)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
