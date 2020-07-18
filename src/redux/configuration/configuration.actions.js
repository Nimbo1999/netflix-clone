import ConfigurationTypes from './configuration.types';

export const setImageMetaData = (imageObj) => ({
  type: ConfigurationTypes.SET_IMAGE_META_DATA,
  payload: imageObj,
});
