import { LOGIN } from "../constants/actionTypes";

const defaultState = {
    accountID: null,
    token: null,
    loginInfo: [],
    offers: [],
    markets: [],
    properties: [],
    reservations: [],
    enterpriseFeed: [],
    priceAlert: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                accountID: action.error ? null : action.payload[0].logininfo.accountid,
                token: action.error ? null : action.payload[0].logininfo.token,
                loginInfo: action.error ? null : action.payload[0].logininfo,
                offers: action.error ? [] : action.payload[1].offers,
                markets: action.error ? [] : action.payload[2].GetMarketsResult,
                properties: action.error ? [] : action.payload[3],
                reservations: action.error ? [] : action.payload[4],
                enterpriseFeed: action.error ? [] : action.payload[5],
                priceAlert: action.error ? [] : action.payload[6]
            };
        default:
            return state;
    }
};
