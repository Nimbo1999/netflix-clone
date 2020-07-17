import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

import './style.scss';

const wrapper = document.getElementById('root');

// eslint-disable-next-line no-unused-expressions
wrapper ? ReactDom.render(<App />, wrapper) : false;
