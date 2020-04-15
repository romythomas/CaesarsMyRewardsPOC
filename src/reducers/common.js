import {
  LOGIN
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Caesars MyRewards',
  token: null,
  viewChangeCounter: 0,
  offers: null,
  markets: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.error ? null : action.payload[0].logininfo.token,
        offers: action.error ? [] : action.payload[1].offers,
        markets: action.error ? [] : action.payload[2].GetMarketsResult
      };
    default:
      return state;
  }
};
