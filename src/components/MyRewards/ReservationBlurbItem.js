import React from 'react';
import {getProperty} from '../../utilities/Helper'
import {getImageUrl} from '../../constants/configs'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    propertyList: state.common.properties,
    reservationList: state.common.reservations
  });
const ReservationBlurbItem = (props) => { 
    const {propertyList, reservationList} = props;

    let imageUrl = getImageUrl();
    let propertyName = '';
    let reservations = reservationList.reservations[0];
    if(propertyList && reservations && reservations && reservations.propertyCode){
        let property = getProperty(props.propertyList, reservations.propertyCode);
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
                    <span className="place">&nbsp;</span>
                </div>
            </div>
            <div className="listing__details">
                <h2>Date:- &nbsp;&nbsp;
                    {new Date(reservations.checkInDate).toLocaleDateString()} 
                    &nbsp;- &nbsp;{new Date(reservations.checkOutDate).toLocaleDateString()}</h2>
                <span className="rate">&nbsp;</span>
            </div>
            <div className="btn-wrap-double">
                <button className="button" onClick={myReservation}>View All</button>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(ReservationBlurbItem);
