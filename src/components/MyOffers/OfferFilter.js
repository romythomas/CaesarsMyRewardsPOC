import React from "react";
import SelectList from "../Common/SelectList";
import Textbox from "../Common/Textbox";
import MultiSelectList from "../Common/MultiSelectList";
import Autocomplete from "../Common/Autocomplete";
import SearchCalendar  from "../Common/SearchCalendar";
import {getOfferFilterTypes, getOfferSortTypes} from "../../constants/configs";


const OfferFilter = (props) => {
    const offerTypes = getOfferFilterTypes();
    const offerSortTypes = getOfferSortTypes();

    const {defaultSort,defaultFilter, markets} = props;
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

    let marketPropertyListData = [];
    markets.map((market) => {
        const marketName = market.Name;
        let propertyListNames = "";
        let parentLocation = "";
        parentLocation += market.ParentLocation ? market.ParentLocation.Code + " , " + market.ParentLocation.Name : "";
        parentLocation += market.ParentLocation && market.ParentLocation.ParentLocation ? " , " + market.ParentLocation.ParentLocation.Code + " , " + market.ParentLocation.ParentLocation.Name : "";
        const propertyList = [];
        market.Properties.map((property) => {
            const propertyName = property.Name;
            propertyListNames = propertyListNames + " , " + propertyName;
            propertyList.push({
                display: propertyName,
                value: property.Code,
                isStylingRequired: false,
                isMarket: false,
                searchdata: marketName + " , " + propertyName + " , " + parentLocation
            });
        });
        marketPropertyListData.push({
            display: marketName,
            value: market.Code,
            isStylingRequired: true,
            isMarket: true,
            searchdata: marketName + " , " + propertyListNames + " , " + parentLocation
        });
        marketPropertyListData = [...marketPropertyListData, ...propertyList]
    });

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
                        <Autocomplete 
                            dataList={marketPropertyListData}
                            stylingClass={"highlight"} 
                            elementId="market-property" 
                            title="Where do you want to go?" 
                            defaultValue={defaultLocation} 
                            onChange={props.onLocationChange} />
                    </li>
                    <li className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <SearchCalendar 
                            calendarId="offer-calendar" 
                            defaultValue={defaultDateRange} 
                            onChange={props.onDateRangeChange} />
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
                            title="Offer Code" 
                            defaultValue = {defaultOfferCode}
                            onBlur={props.onOfferCodeChange} />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OfferFilter;
