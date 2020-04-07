import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  LOGIN
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token,
  accountID: state.auth.accountID,
  firstName: state.auth.firstName,
  LastName: state.auth.lastName
});

const mapDispatchToProps = dispatch => ({
 onLogin: () =>
 dispatch({ type: LOGIN, payload: agent.Auth.login() })
});

class MyRewards extends React.Component {
  componentWillMount() {
    this.props.onLogin();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="page">

        <h2>Home Page</h2>
        <h4>Account ID: {this.props.accountID}</h4>
        <h4>User: {this.props.firstName} {this.props.LastName}</h4>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);
