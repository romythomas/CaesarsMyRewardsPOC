import React, { Component } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
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
 onGetGuestProfile: (accountID) =>
    dispatch({ type: GET_PROFILE, payload: agent.Profile.getGuestProfile(accountID) })
});

class MyRewards extends Component {
  componentWillMount() {
    this.props.onGetGuestProfile(this.props.accountID);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const {accountID,firstName,LastName,TierCode} = this.props;
    return (
      <div className="page">

        <h2>Home Page</h2>
        <h4>Account ID: {accountID}</h4>
        <h4>User: {firstName} {LastName}</h4>
        <h4>Tier: {TierCode}</h4>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);
