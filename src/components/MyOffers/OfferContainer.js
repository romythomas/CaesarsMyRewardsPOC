import React, { Component } from 'react';
import { connect } from 'react-redux';
import OfferList from './OfferList'
import {FILTER_OFFER} from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
    getFilteredOffers: payload => dispatch({ 
        type: FILTER_OFFER, payload 
    })
});

const OfferContainer = (props) => {
    const {offerList} = props;
    return (
        <div className="offerPage">
                <input type="checkbox" id="filter" name="offerfilter" onChange={(e) => props.getFilteredOffers(e.target.checked)} />
                <label htmlFor="offerfilter"> Filter 10 Offers</label>
                <OfferList offerList={offerList}/>
            </div>
    )
}

export default connect(null, mapDispatchToProps)(OfferContainer);