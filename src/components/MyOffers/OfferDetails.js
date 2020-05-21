import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    getProperty,
    getMoment,
    getFavouriteClassName,
    getMarketCodeListOfPropertyCodes,
    getStructuredMarketsPropertiesList
} from "../../utilities/Helper";
import Autocomplete from "../Common/Autocomplete";
import { getImageUrl, getCaesarsDomain } from "../../constants/configs";
import { recordOffersDetailsData } from "../../utilities/Gtm-Module";
import queryString from "query-string";
import ErrorMessage from "../Common/ErrorMessage";
import { OFFER_DETAILS_ERROR } from "../../constants/errorMessages";
import LoadingSpinner from "../Common/LoadingSpinner";

const mapStateToProps = (state) => ({
    offers: state.common.offers,
    properties: state.common.properties,
    markets: state.common.markets
});

class OfferDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirectToMyOffers: false,
            hasDataFetched: false,
            selectedProperty: "",
            offer: null,
            imageUrl: getImageUrl(),
            marketPropertyListData: []
        };
        this.onLocationChange = this.onLocationChange.bind(this);
        this.gotoBookingWebsite = this.gotoBookingWebsite.bind(this);
        this.gotoOffersList = this.gotoOffersList.bind(this);
    }

    componentDidMount() {
        this.fetchOfferDetails();
    }

    fetchOfferDetails() {
        const { offers, markets, properties, match } = this.props;
        if (offers && offers.length && match.params && match.params.id) {
            const offerItem = offers.filter((offer) => {
                return offer.id.toLowerCase() === match.params.id.toLowerCase();
            });
            if (offerItem && offerItem.length) {
                this.setState({
                    offer: offerItem[0]
                });
                const { propertyList, id } = offerItem[0];
                //DataLayer logging
                recordOffersDetailsData(id);
                if (propertyList && propertyList.length) {
                    if (properties && properties.length) {
                        this.updateImageUrl(properties, propertyList);
                    }
                    if (markets && markets.length) {
                        this.getMarketsPropertiesList(markets, propertyList);
                    }
                }
            }
        }
        this.setState({
            hasDataFetched: true
        });
    }

    updateImageUrl(properties, propertyList) {
        const property = getProperty(properties, propertyList[0]);
        if (property) {
            this.setState({
                imageUrl: `http://caesars.com${property.thumbnail.url}`
            });
        }
    }

    getMarketsPropertiesList(markets, propertyList) {
        const marketsOfProperties = getMarketCodeListOfPropertyCodes(markets, propertyList);
        let marketPropertyListData = getStructuredMarketsPropertiesList(markets).map((data) => {
            data.isDisabled = data.isMarket;
            return data;
        });
        marketPropertyListData = marketPropertyListData.filter((data) => {
            return marketsOfProperties.includes(data.value) || propertyList.includes(data.value);
        });
        this.setState({
            marketPropertyListData: marketPropertyListData
        });
        this.setDefaultProperty(marketPropertyListData);
    }

    setDefaultProperty(marketPropertyListData) {
        const { search } = location;
        const searchParams = queryString.parse(search ? search.toLowerCase() : "");
        let firstProperty = "";
        if (searchParams && searchParams.propcode) {
            firstProperty = marketPropertyListData.find((item) => {
                return item.value.toLowerCase() === searchParams.propcode;
            });
        }
        if (firstProperty && firstProperty.isMarket) {
            firstProperty = marketPropertyListData.find((item) => {
                return item.marketCode.toLowerCase() === searchParams.propcode;
            });
        } else if (!firstProperty) {
            firstProperty = marketPropertyListData.find((item) => {
                return !item.isDisabled;
            });
        }

        if (firstProperty && firstProperty.value) {
            this.setState({
                selectedProperty: firstProperty.value
            });
        }
    }

    onLocationChange(value) {
        if (value) {
            this.setState({
                selectedProperty: value
            });
        }
    }

    gotoOffersList() {
        this.setState({
            isRedirectToMyOffers: true
        });
    }

    gotoBookingWebsite() {
        const { selectedProperty, offer } = this.state;
        if (selectedProperty && offer) {
            let { id, start, end } = offer;
            start = getMoment(new Date(start)).format("MM/DD/YYYY");
            end = getMoment(new Date(end)).format("MM/DD/YYYY");
            const redirectionUrl = `${getCaesarsDomain()}/book/?propCode=${selectedProperty}&view=ratecal&arrival=${start}&departure=${end}&offerCode=${id}`;
            window.location = redirectionUrl;
        }
    }

    render() {
        const { isRedirectToMyOffers, hasDataFetched, offer, imageUrl, selectedProperty, marketPropertyListData } = this.state;
        if (isRedirectToMyOffers) {
            return <Redirect to="/myoffers" />;
        }
        if (!hasDataFetched) {
            return <LoadingSpinner />;
        }
        if (offer) {
            const { id, title, end, description, pref } = offer;
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
                                    <div className={`fav ${getFavouriteClassName(pref)}`}></div>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-6">
                                <div className="details-text">
                                    <h2>{title}</h2>
                                    <p>{description}</p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 pull-right">
                                <div className="details-info">
                                    <span className="offer-code">
                                        OFFER CODE: <strong>{id}</strong>
                                    </span>
                                    <span className="expires">
                                        EXPIRES: <strong>{getMoment(end).format("MM/DD/YYYY")}</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="details-propertyselect">
                                    <Autocomplete
                                        dataList={marketPropertyListData}
                                        defaultValue={selectedProperty}
                                        elementId="navigate-from-offer-details"
                                        title="Where do you want to go?"
                                        onChange={this.onLocationChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <button className="button" id="btn_goto_booking_website" onClick={this.gotoBookingWebsite}>
                                    Book
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="how-redeem">
                                    <strong>
                                        <h5>HOW TO REDEEM</h5>
                                    </strong>
                                    <div className="redeem-content">
                                        <p>
                                            To redeem your offer, please follow the instructions on your mail piece or email. A
                                            print out of this page is NOT a physical coupon and cannot be used for redemption
                                            where a coupon is required and some offers require a physical coupon to redeem. If
                                            this is a hotel offer and you book it online; you do not need to bring in your
                                            physical coupon when you check in. It is always best to bring your invite or mail
                                            piece with you when you visit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="terms">
                                    <strong>
                                        <h5>TERMS &amp; CONDITIONS</h5>
                                    </strong>
                                    <div className="terms-content">
                                        <p>
                                            Caesars Rewards offers are non-transferable and non-negotiable. Offer is only valid at
                                            specified casinos. Caesars Rewards Card and valid photo ID must be presented upon
                                            redemption. Not responsible for lost or stolen vouchers or coupons. Offers are based
                                            upon availability. Effective July 1, 2017, complimentary rooms booked will be subject
                                            to a $50 no-show fee, plus tax if the reservation is not canceled by 6pm on the day of
                                            arrival. Excludes bookings made for Caesars Windsor. Additional restrictions may
                                            apply. Please see your nearest Caesars Rewards Center for more details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return <ErrorMessage errorText={OFFER_DETAILS_ERROR} linkText="View all offers" clearFilter={this.gotoOffersList} />;
    }
}

export default connect(mapStateToProps)(OfferDetails);
