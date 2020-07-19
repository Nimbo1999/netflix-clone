import { combineReducers } from 'redux';

import MovieReducer from './movies/movies.reducer';
import ConfigurationReducer from './configuration/configuration.reducer';
import GenresReducer from './genres/genres.reducer';

const RootReducer = combineReducers({
  movies: MovieReducer,
  config: ConfigurationReducer,
  genres: GenresReducer,
});

export default RootReducer;
