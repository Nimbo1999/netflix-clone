import { all, call } from 'redux-saga/effects';

import { searchMoviesSagas } from './search-movies/search-movies.sagas';

export default function* rootSaga() {
  yield all([call(searchMoviesSagas)]);
}
