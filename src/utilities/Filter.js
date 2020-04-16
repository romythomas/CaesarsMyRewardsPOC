export const filterOffers = (offers, filtertype, filtervalue) => {
    let filteredOffers = offers;
    if(offers && offers.length) {
        if(filtertype === "checkbox" && filtervalue) {
            filteredOffers = filteredOffers.filter((offer, index) => { return index < 10; });
        }
    }
    return filteredOffers;
}