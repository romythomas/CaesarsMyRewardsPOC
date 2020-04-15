import React, { Component } from 'react';
import agent from '../../agent';
import OfferContainer from './OfferContainer';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  offers: state.common.offers,
  markets: state.common.markets
});

class MyOffers extends Component {
  render() {
    const {offers, markets} = this.props;
    if(markets && markets.length && offers && offers.length) {
      return (
        <OfferContainer offerList={offers} />
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
