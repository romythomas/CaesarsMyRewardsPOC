import React from "react";
import { getProperty, getMoment, getIsoMoment } from "../../utilities/Helper";
import { getImageUrl } from "../../constants/configs";

/**
 *
 * @param {*} props
 */
const ReservationItem = (props) => {
    const { propertyList, reservationList } = props;
    let reservation = reservationList.reservations[0];
    if (reservation) {
        let imageUrl = getImageUrl();
        let propertyName = "";

        const { propertyCode, checkInDate, checkOutDate } = reservation;
        if (propertyList && propertyCode) {
            const property = getProperty(propertyList, propertyCode);
            if (property) {
                imageUrl = `http://caesars.com${property.thumbnail.url}/hd/m/cover`;
                propertyName = property.propertyName.toUpperCase();
            }
        }

        return (
            <div className="listing-wrap">
                <h3>My Reservations</h3>
                <div className="listing__img">
                    <img className="thumb" src={imageUrl} alt="Caesars" />
                    <div className="img-info">
                        <h5>{propertyName}</h5>
                    </div>
                </div>
                <div className="listing__details">
                    <h2>
                        Check-in:{" "}
                        {checkInDate
                            ? getMoment(new Date(checkInDate.toString()), getIsoMoment()).format("MM/DD/YYYY")
                            : "No Date"}
                    </h2>
                    <h2>
                        Check-out:{" "}
                        {checkOutDate ? getMoment(new Date(checkOutDate.toString()), getIsoMoment()).format("MM/DD/YYYY") : ""}
                    </h2>
                    <span className="rate">&nbsp;</span>
                </div>
                <div className="btn-wrap-double">
                    <button className="button">View All</button>
                </div>
            </div>
        );
    }
    return null;
};

export default ReservationItem;
