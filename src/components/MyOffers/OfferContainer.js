import React, { Component } from "react";
import { connect } from "react-redux";
import OfferList from "./OfferList";
import { FILTER_OFFER } from "../../constants/actionTypes";
import MarketPropertySelect from "../Common/MarketPropertySelect";

const mapStateToProps = (state) => ({
    filteredOffers: state.common.filteredOffers,
    markets: state.common.markets
});

const mapDispatchToProps = (dispatch) => ({
    getFilteredOffers: (filterType, filterValue) =>
        dispatch({
            type: FILTER_OFFER,
            filterType,
            filterValue
        }),
});

class OfferContainer extends Component {
    constructor() {
        super();

        this.onLocationChange = value => {
            if(value && value.propertyCode){
                this.props.getFilteredOffers("location", value.propertyCode);
            }
        }

        this.dateRangeChanged = () => {
            const startDateElement = document.getElementsByClassName("startDate");
            const endDateElement = document.getElementsByClassName("endDate");
            if(startDateElement && startDateElement.length && endDateElement && endDateElement.length){
                const errorElement = document.getElementsByClassName("dateerror")[0];
                const startDate = new Date(
                    startDateElement[0].value + "T00:00:00"
                );
                const endDate = new Date(
                    endDateElement[0].value + "T23:59:59"
                );
                if (
                    startDate.toString() != "Invalid Date" &&
                    endDate.toString() != "Invalid Date" &&
                    endDate >= startDate
                ) {
                    errorElement.className = "dateerror hide";
                    this.props.getFilteredOffers("date", {
                        startDate: startDate,
                        endDate: endDate,
                    });
                } else {
                    errorElement.className = "dateerror";
                }
            }
        }
    }

    componentDidMount() {
        this.dateRangeChanged();
    }
    
    render() {
        const { filteredOffers, markets } = this.props;
        return (
            <div className="offerPage">
                <div className="offerFilter">
                    <div className="propertyFilter">
                        <MarketPropertySelect
                            markets={markets}
                            width="100%"
                            onSelect={this.onLocationChange}
                        />
                    </div>
                    <div className="dateFilter">
                        <div className="startDateFilter">
                            <label>Start Date</label>
                            <input
                                type="text"
                                className="startDate"
                                placeholder="yyyy-mm-dd"
                                defaultValue="2020-05-01"
                                onBlur={this.dateRangeChanged}
                            />
                        </div>
                        <div className="endDateFilter">
                            <label>End Date  </label>
                            <input
                                type="text"
                                className="endDate"
                                placeholder="yyyy-mm-dd"
                                defaultValue="2020-05-31"
                                onBlur={this.dateRangeChanged}
                            />
                        </div>
                        <p className="dateerror hide">
                            Enter proper dates (yyyy-mm-dd)
                        </p>
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
