import React from "react";
import MarketPropertySelect from "../Common/MarketPropertySelect";
import MultiSelectDropdown from "../Common/MultiSelectDropdown";
import RangeCalendar from "../Common/RangeCalendar"
import {getOfferFilterTypes, getOfferSortTypes} from "../../Configs/Configs"


const OfferFilter = (props) => {
    const offerTypes = getOfferFilterTypes();
    const offerSortTypes = getOfferSortTypes(); 
    return (
        <div>
            <div className="title">
                <h1>My Offers</h1>
                <div className="filter">
                    <div className="filter-wrap">
                        <select className="offersortingoptions" onChange={props.onSortingChange}>
                            {offerSortTypes.map((sortType, index) => {
                                return (<option key={index} value={sortType.value}>{sortType.name}</option>);
                            })}
                        </select>
                    </div>
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
                            />
                        </div>
                    </li>
                    <li>
                        <div className="date-range-filter">
                            <RangeCalendar 
                                width="100%"
                                onChange={props.onDateRangeChange}
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
                                />
                        </div>
                    </li>
                    <li>
                        <div className="offer-code-filter">
                            <label>Offer Code</label>
                            <input 
                                type = "text" 
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
