import GenresTypes from './genres.types';

export const setGenres = (genres) => ({
  type: GenresTypes.SET_GENRES,
  payload: genres,
});
