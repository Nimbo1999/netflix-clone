import React from 'react';

import './style.scss';

const Button = ({ children, type, style }) => {
  // eslint-disable-next-line react/button-has-type
  return React.createElement(
    'button',
    { type, className: 'button', style },
    children
  );
};

export default Button;
