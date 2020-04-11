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

const getPropertyOffers = (Offers, propCode) => {
  return Offers.filter(offer => { 
      return offer.propertyList.includes(propCode);
  });
}

const getGroupedOffers = (offers, markets) => {
  let offerGroup = [];
  markets.map(market => {
      market.Properties.map(property => {
          let propertyOffer = getPropertyOffers(offers, property.Code);
          if(propertyOffer && propertyOffer.length > 0) {
              offerGroup.push(
                  {
                      property: property,
                      propOffers: propertyOffer
                  }
              )
          }
      });
  });
  return offerGroup;
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
    const {offers, markets} = this.props;
    if(markets && markets.length && offers && offers.length) {
      const groupedOffers = getGroupedOffers(offers, markets);
      if(groupedOffers && groupedOffers.length) {
        return (
          <div className="offerPage">
            <OfferContainer offerList={groupedOffers} />
          </div>
        );
      } else {
        return (
          <div className="offerPage">
            <h2>No Offers Available</h2>
          </div>
        )
      }
    } else {
      return (
        <div className="offerPage">
          <h1>Loading...</h1>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
