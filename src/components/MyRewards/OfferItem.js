import React from 'react';
import {getProperty,truncate} from '../../utilities/Helper'
import {getImageUrl} from '../../constants/configs'
import { Link } from 'react-router-dom';

/**
 * 
 * @param {*} props 
 */
const OfferItem = (props) => { 
    const { offerList, propertyList} = props;
    let imageUrl = getImageUrl();
    let propertyName = '';
    let offers = (offerList[0]== null)? '' : offerList[0];
    if(propertyList && offers && offers && offers.propertyList[0]){
        var property = getProperty(propertyList, offers.propertyList[0]);
        if(property){
            imageUrl = `http://caesars.com${property.thumbnail.url}/hd/m/cover`;
            propertyName = property.propertyName;
        }
    }
    return (   
        <div className="listing-wrap">
            <h3>My Offer</h3>
            <div className="listing__img">
                  <img className="thumb" src={imageUrl} alt="offer image"/>
                  <div className="img-info">
                    <h5>{offers.title}</h5>
                    <span className="place">{propertyName}</span>
                  </div>
            </div>
            <div className="listing__details">
                <h2>{truncate(offers.description, 63)}</h2>
                <span className="rate">&nbsp;</span>                
            </div>
            <div className="btn-wrap-double">   
                <Link className="button" id="viewoffer" to={`/offerdetails/${offers.id}`}> View Offer</Link>   
                <Link className="button button-outline" id="viewall" to={`/myoffers`}> View All</Link>  
            </div>
        </div>
    );
}
export default (OfferItem);
