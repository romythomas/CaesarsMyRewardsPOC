import {
  LOGIN
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Caesars MyRewards',
  accountID: null,
  token: null,
  offers: [],
  markets: [],
  properties: [],
  reservations: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accountID: action.error ? null : action.payload[0].logininfo.accountid,
        firstName: action.error ? null : action.payload[0].logininfo.firstname,
        lastName: action.error ? null : action.payload[0].logininfo.lastname,
        token: action.error ? null : action.payload[0].logininfo.token,
        offers: action.error ? [] : action.payload[1].offers,
        markets: action.error ? [] : action.payload[2].GetMarketsResult,
        properties: action.error? [] : action.payload[3],
        reservations: action.error? []: action.payload[4]
      };
    default:
      return state;
  }
};
