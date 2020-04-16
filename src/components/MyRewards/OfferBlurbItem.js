import React from 'react';

const OfferBlurbItem = (props) => { 
    var offers = props.offerList;
    return (        
        <div className="item rewardsitem">
            <h4>MY OFFERS <span class="tr-crimson">NEW!</span></h4>
            <h2>{props.propertyName}</h2>
            <img alt="todo" src=""></img>
            <div>Title:- {offers[0].title}</div>
            <div>Properties:- {offers[0].propertyList}</div>
            <div>Description:- {offers[0].description}</div>
            {/* <button className="" type="submit">View Offer</button>
            <button className="" type="submit">View All</button> */}
        </div>
    );
}

export default OfferBlurbItem;