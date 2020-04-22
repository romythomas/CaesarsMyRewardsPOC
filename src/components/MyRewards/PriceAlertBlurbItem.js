import React from 'react';
import {buildEnterpriseResponse, getProperty} from '../../utilities/Helper'

function viewMyPriceAlerts() {
    alert('TODO!');
  }
function viewAllMyPriceAlerts() {
    alert('TODO!');
  }
const PriceAlertBlurbItem = (props) => { 
    var rooms = [];
    var priceAlert = null;
    var lowestRate = null;
    var imageUrl ='http://www.caesars.com/myrewards/profile/images/tr-placeholder.jpg"';
    var propertyName = '';     

    var enterprise = buildEnterpriseResponse(props.priceList.harrahs.roomtypes);
    for (var a = 0, len = props.enterpriseList.priceAlerts.length; a < len; a++) {      
        priceAlert = props.enterpriseList.priceAlerts[a];
        lowestRate = enterprise.find(t => t.propertyCode.toUpperCase() === priceAlert.propcode.toUpperCase());
        if(lowestRate){
            var property = getProperty(props.propertyList, lowestRate.propertyCode);
            if(property){
                imageUrl ="http://caesars.com" + property.images[0].url;
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
    }
    
    return (        
        <div className="item rewardsitem offer">
            <h4>MY PRICE ALERT <span className="tr-crimson">NEW!</span></h4>
            <img alt="price alert image" className="offer-image" src={rooms[0].roomImageUrl}></img>
            <h5>{rooms[0].propertyName}</h5>
				<div className="amount">
					Stay for as little as
					<b>${rooms[0].rate}</b>
					<h6>Based on availability</h6>
				</div>
            <br/> 
            <button className="myrewards-button" onClick={viewMyPriceAlerts}>View </button><br/> 
            <button className="myrewards-button" onClick={viewAllMyPriceAlerts}>View All </button>
        </div>
    );
}

export default PriceAlertBlurbItem;