import React from 'react';
import OfferList from './OfferList'

const offerListArray = [[1,2,3],[4,5,6]];

const OfferContainer = () => {  
    return (
      <div className="container">
          <h2>My Offers</h2>
          {
              offerListArray.map(
                  (value, index)=> {return <OfferList key={index} propertyCount={index + 1} listValue={value}/>}
              )
          }
      </div>
    );
}

export default OfferContainer;