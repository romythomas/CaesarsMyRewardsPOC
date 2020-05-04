import TagManager from 'react-gtm-module'
import {isMobile} from 'react-device-detect';

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
                    propertyNamesList.push({ "id": li.id +','+li.marketCode, "name": li.name });
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
export const getFavouriteImage = (pref) => {
    let imageUrl='';
    if(pref){
        switch(pref){
            case 'F':
                imageUrl = '../images/favorate-red.png';
                break;
            case 'N':                
            case 'V':               
                imageUrl = '../images/favorate-icon.png';
                break;
        }
    }
    return imageUrl;
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