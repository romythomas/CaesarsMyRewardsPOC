import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import { getApiRootUrl } from "./constants/configs";

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = getApiRootUrl();
const encode = encodeURIComponent;
const responseBody = (res) => res.body;

let token = null;
const tokenPlugin = (req) => {
    if (token) {
        req.set("authorization", `Token ${token}`);
    }
};

const requests = {
    del: (url) => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: (url) => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
    login: () => requests.get("accountinfobyToken.json")
};

const Offers = {
    getOfferList: () => requests.get(`getofferlist.json`)
};

const Properties = {
    getProperties: () => requests.get("properties.json")
};

const Reservations = {
    getReservation: () => requests.get("getreservation.json")
};
const Enterprise = {
    getLowestRate: () => requests.get("lowest_rate_enterprise.json")
};

const PriceAlert = {
    getPriceAlert: () => requests.get("getprice.json")
};

const Markets = {
    getMarkets: () => requests.get(`getmarkets.json`)
};

const Profile = {
    getGuestProfile: () => requests.get(`getguestprofile.json`),
    getFeeds: () => requests.get(`crwtiersprogress.json`)
};

export default {
    Auth,
    Profile,
    Offers,
    Markets,
    Properties,
    Reservations,
    Enterprise,
    PriceAlert,
    setToken: (_token) => {
        token = _token;
    }
};
