import React from 'react';
import OfferItem from './OfferItem'

const OfferList = (props) => {
    return (
      <div className="list">
          <h2>{props.propertyName}</h2>
          {
              props.offerList.map(
                  (offer, index)=> {return <OfferItem key={index} offer={offer.id}/>}
              )
          }
      </div>
    );
}

export default OfferList;