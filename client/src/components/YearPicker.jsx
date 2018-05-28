import React, { Component } from 'react';
import moment from 'moment';

import { DATE_FORMAT } from '../constants'

export default class YearPicker extends Component {
    constructor(){
        super();
        this.state = {
            value: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const year = nextProps.date ? moment(nextProps.date, DATE_FORMAT).year() : '';
        if (year !== Number(prevState.year)) {
            return { year };
        }

        return null;
    }

    static isValidYear(year){
        return !!(Number(year) && year >= 1800 && year <= moment().year());
    }

    onChange(e){
        const newValue = e.target.value;
        this.setState({
            year: newValue
        }, () => {
            if (YearPicker.isValidYear(newValue)) {
                this.props.setDate(moment(this.props.date, DATE_FORMAT).year(newValue).format(DATE_FORMAT));
            }
        })
    }

    render(){
        return (
            <div className="day-picker">
                <input onChange={this.onChange} value={this.state.year} />
            </div>
        )
    }
}
