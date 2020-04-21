import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = () => ({
 
});

class LeaderBoard extends Component {
  componentWillMount() {
    
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <div className="page">

        <h2>LeaderBoard Page</h2>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
