import { combineReducers } from 'redux';
import common from './reducers/common';
import settings from './reducers/settings';
import guestProfile from './reducers/guestProfile';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  common,
  settings,
  guestProfile,
  router: routerReducer
});
