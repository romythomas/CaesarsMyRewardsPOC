import {
  LOGIN
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Caesars MyRewards',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.error ? null : action.payload.logininfo.token,
      };
    default:
      return state;
  }
};
