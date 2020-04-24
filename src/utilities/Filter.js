export const updateSelectedFilter = (selectedOfferFilters, newFilter) => {
    const existingFilterIndex = selectedOfferFilters.findIndex((filter) => {
        return filter.filterType === newFilter.filterType;
    });
    if (existingFilterIndex >= 0) {
        selectedOfferFilters[existingFilterIndex].filterValue =
            newFilter.filterValue;
    } else {
        selectedOfferFilters.push(newFilter);
    }
    return selectedOfferFilters;
};

export const filterOffers = (offers, selectedOfferFilters) => {
    let filteredOffers = offers;
    if (
        offers &&
        offers.length &&
        selectedOfferFilters &&
        selectedOfferFilters.length
    ) {
        selectedOfferFilters.map((filter) => {
            const { filterType, filterValue } = filter;
            if (filterType === "location" && filterValue) {
                filteredOffers = filteredOffers.filter((offer) => {
                    return offer.propertyList.includes(filterValue);
                });
            }
            if (filterType === "date" && filterValue) {
                filteredOffers = filteredOffers.filter((offer) => {
                    return (
                        new Date(offer.start) <= filterValue.startDate &&
                        new Date(offer.end) >= filterValue.endDate
                    );
                });
            }
            if(filterType === "type" && filterValue && filterValue.length) {
                filteredOffers = filteredOffers.filter((offer) => {
                    return filterValue.includes(offer.type);
                });
            }
            if(filterType === "code" && filterValue) {
                filteredOffers = filteredOffers.filter((offer) => {
                    return offer.id === filterValue;
                });
            }
        });
    }
    return filteredOffers;
};
