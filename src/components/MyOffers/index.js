import React, { Component } from 'react';
import agent from '../../agent';
import OfferContainer from './OfferContainer';
import { connect } from 'react-redux';
import {
  GET_OFFER
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token,
  accountID: state.auth.accountID,
  offers: state.offerList.offers
});

const mapDispatchToProps = dispatch => ({
  onGetOfferList: (accountID) =>
  dispatch({ type: GET_OFFER, payload: agent.Offers.getOfferList(accountID) })
});

class MyOffers extends Component {
  componentWillMount() {
    this.props.onGetOfferList(this.props.accountID);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="page">
        <OfferContainer/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
