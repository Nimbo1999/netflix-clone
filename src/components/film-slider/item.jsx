import React from 'react';
import PropTypes from 'prop-types';

import SliderContext from './context';

const Item = ({ children }) => {
  return (
    <SliderContext.Consumer>
      {({ elementRef }) => {
        return (
          <div ref={elementRef} className="slide-item">
            {children}
          </div>
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

export default Item;
