import React from "react";
import SelectList from "../Common/SelectList";
import MarketPropertySelect from "../Common/MarketPropertySelect";
import MultiSelectDropdown from "../Common/MultiSelectDropdown";
import RangeCalendar from "../Common/RangeCalendar";
import {getOfferFilterTypes, getOfferSortTypes} from "../../Configs/Configs";


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
                <ul>
                    <li>
                        <div className="location-filter">
                            <MarketPropertySelect
                                markets={props.markets}
                                width="100%"
                                onSelect={props.onLocationChange}
                                defaultValue = {defaultLocation}
                            />
                        </div>
                    </li>
                    <li>
                        <div className="date-range-filter">
                            <RangeCalendar 
                                width="100%"
                                onChange={props.onDateRangeChange}
                                defaultValue={defaultDateRange}
                            />
                        </div>
                    </li>
                    <li>
                        <div className="offer-type-filter">
                            <MultiSelectDropdown 
                                    options={offerTypes} 
                                    selectTitle="Offer Type" 
                                    width="100%" 
                                    onChange={props.onOfferTypeChange}
                                    defaultValue = {defaultType}
                                />
                        </div>
                    </li>
                    <li>
                        <div className="offer-code-filter">
                            <label>Offer Code</label>
                            <input 
                                type = "text" 
                                defaultValue = {defaultOfferCode}
                                placeholder="Enter offer code" 
                                onBlur={props.onOfferCodeChange}
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OfferFilter;
