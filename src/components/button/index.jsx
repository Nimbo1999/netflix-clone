/* eslint-disable react/button-has-type */
import React from 'react';

import './style.scss';

const Button = ({ children, type, style, onClick, link }) => {
  if (link)
    return React.createElement(
      'button',
      { type, className: 'button-link', style, onClick },
      children
    );
  return React.createElement(
    'button',
    { type, className: 'button', style, onClick },
    children
  );
};

export default Button;
