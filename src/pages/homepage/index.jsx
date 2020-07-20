import React, { Suspense } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectGenres } from '../../redux/genres/genres.selector';
import { selectFirstMovie } from '../../redux/movies/movies.selector';
import {
  selectApiBaseUrl,
  selectApiKey,
} from '../../redux/configuration/configuration.selector';

import LoadingSpinner from '../../components/spinner';
import Trending from '../../components/trending-container';
import FilmSlider from '../../components/film-slider';

import './style.scss';

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

const HomePage = ({ genres, movie, apiBaseUrl, apiKey }) => {
  if (genres.length === 0)
    return (
      <div className="loading-section-container">
        <LoadingSpinner />
      </div>
    );
  return (
    <>
      {movie ? <Trending movie={movie} /> : <LoadingSections />}

      <div style={{ marginTop: '-100px' }}>
        {genres.map((genre) => {
          return (
            <Suspense fallback={<LoadingSections />} key={genre.id}>
              <FilmSlider
                genre={genre}
                apiBaseUrl={apiBaseUrl}
                apiKey={apiKey}
              />
            </Suspense>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  genres: selectGenres,
  movie: selectFirstMovie,
  apiBaseUrl: selectApiBaseUrl,
  apiKey: selectApiKey,
});

export default connect(mapStateToProps)(HomePage);
