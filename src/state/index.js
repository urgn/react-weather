/* eslint-disable import/prefer-default-export */
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';

import layoutReducer from './layout/reducer';
import locationsReducer from './locations/reducer';
import { apiReducer } from './api/reducer';
import { initSagas } from './api/sagas';

import addTestLocations from './addTestLocations';

const rootReducer = combineReducers({
  layout: layoutReducer,
  apiData: apiReducer,
  location: locationsReducer
});

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, ReduxThunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(middleware));

sagaMiddleware.run(initSagas);

if (process.env.REACT_APP_USE_TEST_DATA) {
  addTestLocations(store);
}
