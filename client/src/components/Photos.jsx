import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Photo from './Photo'
import { PHOTO_WIDTH, DATE_FORMAT } from './constants';

import './styles/Photos.css'

const mapStateToProps = (state) => ({
    date: state.ui.date,
});

export class Photos extends Component {
    constructor(){
        super();

        this.state = {
            idx: 0
        };
    }

    render(){
        if (!this.props.date) {
            return null;
        }
        // const onScroll = ({target}) => {
        //     if (target.scrollLeft <= 400) {

        //     } else if (target.scrollLeft >= 1200) {
        //         const diff = 1200 - target.scrollLeft;
        //         target.scrollLeft = 800 + diff;
        //     }
        // }

        const onScroll = ({target}) => {
            console.log(target.scrollLeft);
            if (target.scrollLeft <= PHOTO_WIDTH) {
                const diff = target.scrollLeft - PHOTO_WIDTH;
                this.setState((newState) => {
                    return {idx: newState.idx - 1}
                }, () => {
                    console.log(target.scrollLeft);
                    target.scrollLeft = (PHOTO_WIDTH * 2) - diff;
                });
            } else if (target.scrollLeft >= (PHOTO_WIDTH * 2)) {
                const diff = (PHOTO_WIDTH * 3) - target.scrollLeft;
                this.setState((newState) => {
                    return {idx: newState.idx + 1}
                }, () => {
                    target.scrollLeft = (PHOTO_WIDTH * 2) - diff;
                });
            }
        }

        const dates = [
            moment(this.props.date, DATE_FORMAT).add(this.state.idx, 'year').format(DATE_FORMAT),
            moment(this.props.date, DATE_FORMAT).add(this.state.idx + 1, 'year').format(DATE_FORMAT),
            moment(this.props.date, DATE_FORMAT).add(this.state.idx + 2, 'year').format(DATE_FORMAT),
            moment(this.props.date, DATE_FORMAT).add(this.state.idx + 3, 'year').format(DATE_FORMAT)
        ]

        return (
            <div className="photos-wrapper" style={{width: `${PHOTO_WIDTH * 2}px`}} onScroll={onScroll}>
                <div className="photos-container" style={{width: `${PHOTO_WIDTH * 4}px` }}>
                    {
                        dates.map(date => <Photo key={date} date={date} />)
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Photos);
