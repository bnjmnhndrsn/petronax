import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';
import { times, debounce } from 'lodash';

import { getMaxElementSize } from '../utils';

export const SCROLL_DIRECTION_VERTICAL = 'vertical';
export const SCROLL_DIRECTION_HORIZONTAL = 'horizontal';

export default class VerticalSlider extends Component {
    constructor(props){
        super(props);

        this.state = {
            offset: this._getInitialOffset()
        };

        this.handleDrag = this.handleDrag.bind(this);
        this.broadcastUpdate = debounce(this.broadcastUpdate, 300);
        this.onWheel = this.onWheel.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        let shouldUpdate = false;
        if (!state.offset) {
            shouldUpdate = true;
        } else {
            const { totalItems, itemSize, containerSize } = props;
            const { offset } = state;

            const totalSize = totalItems * itemSize;
            const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
            const offsetPercentage = totalSize <= containerSize ? 0 : offset / (safeTotalSize - containerSize);
            const currentIndex = Math.floor(totalItems * offsetPercentage * -1);

            if (currentIndex !== props.currentIndex) {
                shouldUpdate = true;
            }
        }

        if (shouldUpdate) {
            const { totalItems, itemSize, containerSize, currentIndex } = props;
            const unscaledOffset = itemSize * currentIndex;
            const totalSize = totalItems * itemSize;
            const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
            const offsetPercentage = totalSize <= containerSize ? 0 : unscaledOffset / (totalSize - containerSize);
            const offset = -1 * Math.round(offsetPercentage * (safeTotalSize - containerSize));
            return { offset: offset };
        }

        return null;
    }

    _getInitialOffset(){
        const { totalItems, itemSize, containerSize, currentIndex } = this.props;
        const unscaledOffset = itemSize * currentIndex;
        const totalSize = totalItems * itemSize;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= containerSize ? 0 : unscaledOffset / (totalSize - containerSize);
        return Math.round(offsetPercentage * safeTotalSize);
    }

    broadcastUpdate(){
        const { totalItems, itemSize, containerSize } = this.props;
        const { offset } = this.state;

        const totalSize = totalItems * itemSize;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= containerSize ? 0 : offset / (safeTotalSize - containerSize);
        const newIndex = Math.min(Math.abs(Math.floor(totalItems * offsetPercentage * -1)), totalItems - 1);
        if (newIndex !== this.props.currentIndex) {
            this.props.onIndexChange(newIndex)
        }
    }

    handleDrag(e, ui) {
        this.moveContainer(ui.deltaX, ui.deltaY);
    }

    moveContainer(deltaX, deltaY) {
        const { totalItems, itemSize, containerSize, scrollDirection } = this.props;
        const totalSize = totalItems * itemSize;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const minOffset = (safeTotalSize * -1) + containerSize;
        const delta = scrollDirection === SCROLL_DIRECTION_VERTICAL ? deltaY : deltaX;
        let newOffset = this.state.offset + delta;
        if (newOffset > 0) {
            newOffset = 0;
        } else if (newOffset < minOffset) {
            newOffset = minOffset;
        }

        if (newOffset !== this.state.offset) {
            this.setState({offset: newOffset}, () => this.broadcastUpdate());
        }
    }

    onWheel(e){
        const { scrollDirection } = this.props;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && scrollDirection == SCROLL_DIRECTION_HORIZONTAL) {
            e.preventDefault();
            this.moveContainer(-e.deltaX, 0);
        } else if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && scrollDirection == SCROLL_DIRECTION_VERTICAL) {
            e.preventDefault();
            this.moveContainer(0, - e.deltaY);
        }

    }

    render(){
        const { totalItems, itemSize, containerSize, renderItem, scrollDirection, bufferSize } = this.props;
        const { offset } = this.state;

        const totalSize = totalItems * itemSize;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= containerSize ? 0 : offset / (safeTotalSize - containerSize);
        const currentIndex = Math.floor(totalItems * offsetPercentage * -1);
        const leftBuffer = Math.min(bufferSize, currentIndex);
        const visibleItems = Math.ceil(containerSize / itemSize);

        const indices = [];
        times(leftBuffer, (i) => {
            indices.push(currentIndex - (leftBuffer - i));
        });

        times(visibleItems + bufferSize, (i) => {
            const index = currentIndex + i;
            if (index < this.props.totalItems) {
                indices.push(index);
            }
        });

        const adjustedOffset = Math.round(offsetPercentage * (safeTotalSize - containerSize));
        const offsetAdjustment = -1 * Math.round(offsetPercentage * (safeTotalSize - totalSize));
        let containerPrimaryDimension, containerSecondaryDimension, dragTransform, boundary;
        if (scrollDirection === SCROLL_DIRECTION_VERTICAL) {
             containerPrimaryDimension = 'height';
             containerSecondaryDimension = 'width';
             dragTransform = 'translateY';
             boundary = 'right';
        } else {
            containerPrimaryDimension = 'width';
            containerSecondaryDimension = 'height';
            dragTransform = 'translateX';
            boundary = 'bottom';
        }


        return (
            <div style={{[containerPrimaryDimension]: `${containerSize}px`, overflow: 'hidden', position: 'relative', [containerSecondaryDimension]: '100%'}} onWheel={this.onWheel}>
                <DraggableCore
                    onDrag={this.handleDrag}
                >
                    <div style={{position: 'absolute', [containerPrimaryDimension]: `${safeTotalSize}px`, top: 0, left: 0, [boundary]: 0, transform: `${dragTransform}(${adjustedOffset}px)`}}>
                        {
                            indices.map((index) => {
                                const itemOffset = (index * itemSize) + offsetAdjustment;
                                const style = {
                                    top: 0,
                                    left: 0,
                                    [boundary]: 0,
                                    [containerPrimaryDimension]: this.props.itemSize,
                                    transform: `${dragTransform}(${itemOffset}px)`,
                                    position: 'absolute'
                                };
                                return renderItem({index, style})
                            })
                        }
                    </div>
                </DraggableCore>
            </div>
        );
    }
}
