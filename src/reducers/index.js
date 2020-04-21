import { combineReducers } from 'redux';
import common from './common';
import settings from './settings';
import guestProfile from './guestProfile';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  common,
  settings,
  guestProfile,
  router: routerReducer
});
