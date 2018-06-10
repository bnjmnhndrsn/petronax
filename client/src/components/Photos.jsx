import React, { Component } from 'react';
import moment from 'moment';

import ScrollManager from './ScrollManager';
import { DATE_FORMAT, DATE_MIN, DATE_MAX } from '../constants';

export default class Photos extends Component {
    render(){
        const containerWidth = this.props.windowWidth;
        const itemWidth = this.props.photoWidth;
        const totalPossibleDates = moment(DATE_MAX, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days')  + 1;
        const currentIndex = moment(this.props.date, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days');

        return (
            <ScrollManager
                currentIndex={currentIndex}
                containerWidth={containerWidth}
                itemWidth={itemWidth}
                totalLength={totalPossibleDates}
            />
        )
    }
}
