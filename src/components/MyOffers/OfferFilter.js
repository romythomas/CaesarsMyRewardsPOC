import React from "react";
import SelectList from "../Common/SelectList";
import Textbox from "../Common/Textbox";
import MultiSelectList from "../Common/MultiSelectList";
import Autocomplete from "../Common/Autocomplete";
import MarketPropertySelect from "../Common/MarketPropertySelect";
import MultiSelectDropdown from "../Common/MultiSelectDropdown";
import RangeCalendar from "../Common/RangeCalendar";
import {getOfferFilterTypes, getOfferSortTypes} from "../../constants/configs";


const OfferFilter = (props) => {
    const offerTypes = getOfferFilterTypes();
    const offerSortTypes = getOfferSortTypes();

    const {defaultSort,defaultFilter} = props;
    let defaultDateRange = "", defaultLocation = "", defaultType = "", defaultOfferCode = "";
    if(defaultFilter && defaultFilter.length) {
        defaultFilter.map((filter) => {
            const {filterType, filterValue} = filter;
            if(filterType === "date") {
                defaultDateRange = {
                    "startDate" : filterValue.startDate,
                    "endDate": filterValue.endDate
                };
            }
            if(filterType === "location") {
                defaultLocation = filterValue;
            }
            if(filterType === "type") {
                defaultType = filterValue;
            }
            if(filterType === "code") {
                defaultOfferCode = filterValue;
            }
        });
    }
    return (
        <div>
            <div className="title">
                <h1>My Offers</h1>
                <div className="sort">
                    <SelectList 
                        dataList={offerSortTypes} 
                        defaultValue={defaultSort} 
                        onClick={props.onSortingChange} />
                </div>
            </div>
            <div className="form--search">
                <ul className="row">
                    <li className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <Autocomplete />
                    </li>
                    <li className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div className="date-range-filter">
                            <RangeCalendar 
                                width="100%"
                                onChange={props.onDateRangeChange}
                                defaultValue={defaultDateRange}
                            />
                        </div>
                    </li>
                    <li className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <MultiSelectList 
                            dataList={offerTypes} 
                            title="Offer Types" 
                            selectId="offer-type" 
                            defaultValue = {defaultType} 
                            onChange={props.onOfferTypeChange} />
                    </li>
                    <li className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <Textbox 
                            textboxId = "offerCodeSearch"
                            defaultValue = {defaultOfferCode}
                            onBlur={props.onOfferCodeChange} />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OfferFilter;
