import ConfigurationTypes from './configuration.types';

const INITIAL_STATE = {
  api_base_url: 'https://api.themoviedb.org/3',
  api_key: 'eb2ba00da175fed9003625affb4c4fb6',
  images_meta_data: {
    base_url: '',
    secure_base_url: '',
    backdrop_sizes: [],
    poster_sizes: [],
  },
};

const ConfigurationReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case ConfigurationTypes.SET_IMAGE_META_DATA:
      return {
        ...state,
        images_meta_data: payload,
      };

    default:
      return state;
  }
};

export default ConfigurationReducer;
