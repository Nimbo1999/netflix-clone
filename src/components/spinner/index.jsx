import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const Spinner = () => {
  return (
    <FontAwesomeIcon icon={faCircleNotch} className="spinner" spin size="6x" />
  );
};

export default Spinner;
