import React from 'react';

const OfferItem = (props) => { 
    return (
        <div className="item">
		    <p>Offer {props.itemValue}</p>
		</div>
    );
}

export default OfferItem;