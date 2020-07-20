/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectImageMetaData } from '../../redux/configuration/configuration.selector';
import { selectGenres } from '../../redux/genres/genres.selector';

function useGeners(availableGenres, itemGenres) {
  const genres = [];
  itemGenres.forEach((itemG) => {
    genres.push(availableGenres.filter((genre) => genre.id === itemG).shift());
  });
  return genres;
}

// eslint-disable-next-line react/prop-types
const Item = ({ movie, ImageMetaData, genres, elementRef }) => {
  const { secure_base_url, backdrop_sizes } = ImageMetaData;

  const getSizeItem = (selectSize) => {
    const SizeInArray = backdrop_sizes.filter((size) => size === selectSize);
    return SizeInArray.shift();
  };

  const itemGeners = useGeners(genres, movie.genre_ids);

  return (
    <div
      ref={elementRef}
      className="slide-item"
      style={{
        backgroundImage: `url("${secure_base_url}${getSizeItem('w300')}${
          movie.backdrop_path
        }")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <h5 className="slide-item-title">
        {movie.title.length > 35
          ? `${movie.title.substr(0, 35)}...`
          : movie.title}
      </h5>
      <div className="item-label">
        <div className="item-genres">
          {itemGeners.map((genre, i) => {
            if (itemGeners.length === i + 1) return `${genre.name}.`;
            return `${genre.name}, `;
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  ImageMetaData: selectImageMetaData,
  genres: selectGenres,
});

export default connect(mapStateToProps)(Item);
