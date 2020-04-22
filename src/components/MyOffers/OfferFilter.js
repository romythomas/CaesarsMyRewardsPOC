import React from "react";
import {connect} from "react-redux";
import {FILTER_OFFER, SORT_OFFER} from "../../constants/actionTypes";
import MarketPropertySelect from "../Common/MarketPropertySelect";
import MultiSelectDropdown from "../Common/MultiSelectDropdown";
import RangeCalendar from "../Common/RangeCalendar";
import {filterOffers, updateSelectedFilter} from '../../utilities/Filter';
import {sortOffers} from '../../utilities/Sort';
import {getOfferFilterTypes, getOfferSortTypes} from "../../Configs/Configs";

const mapStateToProps = (state) => ({
    offers: state.common.offers,
    filteredOffers: state.common.filteredOffers,
    selectedOfferFilters: state.common.selectedOfferFilters,
    selectedOfferSort: state.common.selectedOfferSort,
    markets: state.common.markets
});

const mapDispatchToProps = (dispatch) => ({
    getFilteredOffers: (filteredOffers, updatedFilters) =>
        dispatch({
            type: FILTER_OFFER,
            filteredOffers,
            updatedFilters
        }),
    getSortedOffers: (sortedOffers, sortType) =>
        dispatch({
            type: SORT_OFFER,
            sortedOffers,
            sortType
        })
});

const OfferFilter = (props) => {
    const { selectedOfferFilters, selectedOfferSort, offers, filteredOffers, markets, getFilteredOffers, getSortedOffers } = props;
    const offerTypes = getOfferFilterTypes();
    const offerSortTypes = getOfferSortTypes(); 

    function doFilter(type, value) {
        const newFilter = {
            filterType: type,
            filterValue: value
        };
        const updatedFilters = updateSelectedFilter(selectedOfferFilters, newFilter);
        const sortType = selectedOfferSort ? selectedOfferSort : getDefaultSortValue();
        let filteredOffersList = filterOffers(offers, updatedFilters);
        filteredOffersList = sortOffers(filteredOffersList, sortType);
        getFilteredOffers(filteredOffersList, updatedFilters);
    }

    function doSort (sortType) {
        if(!sortType) {
            sortType = getDefaultSortValue();
        }
        const sortedOffers = sortOffers(filteredOffers, sortType);
        getSortedOffers(sortedOffers, sortType);
    }

    function getDefaultSortValue() {
        if(offerSortTypes && offerSortTypes.length) {
            return offerSortTypes[0].value;
        }
    }

    function onLocationChange(value) {
        if(value && value.propertyCode){
            doFilter("location", value.propertyCode);
        }
    }

    function onDateRangeChange(startDate, endDate) {
        if(startDate && startDate.$d && endDate && endDate.$d) {
            doFilter("date", {
                startDate: startDate.$d,
                endDate: endDate.$d,
            });
        }
    }

    function onOfferTypeChange(value) {
        doFilter("type", (value && value.length) ? value : []);
    }

    function onSortingChange(sort) {
        let sortValue = "";
        if(sort && sort.target && sort.target.value) {
            sortValue = sort.target.value;
        } else {
            sortValue = getDefaultSortValue();
        }
        doSort(sortValue);
    }
    return (
        <div className="offerFilterAndSort">
            <div className="propertyFilter">
                <MarketPropertySelect
                    markets={markets}
                    width="100%"
                    onSelect={onLocationChange}
                />
            </div>
            <div className="dateFilter">
                <RangeCalendar 
                    width="100%"
                    onChange={onDateRangeChange}
                />
            </div>
            <div className="typeFilter">
                <MultiSelectDropdown 
                    options={offerTypes} 
                    selectTitle="Offer Type" 
                    width="100%" 
                    onChange={onOfferTypeChange}
                />
            </div>
            <div className="offerSorting">
                <select className="offersortingoptions" onChange={onSortingChange}>
                    {offerSortTypes.map((sortType, index) => {
                        return (<option key={index} value={sortType.value}>{sortType.name}</option>);
                    })}
                </select>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferFilter);
