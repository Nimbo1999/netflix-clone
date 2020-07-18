/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectImageMetaData } from '../../redux/configuration/configuration.selector';

import SliderContext from './context';

// eslint-disable-next-line react/prop-types
const Item = ({ movie, ImageMetaData }) => {
  const { secure_base_url, backdrop_sizes } = ImageMetaData;

  const getSizeItem = (selectSize) => {
    const SizeInArray = backdrop_sizes.filter((size) => size === selectSize);
    return SizeInArray.shift();
  };

  return (
    <SliderContext.Consumer>
      {({ elementRef }) => {
        return (
          <div
            ref={elementRef}
            className="slide-item"
            style={{
              backgroundImage: `url("${secure_base_url}${getSizeItem('w300')}${
                movie.backdrop_path
              }")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        );
      }}
    </SliderContext.Consumer>
  );
};

Item.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = createStructuredSelector({
  ImageMetaData: selectImageMetaData,
});

export default connect(mapStateToProps)(Item);
