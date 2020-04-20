import React, { Component } from "react";
import { connect } from "react-redux";
import OfferList from "./OfferList";
import { FILTER_OFFER } from "../../constants/actionTypes";
import MarketPropertySelect from "../Common/MarketPropertySelect";

const mapDispatchToProps = (dispatch) => ({
    getFilteredOffers: (filterType, filterValue) =>
        dispatch({
            type: FILTER_OFFER,
            filterType,
            filterValue,
        }),
});

const OfferContainer = (props) => {
    const onLocationChange = (value) => {
        props.getFilteredOffers("location", value.propertyCode);
    };
    const dateRangeChanged = (event) => {
        event.preventDefault();
        const errorElement = document.getElementsByClassName("dateerror")[0];
        const startDate = new Date(
            document.getElementsByClassName("startDate")[0].value + "T00:00:00"
        );
        const endDate = new Date(
            document.getElementsByClassName("endDate")[0].value + "T23:59:59"
        );
        if (
            startDate.toString() != "Invalid Date" &&
            endDate.toString() != "Invalid Date" &&
            endDate >= startDate
        ) {
            errorElement.className = "dateerror hide";
            props.getFilteredOffers("date", {
                startDate: startDate,
                endDate: endDate,
            });
        } else {
            errorElement.className = "dateerror";
        }
    };
    const { offerList, markets } = props;
    return (
        <div className="offerPage">
            <div className="offerFilter">
                <div className="sampleFilter">
                    <input
                        type="checkbox"
                        id="countfilter"
                        name="countfilter"
                        onChange={(e) =>
                            props.getFilteredOffers(
                                "checkbox",
                                e.target.checked
                            )
                        }
                    />
                    <label htmlFor="filter" className="filter-label">
                        {" "}
                        Filter 10 Offers
                    </label>
                </div>
                <div className="propertyFilter">
                    <MarketPropertySelect
                        markets={markets}
                        width="100%"
                        onSelect={onLocationChange}
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
                            onBlur={(e) => dateRangeChanged(e)}
                        />
                    </div>
                    <div className="endDateFilter">
                        <label>End Date  </label>
                        <input
                            type="text"
                            className="endDate"
                            placeholder="yyyy-mm-dd"
                            defaultValue="2020-05-31"
                            onBlur={(e) => dateRangeChanged(e)}
                        />
                    </div>
                    <p className="dateerror hide">
                        Enter proper dates (yyyy-mm-dd)
                    </p>
                </div>
            </div>
            {offerList && offerList.length ? (
                <OfferList offerList={offerList} />
            ) : (
                <h2 className="noOffers">No offers available</h2>
            )}
        </div>
    );
};

export default connect(null, mapDispatchToProps)(OfferContainer);
