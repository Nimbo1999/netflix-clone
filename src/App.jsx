import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectApiBaseUrl,
  selectApiKey,
} from './redux/configuration/configuration.selector';
import { setMovie } from './redux/movies/movies.actions';
import { setGenres } from './redux/genres/genres.actions';
import { setImageMetaData } from './redux/configuration/configuration.actions';

import routes from './routes';

import Header from './components/header';
import Footer from './components/footer';
import LoadingComponent from './components/spinner';

import './style.scss';

const loadingComponent = (
  <div className="main-spinner-container">
    <LoadingComponent />
  </div>
);

const baseUrl = process.env.PUBLIC_URL;

// eslint-disable-next-line react/prop-types
const App = ({
  setMovies,
  apiBaseUrl,
  apiKey,
  // eslint-disable-next-line no-shadow
  setImageMetaData,
  // eslint-disable-next-line no-shadow
  setGenres,
}) => {
  const [pageLoaded, completeLoading] = useState(false);
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
    if (!pageLoaded) completeLoading(!pageLoaded);
  }, [apiBaseUrl, apiKey, completeLoading, pageLoaded]);

  if (!pageLoaded) return loadingComponent;
  return (
    <div>
      <Header />

      <Suspense fallback={loadingComponent}>
        <Switch>
          {routes.map((route) => {
            const { path } = route;
            return (
              <Route path={`${baseUrl}${path}`} {...route} key={route.key} />
            );
          })}
        </Switch>
      </Suspense>

      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  apiBaseUrl: selectApiBaseUrl,
  apiKey: selectApiKey,
});

const mapDispatchToProps = (dispatch) => ({
  setMovies: (movies) => dispatch(setMovie(movies)),
  setImageMetaData: (imageObj) => dispatch(setImageMetaData(imageObj)),
  setGenres: (genres) => dispatch(setGenres(genres)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
