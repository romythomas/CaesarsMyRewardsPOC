import React, { Component, createRef } from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import RewardCreditItem from "./RewardCreditItem";
import TierScoreDetailsItem from "./TierScoreDetailsItem";
import TierScoreItem from "./TierScoreItem";
import OfferItem from "./OfferItem";
import ReservationItem from "./ReservationItem";
import PriceAlertItem from "./PriceAlertItem";
import ProgressBarItem from "./ProgressBarItem";
import { GET_PROFILE } from "../../constants/actionTypes";
import { recordMyRewardsData } from "../../utilities/Gtm-Module";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import LoadingSpinner from "../Common/LoadingSpinner";
import { scrollPageToBanner } from "../../utilities/Helper";

const mapStateToProps = (state) => ({
    token: state.common.token,
    logininfo: state.guestProfile.logininfo,
    feeds: state.guestProfile.feeds,
    offers: state.common.offers,
    markets: state.common.markets,
    properties: state.common.properties,
    reservations: state.common.reservations,
    enterpriseFeed: state.common.enterpriseFeed,
    priceAlert: state.common.priceAlert
});

const mapDispatchToProps = (dispatch) => ({
    onGetGuestProfile: (payload) => dispatch({ type: GET_PROFILE, payload })
});

class MyRewards extends Component {
    constructor(props) {
        super(props);
        this.myRewardsRef = createRef();
    }

    componentDidMount() {
        scrollPageToBanner(this.myRewardsRef);
        this.props.onGetGuestProfile(
            Promise.all([agent.Profile.getGuestProfile(this.props.accountID), agent.Profile.getFeeds()])
        );
    }

    componentDidUpdate() {
        //DataLayer logging
        const { logininfo } = this.props;
        if (logininfo) {
            const { tier, propcode, accountid } = logininfo;
            recordMyRewardsData(tier, propcode, accountid);
        }
    }

    render() {
        const { logininfo, feeds, properties, offers, enterpriseFeed, priceAlert, reservations } = this.props;
        if (logininfo && feeds && properties) {
            return (
                <div className="container-fluid" ref={this.myRewardsRef}>
                    <ScrollUpButton ContainerClassName="scroll-top" ShowAtPosition={500} />
                    <div className="title">
                        <h1>My Rewards</h1>
                    </div>
                    <div className="content-box">
                        <div className="row">
                            <div className="col-md-4">
                                <RewardCreditItem logininfo={logininfo} />
                            </div>
                            <div className="col-md-4">
                                <TierScoreItem logininfo={logininfo} />
                            </div>
                            <div className="col-md-4">
                                <TierScoreDetailsItem feeds={feeds} logininfo={logininfo} />
                            </div>
                        </div>
                    </div>

                    <ProgressBarItem feeds={feeds} logininfo={logininfo} />

                    <div className="listing listing--reward">
                        <ul className="row">
                            <li className="col-md-4 col-sm-6">
                                <OfferItem offerList={offers} propertyList={properties} />
                            </li>
                            <li className="col-md-4 col-sm-6">
                                <ReservationItem propertyList={properties} reservationList={reservations} />
                            </li>
                            <li className="col-md-4 col-sm-6">
                                <PriceAlertItem
                                    propertyList={properties}
                                    enterpriseList={enterpriseFeed}
                                    priceList={priceAlert}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return <LoadingSpinner />;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);
