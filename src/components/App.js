import agent from '../agent';
import Header from './common/Header';
import Footer from './common/Footer';
import SideNavigation from './common/SideNavigation';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { store } from '../store';
import { push } from 'react-router-redux';
import MyRewards from './myrewards';
import LeaderBoard from './leaderboard';
import QuestForRewards from './questforrewards';
import MyOffers from './myoffers';
import Reservation from './reservations';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  
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
