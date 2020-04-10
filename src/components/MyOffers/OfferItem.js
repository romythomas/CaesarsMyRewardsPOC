import React from 'react';

const OfferItem = (props) => { 
    return (
        <div className="item">
		    <p>{props.offer}</p>
		</div>
    );
}

export default OfferItem;