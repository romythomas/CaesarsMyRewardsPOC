import React from "react";
import { connect } from "react-redux";
import OfferItem from "./OfferItem";
import ErrorMessage from "../Common/ErrorMessage";

const mapStateToProps = (state) => ({
    filteredSortedOffers: state.offers.offers,
});

const OfferList = (props) => {
    const { filteredSortedOffers } = props;
    if(filteredSortedOffers && filteredSortedOffers.length){
        return (
            <div className="listing">
                <ul className="row">
                    {props.filteredSortedOffers.map((offer, index) => {
                        return <OfferItem key={index} offer={offer} />;
                    })}
                </ul>
            </div>
        );   
    }
    else
    {
        return (
            <ErrorMessage 
                errorText="No offers available for your selection."
                linkText="Clear Filters" 
                clearFilter={props.clearFilter} />
        )
    }
};

export default connect(mapStateToProps)(OfferList);