import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import {getApiRootUrl} from './constants/configs';

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
  del: (url) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Auth = {
  login: () =>
    requests.get('accountinfobyToken.json?callback=foo'),
};

const Offers = {
  getOfferList: (winnetid) =>
    requests.get(
      `getofferlist.json?winnetid=${encode(winnetid)}&callback=foo`
    ),
};

const Properties = {
  getProperties: () => requests.get("properties.json?callback=foo"),
};

const Reservations = {
  getReservation: () => requests.get("getreservation.json?callback=foo"),
};
const Enterprise = {
  getLowestRate: () =>
    requests.get("lowest_rate_enterprise.json?callback=foo"),
};

const PriceAlert = {
  getPriceAlert: () => requests.get("getprice.json?callback=foo"),
};

const Markets = {
  getMarkets: () => requests.get(`getmarkets.json?callback=foo`),
};

const Profile = {
  getGuestProfile:(winnetid) =>
    requests.get(`getguestprofile.json?winnetid=${encode(winnetid)}&callback=foo`),
  getFeeds:() =>
    requests.get(`crwtiersprogress.json?callback=foo`)
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
  },
};
