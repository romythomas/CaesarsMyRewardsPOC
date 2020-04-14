import React, { Component } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
// import TierContainer from './TierContainer';
import {
  GET_PROFILE
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token,
  accountID: state.auth.accountID,
  firstName: state.auth.firstName,
  LastName: state.auth.lastName,
  TierCode: state.guestProfile.tiercode
});

const mapDispatchToProps = dispatch => ({
    onGetGuestProfile: payload =>
    dispatch({ type: GET_PROFILE, payload })
});

class MyRewards extends Component {
  componentWillMount() {
    this.props.onGetGuestProfile(Promise.all([
      agent.Profile.getGuestProfile(this.props.accountID),
      agent.Profile.getFeeds()
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const {accountID,firstName,LastName,TierCode} = this.props;
    return (
      <div className="page">
        {/* <h2>Home Page</h2>
        <h4>Account ID: {accountID}</h4>
        <h4>User: {firstName} {LastName}</h4>
        <h4>Tier: {TierCode}</h4> */}
        <ProfileContainer/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);
