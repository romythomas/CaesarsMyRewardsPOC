import React, { Component } from "react";
import { connect } from "react-redux";
import OfferList from "./OfferList";
import OfferFilter from './OfferFilter';
import { FILTER_SORT_OFFER } from "../../constants/actionTypes";
import {filterOffers, updateSelectedFilter} from '../../utilities/Filter'
import {sortOffers} from '../../utilities/Sort'
import {getOfferSortTypes} from "../../Configs/Configs"

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
        var selectedOfferFilters = [];
        var selectedOfferSort = "";

        this.filterOffers = (type, value) => {
            const {offers, getFilteredSortedOffers} = this.props;
            const newFilter = {
                filterType: type,
                filterValue: value
            };
            const updatedFilters = updateSelectedFilter(selectedOfferFilters, newFilter);
            const sortType = selectedOfferSort ? selectedOfferSort : this.getDefaultSortValue();
            let filteredSortedOffers = filterOffers(offers, updatedFilters);
            filteredSortedOffers = sortOffers(filteredSortedOffers, sortType);
            getFilteredSortedOffers(filteredSortedOffers);
        }

        this.sortOffers = (sortType) => {
            const {offers, getFilteredSortedOffers} = this.props;
            if(!sortType) {
                sortType = this.getDefaultSortValue();
            }
            let filteredSortedOffers = filterOffers(offers, selectedOfferFilters);
            filteredSortedOffers = sortOffers(filteredSortedOffers, sortType);
            getFilteredSortedOffers(filteredSortedOffers);
        }

        this.getDefaultSortValue = () => {
            const offerSortTypes = getOfferSortTypes();
            if(offerSortTypes && offerSortTypes.length) {
                return offerSortTypes[0].value;
            }
        }

        this.onLocationChange = value => {
            if(value && value.propertyCode){
                this.filterOffers("location", value.propertyCode);
            }
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

        this.onSortingChange = sort => {
            let sortValue = "";
            if(sort && sort.target && sort.target.value) {
                sortValue = sort.target.value;
            } else {
                sortValue = this.getDefaultSortValue();
            }
            this.sortOffers(sortValue);
        }
    }

    render() {
        return(
            <div>
            <OfferFilter onLocationChange={this.onLocationChange} 
                onDateRangeChange={this.onDateRangeChange} 
                onOfferTypeChange={this.onOfferTypeChange} 
                onSortingChange={this.onSortingChange} 
                markets={this.props.markets}/>

            <OfferList/>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
