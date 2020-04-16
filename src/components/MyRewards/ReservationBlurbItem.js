import React from 'react';
import {getProperty} from '../../utilities/Helper'

const ReservationBlurbItem = (props) => { 
    var imageUrl ='http://www.caesars.com/myrewards/profile/images/tr-placeholder.jpg"';
    var propertyName = '';
    var reservations = props.reservationList.reservations[0];
    if(props.propertyList && reservations && reservations && reservations.propertyCode){

        var property = getProperty(props.propertyList, reservations.propertyCode);
        if(property){
            imageUrl ="http://caesars.com" + property.thumbnail.url;
            propertyName = property.propertyName.toUpperCase();
        }
    }
    return (        
        <div className="item rewardsitem offer">
            <h4>MY RESERVATION <span className="tr-crimson">NEW!</span></h4>
            <img alt="reservation image" className="offer-image" src={imageUrl}></img>
            <div>{propertyName}</div>
            <div>Date:- {reservations.checkInDate} - {reservations.checkOutDate}</div>
            
            <br/> 
            <button className="myrewards-button" onClick="">View All </button>      

        </div>
    );
}

export default ReservationBlurbItem;