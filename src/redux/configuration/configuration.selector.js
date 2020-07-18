import { createSelector } from 'reselect';

const selectConfigurationReducer = (state) => state.config;

export const selectApiBaseUrl = createSelector(
  [selectConfigurationReducer],
  (data) => data.api_base_url
);

export const selectApiKey = createSelector(
  [selectConfigurationReducer],
  (data) => data.api_key
);

export const selectImageMetaData = createSelector(
  [selectConfigurationReducer],
  (data) => data.images_meta_data
);
