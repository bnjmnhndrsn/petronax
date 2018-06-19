import React, { Component } from 'react';
import moment from 'moment';

//import VirtualizedScrollManager from './VirtualizedScrollManager';
import VirtualizedDragManager from './VirtualizedDragManager';
import { DATE_FORMAT, DATE_MIN, DATE_MAX } from '../constants';
import CalendarDate from './CalendarDate';

export default class CalendarDates extends Component {
    constructor(){
        super();
        this.renderItem = this.renderItem.bind(this);
        this.onIndexChange = this.onIndexChange.bind(this);
    }

    renderItem({index, style}){
        return (
            <div className="photo-wrapper" key={index} style={style}>
                <CalendarDate date={moment(DATE_MIN, DATE_FORMAT).add(index, 'days').format(DATE_FORMAT)} photoWidth={this.props.photoWidth} />
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
            <div style={{height: '100%'}}>
                <VirtualizedDragManager
                    bufferSize={2}
                    scrollDirection="horizontal"
                    currentIndex={currentIndex}
                    containerSize={containerWidth}
                    itemSize={itemWidth}
                    totalItems={totalPossibleDates}
                    renderItem={this.renderItem}
                    onIndexChange={this.onIndexChange}
                />
            </div>

        )
    }
}
