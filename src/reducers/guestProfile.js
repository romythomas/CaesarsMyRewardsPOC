import {
    GET_PROFILE
  } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                guestProfile: action.error ? null : action.payload.profile,
              };
        default:
      return state;
  }
};