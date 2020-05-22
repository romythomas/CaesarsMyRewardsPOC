import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProperty, getFavouriteClassName, truncate, getMoment } from "../../utilities/Helper";

const mapStateToProps = (state) => ({
    properties: state.common.properties
});

const OfferItem = (props) => {
    const { index, offer, properties, defaultProperty } = props;
    let offerImageUrl = "images/list-img.jpg";
    const propertyDetails = getProperty(properties, offer.propertyList[0]);
    if (propertyDetails && propertyDetails.thumbnail && propertyDetails.thumbnail.url) {
        offerImageUrl = `http://caesars.com${propertyDetails.thumbnail.url}/hd/m/cover`;
    }
    const { id, pref, title, type, start, end } = offer;
    let offerDetailsURL = `/offerdetails/${id}`;
    if (defaultProperty) {
        offerDetailsURL += `?propCode=${defaultProperty}`;
    }
    return (
        <li id={`offer__item__${index}`} className="col-md-3 col-sm-6">
            <div className="listing-wrap">
                <div className="listing__detailswrap">
                    <div className="listing__img">
                        <img className="thumb" src={offerImageUrl} alt="Caesars Offer Image" />
                        <div className={`fav ${getFavouriteClassName(pref)}`}></div>
                        <div className="img-info">
                            <h5>{truncate(title, 30)}</h5>
                            <span className="offer-code">
                                Offer Code : <strong>{id}</strong>
                            </span>
                        </div>
                    </div>
                    <div className="listing__details">
                        <h2>{type}</h2>
                        <span className="date">
                            Valid From : {getMoment(start).format("MM/DD/YYYY")}
                            <br />
                            Valid To : {getMoment(end).format("MM/DD/YYYY")}
                        </span>
                    </div>
                </div>
                <div className="btn-wrap">
                    <Link id={`offer__item__button__${index}`} className="button" to={offerDetailsURL}>
                        Details
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default connect(mapStateToProps, null)(OfferItem);
