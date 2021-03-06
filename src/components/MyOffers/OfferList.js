import React from "react";
import { connect } from "react-redux";
import OfferItem from "./OfferItem";
import { getFilterValue } from "../../utilities/Filter";
import ErrorMessage from "../Common/ErrorMessage";
import { OFFERS_LIST_ERROR } from "../../constants/errorMessages";

const mapStateToProps = (state) => ({
    filteredSortedOffers: state.offers.offers,
    selectedFilters: state.offers.appliedFilters
});

const OfferList = (props) => {
    const { filteredSortedOffers, selectedFilters } = props;
    const selectedLocation = getFilterValue(selectedFilters, "location");
    if (filteredSortedOffers && filteredSortedOffers.length) {
        return (
            <div className="listing">
                <ul className="row">
                    {props.filteredSortedOffers.map((offer, index) => {
                        return <OfferItem index={index} key={index} offer={offer} defaultProperty={selectedLocation} />;
                    })}
                </ul>
            </div>
        );
    } else {
        return <ErrorMessage errorText={OFFERS_LIST_ERROR} linkText="Clear Filters" clearFilter={props.clearFilter} />;
    }
};

export default connect(mapStateToProps)(OfferList);
