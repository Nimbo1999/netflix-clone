import SearchMoviesTypes from './search-movies.types';

const INITIAL_STATE = {
  searchText: '',
  foundMovies: [],
  error: null,
  loading: false,
};

const SearchMoviesReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case SearchMoviesTypes.SEARCH_TEXT:
      return {
        ...state,
        searchText: payload,
      };

    case SearchMoviesTypes.SEARCH_START:
      return {
        ...state,
        loading: true,
      };

    case SearchMoviesTypes.SEARCH_SUCESS:
      return {
        ...state,
        foundMovies: payload,
        loading: false,
      };

    case SearchMoviesTypes.SEARCH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default SearchMoviesReducer;
