import React, { Component } from 'react';
import moment from 'moment';
import { times } from 'lodash';
import 'dragscroll';

import { getMaxElementSize } from '../utils';
import { DATE_MIN, DATE_FORMAT } from '../constants';
import Photo from './Photo';

import './styles/Photos.css'

const BUFFER_SIZE = 3;

export default class ScrollManager extends Component {
    constructor(props){
        super(props);

        this.state = {
            scrollPos: this._getInitialOffset()
        };

        this.onScroll = this.onScroll.bind(this);
        this.bindEl = this.bindEl.bind(this)
    }

    _getInitialOffset(){
        const unscaledScrollPosition = this.props.itemWidth * this.props.currentIndex;
        const totalSize = this.props.totalLength * this.props.itemWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= this.props.containerWidth ? 0 : unscaledScrollPosition / (totalSize - this.props.containerWidth);
        return Math.round(offsetPercentage * safeTotalSize);
    }

    getIndexFromScrollPos(){
        const totalSize = this.props.totalLength * this.props.itemWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = safeTotalSize <= this.props.containerWidth ? 0 : this.state.scrollPos / (safeTotalSize - this.props.containerWidth);
        return Math.floor(this.props.totalLength * offsetPercentage);
    }

    onScroll({target}){
        this.lastKnownScrollPosition = target.scrollLeft;

        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.setState({
                    scrollPos: this.lastKnownScrollPosition
                });
                this.ticking = false;
            });
            this.ticking = true;
        }
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
        const currentIndex = this.getIndexFromScrollPos();
        const leftBuffer = Math.min(BUFFER_SIZE, currentIndex);
        const visibleItems = Math.ceil(this.props.containerWidth / this.props.itemWidth);

        const indices = [];
        times(leftBuffer, (i) => {
            indices.push(currentIndex - (leftBuffer - i));
        });

        times(visibleItems + BUFFER_SIZE, (i) => {
            const index = currentIndex + i;
            if (index < this.props.totalLength) {
                indices.push(index);
            }
        })

        const renderedSize = indices.length * this.props.itemWidth;
        const totalSize = this.props.totalLength * this.props.itemWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offset = this.state.scrollPos;
        const offsetPercentage = safeTotalSize <= renderedSize ? 0 : (offset / (safeTotalSize - this.props.containerWidth));
        const offsetAdjustment = Math.round(offsetPercentage * (safeTotalSize - totalSize));

        return (
            <div style={{overflow: 'visible', width: 0}}>
                <div className="photos-wrapper" style={{width: `${this.props.containerWidth}px`}} ref={this.bindEl} onScroll={this.onScroll}>
                    <div className="photos-container" style={{width: `${safeTotalSize}px` }}>
                        {
                            indices.map((index) => {
                                const left = (index * this.props.itemWidth) + offsetAdjustment;
                                return (
                                    <div key={index} style={{position: 'absolute', top: '0', bottom: '0', left: `${left}px`, width: this.props.itemWidth}}>
                                        <Photo date={moment(DATE_MIN, DATE_FORMAT).add(index, 'days').format(DATE_FORMAT)} photoWidth={this.props.itemWidth} />
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
