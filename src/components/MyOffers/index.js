import React, { Component } from 'react';
import agent from '../../agent';
import OfferContainer from './OfferContainer';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  filteredOffers: state.common.filteredOffers
});

class MyOffers extends Component {
  render() {
    const {filteredOffers} = this.props;
    if(filteredOffers && filteredOffers.length) {
      return (
        <OfferContainer offerList={filteredOffers} />
      );
    } else {
      return (
        <div className="offerPage">
          <h1>Loading...</h1>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(MyOffers);
