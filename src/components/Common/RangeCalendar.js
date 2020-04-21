import React from 'react';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

const RangeCalendar = (props)  => {

    var startDt   = new Date();
    var endDt   =   new Date().setDate(startDt.getDate()+30);
    const width = props.width ? props.width : 500;

    const onDateChange = (startDate, endDate) =>{
        if(props.onChange)
        {
        props.onChange(startDate, endDate);
        }
    }

    return(
        <div style={{width: width}}>
        <RangeDatePicker
            startDate={new Date()}
            endDate={new Date()}
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date(2100, 0, 1)}
            onChange={(startDate, endDate) => onDateChange(startDate,endDate)}
            dateFormat="MM/DD/YYYY"
            monthFormat="MMM YYYY"
            startDatePlaceholder="Start Date"
            endDatePlaceholder="End Date"
            disabled={false}
            className="my-own-class-name"
            startWeekDay="monday"
        />
        </div>
    );
}

export default RangeCalendar;