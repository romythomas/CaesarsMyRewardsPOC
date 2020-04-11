import React from 'react';

const OfferItem = (props) => {
    // Box type design
    /*
    return (
        <div className="item">
		    <p>{props.offer}</p>
		</div>
    );
    */
   //List view design
   return (
        <div className="listItem">
            <p>{props.offer}</p>
        </div>
    );
}

export default OfferItem;