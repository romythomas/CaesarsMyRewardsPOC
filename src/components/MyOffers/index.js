import React, { Component } from "react";
import { connect } from "react-redux";
import OfferList from "./OfferList";
import OfferFilter from './OfferFilter';
import { FILTER_SORT_OFFER } from "../../constants/actionTypes";
import {filterOffers, updateSelectedFilter} from '../../utilities/Filter';
import {sortOffers} from '../../utilities/Sort';
import {getUrlParams, recordMyOffersData, getMoment, recordGAData, recordHotJar} from '../../utilities/Helper';
import {getOfferSortTypes, getOfferFilterTypes} from "../../constants/configs";
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";

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
        }),
});

class MyOffers extends Component {
    componentWillMount() {
        this.applyDefaultFilterAndSort();
        //DataLayer & Google Analytics logging Starts
        try {
            recordMyOffersData('MyOffer', this.props.offers.length );
            recordGAData('myoffers');
            recordHotJar('myoffers');
          } catch (err) {
            //ignore datalayer error
          } 
    }

    constructor() {
        super();
        this.selectedOfferSort = "";
        this.selectedOfferFilters = [];

        //This binding is necessary to make `this` work in the callback
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onDateRangeChange = this.onDateRangeChange.bind(this);
        this.onOfferTypeChange = this.onOfferTypeChange.bind(this);
        this.onSortingChange = this.onSortingChange.bind(this);
        this.onOfferCodeChange = this.onOfferCodeChange.bind(this);
        this.clearFilter = this.clearFilter.bind(this);

    }

    updateOfferList() {
        let {selectedOfferFilters, selectedOfferSort} = this;
        const {offers, markets, getFilteredSortedOffers} = this.props;
        selectedOfferSort = selectedOfferSort ? selectedOfferSort : this.getDefaultSortValue();
        this.selectedOfferSort = selectedOfferSort;
        let filteredSortedOffers = filterOffers(offers, selectedOfferFilters, markets);
        filteredSortedOffers = sortOffers(filteredSortedOffers, selectedOfferSort);
        this.selectedOfferFilters = selectedOfferFilters;
        getFilteredSortedOffers(filteredSortedOffers, selectedOfferFilters);
    }

