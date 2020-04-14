import {
    GET_PROFILE
  } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE:
          console.log("getguest profile")
          console.log(action.payload.logininfo)

            return {
                ...state,              
                logininfo: action.error ? [] : action.payload.logininfo,
                markets: action.error ? [] : action.payload[1].GetMarketsResult
              };
        default:
      return state;
  }
};