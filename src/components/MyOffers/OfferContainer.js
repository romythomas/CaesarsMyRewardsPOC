import React from 'react';
import OfferList from './OfferList'

const OfferContainer = (props) => {
    const {offerList} = props;
    const offerListElement = [];
    offerList.map((offer) => {
        offerListElement.push(<OfferList key={offer.property.Code} propertyName={offer.property.Name} offerList={offer.propOffers}/>);
    });
    return (<div>{offerListElement}</div> )
}

export default OfferContainer;