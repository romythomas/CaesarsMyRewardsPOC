const caesarsDomain = "http://www.caesars.com";
const staticFilesDomain = "https://caesarspoc.s3.us-east-2.amazonaws.com";

export const getOfferFilterTypes = () => {
    return ["Hotel", "Cash", "Gaming", "Entertainment", "Events", "Dining", "Other", "Package", "Favorite"];
}

export const getOfferSortTypes = () => {
    return [
        {
            value: "offerType",
            name: "Offer Type"
        },
        {
            value: "preference",
            name: "Preference"
        }
    ];
}

export const getImageUrl =()=>{
    return caesarsDomain + '/myrewards/profile/images/tr-placeholder.jpg';
}

export const getApiRootUrl =() =>{
    return staticFilesDomain + "/stubs/";
}