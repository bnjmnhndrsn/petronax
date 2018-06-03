import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { times } from 'lodash';

import Photo from './Photo'
import { PHOTO_WIDTH, DATE_FORMAT } from './constants';

import './styles/Photos.css'

const mapStateToProps = (state) => ({
    date: state.ui.date,
});

const VIEWPORT_SIZE = 2;
const BUFFER_SIZE = 3;

export class Photos extends Component {
    constructor(){
        super();

        this.state = {
            idx: 0
        };

        this.updatePhotos = this.updatePhotos.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    updatePhotos(){
        if (this.lastKnownScrollPosition <= (PHOTO_WIDTH * BUFFER_SIZE)) {
            const diff = this.el.scrollLeft - (PHOTO_WIDTH * BUFFER_SIZE);
            this.setState((newState) => {
                return {idx: newState.idx - 1}
            }, () => {
                this.el.scrollLeft = (PHOTO_WIDTH * (BUFFER_SIZE + 1)) - diff;
            });
        } else if (this.lastKnownScrollPosition >= (PHOTO_WIDTH * (BUFFER_SIZE + VIEWPORT_SIZE))) {
            const diff = this.el.scrollLeft - (PHOTO_WIDTH * (BUFFER_SIZE + VIEWPORT_SIZE));
            this.setState((newState) => {
                return {idx: newState.idx + 1}
            }, () => {
                this.el.scrollLeft = (PHOTO_WIDTH * (BUFFER_SIZE + VIEWPORT_SIZE - 1)) + diff;
            });
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

        const dates = times(8, (i) => {
            return moment(this.props.date, DATE_FORMAT).add(this.state.idx + i, 'year').format(DATE_FORMAT);
        });
        return (
            <div>
                <div className="photos-wrapper" style={{width: `${PHOTO_WIDTH * VIEWPORT_SIZE}px`}} ref={(el) => {
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

export default connect(mapStateToProps)(Photos);
