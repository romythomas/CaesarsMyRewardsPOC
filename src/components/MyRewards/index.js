import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
 
});

class MyRewards extends React.Component {
  componentWillMount() {
    
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="myrewards-page">

        <h1>Home Page</h1>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);
