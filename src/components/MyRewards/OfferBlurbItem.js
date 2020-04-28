import React from 'react';
import {getProperty} from '../../utilities/Helper'
import { Link } from 'react-router-dom';
import {getImageUrl} from '../../Configs/Configs'

const OfferBlurbItem = (props) => { 
    var imageUrl = getImageUrl();
    var propertyName = '';
    var offers = (props.offerList[0]== null)? '' : props.offerList[0];
    if(props.propertyList && offers && offers && offers.propertyList[0]){

        var property = getProperty(props.propertyList, offers.propertyList[0]);
        if(property){
            imageUrl ="http://caesars.com" + property.thumbnail.url;
            propertyName = property.propertyName;
        }
    }
    
    function myOffer() {
        window.location.href='/myoffers'
      }
    return (        
        <div className="listing-wrap">
            <h3>My Offer</h3>
            <div className="listing__img">
                  <img className="thumb" src={imageUrl} alt="offer image"/>
                  <div className="img-info">
                    <h5>{offers.title}</h5>
                    <span className="place">{props.propertyName}</span>
                  </div>
            </div>
            <div className="listing__details">
                <h2>{offers.description}</h2>
                <span className="rate">$49</span>
                
            </div>
            <div className="btn-wrap-double">
                <Link
                    to={`/offerdetails/${offers.id}`}
                    className="button">
                    View Offer
                </Link> 
                <button className="button button-outline">View All</button>
            </div>
            {/* <div>Properties:- {propertyName}</div> */}            
        </div>
    );
}

export default OfferBlurbItem;