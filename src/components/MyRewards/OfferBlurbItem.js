import React from 'react';
import {getProperty,truncate} from '../../utilities/Helper'
import {getImageUrl} from '../../constants/configs'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = state => ({    
    offerList: state.common.offers,
    propertyList: state.common.properties
  });

/**
 * 
 * @param {*} props 
 */
const OfferBlurbItem = (props) => { 
    const { offerList, propertyList} = props;

    let imageUrl = getImageUrl();
    let propertyName = '';
    let offers = (offerList[0]== null)? '' : offerList[0];
    if(propertyList && offers && offers && offers.propertyList[0]){
        var property = getProperty(propertyList, offers.propertyList[0]);
        if(property){
            imageUrl ="http://caesars.com" + property.thumbnail.url + "/hd/m/cover";
            propertyName = property.propertyName;
        }
    }
    return (   
        <div className="listing-wrap">
            <h3>My Offers</h3>
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
            <button className="button">      
                <Link to={`/offerdetails/${offers.id}`}> View Offer</Link>   
            </button>    
            <button className="button button-outline" > 
                <Link to={`/myoffers`}> View All</Link>  
            </button>
            </div>
        </div>
    );
}
export default connect(mapStateToProps)(OfferBlurbItem);
