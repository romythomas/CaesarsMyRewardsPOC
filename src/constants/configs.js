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
    return 'http://www.caesars.com/myrewards/profile/images/tr-placeholder.jpg';
}

export const getApiRootUrl =() =>{
    return "http://caesarspoc.s3-website.us-east-2.amazonaws.com/";
}