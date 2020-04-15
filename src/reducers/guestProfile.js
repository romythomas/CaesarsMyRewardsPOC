import {
    GET_PROFILE
  } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE:         
            return {
                ...state,              
                logininfo: action.error ? [] : action.payload[0].logininfo,
                feeds: action.error ? [] : action.payload[1]
              };
        default:
      return state;
  }
};