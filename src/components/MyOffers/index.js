import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import OfferList from "./OfferList";
import OfferFilter from "./OfferFilter";
import { FILTER_SORT_OFFER } from "../../constants/actionTypes";
import { filterOffers, updateSelectedFilter } from "../../utilities/Filter";
import { sortOffers } from "../../utilities/Sort";
import { getMoment, scrollPageToBanner } from "../../utilities/Helper";
import { getOfferSortTypes, getOfferFilterTypes } from "../../constants/configs";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import { recordMyOffersData } from "../../utilities/Gtm-Module";
import queryString from "query-string";
import LoadingSpinner from "../Common/LoadingSpinner";

const mapStateToProps = (state) => ({
    offers: state.common.offers,
    markets: state.common.markets
});

const mapDispatchToProps = (dispatch) => ({
    getFilteredSortedOffers: (filteredSortedOffers, selectedOfferFilters) =>
        dispatch({
            type: FILTER_SORT_OFFER,
            filteredSortedOffers,
            selectedOfferFilters
        })
});

class MyOffers extends Component {
    componentDidMount() {
        //DataLayer logging
        const { offers } = this.props;
        if (offers && offers.length) {
            recordMyOffersData(offers.length);
        }
        scrollPageToBanner(this.myOfferRef);
        this.applyDefaultFilterAndSort();
    }

    constructor() {
        super();

        this.myOfferRef = createRef();

        this.selectedOfferSort = "";
        this.selectedOfferFilters = [];

        this.state = {
            isDefaultFilterApplied: false
        };

        //This binding is necessary to make `this` work in the callback
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onDateRangeChange = this.onDateRangeChange.bind(this);
        this.onOfferTypeChange = this.onOfferTypeChange.bind(this);
        this.onSortingChange = this.onSortingChange.bind(this);
        this.onOfferCodeChange = this.onOfferCodeChange.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    updateOfferList() {
        let { selectedOfferFilters, selectedOfferSort } = this;
        const { offers, markets, getFilteredSortedOffers } = this.props;
        selectedOfferSort = selectedOfferSort ? selectedOfferSort : this.getDefaultSortValue();
        this.selectedOfferSort = selectedOfferSort;
        let filteredSortedOffers = filterOffers(offers, selectedOfferFilters, markets);
        filteredSortedOffers = sortOffers(filteredSortedOffers, selectedOfferSort);
        this.selectedOfferFilters = selectedOfferFilters;
        getFilteredSortedOffers(filteredSortedOffers, selectedOfferFilters);
    }

    filterOffers(type, value) {
        let { selectedOfferFilters } = this;
        const newFilter = {
            filterType: type,
            filterValue: value
        };
        this.selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, newFilter);
        this.updateOfferList();
    }

    sortOffers(sortType) {
        if (!sortType) {
            sortType = this.getDefaultSortValue();
        }
        this.selectedOfferSort = sortType;
        this.updateOfferList();
    }

    getDefaultSortValue() {
        const offerSortTypes = getOfferSortTypes();
        if (offerSortTypes && offerSortTypes.length) {
            return offerSortTypes[0].value;
        }
    }

    onLocationChange(value) {
        const locationValue = value ? value : null;
        this.filterOffers("location", locationValue);
    }

    onDateRangeChange(type, startDate, endDate) {
        if (startDate && endDate) {
            this.filterOffers(type ? type : "date", {
                startDate: startDate,
                endDate: endDate
            });
        }
    }

    onOfferTypeChange(value) {
        this.filterOffers("type", value && value.length ? value : []);
    }

    onOfferCodeChange(element) {
        const offerCode = element ? element : "";
        this.filterOffers("code", offerCode);
    }

    onSortingChange(sort) {
        this.sortOffers(sort ? sort : this.getDefaultSortValue());
    }

    clearFilter() {
        this.applyDefaultFilterAndSort(true);
    }

