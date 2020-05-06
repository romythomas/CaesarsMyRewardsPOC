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
  
const loadScript = () => {
    $(document).ready(function() {
    // properties show hide
    $(".properties-wrap a").click(function(event){
        event.preventDefault();
        event.stopPropagation();
        $(".properties-list").toggle();
    });

    $('.properties-list').click( function(event) {      
        event.stopPropagation();       
    });
    $('body').click(function(){
        $('.properties-list').hide();
    });
    });
}
/**
 * 
 */
class OfferDetails  extends Component  {
    render(){
        loadScript();
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
                        <div className="offer-details content-box">
                            <div className="row">
                                <div className="col-md-4 col-sm-6">
                                    <div className="thumb">
                                        <img src={imageUrl} alt="offer details image" />
                                    </div>
                                    <div className="fav">
                                        <img src={getFavouriteImage(pref)} alt="Caesars Favourite Logo" />
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-6">
                                    <div className="details-text">
                                        <h2>{title}</h2>
                                    <div className="properties-wrap">
                                        <h4>Harrah's Resort Southern California <a href="#">More Properties</a></h4>
                                    <div className="properties-list">
                                        <ul>
                                            <li>Harrah's Resort Southern California</li>
                                            <li>Harrah's Resort Southern California</li>
                                            <li>Harrah's Resort Southern California</li>
                                            <li>Harrah's Resort Southern California</li>
                                            <li>Harrah's Resort Southern California</li>
                                            <li>Harrah's Resort Southern California</li>
                                        </ul>
                                    </div>
                                    </div>
                                        <p>{description}</p>
                                        <div className="details-propertyselect">
                                                <Autocomplete 
                                                dataList={marketPropertyListData}
                                                stylingClass={"disabled"} 
                                                elementId="navigate-from-offer-details" 
                                                title="Where do you want to go?" />
                                            </div>
                                        <button className="button" 
                                        onClick={gotoNBE(new Array(id, new Date(start).toLocaleDateString(),new Date(end).toLocaleDateString()))} >
                                        Book</button> 
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12 pull-right">
                                    <div className="details-info">
                                        <span className="offer-code">OFFER CODE: <strong>{id}</strong></span>
                                        <span className="expires">EXPIRES: <strong>{new Date(end).toLocaleDateString()}</strong></span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="how-redeem">
                                    <strong><h5>HOW TO REDEEM</h5></strong>
                                    <div className="redeem-content">
                                        <p>To redeem your offer, please follow the instructions on your mail piece or email. A print out of this page is NOT a physical coupon and cannot be used for 
                                        redemption where a coupon is required and some offers require a physical coupon to redeem.
                                        If this is a hotel offer and you book it online; you do not need to bring in your physical coupon when you check in.
                                        It is always best to bring your invite or mail piece with you when you visit.</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="terms">
                                    <strong><h5>TERMS &amp; CONDITIONS</h5></strong>
                                    <div className="terms-content">
                                        <p>Caesars Rewards offers are non-transferable and non-negotiable. Offer is only valid at specified casinos. Caesars Rewards Card and valid photo ID must be presented upon redemption. Not responsible for lost or stolen vouchers or coupons.  Offers are based upon availability. Effective July 1, 2017, complimentary rooms booked will be subject to a $50 no-show fee, plus tax if the reservation is not canceled by 6pm on the day of arrival. Excludes bookings made for Caesars Windsor. Additional restrictions may apply. Please see your nearest Caesars Rewards Center for more details.</p>
                                    </div>
                                </div>
                            </div>
                            </div>
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