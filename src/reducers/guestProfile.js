import {
    GET_PROFILE
  } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                tiercode: action.error ? null : action.payload.logininfo.tier.code,
              };
        default:
      return state;
  }
};