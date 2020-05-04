import React, { Component } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import ProfileContainer from './ProfileContainer';
import {
  GET_PROFILE
} from '../../constants/actionTypes';
import TagManager from 'react-gtm-module'
import {isMobile} from 'react-device-detect';

const mapStateToProps = state => ({
  appName: state.common.appName,
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

const mapDispatchToProps = dispatch => ({
    onGetGuestProfile: payload =>
    dispatch({ type: GET_PROFILE, payload })
});

class MyRewards extends Component {

  componentWillMount(){
    this.props.onGetGuestProfile(Promise.all([
      agent.Profile.getGuestProfile(this.props.accountID),
      agent.Profile.getFeeds()
    ]));
  }

  render() {
    const {logininfo,feeds, properties} = this.props;
    if(logininfo && feeds && properties){
    /**
     * DataLayer logging Starts
     */
      const tagManagerData = {
        dataLayer: {
            page: 'MyRewards',
            L1: "MyCR",
            L2: "MyCR: myrewards",
            L3: "MyCR: myrewards",
            acct_balance: logininfo.tier.tierscore,
            dom_prop: logininfo.propcode,
            email_addr: logininfo.email,
            nUrl: window.location,
            pageCategory: "CR",
            signinStatus: "signedIn",
            tier: logininfo.tier.code,
            cr_number: logininfo.accountid,
            view: (isMobile)? "mobile": "fullsite"
        },
        events: {
          eventName: 'eventNameXYZ'
        },
        gtmId: 'GTM-M363HGQ',
        auth: 'WAeUcta8vBjHD_FnBxtJKw',
        preview: 'env-1',
        dataLayerName: 'MyRewardsDataLayer'
      }
      
      try {
        TagManager.initialize(tagManagerData);
      } catch (err) {
        //ignore datalayer error
      } 
      /** End */

      return (
        <div className="container-fluid">
          <div className="title">
            <h1>My Rewards</h1>
          </div>                
            <ProfileContainer />
        </div>
      );
    }
    else{
      return(
        <div className="container-fluid">
          <div className="title">
            <h1>Loading</h1>
          </div>  
        </div> 
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);
