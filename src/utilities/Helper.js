import TagManager from 'react-gtm-module'
import {isMobile} from 'react-device-detect';
import originalMoment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(originalMoment);

/**
 * 
 * @param {*} code 
 */
export const getTierName = (code) => {
    let tiername = '';
    if(code){
        switch(code){
                case 'GLD':
                    tiername = 'GOLD';
                    break;
                case 'PLT':
                    tiername = 'PLATINUM';
                    break;
                case 'DIA':
                    tiername = 'DIAMOND';
                    break;
                case 'DIAP':
                    tiername = 'DIAMOND PLUS';
                    break;
                case 'DIAE':
                    tiername = 'DIAMOND ElITE';
                    break;
                case 'SEV':
                    tiername = 'SEVEN STAR';
                    break;
        }
    }
    return tiername;  
}

/**
 * 
 * @param {*} tiers 
 * @param {*} code 
 */
export const getTierDetails = (tiers, code) => {   
    if(tiers && code){
        var usertier = tiers.find(t => t.name === code);
        return(usertier);
    }  
}
/**
 * 
 * @param {*} properties 
 * @param {*} code 
 */
export const getProperty = (properties, code) =>{
        if(properties && code){
        var prop = properties.find(t => t.id.toUpperCase() === code.toUpperCase());
        return(prop);
    }
}
/**
 * 
 * @param {*} list 
 */
export const buildEnterpriseResponse = (list) =>{
    var response = [];
    if(list){
        list.map((li) => {
            response.push({
                propertyCode: li.propCode,
                rateSet: li.roomtype["rateSet"],
                rate: li.roomtype["amount"]
            });
        }) 
        return(response);
    }    
}
 /**
  * 
  * @param {*} list 
  * @param {*} codes 
  */
export const getPropertiesListByCode = (list, codes) => {
    var propertyNamesList = [];
    if (list != null && list != undefined && codes) {
        list.map((li) => {
            codes[0].map((code) => {
                if (code === li.id.toUpperCase()) {
                    propertyNamesList.push(li.name);
                }
            })
        })
    }
    return propertyNamesList;
}
/**
 * 
 * @param {*} search 
 */
export const getUrlParams = (search) => {
    const params = {};
    if(search) {
        search = decodeURIComponent(search.toLowerCase());
        search = decodeURIComponent(search);
        const hashes = search.slice(search.indexOf('?') + 1).split('&');
        hashes.map(hash => {
            const [key, val] = hash.split('=')
            params[key] = decodeURIComponent(val)
        });
    }
    return params
}
/**
 * 
 * @param {*} markets 
 * @param {*} code 
 */
export const getMarketDetails = (markets, code) => {
    if(markets && code) {
        const market = markets.filter((market) => {
            return market.Code.toLowerCase() === code.toLowerCase();
        });
        if(market && market.length) {
            return market[0];
        }
    }
    return null;
}
/**
 * 
 * @param {*} markets 
 * @param {*} code 
 */
export const getPropertiesOfMarket = (markets, code) => {
    const market = getMarketDetails(markets, code);
    return market && market.Properties && market.Properties.length ? market.Properties : [];
}

/**
 * Returns the Market Code of property
 * @param {Object} markets - GetMarkets API call response.
 * @param {String} propCode - Property Code
 */
export const getMarketCodeListOfPropertyCodes = (markets, propCodes) => {
    const marketCodes = [];
    markets.map((market) => {
        const propertyIndex =  market.Properties.findIndex((property) => {
            return propCodes.includes(property.Code);
        });
        if(propertyIndex >= 0) {
            marketCodes.push(market.Code);
        }
    });
    return marketCodes;
}

/**
 * Loops through the GetMarkets API response and creates an array of markets and properties suitable for Autocomplete Component.
 * @param {Object} markets - GetMarkets API call response.
 * @returns {Array} - Array of markets and properties suitable as input for Autocomplete Component.
 */
export const getStructuredMarketsPropertiesList = (markets) => {
    let marketPropertyListData = [];
    markets.map((market) => {
        const marketName = market.Name;
        let propertyListNames = "";
        let parentLocation = "";
        parentLocation += market.ParentLocation ? market.ParentLocation.Code + " , " + market.ParentLocation.Name : "";
        parentLocation += market.ParentLocation && market.ParentLocation.ParentLocation ? " , " + market.ParentLocation.ParentLocation.Code + " , " + market.ParentLocation.ParentLocation.Name : "";
        const propertyList = [];
        market.Properties.map((property) => {
            const propertyName = property.Name;
            propertyListNames = propertyListNames + " , " + propertyName;
            propertyList.push({
                display: propertyName,
                value: property.Code,
                isStylingRequired: false,
                isMarket: false,
                searchdata: marketName + " , " + propertyName + " , " + parentLocation
            });
        });
        marketPropertyListData.push({
            display: marketName,
            value: market.Code,
            isStylingRequired: true,
            isMarket: true,
            searchdata: marketName + " , " + propertyListNames + " , " + parentLocation
        });
        marketPropertyListData = [...marketPropertyListData, ...propertyList]
    });
    return marketPropertyListData;
}

/**
 * 
 * @param {*} source 
 * @param {*} size 
 */
export const truncate = (source, size) => {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

/**
 * 
 * @param {*} pref 
 */
export const getFavouriteClassName = (pref) => {
    if(pref === "F"){
        return "active";
    }
    return "";
}

/**
 *  * @param  {...any} warnings 
 *  hide componentWillMount, componentWillUpdate, componentWillReceiveProps warnings
 */
export const hideWarning = (...warnings) =>{
    try
    {
        const warn = console.warn;
        let showWarning = true;
        if(warnings.length > 0){
            warnings.forEach(warning => {
            if(warning.includes("componentWillReceiveProps"))    showWarning = false;
            else if(warning.includes("componentWillMount"))  showWarning = false;
            else if(warning.includes("componentWillUpdate"))   showWarning = false;
            });
        }
        if(showWarning) warn(...warnings);
        console.warn  = hideWarning;
    } 
    catch (er)//swallow error
    {
        "";
    }
}
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

export const recordMyRewardsData =(pageName, tierscore, propcode, email, tierCode, accountid) =>{
    const dataLayer = {
        page: (pageName!=null)? pageName: "MyRewards",
        L1: "MyCR",
        L2: "MyCR: " + (pageName!=null)? pageName: "MyRewards",
        L3: "MyCR: " + (pageName!=null)? pageName: "MyRewards",
        acct_balance: (tierscore!=null)? tierscore:null,
        dom_prop: (propcode!=null)? propcode:null,
        email_addr: (email!=null)? email:null,
        nUrl: window.location,
        pageCategory: "CR",
        signinStatus: "signedIn",
        tier: (tierCode!=null)? tierCode:null,
        cr_number: (accountid!=null)? accountid:null,
        view: (isMobile)? "mobile": "fullsite"
    };
    recordDataLayer(dataLayer);
}
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
 * Returns moment format of the date value passed in.
 * @param {String} dateValue - A date value in string format.
 * @returns {Object} - Moment object value of the date.
 */
export const getMoment = (dateValue) => {
    if(dateValue) {
        return moment(dateValue);
    }
    return moment();
}

/**
 * Returns moment range of two date values passed in.
 * @param {String} startDate - A date value in moment format.
 * @param {String} endDate - A date value in moment format.
 * @returns {Object} - Moment range object of two dates.
 */
export const getMomentRange = (startDate, endDate) => {
    return moment.range(startDate, endDate);
}