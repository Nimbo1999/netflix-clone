import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';
import RootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const Middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') Middlewares.push(logger);

const store = createStore(RootReducer, applyMiddleware(...Middlewares));

sagaMiddleware.run(rootSaga);

export default store;
