import agent from '../agent';
import Header from './Common/Header';
import Footer from './Common/Footer';
import SpotLight from './Common/SpotLight';
import SideNavigation from './Common/SideNavigation';
import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
/*import MyRewards from './MyRewards';
import LeaderBoard from './Leaderboard';
import QuestForRewards from './QuestForRewards';
import MyOffers from './MyOffers';
import Reservation from './Reservations';
import OfferDetails from './MyOffers/OfferDetails'*/
import {hideWarning} from '../utilities/Helper'
import { history} from '../store';
import {
  LOGIN
} from '../constants/actionTypes';
import  {config}  from  "../init-fcm"
import * as firebase from "firebase/app";
import "firebase/messaging";

const MyRewards = lazy(() => import(/* webpackChunkName: "MyRewards" */ './MyRewards'));
const MyOffers = lazy(() => import(/* webpackChunkName: "MyOffers" */ './MyOffers'));
const LeaderBoard = lazy(() => import(/* webpackChunkName: "LeaderBoard" */ './Leaderboard'));
const QuestForRewards = lazy(() => import(/* webpackChunkName: "QuestForRewards" */ './QuestForRewards'));
const Reservation = lazy(() => import(/* webpackChunkName: "Reservation" */ './Reservations'));
const OfferDetails = lazy(() => import(/* webpackChunkName: "OfferDetails" */ './MyOffers/OfferDetails'));

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    offers: state.common.offers,
    markets: state.common.markets,
    properties: state.common.properties,
    reservations: state.common.reservations,
    priceAlert: state.common.priceAlert,
    enterpriseFeed: state.common.enterpriseFeed
  }};

const mapDispatchToProps = dispatch => ({
  onLogin: payload =>
    dispatch({ type: LOGIN, payload })
});

hideWarning();

const loadScript = () => {
  $(document).ready(function () {
    if($('#sub-content').length){
       $('html, body').animate({ scrollTop: $('#sub-content').offset().top - 80}, 1);
    }
  });
  
}


class App extends Component {

  constructor() {
    super();

    const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
    if (path) {
        history.replace(path);
    }
  }

  componentWillMount(){
    //load common data - login, offerlist and getmarkets
    this.props.onLogin(Promise.all([
      agent.Auth.login(),
      agent.Offers.getOfferList(this.props.accountID),
      agent.Markets.getMarkets(),
      agent.Properties.getProperties(),
      agent.Reservations.getReservation(),
      agent.PriceAlert.getPriceAlert(),
      agent.Enterprise.getLowestRate()
    ]));
  }

  async componentDidMount() {
    console.log("User Notification Permission ", Notification.permission);
    const initializedFirebaseApp = firebase.initializeApp(config);
    const messaging = initializedFirebaseApp.messaging();
    
      messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then(token => {
        console.log("Token is ", token);
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      }); 
  
  }

  render() {
    loadScript();
    const {offers, markets, properties, reservations, enterpriseFeed, priceAlert} = this.props;
    if(markets && markets.length && offers && offers.length && properties && reservations && priceAlert && enterpriseFeed) {
      return (
        <div>
          <Header appName={this.props.appName} currentUser={this.props.currentUser} />
          <SideNavigation appName={this.props.appName}></SideNavigation>
          <div id="page-content">
            <SpotLight appName={this.props.appName}></SpotLight>
            <div id="sub-content">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Redirect exact from="/" to="myrewards" />
                <Route exact path="/myrewards" component={MyRewards}/>              
                <Route exact path="/myoffers" component={MyOffers}/>
                <Route exact path="/leaderboard" component={LeaderBoard}/>
                <Route exact path="/badges" component={QuestForRewards}/>
                <Route exact path="/reservations" component={Reservation}/>
                <Route exact path="/offerdetails/:id" component={OfferDetails}/>
              </Switch>
              </Suspense>
            </div>
          </div>
          <Footer appName={this.props.appName}> </Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Header appName={this.props.appName} currentUser={this.props.currentUser} />
          <h2>Page Loading</h2>
          <Footer appName={this.props.appName}> </Footer>
        </div>
      );
    }
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
