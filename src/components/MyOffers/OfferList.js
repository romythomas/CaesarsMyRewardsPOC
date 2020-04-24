import React from "react";
import { connect } from "react-redux";
import OfferItem from "./OfferItem";

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
            <div className="listing">
                <h2>No offers available</h2>
            </div>
        );
    }
    
};

export default connect(mapStateToProps)(OfferList);