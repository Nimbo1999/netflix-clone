import movieTypes from './movies.types';

const MoviesReducer = (state = [], action) => {
  const { payload, type } = action;

  switch (type) {
    case movieTypes.SET_MOVIES:
      return payload;

    default:
      return state;
  }
};

export default MoviesReducer;
