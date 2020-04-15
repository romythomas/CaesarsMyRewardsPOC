import React from 'react';
import OfferList from './OfferList'

const OfferContainer = (props) => {
    const {offerList} = props;
    return(
        <div className="offerPage">
            <OfferList offerList={offerList}/>
        </div>
    )
}

export default OfferContainer;