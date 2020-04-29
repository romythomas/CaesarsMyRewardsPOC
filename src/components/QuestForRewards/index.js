import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = () => ({
 
});

class QuestForRewards extends Component {

  render() {
    return (
      <div className="page">

        <h2>Quest For Rewards Page</h2>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestForRewards);
