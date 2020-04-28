import React from 'react';
import {getProperty,truncate} from '../../utilities/Helper'
import {getImageUrl} from '../../Configs/Configs'
import { connect } from 'react-redux';

const mapStateToProps = state => ({    
    offerList: state.common.offers,
    propertyList: state.common.properties
  });

const OfferBlurbItem = (props) => { 
    const { offerList, propertyList} = props;

    let imageUrl = getImageUrl();
    let propertyName = '';
    let offers = (offerList[0]== null)? '' : offerList[0];
    if(propertyList && offers && offers && offers.propertyList[0]){
        var property = getProperty(propertyList, offers.propertyList[0]);
        if(property){
            imageUrl ="http://caesars.com" + property.thumbnail.url + "/hd/l/cover";
            propertyName = property.propertyName;
        }
    }
    function myOffer() {
        window.location.href='/myoffers'
    }
    const myOfferDetails = (parameter) => (event) => {       
        let url = '/offerdetails/' + parameter[0]
        window.location = url;
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
                <button className="button" onClick={myOfferDetails(new Array(offers.id))}>View Offer</button>
                <button className="button button-outline" onClick={myOffer}>View All</button>
            </div>
        </div>
    );
}
export default connect(mapStateToProps)(OfferBlurbItem);
