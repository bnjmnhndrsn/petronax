import React, { Component } from 'react';
import moment from 'moment';
import { times } from 'lodash';
import 'dragscroll';

import Photo from './Photo'
import { DATE_FORMAT } from './constants';

import './styles/Photos.css'

const BUFFER_SIZE = 3;

export default class Photos extends Component {
    constructor(){
        super();
        this.updatePhotos = this.updatePhotos.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.bindEl = this.bindEl.bind(this)
    }

    componentDidUpdate(prevProps){
        if (prevProps.date !== this.props.date) {
            this.ticking = false;
            const val = moment(this.props.date, DATE_FORMAT).diff(moment(prevProps.date, DATE_FORMAT), 'days');
            if (val === 1) {
                const diff = this.el.scrollLeft - (this.props.photoWidth * BUFFER_SIZE + this.props.windowWidth);
                this.el.scrollLeft = (this.props.photoWidth * (BUFFER_SIZE - 1)) + diff + this.props.windowWidth;
            } else if (val === -1) {
                const diff = this.el.scrollLeft - (this.props.photoWidth * BUFFER_SIZE);
                this.el.scrollLeft = (this.props.photoWidth * (BUFFER_SIZE + 1)) - diff;
            }
        }
    }

    updatePhotos(){
        if (this.lastKnownScrollPosition <= (this.props.photoWidth * BUFFER_SIZE)) {
            this.props.setDate(moment(this.props.date, DATE_FORMAT).subtract(1, 'day').format(DATE_FORMAT));
        } else if (this.lastKnownScrollPosition >= (this.props.photoWidth * BUFFER_SIZE + this.props.windowWidth)) {
            this.props.setDate(moment(this.props.date, DATE_FORMAT).add(1, 'day').format(DATE_FORMAT));
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
                el.scrollLeft = this.props.photoWidth * BUFFER_SIZE;
            }

            this.el = el;
        }
    }

    render(){
        if (!this.props.date) {
            return null;
        }

        const totalDates = Math.ceil((this.props.windowWidth + (2 * BUFFER_SIZE * this.props.photoWidth)) / this.props.photoWidth);

        const dates = times(totalDates, (i) => {
            return moment(this.props.date, DATE_FORMAT).add(i, 'day').format(DATE_FORMAT);
        });

        return (
            <div>
                <div className="dragscroll photos-wrapper" style={{width: `${this.props.windowWidth}px`}} ref={this.bindEl} onScroll={this.onScroll}>
                    <div className="photos-container" style={{width: `${this.props.windowWidth + (this.props.photoWidth * (2 * BUFFER_SIZE))}px` }}>
                        {
                            dates.map(date => <Photo key={date} date={date} photoWidth={this.props.photoWidth} />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
