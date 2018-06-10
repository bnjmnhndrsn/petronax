import React, { Component } from 'react';
import { times } from 'lodash';
import 'dragscroll';

import { getMaxElementSize } from '../utils';

import './styles/ScrollManager.css'

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
        const { totalLength, itemWidth, containerWidth, currentIndex } = this.props;
        const unscaledScrollPosition = itemWidth * currentIndex;
        const totalSize = totalLength * itemWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= containerWidth ? 0 : unscaledScrollPosition / (totalSize - containerWidth);
        return Math.round(offsetPercentage * safeTotalSize);
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
        const { totalLength, itemWidth, containerWidth, renderItem } = this.props;
        const { scrollPos } = this.state;

        const totalSize = totalLength * itemWidth;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= containerWidth ? 0 : scrollPos / (safeTotalSize - containerWidth);
        const currentIndex = Math.floor(totalLength * offsetPercentage);
        const leftBuffer = Math.min(BUFFER_SIZE, currentIndex);
        const visibleItems = Math.ceil(containerWidth / itemWidth);

        const indices = [];
        times(leftBuffer, (i) => {
            indices.push(currentIndex - (leftBuffer - i));
        });

        times(visibleItems + BUFFER_SIZE, (i) => {
            const index = currentIndex + i;
            if (index < this.props.totalLength) {
                indices.push(index);
            }
        });

        const offsetAdjustment = Math.round(offsetPercentage * (safeTotalSize - totalSize));

        return (
            <div style={{overflow: 'visible', width: 0}}>
                <div className="scroll-wrapper" style={{width: `${containerWidth}px`}} ref={this.bindEl} onScroll={this.onScroll}>
                    <div className="scroll-container" style={{width: `${safeTotalSize}px` }}>
                        {
                            indices.map((index) => {
                                const left = (index * itemWidth) + offsetAdjustment;
                                const style = {position: 'absolute', top: '0', bottom: '0', left: `${left}px`, width: itemWidth};
                                return renderItem({style, index});
                            })
                        }
                    </div>
                </div>
            </div>

        )
    }
}
