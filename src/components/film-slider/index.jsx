/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from '../spinner';
import Item from './item';

import './style.scss';

const FilmSlider = ({ genre, apiBaseUrl, apiKey }) => {
  const [distance, setDistance] = useState(0);
  const [moviesOfGenrer, setMovies] = useState([]);
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const getListOfFilms = async () => {
      await fetch(
        `${apiBaseUrl}/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}`,
        { method: 'GET' }
      )
        .then((resp) => resp.json())
        .then((data) => {
          const { results } = data;
          // console.log(results)
          setMovies(results);
          setWidth(elementRef.current.clientWidth);
        })
        .catch(() => {
          return [];
        });
    };

    getListOfFilms();
  }, []);

  return (
    <div className="film-slider-container">
      <div className="slide-title">
        <h3>{genre.name}</h3>
      </div>

      <div className="slider-container">
        {distance >= 0 ? null : (
          <button
            type="button"
            className="btn prev"
            onClick={() => setDistance(distance + width)}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
        )}

        <button
          type="button"
          className="btn next"
          onClick={() => setDistance(distance - width)}
        >
          <FontAwesomeIcon icon={faChevronLeft} rotation={180} size="2x" />
        </button>

        {moviesOfGenrer.length === 0 ? (
          <Loading />
        ) : (
          <div
            className="slider"
            ref={elementRef}
            style={{ transform: `translate3d(${distance}px, 0, 0)` }}
          >
            {moviesOfGenrer.map((movie) => (
              <Item movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

FilmSlider.Item = Item;

export default FilmSlider;
