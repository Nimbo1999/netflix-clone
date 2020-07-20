import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

import 'regenerator-runtime/runtime';

import './style.scss';

const wrapper = document.getElementById('root');

// eslint-disable-next-line no-unused-expressions
wrapper
  ? ReactDom.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      wrapper
    )
  : false;
