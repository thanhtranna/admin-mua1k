import { localStorageMiddleware } from './middleware';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers';

const middleware = () => {
  if (process.env.NODE_ENV === 'staging') {
    return applyMiddleware(thunk, promise(), localStorageMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(thunk, promise(), localStorageMiddleware);
  }
};

export default createStore(rootReducer, {}, middleware());
