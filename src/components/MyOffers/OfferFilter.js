import React from "react";
import MarketPropertySelect from "../Common/MarketPropertySelect";
import MultiSelectDropdown from "../Common/MultiSelectDropdown";
import RangeCalendar from "../Common/RangeCalendar"
import {getOfferFilterTypes, getOfferSortTypes} from "../../Configs/Configs"


const OfferFilter = (props) => {
    const offerTypes = getOfferFilterTypes();
    const offerSortTypes = getOfferSortTypes(); 
    return (
        <div className="offerPage">
            <div className="offerFilterAndSort">
                <div className="propertyFilter">
                    <MarketPropertySelect
                        markets={props.markets}
                        width="100%"
                        onSelect={props.onLocationChange}
                    />
                </div>
                <div className="dateFilter">
                    <RangeCalendar 
                        width="100%"
                        onChange={props.onDateRangeChange}
                    />
                </div>
                <div className="typeFilter">
                    <MultiSelectDropdown 
                        options={offerTypes} 
                        selectTitle="Offer Type" 
                        width="100%" 
                        onChange={props.onOfferTypeChange}
                    />
                </div>
                <div className="offerSorting">
                    <select className="offersortingoptions" onChange={props.onSortingChange}>
                        {offerSortTypes.map((sortType, index) => {
                            return (<option key={index} value={sortType.value}>{sortType.name}</option>);
                        })}
                    </select>
                </div>
            </div>
        </div>
      );
};

export default OfferFilter;
