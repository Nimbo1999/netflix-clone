import SearchMoviesTypes from './search-movies.types';

export const searchText = (text) => ({
  type: SearchMoviesTypes.SEARCH_TEXT,
  payload: text,
});

export const fetchMoviesStart = () => ({
  type: SearchMoviesTypes.SEARCH_START,
});

export const fetchMoviesSuccess = (movies) => ({
  type: SearchMoviesTypes.SEARCH_SUCESS,
  payload: movies,
});

export const fetchMoviesError = (error) => ({
  type: SearchMoviesTypes.SEARCH_ERROR,
  payload: error,
});
