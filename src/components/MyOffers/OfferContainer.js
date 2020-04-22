import React from "react";
import {connect} from "react-redux";
import OfferList from "./OfferList";
import OfferFilter from "./OfferFilter";

const mapStateToProps = (state) => ({
    filteredOffers: state.common.filteredOffers
});

const OfferContainer = (props) => {
    const {filteredOffers} = props;
    return (
        <div className="offerPage">
            <OfferFilter />
            {filteredOffers && filteredOffers.length ? (
                <OfferList offerList={filteredOffers} />
            ) : (
                <h2 className="noOffers">No offers available</h2>
            )}
        </div>
    );
}

export default connect(mapStateToProps)(OfferContainer);