    filterOffers(type, value) {
        let {selectedOfferFilters} = this;
        const newFilter = {
            filterType: type,
            filterValue: value
        };
        this.selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, newFilter);
        this.updateOfferList();
    }

    sortOffers(sortType) {
        if(!sortType) {
            sortType = this.getDefaultSortValue();
        }
        this.selectedOfferSort = sortType;
        this.updateOfferList();
    }

    getDefaultSortValue() {
        const offerSortTypes = getOfferSortTypes();
        if(offerSortTypes && offerSortTypes.length) {
            return offerSortTypes[0].value;
        }
    }

    onLocationChange(value) {
        const locationValue = value ? value : null;
        this.filterOffers("location", locationValue);
    }

    onDateRangeChange(type, startDate, endDate) {
        if(startDate && endDate) {
            this.filterOffers(type ? type : "date", {
                startDate: startDate,
                endDate: endDate,
            });
        }
    }

    onOfferTypeChange(value) {
        this.filterOffers("type", (value && value.length) ? value : []);
    }

    onOfferCodeChange(element) {
        const offerCode = element ? element : "";
        this.filterOffers("code", offerCode);
    }

    onSortingChange(sort) {
        let sortValue = "";
        if(sort && sort.target && sort.target.text && sort.target.attributes && sort.target.attributes.length && sort.target.attributes[0].value) {
            sortValue = sort.target.attributes[0].value;
        } else {
            sortValue = this.getDefaultSortValue();
        }
        this.sortOffers(sortValue);
    }

    clearFilter() {
        this.applyDefaultFilterAndSort(true);
    }

    createDefaultFilterAndSort(searchParams) {
        this.selectedOfferFilters = [];
        let {selectedOfferFilters} = this;
        let filterStartDate = getMoment();
        let filterEndDate = getMoment().add(1, 'month');
        selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
            filterType: "date",
            filterValue: {
                startDate: filterStartDate,
                endDate: filterEndDate
            }
        });
        if(searchParams && Object.entries(searchParams).length) {
            const {regioncode, propcode, startdate, enddate, flexiblemonth, type, offercode, defaultsort} = searchParams;
            if(flexiblemonth) {
                const monthMoment = getMoment().month(flexiblemonth);
                if(monthMoment.isValid()) {
                    if(monthMoment.month() === getMoment().month()) {
                        filterStartDate = getMoment();
                        filterEndDate = getMoment().endOf('month');
                    } else if(monthMoment.isBefore(getMoment())) {
                        filterStartDate = monthMoment.clone().add('years', 1).startOf('month');
                        filterEndDate = monthMoment.clone().add('years', 1).endOf('month');
                    } else {
                        filterStartDate = monthMoment.clone().startOf('month');
                        filterEndDate = monthMoment.clone().endOf('month');
                    }
                }
                selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                    filterType: "month",
                    filterValue: {
                        startDate: filterStartDate,
                        endDate: filterEndDate
                    }
                });
            } else if(startdate || enddate) {
                const urlStartDate = getMoment(startdate);
                const urlEndDate = getMoment(enddate);
                if(urlStartDate.isValid() && urlStartDate.isSameOrAfter(getMoment(), 'day')) {
                    filterStartDate = urlStartDate;
                }
                if(urlEndDate.isValid() && urlEndDate.isSameOrAfter(urlStartDate, 'day')) {
                    filterEndDate = urlEndDate;
                } else {
                    filterEndDate = filterStartDate.clone().add(1, 'month');
                }
                selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                    filterType: "date",
                    filterValue: {
                        startDate: filterStartDate,
                        endDate: filterEndDate
                    }
                });
            }
            if(propcode || regioncode) {
                const {markets} = this.props;
                let locationIndex = -1;
                let locationCode = "";
                if(regioncode) {
                    locationIndex = markets.findIndex((market) => { 
                        return regioncode.toUpperCase() === market.Code.toUpperCase(); 
                    });
                    if(locationIndex >= 0) {
                        locationCode = regioncode.toUpperCase();
                    }
                } else {
                    locationIndex = markets.findIndex((market) => { 
                        return (market.Properties.findIndex((property) => { 
                            return propcode.toUpperCase() === property.Code.toUpperCase(); 
                        }) >= 0);
                    });
                    if(locationIndex >= 0) {
                        locationCode = propcode.toUpperCase();
                    }
                }
                selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                    filterType: "location",
                    filterValue: locationCode 
                });
            }
            if(type) {
                try {
                    const offerTypes = getOfferFilterTypes();
                    const offerTypeFilter = JSON.parse(type.toLowerCase());
                    const typeFilter = [];
                    offerTypes.map((type) => {
                        if(offerTypeFilter.includes(type.toLowerCase())){
                            typeFilter.push(type);
                        }
                    });
                    selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                        filterType: "type",
                        filterValue: typeFilter
                    });
                } catch (ex) {}
            }
            if(offercode) {
                selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                    filterType: "code",
                    filterValue: offercode.toUpperCase()
                });
            }
            if(defaultsort) {
                this.selectedOfferSort = defaultsort;
            }
        }
        this.selectedOfferFilters = selectedOfferFilters;
    }

    applyDefaultFilterAndSort(isAllFiltersCleared) {
        const {location} = this.props;
        const searchParams = getUrlParams(location ? location.search : "");
        this.createDefaultFilterAndSort(isAllFiltersCleared ? "" : searchParams);
        this.updateOfferList();
    }
    
    render() {
        return(
            <div className="container-fluid">
                <ScrollUpButton
                    style={{width: 40, height: 40, backgroundColor: "#ad1f23", fill: "#fff"}}
                    ShowAtPosition={500} />

                <OfferFilter onLocationChange={this.onLocationChange} 
                    onDateRangeChange={this.onDateRangeChange} 
                    onOfferTypeChange={this.onOfferTypeChange} 
                    onSortingChange={this.onSortingChange} 
                    onOfferCodeChange={this.onOfferCodeChange}
                    markets={this.props.markets}
                    defaultSort={this.selectedOfferSort} />
                <OfferList clearFilter={this.clearFilter}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
