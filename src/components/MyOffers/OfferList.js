import React from "react";
import { connect } from "react-redux";
import OfferItem from "./OfferItem";

const mapStateToProps = (state) => ({
    filteredSortedOffers: state.offers.offers,
});

const OfferList = (props) => {
    if(props.filteredSortedOffers){
        return (
            <div className="list">
                {props.filteredSortedOffers.map((offer, index) => {
                    return <OfferItem key={index} offer={offer} />;
                })}
            </div>
        );   
    }
    else
    {
        return (
            <div>Loading</div>
        );
    }
    
};

export default connect(mapStateToProps)(OfferList);