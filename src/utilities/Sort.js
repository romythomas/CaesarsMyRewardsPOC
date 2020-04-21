export const sortOffers = (offers, sortType) => {
    let sortedOffers = offers;
    if (
        offers &&
        offers.length
    ) {
        if(sortType === "offerType") {
            sortedOffers = sortedOffers.sort((offer) => {
                return offer.type;
            });
        }
        else if(sortType === "preference") {
            sortedOffers = sortedOffers.sort((offer) => {
                return offer.pref;
            });
        }
    }
    return sortedOffers;
};