import { combineReducers } from 'redux';

import MovieReducer from './movies/movies.reducer';
import ConfigurationReducer from './configuration/configuration.reducer';

const RootReducer = combineReducers({
  movies: MovieReducer,
  config: ConfigurationReducer,
});

export default RootReducer;
