import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Button = ({ children, type, style }) => {
  // eslint-disable-next-line react/button-has-type
  return React.createElement(
    'button',
    { type, className: 'button', style },
    children
  );
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  style: PropTypes.objectOf({}),
};

Button.defaultProps = {
  type: 'button',
  style: {},
};

export default Button;
