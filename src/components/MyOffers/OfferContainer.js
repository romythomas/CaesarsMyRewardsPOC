import React from 'react';
import OfferList from './OfferList'

const offerListArray = [[1,2,3],[4,5,6]];

const OfferContainer = () => {  
    return (
      <div className="container">
          {
              offerListArray.map(
                  (value, index)=> {return <OfferList key={index} listValue={value}/>}
              )
          }
      </div>
    );
}

export default OfferContainer;