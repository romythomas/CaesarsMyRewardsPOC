import React, { Component } from 'react';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

class RangeCalendar extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        let startDt = new Date();
        let endDt = new Date().setDate(startDt.getDate() + 30);
        let {width} = this.props;
        width = width ? width : 500;

        const onDateChange = (startDate, endDate) =>{
            if(this.props.onChange)
            {
                this.props.onChange(startDate, endDate);
            }
        }

        return(
            <div style={{width: width}}>
                <RangeDatePicker
                    startDate={startDt}
                    endDate={endDt}
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
}

export default RangeCalendar;