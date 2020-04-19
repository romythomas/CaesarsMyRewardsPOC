export const updateSelectedFilter = (selectedOfferFilters, newFilter) => {
    const existingFilterIndex = selectedOfferFilters.findIndex(filter => {
        return filter.filterType === newFilter.filterType;
    });
    if(existingFilterIndex >= 0) {
        selectedOfferFilters[existingFilterIndex].filterValue = newFilter.filterValue;
    } else {
        selectedOfferFilters.push(newFilter);
    }
    return selectedOfferFilters;
}

export const filterOffers = (offers, selectedOfferFilters) => {
    let filteredOffers = offers;
    if(offers && offers.length && selectedOfferFilters && selectedOfferFilters.length) {
        selectedOfferFilters.map((filter) => {
            const {filterType, filterValue} = filter;
            if(filterType === "checkbox" && filterValue) {
                filteredOffers = filteredOffers.filter((offer, index) => { return index < 10; });
            }
            if(filterType === "location" && filterValue) {
                filteredOffers = filteredOffers.filter((offer) => { 
                    return offer.propertyList.includes(filterValue);
                });
            }
        });
    }
    return filteredOffers;
}