import GenresTypes from './genres.types';

const INITIAL_DATA = [];

const GenresReducer = (state = INITIAL_DATA, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case GenresTypes.SET_GENRES:
      return payload;

    default:
      return state;
  }
};

export default GenresReducer;
