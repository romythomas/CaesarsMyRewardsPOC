import {
  LOGIN,
  FILTER_SORT_OFFER
} from '../constants/actionTypes';

const defaultState = {
  offers: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        offers: action.error ? [] : action.payload[1].offers,
      };
    case FILTER_SORT_OFFER:
      return {
        ...state,
        offers: action.filteredSortedOffers
      };
    default:
      return state;
  }
};
