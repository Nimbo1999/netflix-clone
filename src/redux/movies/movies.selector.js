import { createSelector } from 'reselect';

export const selectMovies = (state) => state.movies;

export const selectFirstMovie = createSelector([selectMovies], (data) =>
  data.shift()
);
