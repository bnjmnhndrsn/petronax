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

    // componentDidUpdate(prevProps){
    //     if (prevProps.date !== this.props.date) {
    //         this.ticking = false;
    //         const val = moment(this.props.date, DATE_FORMAT).diff(moment(prevProps.date, DATE_FORMAT), 'days');
    //         if (val === 1) {
    //             const diff = this.el.scrollLeft - (this.props.photoWidth * BUFFER_SIZE + this.props.windowWidth);
    //             this.el.scrollLeft = (this.props.photoWidth * (BUFFER_SIZE - 1)) + diff + this.props.windowWidth;
    //         } else if (val === -1) {
    //             const diff = this.el.scrollLeft - (this.props.photoWidth * BUFFER_SIZE);
    //             this.el.scrollLeft = (this.props.photoWidth * (BUFFER_SIZE + 1)) - diff;
    //         }
    //     }
    // }

    updatePhotos(){
        // if (this.lastKnownScrollPosition <= (this.props.photoWidth * BUFFER_SIZE)) {
        //     this.props.setDate(moment(this.props.date, DATE_FORMAT).subtract(1, 'day').format(DATE_FORMAT));
        // } else if (this.lastKnownScrollPosition >= (this.props.photoWidth * BUFFER_SIZE + this.props.windowWidth)) {
        //     this.props.setDate(moment(this.props.date, DATE_FORMAT).add(1, 'day').format(DATE_FORMAT));
        // }
        // this.ticking = false;
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
            // if (!this.el) {
            //     // TODO: Simplify this logic
            //     let offset = 0;
            //     const photosPerViewport = this.props.windowWidth / this.props.photoWidth;
            //     const photosCount = Math.ceil(photosPerViewport);
            //     if (photosCount === 1) {
            //         offset = 0;
            //     } else if (photosCount % 2 === 0) {
            //         offset = 1 - ((photosPerViewport % 2 - 1) / 2);
            //     } else {
            //         offset = .5 * (1 - Math.abs( ((photosPerViewport - 1) % 2) - 1 ));
            //     }
            //
            //     el.scrollLeft = (this.props.photoWidth * BUFFER_SIZE) + (offset * this.props.photoWidth);
            // }

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
                index: moment().diff(date, 'days'),
                date: date.format(DATE_FORMAT)
            }
        });
        console.log(dates);

        return (
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
        )
    }
}
