/* eslint-disable camelcase */
import React from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import ReactStars from 'react-rating-stars-component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectImageMetaData } from '../../redux/configuration/configuration.selector';

import Button from '../button';

import './style.scss';

function useDateFormat(date) {
  const dateArray = date.split('-');
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}

const Trending = ({ movie, imageMetaData, isMoviePage }) => {
  const { backdrop_sizes, secure_base_url } = imageMetaData;

  const getSizeItem = (selectSize) => {
    const SizeInArray = backdrop_sizes.filter((size) => size === selectSize);
    return SizeInArray.shift();
  };

  const history = useHistory();

  return (
    <div
      className="trending-container"
      style={{
        backgroundImage: `url("${secure_base_url}${getSizeItem('w1280')}${
          movie.backdrop_path
        }")`,
      }}
    >
      <div className="info-trending">
        <div>
          <h1>
            {movie.title.length > 35
              ? `${movie.title.substr(0, 35)}...`
              : movie.title}
          </h1>
          <h3>Lançamento em {useDateFormat(movie.release_date)}</h3>
          <h3>{movie.overview}</h3>
          {isMoviePage ? (
            <div>
              <ReactStars
                count={5}
                value={Math.floor(movie.vote_average / 2)}
                edit={false}
                size={24}
              />
              <p style={{ color: '#fff' }}>
                {movie.genres.map((genre, i) => {
                  if (movie.genres.length === i + 1) return `${genre.name}`;
                  return `${genre.name} • `;
                })}
              </p>
              <p style={{ color: '#fff' }}>
                {movie.status === 'Released' ? 'Lançado' : 'Em breve'}
              </p>
            </div>
          ) : (
            <div>
              <Button type="button">
                <FontAwesomeIcon
                  icon={faPlay}
                  style={{ paddingRight: '10px' }}
                />
                Assistir
              </Button>
              <Button
                type="button"
                style={{
                  marginLeft: '20px',
                  backgroundColor: 'rgb(133,133,133)',
                  color: '#fff',
                }}
                onClick={() => history.push(`/movie/${movie.id}`)}
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ paddingRight: '10px' }}
                />
                Mais informações
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  imageMetaData: selectImageMetaData,
});

export default connect(mapStateToProps)(Trending);
