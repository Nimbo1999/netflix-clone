import { combineReducers } from 'redux';

import MovieReducer from './movies/movies.reducer';
import ConfigurationReducer from './configuration/configuration.reducer';
import GenresReducer from './genres/genres.reducer';
import SearchMoviesReducer from './search-movies/search-movies.reducer';

const RootReducer = combineReducers({
  movies: MovieReducer,
  config: ConfigurationReducer,
  genres: GenresReducer,
  searchMovies: SearchMoviesReducer,
});

export default RootReducer;
