import React from 'react';
import OfferList from './OfferList'



const OfferContainer = (props) => {  
    return (
        <OfferList propCode={props.propCode} offerList={props.offerList}/>
    );
}

export default OfferContainer;