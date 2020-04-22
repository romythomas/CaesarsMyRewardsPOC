export const sortOffers = (offers, sortType) => {
    if (
        offers &&
        offers.length
    ) {
        if(sortType === "offerType") {
            return offers.sort((firstOffer, nextOffer) => (firstOffer.type > nextOffer.type) ? 1 : -1);
        } else if (sortType === "preference") {
            return offers.sort((firstOffer, nextOffer) => (firstOffer.pref > nextOffer.pref) ? 1 : -1);
        }
    }
    return offers;
};