import { combineReducers } from 'redux';
import common from './common';
import guestProfile from './guestProfile';
import offers from './offers';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  common,
  guestProfile,
  offers,
  router: routerReducer
});
