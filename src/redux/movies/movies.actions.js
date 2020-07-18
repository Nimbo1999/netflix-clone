import MovieTypes from './movies.types';

export const setMovie = (movies) => ({
  type: MovieTypes.SET_MOVIES,
  payload: movies,
});
