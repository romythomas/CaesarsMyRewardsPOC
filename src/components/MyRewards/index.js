import React, { Component } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import ProfileContainer from './ProfileContainer';
import {
  GET_PROFILE
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token,
  logininfo: state.guestProfile.logininfo,
  feeds: state.guestProfile.feeds,
  offers: state.common.offers,
  markets: state.common.markets,
  properties: state.common.properties,
  reservations: state.common.reservations,
  enterpriseFeed: state.common.enterpriseFeed,
  priceAlert: state.common.priceAlert
});

const mapDispatchToProps = dispatch => ({
    onGetGuestProfile: payload =>
    dispatch({ type: GET_PROFILE, payload })
});

class MyRewards extends Component {

  componentDidMount() {
    this.props.onGetGuestProfile(Promise.all([
      agent.Profile.getGuestProfile(this.props.accountID),
      agent.Profile.getFeeds()
    ]));
  }


  render() {
    const {logininfo,feeds,offers, properties, reservations, priceAlert, enterpriseFeed} = this.props;
    if(logininfo && feeds && properties){
      return (
        <div className="container-fluid">
          <div className="title">
            <h1>My Rewards</h1>
          </div>                
            <ProfileContainer />
        </div>
      );
    }
    else{
      return(
        <div className="container-fluid">
          <div className="title">
            <h1>Loading</h1>
          </div>  
        </div> 
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);
