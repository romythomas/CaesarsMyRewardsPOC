import React, { Component } from 'react';
import { connect } from 'react-redux';
import OfferList from './OfferList'
import {FILTER_OFFER} from '../../constants/actionTypes'
import MarketPropertySelect from '../Common/MarketPropertySelect'

const mapDispatchToProps = dispatch => ({
    getFilteredOffers: (filterType, filterValue) => dispatch({ 
        type: FILTER_OFFER, filterType, filterValue 
    })
});

const OfferContainer = (props) => {
    const onLocationChange = value => {
        props.getFilteredOffers("location", value.propertyCode)
    };
    const {offerList, markets} = props;
    return (
        <div className="offerPage">
            <div className="offerFilter">
                <div className="sampleFilter">
                    <input type="checkbox" id="countfilter" name="countfilter" onChange={(e) => props.getFilteredOffers("checkbox", e.target.checked)} />
                    <label htmlFor="filter" className="filter-label"> Filter 10 Offers</label>
                </div>
                <div className="propertyFilter">
                    <MarketPropertySelect markets={markets} width="350px" onSelect={onLocationChange} />
                </div>
            </div>
            {
                (offerList && offerList.length) ?
                <OfferList offerList={offerList}/> :
                <h2 className="noOffers">No offers available</h2>
            }
                            
        </div>
    )
}

export default connect(null, mapDispatchToProps)(OfferContainer);