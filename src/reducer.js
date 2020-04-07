import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import settings from './reducers/settings';
import guestProfile from './reducers/guestProfile';
import offerList from './reducers/offerList';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  settings,
  guestProfile,
  offerList,
  router: routerReducer
});
