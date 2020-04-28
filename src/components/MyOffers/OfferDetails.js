import React, { Component , useRef, useEffect} from "react";
import { connect } from 'react-redux';
import {getProperty, getPropertiesListByCode} from '../../utilities/Helper'
import {getImageUrl} from '../../Configs/Configs'

const mapStateToProps = (state) => ({
    offers: state.common.offers, 
    properties: state.common.properties
});
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
const useMountEffect = (fun) => useEffect(fun, [])

const gotoNBE = (parameter) => (event) => {
    var e = document.getElementById("property");
    var val = e.options[e.selectedIndex].value.split(',');   
    var url = 'http://www.caesars.com/book/?view=ratecal&offerCode=' + parameter[0] + '&arrival=' + parameter[1] + '&departure=' + parameter[2] + '&propCode=' + val[0] + '&regionCode=' + val[1] + '&adults=1&children=0'
    window.location = url;
}
  

class OfferDetails  extends Component  {       
    render(){
        const { offers, properties } = this.props;
        if ((this.props.match.params) && (this.props.match.params.id)) {
            
        const selectedOffer = offers.filter((offer) => {
            return offer.id === this.props.match.params.id;
        });

        if(properties){
            var imageUrl = getImageUrl();
            var property = getProperty(properties, selectedOffer[0].propertyList[0]);
            var proplist = getPropertiesListByCode(properties, new Array(selectedOffer[0].propertyList));
            if(property){
                imageUrl ="http://caesars.com" + property.images[0].url;
            }
        }
        return ( 
            <div className="item rewardsitem progressbar">           
                <h2>My Offer Details</h2>
                <div className="offer-details-left-panel"> 
                    <strong>Title:</strong>                      
                    <span>{selectedOffer[0].title}</span>
                    <br/>          
                    <strong>Offer Code: </strong>
                    <span> {selectedOffer[0].id} </span>
                    <br/>          
                    <strong>Expires: </strong>
                    <span>{selectedOffer[0].end}</span>
                    <br/>
                    <strong>Description: </strong> 
                    <span>{selectedOffer[0].description}</span>
                    <br/>
                    <br/>
                    <strong>Properties:</strong>
                    <span>                   
                        <select id="property" className="offersortingoptions" >
                            {proplist.map((t) => <option value={t.id}>{t.name}</option>)}
                        </select>
                        <button className="myrewards-button" 
                            onClick={gotoNBE(new Array(selectedOffer[0].id, selectedOffer[0].start,selectedOffer[0].end))} >
                            Book</button> 
                    </span>
                    <br/>  
                </div>
                <div id="offer-image">
                    <img src={imageUrl} width="210" alt="offer details image" />
                </div> 
                <div id="offer-links">
                    <div id="offer-favorite-icon"><span id="fav-icon" className="favorite"></span></div>
                </div>
                <br/>
                <div className="offerfooter">
                    <span><strong>HOW TO REDEEM</strong></span>
                    <p>To redeem your offer, please follow the instructions on your mail piece or email. A print out of this page is NOT a physical coupon and cannot be used for redemption where a coupon is required and some offers require a physical coupon to redeem.</p>
                    <p>If this is a hotel offer and you book it online; you do not need to bring in your physical coupon when you check in.</p>
                    <p>It is always best to bring your invite or mail piece with you when you visit.</p>
                    <span><strong>TERMS &amp; CONDITIONS</strong></span>
                    <p>Caesars Rewards offers are non-transferable and non-negotiable. Offer is only valid at specified casinos. Caesars Rewards Card and valid photo ID must be presented upon redemption. Not responsible for lost or stolen vouchers or coupons.  Offers are based upon availability. Effective July 1, 2017, complimentary rooms booked will be subject to a $50 no-show fee, plus tax if the reservation is not canceled by 6pm on the day of arrival. Excludes bookings made for Caesars Windsor. Additional restrictions may apply. Please see your nearest Caesars Rewards Center for more details.</p>
                </div>  
            </div>  
            );
        }
    }
}

export default connect(mapStateToProps, null)(OfferDetails);