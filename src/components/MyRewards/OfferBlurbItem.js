import React from 'react';
import {getProperty} from '../../utilities/Helper'
import { Link } from 'react-router-dom';

const OfferBlurbItem = (props) => { 
    var imageUrl ='http://www.caesars.com/myrewards/profile/images/tr-placeholder.jpg"';
    var propertyName = '';
    var offers = (props.offerList[0]== null)? '' : props.offerList[0];
    if(props.propertyList && offers && offers && offers.propertyList[0]){

        var property = getProperty(props.propertyList, offers.propertyList[0]);
        if(property){
            imageUrl ="http://caesars.com" + property.thumbnail.url;
            propertyName = property.propertyName;
        }
    }
    function myOfferDetails() {
        alert('TODO!');
      }
    function myOffer() {
        window.location.href='/my-offers'
      }
    return (        
        <div className="item rewardsitem offer">
            <h4>MY OFFERS <span className="tr-crimson">NEW!</span></h4>
            <h2>{props.propertyName}</h2>
            <img alt="offer image" className="offer-image" src={imageUrl}></img>
            <div>Title:- {offers.title}</div>
            <div>Properties:- {propertyName}</div>
            <div>Description:- {offers.description}</div>           
            <br/> 
            <Link
                to={`/my-offer-details/${offers.id}`}
                className="myrewards-button">
                View Offer
            </Link>         
            <button className="myrewards-button" onClick={myOffer}>View All </button>
        </div>
    );
}

export default OfferBlurbItem;