import React, { Component } from 'react';
import moment from 'moment';
import { times } from 'lodash';
import 'dragscroll';

import Photo from './Photo'
import { DATE_FORMAT, DATE_MIN } from '../constants';
import { getMaxElementSize } from '../utils';

import './styles/Photos.css'

const BUFFER_SIZE = 2;

export default class Photos extends Component {
    constructor(){
        super();
        this.updatePhotos = this.updatePhotos.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.bindEl = this.bindEl.bind(this)
    }

    updatePhotos(){
        const containerSize = this.props.windowWidth;
        const totalPossibleDates = moment().subtract(1, 'days').diff(moment(DATE_MIN, DATE_FORMAT), 'days');
        const totalSize = totalPossibleDates * this.props.photoWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalPossibleDates * this.props.photoWidth);
        const offsetPercentage = safeTotalSize <= containerSize ? 0 : this.lastKnownScrollPosition / (safeTotalSize - containerSize);
        const scrolledIndex = Math.floor(totalPossibleDates * offsetPercentage);
        const scrolledDate = moment(DATE_MIN, DATE_FORMAT).add(scrolledIndex, 'days');
        if (!moment(this.props.date, DATE_FORMAT).isSame(scrolledDate, 'days')) {
            this.props.setDate(scrolledDate.format(DATE_FORMAT));
        }

        this.ticking = false;
    }

    onScroll({target}){
        this.lastKnownScrollPosition = target.scrollLeft;

        if (!this.ticking) {
            requestAnimationFrame(this.updatePhotos);
            this.ticking = true;
        }
    }

    bindEl(el){
        if (el) {
            if (!this.el) {
                const containerSize = this.props.windowWidth;
                const totalPossibleDates = moment().subtract(1, 'days').diff(moment(DATE_MIN, DATE_FORMAT), 'days');
                const totalSize = totalPossibleDates * this.props.photoWidth;
                const safeTotalSize = Math.min(getMaxElementSize(), totalPossibleDates * this.props.photoWidth);
                const initialOffset = this._getInitialOffset();
                const offsetPercentage = totalSize <= containerSize ? 0 : initialOffset / (totalSize - containerSize);
                const offsetAdjustment = Math.round(offsetPercentage * (safeTotalSize - totalSize));
                el.scrollLeft = initialOffset + offsetAdjustment;
            }

            this.el = el;
        }
    }

    _getInitialOffset(){
        const index = moment(this.props.date, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days');
        return (this.props.photoWidth * index);
    }

    render(){
        if (!this.props.date) {
            return null;
        }

        const totalPossibleDates = moment().subtract(1, 'days').diff(moment(DATE_MIN, DATE_FORMAT), 'days');

        const renderedDates = (2 * BUFFER_SIZE) +  Math.ceil(this.props.windowWidth / this.props.photoWidth );
        const dateOffset = Math.floor(renderedDates / 2);

        const dates = times(renderedDates, (i) => {
            const date = moment(this.props.date, DATE_FORMAT).subtract(dateOffset, 'day').add(i, 'day')
            return {
                index: date.diff(moment(DATE_MIN, DATE_FORMAT), 'days'),
                date: date.format(DATE_FORMAT)
            }
        });

        const containerSize = this.props.windowWidth;
        const totalSize = totalPossibleDates * this.props.photoWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalPossibleDates * this.props.photoWidth);
        const offset = this._el ? this._el.scrollLeft : this._getInitialOffset();
        const offsetPercentage = totalSize <= containerSize ? 0 : offset / (totalSize - containerSize);
        const offsetAdjustment = Math.round(offsetPercentage * (safeTotalSize - totalSize));

        return (
            <div style={{overflow: 'visible', width: 0}}>
                <div className="photos-wrapper" style={{width: `${this.props.windowWidth}px`}} ref={this.bindEl} onScroll={this.onScroll}>
                    <div className="photos-container" style={{width: `${safeTotalSize}px` }}>
                        {
                            dates.map(obj => (
                                <div key={obj.date} style={{position: 'absolute', top: '0', bottom: '0', left: `${(obj.index * this.props.photoWidth) + offsetAdjustment}px`, width: this.props.photoWidth}}>
                                    <Photo date={obj.date} photoWidth={this.props.photoWidth} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        )
    }
}
