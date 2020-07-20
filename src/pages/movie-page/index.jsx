import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectApiBaseUrl,
  selectApiKey,
} from '../../redux/configuration/configuration.selector';

import LoadingSpinner from '../../components/spinner';
import Trending from '../../components/trending-container';

import './style.scss';

const MoviePage = ({ apiBaseUrl, apiKey }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      if (apiKey && apiBaseUrl)
        await fetch(
          `${apiBaseUrl}/movie/${id}?api_key=${apiKey}&language=pt-BR`,
          { method: 'GET' }
        )
          .then((resp) => resp.json())
          .then((data) => setMovie(data))
          .catch(() => ({}));
    };

    fetchFilm();
  }, [id, setMovie, apiKey, apiBaseUrl]);

  if (!movie) return <LoadingSpinner />;
  return (
    <div>
      <Trending movie={movie} isMoviePage />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  apiBaseUrl: selectApiBaseUrl,
  apiKey: selectApiKey,
});

export default connect(mapStateToProps)(MoviePage);
