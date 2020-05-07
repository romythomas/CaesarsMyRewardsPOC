import {getPropertiesOfMarket} from "./Helper";

export const updateSelectedFilter = (selectedOfferFilters, newFilter) => {
    if(newFilter.filterType === "date") {
        selectedOfferFilters = selectedOfferFilters.filter((filter) => {
            return filter.filterType !== "month";
        });
    } else if(newFilter.filterType === "month") {
        selectedOfferFilters = selectedOfferFilters.filter((filter) => {
            return filter.filterType !== "date";
        });
    }
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
