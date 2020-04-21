import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://caesarspoc.s3-website.us-east-2.amazonaws.com/';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  login: () =>
    requests.get('stubs/accountinfobyToken.json?callback=foo'),
};

const Offers = {
  getOfferList:(winnetid) =>
  requests.get(`stubs/getofferlist.json?winnetid=${encode(winnetid)}&callback=foo`) 
};

const Properties = {
  getProperties:()=>
  requests.get('stubs/properties.json?callback=foo')
};

const Reservations = {
  getReservation:()=>
  requests.get('stubs/getreservation.json?callback=foo')
};

const Markets = {
  getMarkets:() =>
  requests.get(`stubs/getmarkets.json?callback=foo`)
};

const Profile = {
  getGuestProfile:(winnetid) =>
    requests.get(`stubs/getguestprofile.json?winnetid=${encode(winnetid)}&callback=foo`),
  getFeeds:() =>
    requests.get(`stubs/crwtiersprogress.json?callback=foo`)
};

export default {
  Auth,
  Profile,
  Offers,
  Markets,
  Properties,
  Reservations,
  setToken: _token => { token = _token; }
};
