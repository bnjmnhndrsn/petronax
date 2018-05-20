import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class DatePicker extends Component {
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.date !== prevState.date) {
            return { date: nextProps.date };
        }

        return null;
    }

    constructor(){
        super();
        this.state = {
            date: null,
            focused: false
        }
    }


    render(){
        return (
            <SingleDatePicker
                isOutsideRange={() => false}
                numberOfMonths={1}
                date={this.state.date ? moment(this.state.date, 'YYYY-MM-DD') : null}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                onDateChange={date => this.props.setDate(date ? date.format('YYYY-MM-DD') : date)}
                id="date-picker"
            />
        )
    }
}
