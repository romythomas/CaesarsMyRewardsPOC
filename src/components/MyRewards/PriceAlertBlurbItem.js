import React from 'react';

function myPriceAlerts() {
    alert('TODO!');
  }
const PriceAlertBlurbItem = (props) => { 
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