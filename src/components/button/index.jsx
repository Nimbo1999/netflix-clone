/* eslint-disable react/button-has-type */
import React from 'react';

import './style.scss';

const Button = ({ children, type, style, onClick, link, active }) => {
  if (link)
    return React.createElement(
      'button',
      {
        type,
        className: `button-link${active ? ' active' : ''}`,
        style,
        onClick,
      },
      children
    );
  return React.createElement(
    'button',
    { type, className: 'button', style, onClick },
    children
  );
};

export default Button;
