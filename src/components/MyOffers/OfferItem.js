import React from 'react';

function myOfferDetails() {
    alert('TODO!');
  }
const OfferItem = (props) => {
    const {offer} = props;
    // Box type design
    return (
        <div className="item">
            <p className="type">{offer.type}</p>
            <p className="title">{offer.title}</p>
            <p className="code">{offer.id}</p>
            <p className="start">{offer.start}</p>
            <p className="end">{offer.end}</p>
            <button className="myrewards-button" onClick={myOfferDetails}>Details</button>
		</div>
    );
}

export default OfferItem;