import React from 'react';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';

const moment = extendMoment(originalMoment);

const loadScript = () => {
    $(document).ready(function(){
        $('.dateRangeCalendar-wrap').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $(".dateRangeCalendar-content").toggle();
        });
        $('.dateRangeCalendar-wrap .txt').keypress(function(e) {
            return false;
        });
        $('.dateRangeCalendar .close').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".dateRangeCalendar-content").hide();
        });
        $(document).off('click').on('click', 'body', function(e) {
            if(e) {
                const {target} = e;
                const targetClassName = (target.className) ? "." + target.className : "";
                if(targetClassName !== "dateRangeCalendar" && $(".dateRangeCalendar").find(target).length <= 0) {
                    $('.dateRangeCalendar-content').hide();
                }
            }
        });
    });
}

const updateDateValueUI = (startDate, endDate) => {
    $('.dateRangeCalendar-wrap input:text').val(new Date(startDate).toLocaleDateString() + " - " + new Date(endDate).toLocaleDateString());
}

const DateRangeCalendar = (props)  => {
    loadScript();
    const {defaultValue, calendarId} = props;
    let {minimumDate, maximumDate} = props;
    if(!minimumDate) {
        minimumDate = moment();
    }
    if(!maximumDate) {
        maximumDate = moment().add(1, 'year');
    }
    let textToDisplay = "";
    let [defaultDateRange, setDefaultDateRange] = React.useState(null);
    if(!defaultDateRange && defaultValue && defaultValue.startDate && defaultValue.endDate) {
        const defaultStartDate = moment(defaultValue.startDate);
        const defaultEndDate = moment(defaultValue.endDate);
        if(defaultStartDate.isValid() && defaultEndDate.isValid()) {
            textToDisplay = new Date(defaultStartDate).toLocaleDateString() + " - " + new Date(defaultEndDate).toLocaleDateString();
            updateDateValueUI(defaultStartDate, defaultEndDate);
            defaultDateRange = moment.range(defaultStartDate, defaultEndDate);
        }
    }
    const onChnage = (dateRange) =>{
        if(dateRange && dateRange.start&& dateRange.start._d && dateRange.end && dateRange.end._d) {
            const startDate = dateRange.start._d;
            const endDate = dateRange.end._d;
            textToDisplay = new Date(startDate).toLocaleDateString() + " - " + new Date(endDate).toLocaleDateString();
            updateDateValueUI(startDate, endDate);
            setDefaultDateRange(moment.range(startDate, endDate));
            if(props.onChange) {
                $(".dateRangeCalendar-content").hide();
                props.onChange(startDate, endDate);
              }
        }
    }
    return (
        <div className="dateRangeCalendar">
            <div className="select-wrap dateRangeCalendar-wrap">
                <input
                    className="form-control txt"
                    type="text"
                    id={calendarId}
                    defaultValue={textToDisplay}
                    required
                />
                <label className="form-control-placeholder" htmlFor={calendarId}>
                    Start date - End date
                </label>
            </div>
                <div className="dateRangeCalendar-content">
                    <span className="close"></span>
                    <div className="dateRangeCalendar__item">
                        <DateRangePicker
                                onSelect={onChnage}
                                minimumDate={minimumDate}
                                maximumDate={maximumDate}
                                value={defaultDateRange}
                                selectionType="range"
                                numberOfCalendars={2}
                            />
                    </div>
                </div>
                </div>
    );
}

export default DateRangeCalendar;