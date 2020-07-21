import { createSelector } from 'reselect';

const selectSearchMovies = (state) => state.searchMovies;

export const selectSearchInput = createSelector(
  [selectSearchMovies],
  (data) => data.searchText
);

export const selectSearchLoading = createSelector(
  [selectSearchMovies],
  (data) => data.loading
);

export const selectFoundMovies = createSelector(
  [selectSearchMovies],
  (data) => data.foundMovies
);

export const selectSearchError = createSelector(
  [selectSearchMovies],
  (data) => data.error
);
