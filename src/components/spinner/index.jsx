import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const Spinner = ({ elementRef }) => {
  if (elementRef === undefined)
    return (
      <FontAwesomeIcon
        icon={faCircleNotch}
        className="spinner"
        spin
        size="6x"
      />
    );
  return (
    <div ref={elementRef}>
      <FontAwesomeIcon
        icon={faCircleNotch}
        className="spinner"
        spin
        size="6x"
      />
    </div>
  );
};

export default Spinner;
