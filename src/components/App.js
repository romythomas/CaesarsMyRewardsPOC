import agent from "../agent";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import SpotLight from "./Common/SpotLight";
import SideNavigation from "./Common/SideNavigation";
import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { hideWarning, scrollPageToBanner } from "../utilities/Helper";
import LoadingSpinner from "./Common/LoadingSpinner";
import { history } from "../store";
import { LOGIN } from "../constants/actionTypes";

const MyRewards = lazy(() => import(/* webpackChunkName: "MyRewards" */ "./MyRewards"));
const MyOffers = lazy(() => import(/* webpackChunkName: "MyOffers" */ "./MyOffers"));
const LeaderBoard = lazy(() => import(/* webpackChunkName: "LeaderBoard" */ "./Leaderboard"));
const QuestForRewards = lazy(() => import(/* webpackChunkName: "QuestForRewards" */ "./QuestForRewards"));
const Reservation = lazy(() => import(/* webpackChunkName: "Reservation" */ "./Reservations"));
const OfferDetails = lazy(() => import(/* webpackChunkName: "OfferDetails" */ "./MyOffers/OfferDetails"));

const mapStateToProps = (state) => {
    return {
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        loginInfo: state.common.loginInfo,
        redirectTo: state.common.redirectTo,
        offers: state.common.offers,
        markets: state.common.markets,
        properties: state.common.properties,
        reservations: state.common.reservations,
        priceAlert: state.common.priceAlert,
        enterpriseFeed: state.common.enterpriseFeed
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLogin: (payload) => dispatch({ type: LOGIN, payload })
});

hideWarning();

const loadScript = () => {
    $(document).ready(function () {
        scrollPageToBanner();
    });
};

class App extends Component {
    constructor() {
        super();

        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
    }

    componentWillMount() {
        //load common data - login, offerlist and getmarkets
        this.props.onLogin(
            Promise.all([
                agent.Auth.login(),
                agent.Offers.getOfferList(this.props.accountID),
                agent.Markets.getMarkets(),
                agent.Properties.getProperties(),
                agent.Reservations.getReservation(),
                agent.PriceAlert.getPriceAlert(),
                agent.Enterprise.getLowestRate()
            ])
        );
    }

    render() {
        loadScript();
        const { offers, markets, properties, reservations, enterpriseFeed, priceAlert, loginInfo } = this.props;
        if (
            markets &&
            markets.length &&
            offers &&
            offers.length &&
            properties &&
            reservations &&
            priceAlert &&
            enterpriseFeed &&
            loginInfo
        ) {
            return (
                <div>
                    <Header appName={this.props.appName} loginInfo={this.props.loginInfo} />
                    <SideNavigation appName={this.props.appName}></SideNavigation>
                    <div id="page-content">
                        <SpotLight appName={this.props.appName}></SpotLight>
                        <div id="sub-content">
                            <Suspense fallback={<LoadingSpinner />}>
                                <Switch>
                                    <Redirect exact from="/" to="myrewards" />
                                    <Route exact path="/myrewards" component={MyRewards} />
                                    <Route exact path="/myoffers" component={MyOffers} />
                                    <Route exact path="/leaderboard" component={LeaderBoard} />
                                    <Route exact path="/badges" component={QuestForRewards} />
                                    <Route exact path="/reservations" component={Reservation} />
                                    <Route exact path="/offerdetails/:id" component={OfferDetails} />
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                    <Footer appName={this.props.appName}> </Footer>
                </div>
            );
        } else {
            return (
                <div>
                    <Header appName={this.props.appName} loginInfo={this.props.loginInfo} />
                    <LoadingSpinner />
                    <Footer appName={this.props.appName}> </Footer>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
