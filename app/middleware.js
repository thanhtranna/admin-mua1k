import agent from './agent';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  LOGIN_FULFILLED
} from './constants/actionTypes';

const localStorageMiddleware = store => next => action => {
  if (
    action.type === REGISTER ||
    action.type === LOGIN ||
    action.type === LOGIN_FULFILLED
  ) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.data);
      agent.setToken(action.payload.data);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.removeItem('jwt');
    agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware };
