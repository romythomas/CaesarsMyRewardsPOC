export const sortOffers = (offers, sortType) => {
    let sortedOffers = offers;
    if (
        offers &&
        offers.length
    ) {
        if(sortType === "offerType") {
            sortedOffers = offers.sort((firstOffer, nextOffer) => (firstOffer.type < nextOffer.type) ? 1 : -1);
        } else if (sortType === "preference") {
            sortedOffers = offers.sort((firstOffer, nextOffer) => (firstOffer.pref < nextOffer.pref) ? 1 : -1);
        }
    }
    return sortedOffers;
};