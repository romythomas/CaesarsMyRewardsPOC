import React, { Component } from "react";
import { connect } from "react-redux";
import OfferList from "./OfferList";
import OfferFilter from './OfferFilter';
import { FILTER_SORT_OFFER } from "../../constants/actionTypes";
import {filterOffers, updateSelectedFilter} from '../../utilities/Filter';
import {sortOffers} from '../../utilities/Sort';
import {getUrlParams, recordMyOffersData, getMoment} from '../../utilities/Helper';
import {getOfferSortTypes, getOfferFilterTypes} from "../../constants/configs";
import ReactGA from 'react-ga';

const trackingId = "UA-165835615-1"; 
ReactGA.initialize(trackingId);
ReactGA.pageview('/myoffers');

const mapStateToProps = (state) => ({
    offers: state.common.offers,
    markets: state.common.markets
});

const mapDispatchToProps = (dispatch) => ({
    getFilteredSortedOffers: (filteredSortedOffers) =>
        dispatch({
            type: FILTER_SORT_OFFER,
            filteredSortedOffers
        }),
});

class MyOffers extends Component {
    constructor() {
        super();
        this.selectedOfferFilters = [];
        this.selectedOfferSort = "";

        let selectedOfferFilters = [];
        let selectedOfferSort = "";

        this.updateOfferList = () => {
            const {offers, markets, getFilteredSortedOffers} = this.props;
            selectedOfferSort = selectedOfferSort ? selectedOfferSort : this.getDefaultSortValue();
            this.selectedOfferSort = selectedOfferSort;
            this.selectedOfferFilters = selectedOfferFilters;
            let filteredSortedOffers = filterOffers(offers, selectedOfferFilters, markets);
            filteredSortedOffers = sortOffers(filteredSortedOffers, selectedOfferSort);
            getFilteredSortedOffers(filteredSortedOffers);
        }

        this.filterOffers = (type, value) => {
            const newFilter = {
                filterType: type,
                filterValue: value
            };
            selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, newFilter);
            this.updateOfferList();
        }

        this.sortOffers = (sortType) => {
            if(!sortType) {
                sortType = this.getDefaultSortValue();
            }
            selectedOfferSort = sortType;
            this.updateOfferList();
        }

        this.getDefaultSortValue = () => {
            const offerSortTypes = getOfferSortTypes();
            if(offerSortTypes && offerSortTypes.length) {
                return offerSortTypes[0].value;
            }
        }

        this.onLocationChange = value => {
            const locationValue = value ? value : null;
            this.filterOffers("location", locationValue);
        }

        this.onDateRangeChange = (type, startDate, endDate) => {
            if(startDate && endDate) {
                this.filterOffers(type ? type : "date", {
                    startDate: startDate,
                    endDate: endDate,
                });
            }
        }

        this.onOfferTypeChange = value => {
            this.filterOffers("type", (value && value.length) ? value : []);
        }

        this.onOfferCodeChange = element => {
            const offerCode = element ? element : "";
            this.filterOffers("code", offerCode);
        }

        this.onSortingChange = sort => {
            let sortValue = "";
            if(sort && sort.target && sort.target.text && sort.target.attributes && sort.target.attributes.length && sort.target.attributes[0].value) {
                sortValue = sort.target.attributes[0].value;
            } else {
                sortValue = this.getDefaultSortValue();
            }
            this.sortOffers(sortValue);
        }

        this.createDefaultFilterAndSort = (searchParams) => {
            selectedOfferFilters = [];
            let filterStartDate = getMoment();
            let filterEndDate = getMoment().add(1, 'month');
            selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                filterType: "date",
                filterValue: {
                    startDate: filterStartDate,
                    endDate: filterEndDate
                }
            });
            if(searchParams) {
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
                    selectedOfferSort = defaultsort;
                }
            }
        }

        this.applyDefaultFilterAndSort = () => {
            const {location} = this.props;
            const searchParams = getUrlParams(location ? location.search : "");
            this.createDefaultFilterAndSort(searchParams);
            this.updateOfferList();
        }
    }
    
    render() {
        this.applyDefaultFilterAndSort();
         /**
         * DataLayer logging Starts
         */
          try {
            recordMyOffersData('MyOffer', this.props.offers.length );
          } catch (err) {
            //ignore datalayer error
          } 
          /** End */

        return(
            <div className="container-fluid">
                <OfferFilter onLocationChange={this.onLocationChange} 
                    onDateRangeChange={this.onDateRangeChange} 
                    onOfferTypeChange={this.onOfferTypeChange} 
                    onSortingChange={this.onSortingChange} 
                    onOfferCodeChange={this.onOfferCodeChange}
                    markets={this.props.markets}
                    defaultSort={this.selectedOfferSort}
                    defaultFilter={this.selectedOfferFilters}/>
                <OfferList/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
