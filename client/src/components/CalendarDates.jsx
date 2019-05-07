import React, { Component } from 'react';
import moment from 'moment';

import VirtualizedDragManager from './VirtualizedDragManager';
import { DATE_FORMAT, DATE_MIN, DATE_MAX } from '../constants';
import CalendarDate from './CalendarDate';
import { FixedSizeGrid as Grid } from 'react-window';

export default class CalendarDates extends Component {
    constructor(){
        super();
        this.renderItem = this.renderItem.bind(this);
        this.onIndexChange = this.onIndexChange.bind(this);
        this.grid = React.createRef();
    }
    
    // componentDidMount(){
    //     const currentIndex = moment(this.props.date, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days');
    //     this.grid.current && this.grid.current.scrollToItem({index})
    // }

    renderItem({columnIndex, style}){
        return (
            <div className="photo-wrapper" key={columnIndex} style={style}>
                <CalendarDate date={moment(DATE_MIN, DATE_FORMAT).add(columnIndex, 'days').format(DATE_FORMAT)} photoWidth={this.props.photoWidth} />
            </div>
        )
    }

    onIndexChange({visibleColumnStartIndex}){
        this.props.setDate(moment(DATE_MIN, DATE_FORMAT).add(visibleColumnStartIndex, 'days').format(DATE_FORMAT));
    }

    render(){
        const containerWidth = this.props.windowWidth;
        const itemWidth = this.props.photoWidth;
        const totalPossibleDates = moment(DATE_MAX, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days')  + 1;
        const currentIndex = moment(this.props.date, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days');
        
        return (
            <div className="calendar-dates">
                <Grid
                    columnCount={totalPossibleDates}
                    columnWidth={itemWidth}
                    rowCount={1}
                    height={500}
                    rowHeight={500}
                    width={containerWidth}
                    onItemsRendered={this.onIndexChange}
                    ref={this.grid}
                    initialScrollLeft={currentIndex * itemWidth}
                >
                    { this.renderItem }
                </Grid>
            </div>

        )
    }
}

// <VirtualizedDragManager
//     bufferSize={2}
//     scrollDirection="horizontal"
//     currentIndex={currentIndex}
//     containerSize={containerWidth}
//     itemSize={itemWidth}
//     totalItems={totalPossibleDates}
//     renderItem={this.renderItem}
//     onIndexChange={this.onIndexChange}
// />
