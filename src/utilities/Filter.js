import { getPropertiesOfMarket, getMoment } from "./Helper";

export const updateSelectedFilter = (selectedOfferFilters, newFilter) => {
    const newFilterType = newFilter.filterType;
    const updatedOffers = selectedOfferFilters.filter((filter) => {
        return filter.filterType != newFilterType;
    });
    updatedOffers.push(newFilter);
    if (newFilterType === "date" || newFilterType === "month") {
        updatedOffers.map((filter) => {
            if (filter.filterType === "date") {
                filter.isLatest = newFilterType === "date";
            }
            if (filter.filterType === "month") {
                filter.isLatest = newFilterType === "month";
            }
        });
    }
    return updatedOffers || [];
};

export const filterOffers = (offers, selectedOfferFilters, markets) => {
    let filteredOffers = offers;
    if (offers && offers.length && selectedOfferFilters && selectedOfferFilters.length) {
        selectedOfferFilters.map((filter) => {
            const { filterType, filterValue, isLatest } = filter;
            if (filterType === "location" && filterValue) {
                let propertiesToFilter = [filterValue];
                const propertiesList = getPropertiesOfMarket(markets, filterValue);
                if (propertiesList && propertiesList.length) {
                    propertiesToFilter = propertiesList.map(({ Code }) => Code);
                }
                filteredOffers = filteredOffers.filter((offer) => {
                    return offer.propertyList.some((prop) => propertiesToFilter.indexOf(prop) !== -1);
                });
            }
            if (((filterType === "date" && isLatest) || (filterType === "month" && isLatest)) && filterValue) {
                filteredOffers = filteredOffers.filter((offer) => {
                    const offerStart = getMoment(offer.start).startOf("day");
                    const offerEnd = getMoment(offer.end).endOf("day");
                    const filterStart = getMoment(filterValue.startDate).startOf("day");
                    const filterEnd = getMoment(filterValue.endDate).endOf("day");
                    return offerStart.isSameOrBefore(filterStart) && offerEnd.isSameOrAfter(filterEnd);
                });
            }
            if (filterType === "type" && filterValue && filterValue.length) {
                filteredOffers = filteredOffers.filter((offer) => {
                    return filterValue.includes(offer.type) || filterValue.includes(offer.pref);
                });
            }
            if (filterType === "code" && filterValue) {
                filteredOffers = filteredOffers.filter((offer) => {
                    if (offer.id) {
                        return offer.id.toUpperCase().includes(filterValue.toUpperCase());
                    }
                });
            }
        });
    }
    return filteredOffers;
};
