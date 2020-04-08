import React from 'react';
import OfferItem from './OfferItem'

const offerItemArray = ["1", "2", "3"];

const OfferList = (props) => {  
    console.log(props.listValue);
    return (
      <div className="list">
          {
              offerItemArray.map(
                  (value, index)=> {return <OfferItem key={index} listValue={value}/>}
              )
          }
      </div>
    );
}

export default OfferList;