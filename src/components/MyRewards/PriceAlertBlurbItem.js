import React from 'react';
import {buildEnterpriseResponse} from '../../utilities/Helper'

function myPriceAlerts() {
    alert('TODO!');
  }
const PriceAlertBlurbItem = (props) => { 
    debugger;
    var rooms = [];
    var priceAlert = null;
    var lowestRate = null;
    var enterprise = buildEnterpriseResponse(props.priceList.harrahs.roomtypes);
    // for (var a = 0, len = props.enterpriseList.priceAlerts.length; a < len; a++) {      
    //     priceAlert = props.enterpriseList.priceAlerts[a];
    //     lowestRate = enterprise.find(t => t.propertyCode.toUpperCase() === priceAlert.propcode.toUpperCase());
    //     if (lowestRate.rate < parseInt(priceAlert.threshold, 10)) {
    //         rooms.push({
    //             propertyCode: lowestRate.propertyCode,
    //             rateSet: lowestRate.rateSet,
    //             rate: lowestRate.rate,
    //             propertyName: Global.marketsModel.getPropertyName(lowestRate.propertyCode),
    //             roomName: roomType.name,
    //             roomImageUrl: roomType.image
    //         })
    //     }
    // }
    return (        
        <div className="item rewardsitem offer">
            <h4>MY PRICE ALERT <span className="tr-crimson">NEW!</span></h4>
            <div>TODO</div>
            <div>TODO</div>

            <br/> 
            <button className="myrewards-button" onClick={myPriceAlerts}>View </button><br/> 
            <button className="myrewards-button" onClick={myPriceAlerts}>View All </button>
        </div>
    );
}

export default PriceAlertBlurbItem;