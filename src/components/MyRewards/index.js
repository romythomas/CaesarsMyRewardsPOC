import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { LOGIN } from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser,
  firstName: state.common.firstName,
  lastName: state.common.lastName
});

const mapDispatchToProps = dispatch => ({
  onSubmit: () =>
    dispatch({ type: LOGIN, payload: agent.Auth.login() }),
});

class MyRewards extends React.Component {
  componentWillMount() {
    this.props.onSubmit();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="myrewards-page">

        <h2>Home Page</h2>
        <h4>Account ID: {this.props.currentUser}</h4>
        <h4>Name: {this.props.firstName} {this.props.lastName}</h4>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);
