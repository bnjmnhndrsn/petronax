import React, { Component } from 'react';
import moment from 'moment';

import ScrollManager from './ScrollManager';
import { DATE_FORMAT, DATE_MIN, DATE_MAX } from '../constants';
import Photo from './Photo';

export default class Photos extends Component {
    constructor(){
        super();
        this.renderItem = this.renderItem.bind(this);
        this.onIndexChange = this.onIndexChange.bind(this);
    }

    renderItem({index, style}){
        return (
            <div className="photo-wrapper" key={index} style={style}>
                <Photo date={moment(DATE_MIN, DATE_FORMAT).add(index, 'days').format(DATE_FORMAT)} photoWidth={this.props.photoWidth} />
            </div>
        )
    }

    onIndexChange(index){
        this.props.setDate(moment(DATE_MIN, DATE_FORMAT).add(index, 'days').format(DATE_FORMAT));
    }

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
                renderItem={this.renderItem}
                onIndexChange={this.onIndexChange}
            />
        )
    }
}
