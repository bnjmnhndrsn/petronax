import React, { Component } from 'react';
import moment from 'moment';
import { times } from 'lodash';
import 'dragscroll';

import Photo from './Photo'
import { DATE_FORMAT, DATE_MIN } from '../constants';
import { getMaxElementSize } from '../utils';

import './styles/Photos.css'

const BUFFER_SIZE = 3;

export default class Photos extends Component {
    constructor(props){
        super(props);

        this.state = {
            scrollPos: this._getInitialOffset()
        };

        this.updatePhotos = this.updatePhotos.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.bindEl = this.bindEl.bind(this)
    }

    updatePhotos(){
        this.setState({
            scrollPos: this.lastKnownScrollPosition
        });
        this.ticking = false;
    }

    getDateFromScrollPos(){
        const containerSize = this.props.windowWidth;
        const totalPossibleDates = moment().subtract(1, 'days').diff(moment(DATE_MIN, DATE_FORMAT), 'days');
        const totalSize = totalPossibleDates * this.props.photoWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = safeTotalSize <= containerSize ? 0 : this.state.scrollPos / (safeTotalSize - containerSize);
        const scrolledIndex = Math.floor(totalPossibleDates * offsetPercentage);
        return moment(DATE_MIN, DATE_FORMAT).add(scrolledIndex, 'days');
    }

    onScroll({target}){
        this.lastKnownScrollPosition = target.scrollLeft;

        if (!this.ticking) {
            requestAnimationFrame(this.updatePhotos);
            this.ticking = true;
        }
    }

    _getInitialOffset(){
        const index = moment(this.props.date, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days');
        const initialScrollPos = this.props.photoWidth * index;
        const containerSize = this.props.windowWidth;
        const totalPossibleDates = moment().subtract(1, 'days').diff(moment(DATE_MIN, DATE_FORMAT), 'days');
        const totalSize = totalPossibleDates * this.props.photoWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalPossibleDates * this.props.photoWidth);
        const offsetPercentage = totalSize <= containerSize ? 0 : initialScrollPos / (totalSize - containerSize);
        console.log(offsetPercentage);
        return Math.round(offsetPercentage * safeTotalSize);
    }

    bindEl(el){
        if (el) {
            if (!this.el) {
                el.scrollLeft = this.state.scrollPos;
            }

            this.el = el;
        }
    }

    render(){
        const currentDate = this.getDateFromScrollPos();
        const leftBuffer = Math.min(BUFFER_SIZE, moment(currentDate).diff(moment(DATE_MIN, DATE_FORMAT), 'days'));
        const rightBuffer = Math.min(BUFFER_SIZE, moment().subtract(1, 'days').diff(moment(currentDate, DATE_FORMAT), 'days'));
        const visibleDates = Math.ceil(this.props.windowWidth / this.props.photoWidth );
        const renderedDates = leftBuffer + rightBuffer + visibleDates;
        const totalPossibleDates = moment().subtract(1, 'days').diff(moment(DATE_MIN, DATE_FORMAT), 'days');

        const dates = [];
        times(leftBuffer, (i) => {
            const date = moment(currentDate).subtract(leftBuffer - i, 'day');
            dates.push(date.format(DATE_FORMAT));
        });

        times(visibleDates + rightBuffer, (i) => {
            const date = moment(currentDate).add(i, 'day');
            dates.push(date.format(DATE_FORMAT));
        });

        const containerSize = this.props.windowWidth;
        const renderedSize = renderedDates * this.props.photoWidth;
        const totalSize = totalPossibleDates * this.props.photoWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalPossibleDates * this.props.photoWidth);
        const initialIndex = moment(dates[0], DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days');

        const offset = this.state.scrollPos;
        const offsetPercentage = safeTotalSize <= renderedSize ? 0 : offset / (safeTotalSize - containerSize);
        const offsetAdjustment = Math.round(offsetPercentage * (safeTotalSize - totalSize));

        return (
            <div style={{overflow: 'visible', width: 0}}>
                <div className="photos-wrapper" style={{width: `${this.props.windowWidth}px`}} ref={this.bindEl} onScroll={this.onScroll}>
                    <div className="photos-container" style={{width: `${safeTotalSize}px` }}>
                        {
                            dates.map((date, i) => {
                                const firstPosition = (initialIndex * this.props.photoWidth);
                                const left = firstPosition + (i * this.props.photoWidth) + offsetAdjustment;
                                return (
                                    <div key={date} style={{position: 'absolute', top: '0', bottom: '0', left: `${left}px`, width: this.props.photoWidth}}>
                                        <Photo date={date} photoWidth={this.props.photoWidth} />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

        )
    }
}
