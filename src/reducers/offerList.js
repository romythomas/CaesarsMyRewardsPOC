import {
  GET_OFFER_DATA
  } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_OFFER_DATA:
            return {
                ...state,
                offers: action.error ? [] : action.payload[0].offers,
                markets: action.error ? [] : action.payload[1].GetMarketsResult
              };
        default:
      return state;
  }
};