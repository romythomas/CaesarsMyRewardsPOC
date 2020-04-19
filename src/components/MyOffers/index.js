import React, { Component } from 'react';
import agent from '../../agent';
import OfferContainer from './OfferContainer';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  filteredOffers: state.common.filteredOffers,
  markets: state.common.markets
});

class MyOffers extends Component {
  render() {
    const {filteredOffers, markets} = this.props;
    return (
      <OfferContainer offerList={filteredOffers} markets={markets} />
    );
  }
}

export default connect(mapStateToProps)(MyOffers);
