import React from "react";
import { Link } from 'react-router-dom';

const OfferItem = (props) => {
    const { offer } = props;
    return (
        <li className="col-md-3 col-sm-6">
            <div className="listing-wrap">
                <div className="listing__img">
                    <img className="thumb" src="images/list-img.jpg" alt="Caesars"/>
                    <div className="fav">
                        <img src="images/favorate-icon.png" alt="Caesars"/>
                    </div>
                    <div className="img-info">
                        <h5>{offer.title}</h5>
                        <span className="offer-code">Offer Code : <strong>{offer.id}</strong></span>
                    </div>
                </div>
                <div className="listing__details">
                    <h2>{offer.type} - {offer.pref}</h2>
                    <span className="date">Valid : {new Date(offer.start).toLocaleDateString()} - {new Date(offer.end).toLocaleDateString()}</span>
                    <button className="button">Details</button>

                </div>
            </div>
        </li>
    );
};

export default OfferItem;
