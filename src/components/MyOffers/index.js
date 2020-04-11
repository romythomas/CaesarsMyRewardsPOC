import React, { Component } from 'react';
import agent from '../../agent';
import OfferContainer from './OfferContainer';
import { connect } from 'react-redux';
import {
  GET_OFFER_DATA
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token,
  accountID: state.auth.accountID,
  offers: state.offerList.offers,
  markets: state.offerList.markets
});

const mapDispatchToProps = dispatch => ({
  getMyOffersData: payload =>
  dispatch({ type: GET_OFFER_DATA, payload })
});

const getOffersOfAProperty = (Offers, propCode)=>{
  return Offers.filter( (offer) => { 
    return offer.propertyList.includes(propCode);
  });
}

class MyOffers extends Component {
  componentWillMount() {
    this.props.getMyOffersData(Promise.all([
      agent.Offers.getOfferList(this.props.accountID),
      agent.Markets.getMarkets()
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if(this.props.offers && this.props.offers.length > 0) {

      const propCode = "CLV";
      const clvOffers = getOffersOfAProperty(this.props.offers, propCode);

      return (
        <div className="offerPage">
          <OfferContainer offerList={clvOffers} propCode = {propCode} />
        </div>
      );
    } else {
      return (
        <div className="offerPage">
          <h2>No Offers Available</h2>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
