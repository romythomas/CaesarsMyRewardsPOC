import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {getProperty, getFavouriteImage} from '../../utilities/Helper';

const mapStateToProps = (state) => ({
    properties: state.common.properties
});

const OfferItem = (props) => {

    const { offer, properties } = props;
    let offerImageUrl = "images/list-img.jpg";
    const propertyDetails = getProperty(properties, offer.propertyList[0]);
    if(propertyDetails && propertyDetails.thumbnail && propertyDetails.thumbnail.url) {
        offerImageUrl ="http://caesars.com" + propertyDetails.thumbnail.url + "/hd/m/cover";
    }
    
    return (
        <li className="col-md-3 col-sm-6">
            <div className="listing-wrap">
                <div className="listing__img">
                    <img className="thumb" src={offerImageUrl} alt="Caesars Offer Image"/>
                    <div className="fav">
                        <img src={getFavouriteImage(offer.pref)} alt="Caesars Favourite Logo"/>
                    </div>
                    <div className="img-info">
                        <h5>{offer.title}</h5>
                        <span className="offer-code">Offer Code : <strong>{offer.id}</strong></span>
                    </div>
                </div>
                <div className="listing__details">
                    <h2>{offer.type} - {offer.pref}</h2>
                    <span className="date">Valid : {new Date(offer.start).toLocaleDateString()} - {new Date(offer.end).toLocaleDateString()}</span>
                    <Link
                        className="button"
                        to={`/offerdetails/${offer.id}`}>
                        Details
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default connect(mapStateToProps, null)(OfferItem);