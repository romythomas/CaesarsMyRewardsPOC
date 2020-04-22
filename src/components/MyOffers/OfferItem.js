import React from "react";
import { Link } from 'react-router-dom';

const OfferItem = (props) => {
    const { offer } = props;
    return (
        <div className="item">
            <p className="type">{offer.type}</p>
            <p className="title">{offer.title}</p>
            <p className="code">{offer.id}</p>
            <p className="validity">{new Date(offer.start).toLocaleDateString()} - {new Date(offer.end).toLocaleDateString()}</p>
            <p className="code">Preference : {offer.pref}</p>
            <Link
                to={`/my-offer-details/${offer.id}`}
                className="myrewards-button">
                Details
            </Link>
        </div>
    );
};

export default OfferItem;