    createDefaultFilterAndSort(searchParams) {
        this.selectedOfferFilters = [];
        let { selectedOfferFilters } = this;
        let filterStartDate = getMoment();
        let filterEndDate = getMoment().add(1, "month");
        selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
            filterType: "date",
            filterValue: {
                startDate: filterStartDate,
                endDate: filterEndDate
            }
        });
        if (searchParams && Object.entries(searchParams).length) {
            const { regioncode, propcode, startdate, enddate, flexiblemonth, type, offercode, defaultsort } = searchParams;
            if (flexiblemonth) {
                const monthMoment = getMoment().month(flexiblemonth);
                if (monthMoment.isValid()) {
                    if (monthMoment.month() === getMoment().month()) {
                        filterStartDate = getMoment();
                        filterEndDate = getMoment().endOf("month");
                    } else if (monthMoment.isBefore(getMoment())) {
                        filterStartDate = monthMoment.clone().add("years", 1).startOf("month");
                        filterEndDate = monthMoment.clone().add("years", 1).endOf("month");
                    } else {
                        filterStartDate = monthMoment.clone().startOf("month");
                        filterEndDate = monthMoment.clone().endOf("month");
                    }
                }
                selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                    filterType: "month",
                    filterValue: {
                        startDate: filterStartDate,
                        endDate: filterEndDate
                    }
                });
            } else if (startdate || enddate) {
                const urlStartDate = getMoment(new Date(startdate));
                const urlEndDate = getMoment(new Date(enddate));
                if (urlStartDate.isValid() && urlStartDate.isSameOrAfter(getMoment(), "day")) {
                    filterStartDate = urlStartDate;
                }
                if (urlEndDate.isValid() && urlEndDate.isSameOrAfter(urlStartDate, "day")) {
                    filterEndDate = urlEndDate;
                } else {
                    filterEndDate = filterStartDate.clone().add(1, "month");
                }
                selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                    filterType: "date",
                    filterValue: {
                        startDate: filterStartDate,
                        endDate: filterEndDate
                    }
                });
            }
            if (propcode || regioncode) {
                const { markets } = this.props;
                let locationIndex = -1;
                let locationCode = "";
                if (regioncode) {
                    locationIndex = markets.findIndex((market) => {
                        return regioncode.toUpperCase() === market.Code.toUpperCase();
                    });
                    if (locationIndex >= 0) {
                        locationCode = regioncode.toUpperCase();
                    }
                } else {
                    locationIndex = markets.findIndex((market) => {
                        return (
                            market.Properties.findIndex((property) => {
                                return propcode.toUpperCase() === property.Code.toUpperCase();
                            }) >= 0
                        );
                    });
                    if (locationIndex >= 0) {
                        locationCode = propcode.toUpperCase();
                    }
                }
                selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                    filterType: "location",
                    filterValue: locationCode
                });
            }
            if (type) {
                try {
                    const offerTypes = getOfferFilterTypes();
                    const offerTypeFilter = JSON.parse(type.toLowerCase());
                    const typeFilter = [];
                    offerTypes.map((type) => {
                        if (offerTypeFilter.includes(type.name.toLowerCase())) {
                            typeFilter.push(type.value);
                        }
                    });
                    selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                        filterType: "type",
                        filterValue: typeFilter
                    });
                } catch (ex) {}
            }
            if (offercode) {
                selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                    filterType: "code",
                    filterValue: offercode.toUpperCase()
                });
            }
            if (defaultsort) {
                this.selectedOfferSort = defaultsort;
            }
        }
        this.selectedOfferFilters = selectedOfferFilters;
    }

    applyDefaultFilterAndSort(isAllFiltersCleared) {
        const { search } = location;
        const searchParams = queryString.parse(search ? search.toLowerCase() : "");
        this.createDefaultFilterAndSort(isAllFiltersCleared ? "" : searchParams);
        this.updateOfferList();
        this.setState({
            isDefaultFilterApplied: true
        });
    }

    render() {
        if (!this.state.isDefaultFilterApplied) {
            return <LoadingSpinner />;
        }
        return (
            <div className="container-fluid" ref={this.myOfferRef}>
                <ScrollUpButton ContainerClassName="scroll-top" ShowAtPosition={500} />
                <OfferFilter
                    onLocationChange={this.onLocationChange}
                    onDateRangeChange={this.onDateRangeChange}
                    onOfferTypeChange={this.onOfferTypeChange}
                    onSortingChange={this.onSortingChange}
                    onOfferCodeChange={this.onOfferCodeChange}
                    markets={this.props.markets}
                    defaultSort={this.selectedOfferSort}
                />
                <OfferList clearFilter={this.clearFilter} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
