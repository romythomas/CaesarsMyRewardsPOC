import React, { Component } from "react";
import { connect } from "react-redux";
import OfferList from "./OfferList";
import { FILTER_OFFER, SORT_OFFER } from "../../constants/actionTypes";
import MarketPropertySelect from "../Common/MarketPropertySelect";
import MultiSelectDropdown from "../Common/MultiSelectDropdown";
import RangeCalendar from "../Common/RangeCalendar"
import {filterOffers, updateSelectedFilter} from '../../utilities/Filter'
import {sortOffers} from '../../utilities/Sort'
import {getOfferFilterTypes, getOfferSortTypes} from "../../Configs/Configs"

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

class OfferContainer extends Component {
    constructor() {
        super();

        this.filterOffers = (type, value) => {
            const {selectedOfferFilters, selectedOfferSort, offers, getFilteredOffers} = this.props;
            const newFilter = {
                filterType: type,
                filterValue: value
            };
            const updatedFilters = updateSelectedFilter(selectedOfferFilters, newFilter);
            const sortType = selectedOfferSort ? selectedOfferSort : this.getDefaultSortValue();
            let filteredOffers = filterOffers(offers, updatedFilters);
            filteredOffers = sortOffers(filteredOffers, sortType);
            getFilteredOffers(filteredOffers, updatedFilters);
        }

        this.sortOffers = (sortType) => {
            const {filteredOffers, getSortedOffers} = this.props;
            if(!sortType) {
                sortType = this.getDefaultSortValue();
            }
            const sortedOffers = sortOffers(filteredOffers, sortType);
            getSortedOffers(sortedOffers, sortType);
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
        const { filteredOffers, markets } = this.props;
        const offerTypes = getOfferFilterTypes();
        const offerSortTypes = getOfferSortTypes();
        return (
            <div className="offerPage">
                <div className="offerFilterAndSort">
                    <div className="propertyFilter">
                        <MarketPropertySelect
                            markets={markets}
                            width="100%"
                            onSelect={this.onLocationChange}
                        />
                    </div>
                    <div className="dateFilter">
                        <RangeCalendar 
                            width="100%"
                            onChange={this.onDateRangeChange}
                        />
                    </div>
                    <div className="typeFilter">
                        <MultiSelectDropdown 
                            options={offerTypes} 
                            selectTitle="Offer Type" 
                            width="100%" 
                            onChange={this.onOfferTypeChange}
                        />
                    </div>
                    <div className="offerSorting">
                        <select className="offersortingoptions" onChange={this.onSortingChange}>
                            {offerSortTypes.map((sortType, index) => {
                                return (<option key={index} value={sortType.value}>{sortType.name}</option>);
                            })}
                        </select>
                    </div>
                </div>
                {filteredOffers && filteredOffers.length ? (
                    <OfferList offerList={filteredOffers} />
                ) : (
                    <h2 className="noOffers">No offers available</h2>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferContainer);
