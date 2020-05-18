const caesarsDomain = "http://www.caesars.com";

export const getOfferFilterTypes = () => {
    return [
        { value: "Hotel", name: "Hotel" },
        { value: "Cash", name: "Cash" },
        { value: "Gaming", name: "Gaming" },
        { value: "Entertainment", name: "Entertainment" },
        { value: "Events", name: "Events" },
        { value: "Dining", name: "Dining" },
        { value: "Others", name: "Other" },
        { value: "Package", name: "Package" },
        { value: "F", name: "Favorite" }
    ];
};

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
};

export const getCaesarsDomain = () => {
    return caesarsDomain;
};

export const getImageUrl = () => {
    return caesarsDomain + "/myrewards/profile/images/tr-placeholder.jpg";
};

export const getApiRootUrl = () => {
    return "/stubs/";
};
