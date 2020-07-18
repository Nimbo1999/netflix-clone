import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '../button';

import './style.scss';

function useDateFormat(date) {
  const dateArray = date.split('-');
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}

const Trending = () => {
  return (
    <div
      className="trending-container"
      style={{
        backgroundImage:
          'url("http://image.tmdb.org/t/p/w1280/xXBnM6uSTk6qqCf0SRZKXcga9Ba.jpg")',
      }}
    >
      <div className="info-trending">
        <div>
          <h1>Greyhound - Na Mira do Inimigo</h1>
          <h3>Lançamento em {useDateFormat('2020-07-10')}</h3>
          <h3>
            No início da Segunda Guerra Mundial, um inexperiente capitão da
            Marinha dos EUA deve liderar um comboio aliado sendo perseguido por
            navios e submarinos nazistas.
          </h3>
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

export default Trending;
