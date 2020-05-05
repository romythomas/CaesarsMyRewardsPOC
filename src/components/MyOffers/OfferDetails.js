import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    getProperty, 
    getFavouriteImage, 
    recordOffersDetailsData, 
    getMarketCodeListOfPropertyCodes,
    getStructuredMarketsPropertiesList} from '../../utilities/Helper';
import Autocomplete from "../Common/Autocomplete";
import {getImageUrl} from '../../constants/configs';

const mapStateToProps = (state) => ({
    offers: state.common.offers, 
    properties: state.common.properties,
    markets: state.common.markets
});

const getSelectedPropertyCode = () => {
    let selectedPropertyCode = "";
    try {
        const autocomplete_component = document.getElementById('autocomplete-component');
        const selectedElements = autocomplete_component.querySelectorAll('li.autocomplete__item[data-selected="true"]');
        selectedPropertyCode = selectedElements[0].dataset.value;
    }
    catch(ex) {}
    return selectedPropertyCode;
}
const gotoNBE = (parameter) => (event) => {
    const propCode = getSelectedPropertyCode();
    if(propCode && parameter && parameter.length) {
        const url = 'http://www.caesars.com/book/?view=ratecal&offerCode=' + parameter[0] + '&arrival=' + parameter[1] + '&departure=' + parameter[2] + '&propCode=' + propCode
        window.location = url;
    }
}
  
/**
 * 
 */
class OfferDetails  extends Component  {
    render(){
        const { offers, properties, markets, match } = this.props;
        if (match.params && match.params.id) {
            const offer = offers.filter((offer) => {
                return offer.id === this.props.match.params.id;
            });
            if(offer && offer.length) {
                this.offer = offer[0];
                const {propertyList, id, title, start, end, description, pref} = this.offer;

                let imageUrl = getImageUrl();
                const property = getProperty(properties, propertyList[0]);
                if(property){
                    imageUrl ="http://caesars.com" + property.thumbnail.url + "/hd/m/cover";
                }

                const marketsOfProperties = getMarketCodeListOfPropertyCodes(markets, propertyList);
                let marketPropertyListData = getStructuredMarketsPropertiesList(markets);
                marketPropertyListData = marketPropertyListData.filter((data) => {
                    return (marketsOfProperties.includes(data.value) || propertyList.includes(data.value));
                });

                //GTM logging
                try {
                    recordOffersDetailsData('OfferDetails', id);
                } catch (err) {
                    //ignore datalayer error
                } 
                return ( 
                    <div className="container-fluid">
                        <div className="title">
                            <h1>My Offer Details</h1>
                        </div> 
                        <div className="offer-details-left-panel"> 
                            <strong>Title:</strong>                      
                            <span>{title}</span>
                            <br/>          
                            <strong>Offer Code: </strong>
                            <span> {id} </span>
                            <br/>          
                            <strong>Expires: </strong>
                            <span>{new Date(end).toLocaleDateString()}</span>
                            <br/>
                            <strong>Description: </strong> 
                            <span>{description}</span>
                            <br/>
                            <br/>
                            <strong>Properties:</strong>
                            
                            <br/>  
                        </div>
                        <div className="propertySelect">  
                            <ul className="row">
                                <li className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <Autocomplete 
                                        dataList={marketPropertyListData}
                                        stylingClass={"disabled"} 
                                        elementId="navigate-from-offer-details" 
                                        title="Where do you want to go?" />
                                </li>
                            </ul>
                            <button className="button" 
                                onClick={gotoNBE(new Array(id, new Date(start).toLocaleDateString(),new Date(end).toLocaleDateString()))} >
                                Book</button> 
                        </div>
                        <div className="fav">
                                <img src={getFavouriteImage(pref)} alt="Caesars Favourite Logo"/>
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
        return (
            <div className="container-fluid">
                <div className="title">
                    <h1>No Offer Details Available</h1>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(OfferDetails);