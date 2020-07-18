import React, { lazy, Suspense } from 'react';
import ReactDom from 'react-dom';

import Spinner from './components/spinner';

import './style.scss';

const App = lazy(() => import('./App'));

const wrapper = document.getElementById('root');

// eslint-disable-next-line no-unused-expressions
wrapper
  ? ReactDom.render(
      <Suspense
        fallback={
          <div className="main-spinner-container">
            <Spinner />
          </div>
        }
      >
        <App />
      </Suspense>,
      wrapper
    )
  : false;
