import agent from "../agent";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import SpotLight from "./Common/SpotLight";
import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoadingSpinner from "./Common/LoadingSpinner";
import { history } from "../store";
import { LOGIN } from "../constants/actionTypes";
import ErrorMessage from "./Common/ErrorMessage";

const MyRewards = lazy(() => import(/* webpackChunkName: "MyRewards" */ "./MyRewards"));
const MyOffers = lazy(() => import(/* webpackChunkName: "MyOffers" */ "./MyOffers"));
const LeaderBoard = lazy(() => import(/* webpackChunkName: "LeaderBoard" */ "./Leaderboard"));
const QuestForRewards = lazy(() => import(/* webpackChunkName: "QuestForRewards" */ "./QuestForRewards"));
const Reservation = lazy(() => import(/* webpackChunkName: "Reservation" */ "./Reservations"));
const OfferDetails = lazy(() => import(/* webpackChunkName: "OfferDetails" */ "./MyOffers/OfferDetails"));

const mapStateToProps = (state) => {
    return {
        appLoaded: state.common.appLoaded,
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

class App extends Component {
    constructor() {
        super();

        this.state = {
            hasDataFetched: false
        };

        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
    }

    componentDidMount() {
        //load common data - login, offerlist and getmarkets
        Promise.all([
            agent.Auth.login(),
            agent.Offers.getOfferList(),
            agent.Markets.getMarkets(),
            agent.Properties.getProperties(),
            agent.Reservations.getReservation(),
            agent.PriceAlert.getPriceAlert(),
            agent.Enterprise.getLowestRate()
        ]).then((response) => {
            this.props.onLogin(response);
            this.setState({
                hasDataFetched: true
            });
        });
    }

    render() {
        const { hasDataFetched } = this.state;
        const { offers, markets, properties, reservations, enterpriseFeed, priceAlert, loginInfo } = this.props;
        const isPropsAvailable =
            markets.length && offers.length && properties.length && reservations && priceAlert && enterpriseFeed && loginInfo;

        return (
            <div className="main">
                <Header loginInfo={this.props.loginInfo} />
                <div id="page-content">
                    <SpotLight />
                    <div id="sub-content">
                        {!hasDataFetched ? (
                            <LoadingSpinner />
                        ) : isPropsAvailable ? (
                            <Suspense fallback={<LoadingSpinner />}>
                                <Switch>
                                    <Redirect exact from="/" to="myrewards" />
                                    <Route exact path="/myrewards" render={() => <MyRewards />} />
                                    <Route exact path="/myoffers" render={() => <MyOffers />} />
                                    <Route exact path="/leaderboard" render={() => <LeaderBoard />} />
                                    <Route exact path="/badges" render={() => <QuestForRewards />} />
                                    <Route exact path="/reservations" render={() => <Reservation />} />
                                    <Route exact path="/offerdetails/:id" render={(props) => <OfferDetails {...props} />} />
                                </Switch>
                            </Suspense>
                        ) : (
                            <ErrorMessage />
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
