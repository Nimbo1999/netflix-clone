import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import SearchMoviesTypes from './search-movies.types';

import { selectSearchInput } from './search-movies.selector';
import {
  selectApiBaseUrl,
  selectApiKey,
} from '../configuration/configuration.selector';
import { fetchMoviesSuccess, fetchMoviesError } from './search-movies.actions';

function* fetchSearchMoviesAsync() {
  try {
    const ApiBaseUrl = yield select(selectApiBaseUrl);
    const ApiKey = yield select(selectApiKey);
    const query = yield select(selectSearchInput);
    const request = yield call(
      fetch,
      `${ApiBaseUrl}/search/movie?api_key=${ApiKey}&language=pt-BR&query=${encodeURI(
        query
      )}&page=1`,
      { method: 'GET' }
    );
    const data = yield request.json();
    yield put(fetchMoviesSuccess(data.results));
  } catch (e) {
    yield put(fetchMoviesError(e.message));
  }
}

function* fetchSearchMoviesStart() {
  yield takeLatest(SearchMoviesTypes.SEARCH_START, fetchSearchMoviesAsync);
}

export function* searchMoviesSagas() {
  yield all([call(fetchSearchMoviesStart)]);
}
