import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = () => ({
 
});

class QuestForRewards extends React.Component {
  componentWillMount() {
    
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="page">

        <h2>Quest For Rewards Page</h2>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestForRewards);
