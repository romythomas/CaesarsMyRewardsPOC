import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getProperty,
    getMoment,
    getFavouriteClassName,
    getMarketCodeListOfPropertyCodes,
    getStructuredMarketsPropertiesList,
    scrollPageToBanner
} from "../../utilities/Helper";
import Autocomplete from "../Common/Autocomplete";
import { getImageUrl, getCaesarsDomain } from "../../constants/configs";
import { recordOffersDetailsData } from "../../utilities/Gtm-Module";
import ErrorMessage from "../Common/ErrorMessage";

const mapStateToProps = (state) => ({
    offers: state.common.offers,
    properties: state.common.properties,
    markets: state.common.markets
});

class OfferDetails extends Component {
    constructor(props) {
        super(props);

        this.state = { selectedProperty: "" };

        this.offer = "";
        this.imageUrl = getImageUrl();
        this.marketPropertyListData = [];

        this.onLocationChange = this.onLocationChange.bind(this);
        this.gotoBookingWebsite = this.gotoBookingWebsite.bind(this);
    }

    componentWillMount() {
        this.findOfferDetails();
        this.updateImageUrl();
        this.updateMarketPropertyValues();
    }

    componentDidMount() {
        scrollPageToBanner();
        //DataLayer logging
        if (this.offer && this.offer.id) {
            recordOffersDetailsData(this.offer.id);
        }
    }

    findOfferDetails() {
        const { offers, match } = this.props;
        if (offers && offers.length && match.params && match.params.id) {
            const offerItem = offers.filter((offer) => {
                return offer.id.toLowerCase() === match.params.id.toLowerCase();
            });
            if (offerItem && offerItem.length) {
                this.offer = offerItem[0];
            }
        }
    }

    updateImageUrl() {
        const { properties } = this.props;
        const { propertyList } = this.offer;
        if (properties && properties.length && propertyList && propertyList.length) {
            const property = getProperty(properties, propertyList[0]);
            if (property) {
                this.imageUrl = `http://caesars.com${property.thumbnail.url}`;
            }
        }
    }

    updateMarketPropertyValues() {
        const { markets } = this.props;
        const { propertyList } = this.offer;
        if (markets && markets.length && propertyList && propertyList.length) {
            const marketsOfProperties = getMarketCodeListOfPropertyCodes(markets, propertyList);
            this.marketPropertyListData = getStructuredMarketsPropertiesList(markets).map((data) => {
                data.isDisabled = data.isMarket;
                return data;
            });
            this.marketPropertyListData = this.marketPropertyListData.filter((data) => {
                return marketsOfProperties.includes(data.value) || propertyList.includes(data.value);
            });
            const firstProperty = this.marketPropertyListData.find((item) => {
                return !item.isDisabled;
            });
            if (firstProperty && firstProperty.value) {
                this.setState({
                    selectedProperty: firstProperty.value
                });
            }
        }
    }

    onLocationChange(value) {
        if (value) {
            this.setState({
                selectedProperty: value
            });
        }
    }

    gotoBookingWebsite() {
        const { selectedProperty } = this.state;
        let { id, start, end } = this.offer;
        if (selectedProperty && id && start && end) {
            start = getMoment(start).format("MM/DD/YYYY");
            end = getMoment(end).format("MM/DD/YYYY");
            const redirectionUrl = `${getCaesarsDomain()}/book/?propCode=${selectedProperty}&view=ratecal&arrival=${start}&departure=${end}&offerCode=${id}`;
            window.location = redirectionUrl;
        }
    }

    render() {
        if (this.offer) {
            const { id, title, end, description, pref } = this.offer;
            const { selectedProperty } = this.state;
            return (
                <div className="container-fluid">
                    <div className="title">
                        <h1>My Offer Details</h1>
                    </div>
                    <div className="offer-details content-box">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="thumb">
                                    <img src={this.imageUrl} alt="offer details image" />
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
                                        dataList={this.marketPropertyListData}
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
        return <ErrorMessage errorText="No offer details available." />;
    }
}

export default connect(mapStateToProps)(OfferDetails);
