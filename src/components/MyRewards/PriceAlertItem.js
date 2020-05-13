import React from 'react';
import {buildEnterpriseResponse, getProperty} from '../../utilities/Helper'
import {getImageUrl} from '../../constants/configs'

/**
 *
 * @param {*} props
 */
const PriceAlertItem = (props) => {
    const {propertyList, enterpriseList, priceList} = props;

    let rooms = [];
    let priceAlert = null;
    let lowestRate = null;
    let imageUrl = getImageUrl();
    let propertyName = '';

    var enterprise = buildEnterpriseResponse(priceList.harrahs.roomtypes);
    enterpriseList.priceAlerts.map((li) => {
        priceAlert = li;
        lowestRate = enterprise.find(t => t.propertyCode.toUpperCase() === priceAlert.propcode.toUpperCase());
        if(lowestRate){
            let property = getProperty(propertyList, lowestRate.propertyCode);
            if(property){
                imageUrl =`http://caesars.com${property.thumbnail.url}/hd/m/cover`;
                propertyName = property.propertyName.toUpperCase();
            }
            if (lowestRate.rate < parseInt(priceAlert.threshold, 10)) {
                rooms.push({
                    propertyCode: lowestRate.propertyCode,
                    rateSet: lowestRate.rateSet,
                    rate: lowestRate.rate,
                    propertyName: propertyName,
                    roomImageUrl: imageUrl
                })
            }
        }
    })

    return (
        <div className="listing-wrap">
            <h3>My Price Alert</h3>
            <div className="listing__img">
                <img className="thumb" src={rooms[0].roomImageUrl} alt="price alert image"/>
                <div className="img-info">
                    <h5>{rooms[0].propertyName}</h5>
                    <span className="place">&nbsp;</span>
                </div>
            </div>
            <div className="listing__details">
                <h2>Based on availability</h2>
                Stay for as little as
                <span className="rate">${rooms[0].rate}</span>

            </div>
            <div className="btn-wrap-double">
                <button className="button">View</button>
                <button className="button button-outline">View All</button>
            </div>
        </div>
    );
}

export default (PriceAlertItem);
