import React, { Component } from 'react';
import agent from '../../agent';
import OfferContainer from './OfferContainer';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token,
  accountID: state.auth.accountID,
  offers: state.common.offers,
  markets: state.common.markets
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
  render() {
    const {offers, markets} = this.props;
    if(markets && markets.length && offers && offers.length) {
      const groupedOffers = getGroupedOffers(offers, markets);
      if(groupedOffers && groupedOffers.length) {
        return (
          <OfferContainer offerList={groupedOffers} />
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

export default connect(mapStateToProps)(MyOffers);
