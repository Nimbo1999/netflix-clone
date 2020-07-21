/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */
import React from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectGenres } from '../../redux/genres/genres.selector';
import { selectFoundMovies } from '../../redux/search-movies/search-movies.selector';
import { selectImageMetaData } from '../../redux/configuration/configuration.selector';

import Button from '../../components/button';
import LoadingSpinner from '../../components/spinner';

import './style.scss';

function useGeners(availableGenres, itemGenres) {
  const genres = [];
  itemGenres.forEach((itemG) => {
    genres.push(availableGenres.filter((genre) => genre.id === itemG).shift());
  });
  return genres;
}

const SearchPage = ({ genres, foundMovies, imageMetaData }) => {
  const { secure_base_url, backdrop_sizes } = imageMetaData;

  const getSizeItem = (selectSize) => {
    const SizeInArray = backdrop_sizes.filter((size) => size === selectSize);
    return SizeInArray.shift();
  };

  const history = useHistory();

  return (
    <div className="search-page-container">
      <h2>Filtrar Busca pelos generos:</h2>
      <div className="filtro-por-generos">
        {genres.length === 0 ? (
          <p className="not-found-gender">Não foi encontrado nenhum gênero.</p>
        ) : (
          genres.map((genre, i) =>
            genres.length === i + 1 ? (
              <span key={genre.id}>
                <Button type="button" link>
                  {genre.name}
                </Button>
              </span>
            ) : (
              <span key={genre.id} style={{ color: '#ee0021' }}>
                <Button type="button" link>
                  {genre.name}
                </Button>
                •
              </span>
            )
          )
        )}
      </div>
      <div className="found-movies-container">
        {foundMovies.length === 0 ? (
          <div className="spinn-search-container">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="found-movies-wrapper">
            {foundMovies
              .filter((result) => result.backdrop_path !== null)
              .map((movie) => {
                const itemGeners = useGeners(genres, movie.genre_ids);

                return (
                  <div
                    className="found-movies-item"
                    style={{
                      backgroundImage: `url("${secure_base_url}${getSizeItem(
                        'w300'
                      )}${movie.backdrop_path}")`,
                      backgroundSize: 'cover',
                    }}
                    onClick={() => history.push(`/movie/${movie.id}`)}
                  >
                    <h5 className="slide-item-title">
                      {movie.title.length > 35
                        ? `${movie.title.substr(0, 35)}...`
                        : movie.title}
                    </h5>
                    <div className="item-label">
                      <div className="item-genres">
                        {itemGeners.map((genre, i) => {
                          if (itemGeners.length === i + 1)
                            return `${genre.name}.`;
                          return `${genre.name}, `;
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  genres: selectGenres,
  foundMovies: selectFoundMovies,
  imageMetaData: selectImageMetaData,
});

export default connect(mapStateToProps)(SearchPage);
