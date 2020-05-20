import React from "react";
import { getProperty, getMoment, truncate } from "../../utilities/Helper";
import { getImageUrl, getCaesarsDomain } from "../../constants/configs";
import { Link } from "react-router-dom";

const OfferItem = (props) => {
    const { offerList, propertyList } = props;
    let offer = null;
    if (offerList && offerList.length) {
        offer = offerList.find((offer) => {
            return getMoment(offer.end).endOf("day").isSameOrAfter(getMoment());
        });
    }

    let imageUrl = getImageUrl();
    let propertyName = "";

    if (offer && offer.propertyList && offer.propertyList.length && propertyList && propertyList.length) {
        const { title, id } = offer;
        const offerProperty = offer.propertyList[0];
        var property = getProperty(propertyList, offerProperty);
        if (property) {
            imageUrl = `${getCaesarsDomain()}${property.thumbnail.url}/hd/m/cover`;
            propertyName = property.propertyName;
        }

        return (
            <div className="listing-wrap">
                <h3>My Offer</h3>
                <div className="listing__img">
                    <img className="thumb" src={imageUrl} alt="offer image" />
                    <div className="img-info my-rewards">
                        <h5>{propertyName}</h5>
                    </div>
                </div>
                <div className="listing__details">
                    <h2>{truncate(title, 63)}</h2>
                    <span className="rate">&nbsp;</span>
                </div>
                <div className="btn-wrap-double">
                    <Link className="button" id="viewoffer" to={`/offerdetails/${id}`}>
                        View Offer
                    </Link>
                    <Link className="button button-outline" id="viewall" to={`/myoffers`}>
                        View All
                    </Link>
                </div>
            </div>
        );
    }
};
export default OfferItem;
