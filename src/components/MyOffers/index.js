import React, { Component } from 'react';
import OfferContainer from './OfferContainer';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = () => ({
 
});

class MyOffers extends Component {
  componentWillMount() {
    
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="page">
        <OfferContainer/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
