import React, { Component } from 'react';
import moment from 'moment';
import { times } from 'lodash';
import 'dragscroll';

import Photo from './Photo'
import { DATE_FORMAT, DATE_MIN } from './constants';

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
        const scrolledIndex = Math.floor(this.lastKnownScrollPosition / this.props.photoWidth);
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
                const index = moment(this.props.date, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'days');
                el.scrollLeft = (this.props.photoWidth * index);
            }

            this.el = el;
        }
    }

    render(){
        if (!this.props.date) {
            return null;
        }

        const totalPossibleDates = moment().subtract(1, 'days').diff(moment(DATE_MIN, DATE_FORMAT), 'days');

        const renderedDates = (2 * BUFFER_SIZE) +  Math.ceil(this.props.windowWidth / this.props.photoWidth );
        const offset = Math.floor(renderedDates / 2);

        const dates = times(renderedDates, (i) => {
            const date = moment(this.props.date, DATE_FORMAT).subtract(offset, 'day').add(i, 'day')
            return {
                index: date.diff(moment(DATE_MIN, DATE_FORMAT), 'days'),
                date: date.format(DATE_FORMAT)
            }
        });

        return (
            <div style={{overflow: 'visible', width: 0}}>
                <div className="photos-wrapper" style={{width: `${this.props.windowWidth}px`}} ref={this.bindEl} onScroll={this.onScroll}>
                    <div className="photos-container" style={{width: `${totalPossibleDates * this.props.photoWidth}px` }}>
                        {
                            dates.map(obj => (
                                <div key={obj.date} style={{position: 'absolute', top: '0', bottom: '0', left: `${obj.index * this.props.photoWidth}px`, width: this.props.photoWidth}}>
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
