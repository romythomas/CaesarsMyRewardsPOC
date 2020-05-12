import {getPropertiesOfMarket, getMoment} from "./Helper";

export const updateSelectedFilter = (selectedOfferFilters, newFilter) => {
    const isDateUpdate = newFilter.filterType === "date" || newFilter.filterType === "month";
    const updatedOffers = selectedOfferFilters.filter((filter) => {
        if(isDateUpdate) {
            return (filter.filterType != "date" && filter.filterType != "month");
        } else {
            return (filter.filterType != newFilter.filterType);
        }
    });
    updatedOffers.push(newFilter);
    return updatedOffers || [];
};

export const filterOffers = (offers, selectedOfferFilters, markets) => {
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
                let propertiesToFilter = [filterValue];
                const propertiesList = getPropertiesOfMarket(markets, filterValue);
                if(propertiesList && propertiesList.length) {
                    propertiesToFilter = propertiesList.map(({ Code }) => Code)
                }
                filteredOffers = filteredOffers.filter((offer) => {
                    return (
                        offer.propertyList.some((prop) => propertiesToFilter.indexOf(prop) !== -1)
                    );
                });
            }
            if ((filterType === "date" || filterType === "month") && filterValue) {
                filteredOffers = filteredOffers.filter((offer) => {
                    const offerStart = getMoment(offer.start).startOf('day');
                    const offerEnd = getMoment(offer.end).endOf('day');
                    const filterStart = getMoment(filterValue.startDate).startOf('day');
                    const filterEnd = getMoment(filterValue.endDate).endOf('day');
                    return (
                        offerStart.isSameOrBefore(filterStart) &&
                        offerEnd.isSameOrAfter(filterEnd)
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
                    if(offer.id) {
                        return offer.id.toUpperCase().includes(filterValue.toUpperCase());
                    }
                });
            }
        });
    }
    return filteredOffers;
};
