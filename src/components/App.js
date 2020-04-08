import agent from '../agent';
import Header from './Common/Header';
import Footer from './Common/Footer';
import SideNavigation from './Common/SideNavigation';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { store } from '../store';
import { push } from 'react-router-redux';
import MyRewards from './MyRewards';
import LeaderBoard from './Leaderboard';
import QuestForRewards from './QuestForRewards';
import MyOffers from './MyOffers';
import Reservation from './Reservations';
import Login from './Login';
import {
  LOGIN
} from '../constants/actionTypes';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLogin: () =>
    dispatch({ type: LOGIN, payload: agent.Auth.login() })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    this.props.onLogin();
  }

  render() {
      return (
        <div>
          <Header appName={this.props.appName} currentUser={this.props.currentUser} />
          <SideNavigation appName={this.props.appName}></SideNavigation>
            <Switch>
              <Route exact path="/myrewards" component={MyRewards}/>              
              <Route exact path="/my-offers" component={MyOffers}/>
              <Route exact path="/leaderboard" component={LeaderBoard}/>
              <Route exact path="/badges" component={QuestForRewards}/>
              <Route exact path="/reservations" component={Reservation}/>
              <Route exact path="/login" component={Login}/>
            </Switch>
          <Footer appName={this.props.appName}> </Footer>
        </div>
      );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
