import React, { Component } from 'react';
import moment from 'moment';
import { times } from 'lodash';
import 'dragscroll';

import Photo from './Photo'
import { PHOTO_WIDTH, DATE_FORMAT } from './constants';

import './styles/Photos.css'

const VIEWPORT_SIZE = 2;
const BUFFER_SIZE = 3;

export default class Photos extends Component {
    constructor(){
        super();
        this.updatePhotos = this.updatePhotos.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidUpdate(prevProps){
        if (prevProps.date !== this.props.date) {
            this.ticking = false;
            const val = moment(this.props.date, DATE_FORMAT).diff(moment(prevProps.date, DATE_FORMAT), 'days');
            if (val === 1) {
                const diff = this.el.scrollLeft - (PHOTO_WIDTH * (BUFFER_SIZE + VIEWPORT_SIZE));
                this.el.scrollLeft = (PHOTO_WIDTH * (BUFFER_SIZE + VIEWPORT_SIZE - 1)) + diff;
            } else if (val === -1) {
                const diff = this.el.scrollLeft - (PHOTO_WIDTH * BUFFER_SIZE);
                this.el.scrollLeft = (PHOTO_WIDTH * (BUFFER_SIZE + 1)) - diff;
            }
        }
    }

    updatePhotos(){
        if (this.lastKnownScrollPosition <= (PHOTO_WIDTH * BUFFER_SIZE)) {
            this.props.setDate(moment(this.props.date, DATE_FORMAT).subtract(1, 'day').format(DATE_FORMAT));
        } else if (this.lastKnownScrollPosition >= (PHOTO_WIDTH * (BUFFER_SIZE + VIEWPORT_SIZE))) {
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

    render(){
        if (!this.props.date) {
            return null;
        }

        const dates = times(VIEWPORT_SIZE + (2 * BUFFER_SIZE), (i) => {
            return moment(this.props.date, DATE_FORMAT).add(i, 'day').format(DATE_FORMAT);
        });

        return (
            <div>
                <div className="dragscroll photos-wrapper" style={{width: `${PHOTO_WIDTH * VIEWPORT_SIZE}px`}} ref={(el) => {
                        if (el) {
                            if (!this.el) {
                                el.scrollLeft = PHOTO_WIDTH * BUFFER_SIZE;
                            }

                            this.el = el;
                        }
                    }} onScroll={this.onScroll}>
                    <div className="photos-container" style={{width: `${PHOTO_WIDTH * (VIEWPORT_SIZE + 2 * BUFFER_SIZE)}px` }}>
                        {
                            dates.map(date => <Photo key={date} date={date} />)
                        }
                    </div>
                </div>
            </div>

        )
    }
}
