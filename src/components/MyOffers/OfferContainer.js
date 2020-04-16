import React, { Component } from 'react';
import { connect } from 'react-redux';
import OfferList from './OfferList'
import {FILTER_OFFER} from '../../constants/actionTypes'

const mapStateToProps = state => ({
    filteredOffers: state.common.filteredOffers
});
  
const mapDispatchToProps = dispatch => ({
    getFilteredOffers: payload => dispatch({ 
        type: FILTER_OFFER, payload 
    })
});

class OfferContainer extends Component {
    render() {
        const {filteredOffers} = this.props;
        return(
            <div className="offerPage">
                <input type="checkbox" id="filter" name="offerfilter" onChange={(e) => this.props.getFilteredOffers(e.target.checked)} />
                <label htmlFor="offerfilter"> Filter 10 Offers</label>
                <OfferList offerList={filteredOffers}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferContainer);