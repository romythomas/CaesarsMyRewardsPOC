import React from 'react';
import {getProperty} from '../../utilities/Helper'

const OfferBlurbItem = (props) => { 
    var imageUrl ='http://www.caesars.com/myrewards/profile/images/tr-placeholder.jpg"';
    var propertyName = '';
    var offers = props.offerList;
    if(props.propertyList && offers && offers[0] && offers[0].propertyList[0]){

        var property = getProperty(props.propertyList, offers[0].propertyList[0]);
        if(property){
            imageUrl ="http://caesars.com" + property.thumbnail.url;
            propertyName = property.propertyName;
        }
    }
    return (        
        <div className="item rewardsitem offer">
            <h4>MY OFFERS <span className="tr-crimson">NEW!</span></h4>
            <h2>{props.propertyName}</h2>
            <img alt="offer image" className="offer-image" src={imageUrl}></img>
            <div>Title:- {offers[0].title}</div>
            <div>Properties:- {propertyName}</div>
            <div>Description:- {offers[0].description}</div>
            {/* <button className="" type="submit">View Offer</button>
            <button className="" type="submit">View All</button> */}
        </div>
    );
}

export default OfferBlurbItem;