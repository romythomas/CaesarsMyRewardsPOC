import React from 'react';
import OfferItem from './OfferItem'

const OfferList = (props) => {
    return (
      <div className="list">
          {
              props.listValue.map(
                  (value, index)=> {return <OfferItem key={index} itemValue={value}/>}
              )
          }
      </div>
    );
}

export default OfferList;