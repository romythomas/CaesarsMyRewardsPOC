import React from "react";
import { connect } from "react-redux";
import OfferItem from "./OfferItem";

const mapStateToProps = (state) => ({
    filteredSortedOffers: state.offers.offers,
});

const OfferList = (props) => {
    if(props.filteredSortedOffers){
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
            <div className="listing">Loading</div>
        );
    }
    
};

export default connect(mapStateToProps)(OfferList);