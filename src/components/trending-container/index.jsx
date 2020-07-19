/* eslint-disable camelcase */
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectImageMetaData } from '../../redux/configuration/configuration.selector';

import Button from '../button';

import './style.scss';

function useDateFormat(date) {
  const dateArray = date.split('-');
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}

const Trending = ({ movie, imageMetaData }) => {
  const { backdrop_sizes, secure_base_url } = imageMetaData;
  const getSizeItem = (selectSize) => {
    const SizeInArray = backdrop_sizes.filter((size) => size === selectSize);
    return SizeInArray.shift();
  };

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
          <h1>{movie.title}</h1>
          <h3>Lançamento em {useDateFormat(movie.release_date)}</h3>
          <h3>{movie.overview}</h3>
          <div>
            <Button type="button">
              <FontAwesomeIcon icon={faPlay} style={{ paddingRight: '10px' }} />
              Assistir
            </Button>
            <Button
              type="button"
              style={{
                marginLeft: '20px',
                backgroundColor: 'rgb(133,133,133)',
                color: '#fff',
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ paddingRight: '10px' }}
              />
              Mais informações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  imageMetaData: selectImageMetaData,
});

export default connect(mapStateToProps)(Trending);
