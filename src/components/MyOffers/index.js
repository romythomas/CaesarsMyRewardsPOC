import React, { Component } from "react";
import { connect } from "react-redux";
import OfferList from "./OfferList";
import OfferFilter from './OfferFilter';
import { FILTER_SORT_OFFER } from "../../constants/actionTypes";
import {filterOffers, updateSelectedFilter} from '../../utilities/Filter';
import {sortOffers} from '../../utilities/Sort';
import {getUrlParams} from '../../utilities/Helper';
import {getOfferSortTypes, getOfferFilterTypes} from "../../Configs/Configs";

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
            const locationValue = value && value.propertyCode ? value.propertyCode : null;
            this.filterOffers("location", locationValue);
        }

        this.onDateRangeChange = (startDate, endDate) => {
            if(startDate && startDate.$d && endDate && endDate.$d) {
                this.filterOffers("date", {
                    startDate: startDate.$d,
                    endDate: endDate.$d,
                });
            }
        }

        this.onOfferTypeChange = value => {
            this.filterOffers("type", (value && value.length) ? value : []);
        }

        this.onOfferCodeChange = element => {
            const offerCode = (element && element.target && element.target.value) ? element.target.value : "";
            this.filterOffers("code", offerCode);
        }

        this.onSortingChange = sort => {
            let sortValue = "";
            if(sort && sort.target && sort.target.value) {
                sortValue = sort.target.value;
            } else {
                sortValue = this.getDefaultSortValue();
            }
            this.sortOffers(sortValue);
        }

        this.createDefaultFilterAndSort = (searchParams) => {
            selectedOfferFilters = [];
            let filterStartDate = new Date();
            let filterEndDate = new Date(new Date().setDate(filterStartDate.getDate() + 30));
            selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                filterType: "date",
                filterValue: {
                    startDate: filterStartDate,
                    endDate: filterEndDate
                }
            });
            if(searchParams) {
                const {regioncode, propcode, startdate, enddate, type, offercode, defaultsort} = searchParams;
                if(startdate || enddate) {
                    const UrlStartdate = new Date(startdate);
                    const UrlEbdDate = new Date(enddate);
                    if(UrlStartdate.toString() !== "Invalid Date" && UrlStartdate >= new Date()) {
                        filterStartDate = UrlStartdate;
                    }
                    if(UrlEbdDate.toString() !== "Invalid Date" && UrlEbdDate >= UrlStartdate) {
                        filterEndDate = UrlEbdDate;
                    } else {
                        filterEndDate = new Date(new Date(filterStartDate).setDate(filterStartDate.getDate() + 30));
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
                    const locationCode = propcode ? propcode : (regioncode ? regioncode : "");
                    selectedOfferFilters = updateSelectedFilter(selectedOfferFilters, {
                        filterType: "location",
                        filterValue: locationCode.toUpperCase() 
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
