import TagManager from 'react-gtm-module'
import {isMobile} from 'react-device-detect';

/**
 * 
 * @param {*} dataLayer 
 */
const recordDataLayer =(dataLayer) =>{
    const tagManagerData = {
        dataLayer: dataLayer,
        events: {
          eventName: 'eventNameXYZ'
        },
        gtmId: 'GTM-M363HGQ',
        auth: 'WAeUcta8vBjHD_FnBxtJKw',
        preview: 'env-1',
        dataLayerName: 'MyRewardsDataLayer'
      }
      TagManager.initialize(tagManagerData);
}

/**
 * 
 * @param {*} pageName 
 * @param {*} tierscore 
 * @param {*} propcode 
 * @param {*} email 
 * @param {*} tierCode 
 * @param {*} accountid 
 */
export const recordMyRewardsData =(pageName, tierscore, propcode, email, tierCode, accountid) =>{
    const dataLayer = {
        page: (pageName!=null)? pageName: "MyRewards",
        L1: "MyCR",
        L2: "MyCR: " + (pageName!=null)? pageName: "MyRewards",
        L3: "MyCR: " + (pageName!=null)? pageName: "MyRewards",
        acct_balance: (tierscore!=null)? tierscore:null,
        dom_prop: (propcode!=null)? propcode:null,
        nUrl: window.location,
        pageCategory: "CR",
        signinStatus: "signedIn",
        tier: (tierCode!=null)? tierCode:null,
        cr_number: (accountid!=null)? accountid:null,
        view: (isMobile)? "mobile": "fullsite"
    };
    recordDataLayer(dataLayer);
}
/**
 * 
 * @param {*} pageName 
 * @param {*} offers 
 */
export const recordMyOffersData =(pageName, offers) =>{
    const dataLayer = {
        page: (pageName!=null)? pageName: "MyRewards",
        L1: "MyCR",
        L2: "MyCR: " + (pageName!=null)? pageName: "MyRewards",
        L3: "MyCR: " + (pageName!=null)? pageName: "MyRewards",
        nUrl: window.location,
        pageCategory: "CR",
        signinStatus: "signedIn",
        view: (isMobile)? "mobile": "fullsite",
        offers: (offers!=null)? offers : null
    };
    recordDataLayer(dataLayer);
}
/**
 * 
 * @param {*} pageName 
 * @param {*} offerid 
 */
export const recordOffersDetailsData =(pageName, offerid) =>{
    const dataLayer = {
        page: (pageName!=null)? pageName: "MyRewards",
        L1: "MyCR",
        L2: "MyCR: " + (pageName!=null)? pageName: "MyRewards",
        L3: "MyCR: " + (pageName!=null)? pageName: "MyRewards",
        nUrl: window.location,
        pageCategory: "CR",
        signinStatus: "signedIn",
        view: (isMobile)? "mobile": "fullsite",
        offerId: (offerid!=null)? offerid : null
    };
    recordDataLayer(dataLayer);
}
/**
 * 
 * @param {*} pageName 
 * @param {*} offers 
 */
export const recordErrorData =(errorText) =>{
    const dataLayer = {
        page: "Error Message",
        L1: "MyCR",
        L2: "MyCR: Error Message",
        L3: "MyCR: Error Message",
        nUrl: window.location,
        pageCategory: "CR",
        signinStatus: "signedIn",
        view: (isMobile)? "mobile": "fullsite",
        errorText: errorText
    };
    recordDataLayer(dataLayer);
}