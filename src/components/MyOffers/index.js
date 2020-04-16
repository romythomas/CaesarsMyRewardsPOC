import React, { Component } from 'react';
import agent from '../../agent';
import OfferContainer from './OfferContainer';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  filteredOffers: state.common.offers,
  markets: state.common.markets,
  properties: state.common.properties
});

class MyOffers extends Component {
  render() {
    const {filteredOffers, markets, properties} = this.props;
    if(markets && markets.length && filteredOffers && filteredOffers.length) {
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
