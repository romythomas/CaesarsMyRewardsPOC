import TagManager from "react-gtm-module";
import { isMobile } from "react-device-detect";

const trackingRootName = "MyCR";
const pageCategory = "CR";
const signinStatus = "signedIn";
const deviceUsed = isMobile ? "mobile" : "fullsite";

const detaLayerName = "CaesarsRewardsData";
const eventName = "eventNameXYZ";
const gtmId = "GTM-M3G8GRQ";
const gtmAuth = "BCFx0jNZTbW6ccUTK_kOfw";
const gtmPreview = "env-1";

const recordDataLayer = (dataLayer) => {
    const tagManagerData = {
        dataLayer: dataLayer,
        events: {
            eventName: eventName
        },
        gtmId: gtmId,
        auth: gtmAuth,
        preview: gtmPreview,
        dataLayerName: detaLayerName
    };
    TagManager.initialize(tagManagerData);
};

const getDataLayerWithDefaultValue = (pageName) => {
    pageName = pageName ? pageName : "";
    return {
        page: pageName,
        L1: trackingRootName,
        L2: `${trackingRootName}: ${pageName}`,
        L3: `${trackingRootName}: ${pageName}`,
        pageCategory: pageCategory,
        signinStatus: signinStatus,
        nUrl: location.href,
        view: deviceUsed
    };
};

export const recordMyRewardsData = (tier, propcode, accountid) => {
    try {
        const { tierscore, code } = tier;
        const defaultData = getDataLayerWithDefaultValue("MyRewards");
        const myRewardsData = {
            acct_balance: tierscore ? tierscore : "",
            dom_prop: propcode ? propcode : "",
            tier: code ? code : "",
            cr_number: accountid ? accountid : ""
        };
        recordDataLayer({ ...defaultData, ...myRewardsData });
    } catch (ex) {}
};

export const recordMyOffersData = (offersCount) => {
    try {
        const defaultData = getDataLayerWithDefaultValue("MyOffers");
        const myOffersData = {
            offersCount: offersCount ? offersCount : 0
        };
        recordDataLayer({ ...defaultData, ...myOffersData });
    } catch (ex) {}
};

export const recordOffersDetailsData = (offerId) => {
    try {
        const defaultData = getDataLayerWithDefaultValue("OfferDetails");
        const offerDetailssData = {
            offerCode: offerId ? offerId : ""
        };
        recordDataLayer({ ...defaultData, ...offerDetailssData });
    } catch (ex) {}
};

export const recordErrorData = (errorMessage) => {
    try {
        const defaultData = getDataLayerWithDefaultValue("ErrorPage");
        const errorPageData = {
            errorMessage: errorMessage ? errorMessage : ""
        };
        recordDataLayer({ ...defaultData, ...errorPageData });
    } catch (ex) {}
};
