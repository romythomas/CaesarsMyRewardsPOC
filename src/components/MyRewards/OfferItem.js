import React from "react";
import { getProperty, truncate } from "../../utilities/Helper";
import { getImageUrl, getCaesarsDomain } from "../../constants/configs";
import { Link } from "react-router-dom";

const OfferItem = (props) => {
    const { offerList, propertyList } = props;
    const offer = offerList && offerList.length ? offerList[0] : null;

    let imageUrl = getImageUrl();
    let propertyName = "";

    if (offer && offer.propertyList && offer.propertyList.length && propertyList && propertyList.length) {
        const { title, description, id } = offer;
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
                    <div className="img-info">
                        <h5>{title}</h5>
                        <span className="place">{propertyName}</span>
                    </div>
                </div>
                <div className="listing__details">
                    <h2>{truncate(description, 63)}</h2>
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
