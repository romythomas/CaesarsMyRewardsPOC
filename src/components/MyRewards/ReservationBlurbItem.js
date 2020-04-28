import React from 'react';
import {getProperty} from '../../utilities/Helper'
import {getImageUrl} from '../../Configs/Configs'

const ReservationBlurbItem = (props) => { 
    var imageUrl = getImageUrl();
    var propertyName = '';
    var reservations = props.reservationList.reservations[0];
    if(props.propertyList && reservations && reservations && reservations.propertyCode){

        var property = getProperty(props.propertyList, reservations.propertyCode);
        if(property){
            imageUrl ="http://caesars.com" + property.thumbnail.url + "/hd/l/cover";
            propertyName = property.propertyName.toUpperCase();
        }
    }
    function myReservation() {
        alert('TODO!');
      }
    return (        
        <div className="listing-wrap">
            <h3>My Reservation</h3>
            <div className="listing__img">
                <img className="thumb" src={imageUrl} alt="Caesars"/>
                <div className="img-info">
                    <h5>{propertyName}</h5>
                    <span className="place">Las Vegas</span>
                </div>
            </div>
            <div className="listing__details">
                <h2>Date</h2>
                <span className="rate">{reservations.checkInDate} - {reservations.checkOutDate}</span>
            </div>
            <div className="btn-wrap-double">
                <button className="button" onClick={myReservation}>View All</button>
            </div>
        </div>
    );
}

export default ReservationBlurbItem;